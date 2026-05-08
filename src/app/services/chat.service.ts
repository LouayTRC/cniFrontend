import { inject, Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { addDoc, collection, doc, Firestore, getDoc, getDocs, limit, onSnapshot, orderBy, query, QuerySnapshot, setDoc, Timestamp, updateDoc, where } from '@angular/fire/firestore';
import { User } from '../entities/user';
import { API_BASE_URL } from '../utils/api';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseUrl = API_BASE_URL + '/messages'

  private firestore = inject(Firestore);

  constructor(private http: HttpClient) { }

  getContacts(headers: HttpHeaders): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/contacts', { headers })
  }

  async sendMessage(senderId: string, receiverId: string, messageContent: string, headers: HttpHeaders): Promise<void> {
    const firestore = this.firestore;

    const id1 = `messages_${senderId}_${receiverId}`;
    const id2 = `messages_${receiverId}_${senderId}`;

    const discussionsCollection = collection(firestore, 'discussions');
    const docRef1 = doc(discussionsCollection, id1);
    const docRef2 = doc(discussionsCollection, id2);

    let discussionRef = docRef1;
    let discussionSnap = await getDoc(docRef1);

    if (!discussionSnap.exists()) {
      discussionSnap = await getDoc(docRef2);
      discussionRef = docRef2;
    }

    if (!discussionSnap.exists()) {

      await setDoc(discussionRef, {
        participants: [senderId, receiverId],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        lastMessage: {
          senderId,
          content: messageContent,
          timestamp: Timestamp.now()
        }
      });
    }


    const messagesSubCollection = collection(discussionRef, 'messages');

    await addDoc(messagesSubCollection, {
      senderId,
      content: messageContent,
      timestamp: Timestamp.now()
    });

    await updateDoc(discussionRef, {
      updatedAt: Timestamp.now(),
      lastMessage: {
        senderId,
        content: messageContent,
        timestamp: Timestamp.now()
      }
    });


    this.http.post(this.baseUrl + "/" + receiverId, { message: messageContent }, { headers }).subscribe()

  }


  getUserDiscussions(user_id: string): Observable<any[]> {
    return new Observable<any[]>(observer => {
      const discussionsCollection = collection(this.firestore, 'discussions');
      const q = query(
        discussionsCollection,
        where('participants', 'array-contains', user_id),
        orderBy('updatedAt', 'desc')
      );

      const unsubscribe = onSnapshot(q, async snapshot => {
        try {
          const discussions = await Promise.all(snapshot.docs.map(async (docSnap) => {
            const discussionId = docSnap.id;
            const discussion = docSnap.data();


            return {
              id: discussionId,
              participants: discussion['participants'],
              createdAt: discussion['createdAt'],
              updatedAt: discussion['updatedAt'],
              lastMessage: discussion['lastMessage']
            };
          }));

          observer.next(discussions);
        } catch (error) {
          console.error('Erreur lors du chargement des discussions :', error);
          observer.error(error);
        }
      }, error => {
        observer.error(error);
      });

      // Nettoyage
      return () => unsubscribe();
    });
  }



  async getDiscussion(user_id: string, user2_id: string): Promise<string | null> {
    const id1 = `messages_${user_id}_${user2_id}`;
    const id2 = `messages_${user2_id}_${user_id}`;

    const discussionsCollection = collection(this.firestore, 'discussions');

    const q = query(
      discussionsCollection,
      where('__name__', 'in', [id1, id2])
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null; // Aucune discussion trouvée
    }

    const discussionId = snapshot.docs[0].id;
    return discussionId;
  }


  listenToMessages(discussionId: string): Observable<any[]> {
    const messagesRef = collection(this.firestore, `discussions/${discussionId}/messages`);
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const messagesSubject = new Subject<any[]>();

    // Real-time snapshot listener
    onSnapshot(q, (snapshot: QuerySnapshot<any>) => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      messagesSubject.next(messages);
    });

    return messagesSubject.asObservable();
  }

  
}

import { inject, Injectable } from '@angular/core';
import { Firestore, collection, query, where, or, onSnapshot, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from '../utils/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private firestore = inject(Firestore);

  baseUrl = API_BASE_URL + "/notification"

  constructor(private http: HttpClient) { }

  listenToNotifications(userId: string): Observable<any[]> {
  return new Observable(observer => {
    const ref = collection(this.firestore, 'notifications');

    const q = query(
      ref,
      where('user_id', '==', userId),
      orderBy('sentAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      observer.next(
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      );
    }, error => observer.error(error));

    return () => unsubscribe();
  });
}

  markAsReaded(id: string, user_id: string, headers: HttpHeaders): Observable<any> {
    return this.http.patch(this.baseUrl + "/lu/" + id, { user_id }, { headers })
  }
}

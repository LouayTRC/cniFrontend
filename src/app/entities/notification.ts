export class Notification {
    
    constructor(
        public id: string,
        public user_id: string,
        public title: string,
        public message: string,
        public sentAt: Date,
        public isRead: boolean
    ){}
}

import { User } from "./user";

export class Reclamation {

    constructor(
        public id: string,
        public title: string,
        public description: string,
        public files: string[],
        public priority: number,
        public status: number,
        public createdBy: User,
        public treatedBy: User,
        public createdAt: Date,
        public updatedAt: Date
    ) { }

}
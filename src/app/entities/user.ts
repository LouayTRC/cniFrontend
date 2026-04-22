import { Role } from "./role";

export class User {

    constructor(
        public id:string,
        public username:string,
        public fullname:string,
        public email:string,
        public password:string,
        public phone:string,
        public active:boolean,
        public role:Role
    ) {}
}

// import { Notification } from "@/app/entities/Notification";
import { Notification } from "@/app/entities/notification";
import { createAction, props } from "@ngrx/store";


export const loadNotificationsSucces=createAction(
    "[Notification] Load Notifications Success",
    props<{notifications: Notification[]}>()
)

export const loadNotificationsFailure=createAction(
    "[Notification] Load Notifications Failure",
    props<{error:string}>()
)
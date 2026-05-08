// import { Notification } from "@/app/entities/Notification";
import { createReducer, on } from "@ngrx/store";
import { loadNotificationsFailure, loadNotificationsSucces } from "./notifications-actions";
import { Notification } from "@/app/entities/notification";


export interface NotificationsState{
    notifications:Notification[],
    countUnreaded:number
    error:string | null
}

const initialState:NotificationsState={
    notifications:[],
    countUnreaded:0,
    error:null
}

export const notificationsReducer=createReducer(
    initialState,
    on(loadNotificationsSucces,(state,action)=>({
        ...state,
        notifications:[...action.notifications],
        countUnreaded:action.notifications.filter(e=>e.isRead==false).length | 0
    })),
    on(loadNotificationsFailure, (state, { error }) => ({
        ...state,
        error,
        notifications:[],
        countUnreaded:0
    })),
)
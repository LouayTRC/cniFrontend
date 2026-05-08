import { createFeatureSelector, createSelector } from "@ngrx/store";
import { NotificationsState } from "./notifications-reducer";


const getNotificationsState=createFeatureSelector<NotificationsState>('notifications')

export const getNotifications=createSelector(
    getNotificationsState,
    (notification:NotificationsState)=>notification.notifications
)

export const getCountUnreaded=createSelector(
    getNotificationsState,
    (notification:NotificationsState)=>notification.countUnreaded
)

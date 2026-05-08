import { ActionReducerMap } from "@ngrx/store"
import { authReducer, AuthState } from "./auth"
import { layoutReducer, LayoutState } from "./layout/layout-reducers"
import { notificationsReducer, NotificationsState } from "./notifications/notifications-reducer"

export interface RootReducerState {
  layout: LayoutState
  auth: AuthState
  notifications: NotificationsState
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  layout: layoutReducer,
  auth: authReducer,
  notifications: notificationsReducer
}
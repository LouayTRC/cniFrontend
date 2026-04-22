import { ActionReducerMap } from "@ngrx/store"
import { authReducer, AuthState } from "./auth"
import { layoutReducer, LayoutState } from "./layout/layout-reducers"

export interface RootReducerState {
  layout: LayoutState
  auth: AuthState
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  layout: layoutReducer,
  auth: authReducer
}

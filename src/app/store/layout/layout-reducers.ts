import { Action, createReducer, on } from '@ngrx/store'
import { localStorageSync } from 'ngrx-store-localstorage'
import {
  LAYOUT_COLOR_TYPES,
  SIDEBAR_SIZE_TYPES,
  TOPBAR_COLOR_TYPES,
} from './layout'
import * as appActions from './layout-action'
import {
  changeMenuColor,
  changeSidebarSize,
  changeTheme,
  changeTopbarColor,
} from './layout-action'

export interface LayoutState {
  LAYOUT_THEME: string
  TOPBAR_COLOR: string
  MENU_COLOR: string
  MENU_SIZE: string
}

// IntialState
export const initialState: LayoutState = {
  LAYOUT_THEME: LAYOUT_COLOR_TYPES.LIGHTMODE,
  TOPBAR_COLOR: TOPBAR_COLOR_TYPES.LIGHT,
  MENU_COLOR: TOPBAR_COLOR_TYPES.DARK,
  MENU_SIZE: SIDEBAR_SIZE_TYPES.HOVERACTIVE,
}

// Reducer
export const layoutReducer = createReducer(
  initialState,
  on(changeTheme, (state, action) => ({
    ...state,
    LAYOUT_THEME: action.color,
  })),
  on(changeTopbarColor, (state, action) => ({
    ...state,
    TOPBAR_COLOR: action.topbar,
  })),
  on(changeMenuColor, (state, action) => ({
    ...state,
    MENU_COLOR: action.menu,
  })),
  on(changeSidebarSize, (state, action) => ({
    ...state,
    MENU_SIZE: action.size,
  })),
  on(appActions.resetState, () => initialState)
)

// Configuration for localStorageSync
export function localStorageSyncReducer(reducer: any) {
  return localStorageSync({ keys: ['app'], rehydrate: true })(reducer)
}

// Selector
export function reducer(state: LayoutState | undefined, action: Action) {
  return layoutReducer(state, action)
}

export const rootReducer = localStorageSyncReducer(layoutReducer)
 
const metaReducers = [rootReducer]

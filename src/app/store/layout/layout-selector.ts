import { createFeatureSelector, createSelector } from '@ngrx/store'
import { LayoutState } from './layout-reducers'

export const getLayoutState = createFeatureSelector<LayoutState>('layout')

export const getLayoutColor = createSelector(
  getLayoutState,
  (state: LayoutState) => state.LAYOUT_THEME
)

export const getTopbarColor = createSelector(
  getLayoutState,
  (state: LayoutState) => state.TOPBAR_COLOR
)

export const getMenuColor = createSelector(
  getLayoutState,
  (state: LayoutState) => state.MENU_COLOR
)

export const getSidebarSize = createSelector(
  getLayoutState,
  (state: LayoutState) => state.MENU_SIZE
)

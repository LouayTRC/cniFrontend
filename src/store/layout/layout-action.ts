import { createAction, props } from '@ngrx/store'

export const changeTheme = createAction(
  '[Layout] Set Color',
  props<{ color: string }>()
)
export const changeTopbarColor = createAction(
  '[Layout] Set Topbar',
  props<{ topbar: string }>()
)

export const changeSidebarSize = createAction(
  '[Layout] Set size',
  props<{ size: string }>()
)
export const resetState = createAction('[App] Reset State')

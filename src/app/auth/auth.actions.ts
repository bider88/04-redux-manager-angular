import { createAction, props } from '@ngrx/store';
import { UserInterface } from '../models/user/user.interface';

export const setUser = createAction('[Auth] Set User', props<{ user: UserInterface }>());
export const unsetUser = createAction('[Auth] Unset User');

import { createReducer, on } from '@ngrx/store';
import { setUser, unsetUser } from './auth.actions';
import { UserInterface } from '../models/user/user.interface';

export interface State {
    user: UserInterface;
}

export const initialState: State = {
  user: null,
};

const authInternalReducer = createReducer(initialState,

  on(setUser, (state, { user }) => ({ ...state, user})),
  on(unsetUser, (state => ({ ...state, user: null}))),

);

export function authReducer(state, action) {
    return authInternalReducer(state, action);
}

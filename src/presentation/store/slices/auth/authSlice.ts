import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Trabajador } from '../../../../domain/entities/interfaces/responses/facturaResponse';

// Define a type for the slice state
interface AuthState {
  authMsg: 'Authenticated' | 'Not Authenticated' | 'unknown';
  user?: Trabajador;
}

// Define the initial state using that type
const initialState: AuthState = {
  authMsg: 'Not Authenticated',
  user: undefined,
};

export const authslice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loginAuth: (state, action: PayloadAction<Trabajador>) => {
      state.authMsg = 'Authenticated';
      state.user = action.payload;
      // state.value += 1
    },
    logout: (state) => {
      state.authMsg = 'Not Authenticated';
      state.user = undefined;
      // state.value += 1
    },
  },
});
export const { loginAuth, logout } = authslice.actions;

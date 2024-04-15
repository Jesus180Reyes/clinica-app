import { configureStore } from '@reduxjs/toolkit';
import { authslice } from './slices/auth/authSlice.ts';

export const store = configureStore({
    reducer: {
      auth: authslice.reducer,
    },
  })

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


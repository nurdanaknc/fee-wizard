import { configureStore } from '@reduxjs/toolkit'
import { feeWizardSlice } from './api'
import { sitesSlice } from './sites'

export const store = configureStore({
  reducer: {
    api: feeWizardSlice.reducer,
    sites: sitesSlice.reducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
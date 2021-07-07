import AuthApi from './services/auth.services'
import UsersApi from './services/users.services'
import TweetsApi from './services/tweets.services'
import UploadApi from './services/upload.service'
import TrendsApi from './services/trends.services'
import { configureStore } from '@reduxjs/toolkit'
import NotificationApi from './services/notification.services'

export const store = configureStore({
   reducer: {
      [AuthApi.reducerPath]: AuthApi.reducer,
      [TweetsApi.reducerPath]: TweetsApi.reducer,
      [TrendsApi.reducerPath]: TrendsApi.reducer,
      [NotificationApi.reducerPath]: NotificationApi.reducer,
      [UsersApi.reducerPath]: UsersApi.reducer,
      [UploadApi.reducerPath]: UploadApi.reducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
         AuthApi.middleware,
         TweetsApi.middleware,
         TrendsApi.middleware,
         NotificationApi.middleware,
         UsersApi.middleware,
         UploadApi.middleware
      ),
})

export type IRootState = ReturnType<typeof store.getState>

export type ApiResponse<T extends string, V> = {
   [key in T]: V
} & { message: string }

export type AppDispatch = typeof store.dispatch

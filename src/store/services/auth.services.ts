import UsersApi from './users.services'
import TweetsApi from './tweets.services'
import TrendsApi from './trends.services'
import { IUser } from '../../types/user.type'
import NotificationApi from './notification.services'
import { prepareHeaders } from '../helpers/prepareHeaders'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'

const baseUrl = import.meta.env.VITE_API_URL as string

type LoginResponse = {
   message: string
   token: string
   user: IUser
}

type LoginCredentials = {
   email: string
   password: string
}

type SignupCredentials = {
   name: string
   email: string
   password: string
}

const AuthApi = createApi({
   reducerPath: 'auth',
   baseQuery: fetchBaseQuery({
      baseUrl,
      prepareHeaders,
   }),
   tagTypes: ['Auth'],
   endpoints: (builder) => ({
      login: builder.mutation<LoginResponse, LoginCredentials>({
         query: (body) => ({
            url: '/auth/login',
            method: 'POST',
            body,
         }),
      }),
      signup: builder.mutation<LoginResponse, SignupCredentials>({
         query: (body) => ({
            url: '/auth/signup',
            method: 'POST',
            body,
         }),
      }),
      me: builder.query<LoginResponse, void>({
         query: () => '/auth/logedIn',
         async onQueryStarted(value, { dispatch, queryFulfilled, getState }) {
            const data = await queryFulfilled
            Cookies.set('user_Id', data.data.user._id)
         },
      }),
      logout: builder.mutation<LoginResponse, void>({
         query: () => '/auth/logout',
         async onQueryStarted(value, { dispatch, queryFulfilled, getState }) {
            dispatch(TweetsApi.util.resetApiState())
            dispatch(AuthApi.util.resetApiState())
            dispatch(NotificationApi.util.resetApiState())
            dispatch(TrendsApi.util.resetApiState())
            dispatch(UsersApi.util.resetApiState())
         },
      }),
   }),
})

export const { useLoginMutation, useMeQuery, useLazyMeQuery, useSignupMutation, useLogoutMutation } = AuthApi

export default AuthApi

import Cookies from 'js-cookie'
import { ApiResponse } from '../store'
import { IUser } from '../../types/user.type'
import { updateUserAction } from '../actions/user.action'
import { prepareHeaders } from '../helpers/prepareHeaders'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = import.meta.env.VITE_API_URL as string

type getUsersResponse = {
   message: string
   users: IUser[]
}

const UsersApi = createApi({
   reducerPath: 'users',
   baseQuery: fetchBaseQuery({
      baseUrl,
      prepareHeaders,
   }),
   tagTypes: ['Users'],
   endpoints: (builder) => ({
      getSuggestedUsers: builder.query<getUsersResponse, { limit: number; page: number }>({
         query: ({ limit, page }) => `/user/suggestedUsers/?page=${page}&limit=${limit}`,
      }),
      findUserById: builder.query<ApiResponse<'user', IUser>, string>({
         query: (userId) => `/user/getUserById/${userId}`,
      }),
      followUser: builder.mutation<ApiResponse<'user', IUser>, string>({
         query: (followingId) => ({
            url: `user/followUser/${followingId}`,
            method: 'PUT',
         }),
         async onQueryStarted(userId, { dispatch, queryFulfilled, getState }) {
            const currentUserId = Cookies.get('user_Id') as string

            const toggleFollowers = (key: 'followers' | 'following', user: IUser) => {
               const followers = user?.[key] || []

               const followToUser = key == 'followers' ? currentUserId : userId
               return followers?.includes(followToUser)
                  ? followers?.filter((id) => id !== followToUser)
                  : [...followers, followToUser]
            }

            updateUserAction(dispatch, getState(), userId, currentUserId, (user: IUser) => {
               if (Array.isArray(user)) {
                  return user.map((user) => {
                     if (user._id === userId) {
                        return {
                           ...user,
                           followers: toggleFollowers('followers', user),
                        }
                     } else {
                        return user
                     }
                  })
               } else {
                  return {
                     ...user,
                     followers:
                        currentUserId !== user._id ? toggleFollowers('followers', user) : user?.followers,
                     following:
                        currentUserId === user._id ? toggleFollowers('following', user) : user?.following,
                  }
               }
            })
         },
      }),
      updateUser: builder.mutation<ApiResponse<'user', IUser>, any>({
         query: (body) => ({
            url: `/user/updateUser`,
            method: 'PUT',
            body,
         }),
         async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
            const currentUserId = Cookies.get('user_Id') as string
            updateUserAction(dispatch, getState(), currentUserId, currentUserId, (user: IUser) => {
               if (!Array.isArray(user)) {
                  return {
                     ...user,
                     ...args,
                  }
               } else {
                  return user
               }
            })
         },
      }),
   }),
})

export const {
   useGetSuggestedUsersQuery,
   useFindUserByIdQuery,
   useLazyFindUserByIdQuery,
   useFollowUserMutation,
   useUpdateUserMutation,
} = UsersApi

export default UsersApi

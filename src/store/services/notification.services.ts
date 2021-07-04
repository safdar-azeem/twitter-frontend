import Cookies from 'js-cookie'
import { ApiResponse } from '../store'
import { prepareHeaders } from '../helpers/prepareHeaders'
import { INotification } from '../../types/notification.type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = import.meta.env.VITE_API_URL as string

const NotificationApi = createApi({
   reducerPath: 'notification',
   baseQuery: fetchBaseQuery({
      baseUrl,
      prepareHeaders,
   }),
   tagTypes: ['Notification'],
   endpoints: (builder) => ({
      getNotifications: builder.query<ApiResponse<'notifications', INotification[]>, void>({
         query: () => `/notification/get/${Cookies.get('user_Id')}`,
      }),
      countUnreadNotifications: builder.query<{ count: number }, any>({
         query: () => `/notification/count/${Cookies.get('user_Id')}`,
      }),
      markAsReadNotification: builder.mutation<ApiResponse<'notifications', INotification>, string>({
         query: (notificationId) => ({
            url: `/notification/markAsRead/${Cookies.get('user_Id')}/${notificationId}`,
            method: 'PUT',
         }),
      }),
      markAsSeenNotification: builder.mutation<ApiResponse<'notifications', INotification[]>, void>({
         query: (body) => ({
            url: `/notification/markAsSeen/${Cookies.get('user_Id')}`,
            method: 'POST',
            body,
         }),
      }),
   }),
})

export const {
   useGetNotificationsQuery,
   useCountUnreadNotificationsQuery,
   useLazyCountUnreadNotificationsQuery,
   useMarkAsSeenNotificationMutation,
   useMarkAsReadNotificationMutation,
} = NotificationApi

export default NotificationApi

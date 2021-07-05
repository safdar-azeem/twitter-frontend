import Cookies from 'js-cookie'
import { ApiResponse } from '../store'
import { ITrend } from '../../types/trend.type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = import.meta.env.VITE_API_URL as string

type getTrendsResponse = {
   message: string
   trends: ITrend[]
}

const TrendsApi = createApi({
   reducerPath: 'trends',
   baseQuery: fetchBaseQuery({
      baseUrl,
      prepareHeaders: (headers, { getState }) => {
         const token = Cookies.get('token')
         if (token) {
            headers.set('authorization', `Bearer ${token}`)
         }
         return headers
      },
   }),
   tagTypes: ['Trends'],
   endpoints: (builder) => ({
      getTopTrends: builder.query<getTrendsResponse, void>({
         query: () => `/trend/getTop`,
      }),
      findTrends: builder.query<ApiResponse<'trend', ITrend>, string>({
         query: (search) => `/trend/find/${search}/${Cookies.get('user_Id')}`,
      }),
      deleteTrend: builder.mutation<ApiResponse<'trend', ITrend>, { trend: string; tweetId: string }>({
         query: ({ trend, tweetId }) => ({
            url: `/trend/delete/${trend}/${tweetId}`,
            method: 'DELETE',
         }),
      }),
   }),
})

export const { useGetTopTrendsQuery, useLazyFindTrendsQuery, useDeleteTrendMutation } = TrendsApi

export default TrendsApi

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
   reducerPath: 'upload',
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
      uplaodPhoto: builder.mutation<ApiResponse<'src', string>, string>({
         query: (image) => {
            const body = {
               base64Image: image,
            }
            return {
               url: `/upload/photo`,
               method: 'POST',
               body,
            }
         },
      }),
   }),
})

export const { useUplaodPhotoMutation } = TrendsApi

export default TrendsApi

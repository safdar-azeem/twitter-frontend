import Cookies from 'js-cookie'
import { ApiResponse } from '../store'
import { IUser } from '../../types/user.type'
import { ITweet } from '../../types/tweet.type'
import { IComment } from '../../types/comment.type'
import { prepareHeaders } from '../helpers/prepareHeaders'
import { updateTweetsAction } from '../actions/tweets.action'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = import.meta.env.VITE_API_URL as string

interface AddComment {
   content: string
   tweetId: string
   userId: string
}

const TweetsApi = createApi({
   reducerPath: 'tweets',
   baseQuery: fetchBaseQuery({
      baseUrl,
      prepareHeaders,
   }),
   tagTypes: ['tweets', 'bookmarks', 'Tweet', 'GetUserTweets', 'UserMediaTweets', 'TweetsLikeByUser'],
   endpoints: (builder) => ({
      addTweet: builder.mutation<ApiResponse<'tweet', ITweet>, any>({
         query: (body) => ({
            url: `/tweet/upload`,
            method: 'POST',
            body,
         }),
         async onQueryStarted({ tweetId, ...patch }, { dispatch, queryFulfilled, getState }) {
            const newTweet = await queryFulfilled

            updateTweetsAction(dispatch, getState(), '', tweetId, (tweet: ITweet | ITweet[], user: IUser) => {
               if (Array.isArray(tweet)) {
                  return [newTweet.data.tweet, ...tweet]
               }
               return tweet
            })
         },
      }),
      getTweets: builder.query<ApiResponse<'tweets', ITweet[]>, void>({
         query: () => `/tweet/getTweets`,
         providesTags: ['tweets'],
      }),
      getExploreTweets: builder.query<ApiResponse<'tweets', ITweet[]>, void>({
         query: () => `/tweet/exploreTweets`,
         providesTags: ['tweets'],
      }),
      findTweetById: builder.query<ApiResponse<'tweet', ITweet>, string>({
         query: (tweetId) => `/tweet/getTweetById/${tweetId}`,
         providesTags: ['Tweet'],
         transformErrorResponse: (error: any) => error?.data['message'],
      }),
      getUserTweets: builder.query<ApiResponse<'tweets', ITweet[]>, string>({
         query: (userId) => `/tweet/getUserTweets/${userId}`,
         providesTags: ['GetUserTweets'],
         transformErrorResponse: (error: any) => error?.data['message'],
      }),
      getUserMediaTweets: builder.query<ApiResponse<'tweets', ITweet[]>, string>({
         query: (userId) => `/tweet/getUserMediaTweets/${userId}`,
         providesTags: ['UserMediaTweets'],
         transformErrorResponse: (error: any) => error?.data['message'],
      }),
      getTweetsLikeByUser: builder.query<ApiResponse<'tweets', ITweet[]>, string>({
         query: (userId) => `/tweet/getTweetsLikeByUser/${userId}`,
         providesTags: ['TweetsLikeByUser'],
         transformErrorResponse: (error: any) => error?.data['message'],
      }),
      addComment: builder.mutation<ApiResponse<'comment', IComment>, AddComment>({
         query: (body) => ({
            url: `/comment/add`,
            method: 'POST',
            body,
         }),

         async onQueryStarted({ tweetId, ...patch }, { dispatch, queryFulfilled, getState }) {
            updateTweetsAction(
               dispatch,
               getState(),
               patch.userId,
               tweetId,
               (tweet: ITweet | ITweet[], user: IUser) => {
                  if (Array.isArray(tweet)) {
                     return tweet.map((e: ITweet) => {
                        const comments = e?.comments || []
                        return e._id === tweetId
                           ? {
                                ...e,
                                comments: [...comments, ''],
                             }
                           : e
                     })
                  } else {
                     const comments = tweet?.comments || []
                     return {
                        ...tweet,
                        comments: [
                           {
                              ...patch,
                              user,
                              createdAt: Date.now(),
                              updatedAt: Date.now(),
                              tweet: tweetId,
                           },
                           ...comments,
                        ],
                     }
                  }
               }
            )
         },
      }),
      getBookmarks: builder.query<ApiResponse<'bookmarks', ITweet[]>, void>({
         query: () => `bookmar/get/${Cookies.get('user_Id')}`,
         providesTags: ['bookmarks'],
      }),
      likeTweet: builder.mutation<ApiResponse<'Tweet', ITweet[]>, string>({
         query: (tweetId) => ({
            url: `/tweet/likeTweet/${tweetId}`,
            method: 'POST',
         }),
         async onQueryStarted(tweetId, { dispatch, queryFulfilled, getState }) {
            const userId = Cookies.get('user_Id') as string

            const toggleLikes = (tweet: ITweet) => {
               const likes = tweet?.likes || []
               return likes?.includes(userId) ? likes?.filter((id) => id !== userId) : [...likes, userId]
            }

            updateTweetsAction(
               dispatch,
               getState(),
               userId,
               tweetId,
               (tweet: ITweet | ITweet[], user: IUser) => {
                  if (Array.isArray(tweet)) {
                     return tweet.map((e: ITweet) => {
                        return e._id === tweetId
                           ? {
                                ...e,
                                likes: toggleLikes(e),
                             }
                           : e
                     })
                  } else {
                     return {
                        ...tweet,
                        likes: toggleLikes(tweet),
                     }
                  }
               }
            )
         },
      }),
      retweet: builder.mutation<ApiResponse<'Tweet', ITweet[]>, string>({
         query: (tweetId) => ({
            url: `/tweet/retweet/${tweetId}`,
            method: 'POST',
         }),
         async onQueryStarted(tweetId, { dispatch, queryFulfilled, getState }) {
            const userId = Cookies.get('user_Id') as string
            const toggleRetweets = (tweet: ITweet) => {
               const retweets = tweet?.retweetedBy || []
               return retweets?.includes(userId)
                  ? retweets?.filter((id) => id !== userId)
                  : [...retweets, userId]
            }

            updateTweetsAction(
               dispatch,
               getState(),
               userId,
               tweetId,
               (tweet: ITweet | ITweet[], user: IUser) => {
                  if (Array.isArray(tweet)) {
                     return tweet.map((e: ITweet) => {
                        return e._id === tweetId
                           ? {
                                ...e,
                                retweetedBy: toggleRetweets(e),
                             }
                           : e
                     })
                  } else {
                     return {
                        ...tweet,
                        retweetedBy: toggleRetweets(tweet),
                     }
                  }
               }
            )
         },
      }),
      addBookmark: builder.mutation<ApiResponse<'Tweet', ITweet[]>, string>({
         query: (tweetId) => ({
            url: `/bookmar/add/${Cookies.get('user_Id')}/${tweetId}`,
            method: 'POST',
         }),
         async onQueryStarted(tweetId, { dispatch, queryFulfilled, getState }) {
            const userId = Cookies.get('user_Id') as string

            const toggleBookMarks = (tweet: ITweet) => {
               const bookmarks = tweet?.bookmarks || []
               return bookmarks?.includes(userId)
                  ? bookmarks?.filter((id) => id !== userId)
                  : [...bookmarks, userId]
            }

            updateTweetsAction(
               dispatch,
               getState(),
               userId,
               tweetId,
               (tweet: ITweet | ITweet[], user: IUser) => {
                  if (Array.isArray(tweet)) {
                     return tweet.map((e: ITweet) => {
                        return e._id === tweetId
                           ? {
                                ...e,
                                bookmarks: toggleBookMarks(e),
                             }
                           : e
                     })
                  } else {
                     return {
                        ...tweet,
                        bookmarks: toggleBookMarks(tweet),
                     }
                  }
               }
            )
         },
      }),
      deleteTweet: builder.mutation<ApiResponse<'Tweet', ITweet[]>, string>({
         query: (tweetId) => ({
            url: `/tweet/delete/${tweetId}`,
            method: 'DELETE',
         }),
         async onQueryStarted(tweetId, { dispatch, queryFulfilled, getState }) {
            const userId = Cookies.get('user_Id') as string

            updateTweetsAction(
               dispatch,
               getState(),
               userId,
               tweetId,
               (tweet: ITweet | ITweet[], user: IUser) => {
                  if (Array.isArray(tweet)) {
                     return tweet.filter((e: ITweet) => e._id !== tweetId)
                  } else {
                     return null
                  }
               }
            )
         },
      }),
   }),
})

export const {
   useGetTweetsQuery,
   useLazyGetTweetsQuery,
   useAddCommentMutation,
   useGetUserTweetsQuery,
   useFindTweetByIdQuery,
   useGetBookmarksQuery,
   useLikeTweetMutation,
   useRetweetMutation,
   useGetUserMediaTweetsQuery,
   useAddBookmarkMutation,
   useDeleteTweetMutation,
   useAddTweetMutation,
   useGetTweetsLikeByUserQuery,
   useGetExploreTweetsQuery,
} = TweetsApi

export default TweetsApi

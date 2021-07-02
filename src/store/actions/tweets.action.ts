import { getQueryData } from '../../utils/getQueryData'
import TrendsApi from '../services/trends.services'
import TweetsApi from '../services/tweets.services'

export const updateTweetsAction = (
   dispatch: any,
   state: any,
   userId: string,
   tweetId: string,
   callback: any
) => {
   const user = getQueryData(state, 'auth', '', 'user')
   const tweet = getQueryData(state, 'tweets', tweetId, 'tweet')
   const getTweets = getQueryData(state, 'tweets', 'getTweets', 'tweets')
   const getBookmarks = getQueryData(state, 'tweets', 'getBookmarks', 'bookmarks')
   const getExploreTweets = getQueryData(state, 'tweets', 'getExploreTweets', 'tweets')

   Object.keys(state.tweets.queries).forEach((key) => {
      if (
         key.includes('getUserTweets') ||
         key.includes('getTweetsLikeByUser') ||
         key.includes('getUserMediaTweets')
      ) {
         const tweets = state.tweets.queries[key]?.data?.tweets
         const [_, functionName, id]: any[] = /(\w+)\("([^"]+)"\)/.exec(key) || []

         dispatch(
            TweetsApi.util.upsertQueryData(functionName, id, {
               tweets: callback(tweets, user),
               message: '',
            })
         )
      }
   })

   Object.keys(state.trends.queries).forEach((key) => {
      if (key.includes('findTrends')) {
         const trend = state.trends.queries[key]?.data?.trend
         const [_, functionName, id]: any[] = /(\w+)\("([^"]+)"\)/.exec(key) || []
         dispatch(
            TrendsApi.util.upsertQueryData(functionName, id, {
               trend: {
                  ...trend,
                  tweets: callback(trend.tweets, user),
               },
               message: '',
            })
         )
      }
   })

   if (tweet) {
      dispatch(
         TweetsApi.util.upsertQueryData('findTweetById', tweetId, {
            tweet: callback(tweet, user),
            message: '',
         })
      )
   }

   if (getTweets) {
      dispatch(
         TweetsApi.util.upsertQueryData('getTweets', undefined, {
            message: '',
            tweets: callback(getTweets),
         })
      )
   }

   if (getBookmarks) {
      dispatch(
         TweetsApi.util.upsertQueryData('getBookmarks', undefined, {
            message: '',
            bookmarks: callback(getBookmarks),
         })
      )
   }

   if (getExploreTweets) {
      dispatch(
         TweetsApi.util.upsertQueryData('getExploreTweets', undefined, {
            message: '',
            tweets: callback(getExploreTweets),
         })
      )
   }
}

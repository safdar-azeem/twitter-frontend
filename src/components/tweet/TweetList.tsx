import React from 'react'
import Tweet from './Tweet'
import Spinner from '../reusable/Spinner'
import { ITweet } from '../../types/tweet.type'
import TweetCommentModal from './TweetCommentModal'

interface Iprops {
   tweets: ITweet[] | undefined
   loading: boolean
   error?: string
}

const TweetList = ({ tweets, loading, error }: Iprops) => {
   const [showCommentModel, setShowCommentModel] = React.useState(false)
   const [tweet, setTweet] = React.useState<ITweet | null>(null)

   const handleModelClose = () => {
      setShowCommentModel(false)
      setTweet(null)
   }

   const handleSetTweet = (tweet: any) => {
      setTweet(tweet)
      setShowCommentModel(true)
   }

   return (
      <div>
         <section>
            {loading ? (
               <Spinner size="sm" height="20vh" />
            ) : tweets && tweets.length > 0 ? (
               tweets.map((tweet: ITweet) => (
                  <Tweet key={tweet._id} tweet={tweet} handleSetTweet={handleSetTweet} />
               ))
            ) : (
               <p className="text-center mt-7 alert alert-primary w-md mx-auto">
                  {error ? error : 'No Tweets yet'}
               </p>
            )}
         </section>
         {tweet && (
            <TweetCommentModal
               tweet={tweet}
               showCommentModel={showCommentModel}
               handleModelClose={handleModelClose}
            />
         )}
      </div>
   )
}

export default TweetList

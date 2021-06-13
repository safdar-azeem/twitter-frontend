import Spinner from '../reusable/Spinner'
import TweetExplore from './TweetExplore'
import { ITweet } from '../../types/tweet.type'
import { useGetExploreTweetsQuery } from '../../store/services/tweets.services'

const TweetExploreList = () => {
   const { data, isLoading } = useGetExploreTweetsQuery()

   if (isLoading) return <Spinner height="15vh" />

   const renderTweets = (tweets: ITweet[]) => {
      return (
         tweets.length > 0 &&
         tweets.map((tweet: ITweet) => {
            return <TweetExplore key={tweet._id} tweet={tweet} />
         })
      )
   }

   return (
      <div>
         <main className="px-md-3 gap-3 d-flex">
            <section className="w-50 d-flex flex-column gap-3">
               {data?.tweets && renderTweets(data?.tweets.slice(0, Math.round(data.tweets.length / 2)))}
            </section>
            <div className="w-50 d-flex flex-column gap-3">
               {data?.tweets && renderTweets(data.tweets.slice(Math.round(data?.tweets.length / 2)))}
            </div>
         </main>
      </div>
   )
}

export default TweetExploreList

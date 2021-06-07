import { useParams } from 'react-router'
import TweetList from '../tweet/TweetList'
import { useGetUserMediaTweetsQuery } from '../../store/services/tweets.services'

const UserOnlyMediaTweetList = () => {
   const params = useParams()
   const { id }: any = params
   const { data, isLoading } = useGetUserMediaTweetsQuery(id)

   return (
      <div className="mt-5">
         <TweetList tweets={data?.tweets} loading={isLoading} />
      </div>
   )
}

export default UserOnlyMediaTweetList

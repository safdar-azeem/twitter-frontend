import { useParams } from 'react-router'
import TweetList from '../tweet/TweetList'
import { useGetUserTweetsQuery } from '../../store/services/tweets.services'

const UserTweetList = () => {
   const params = useParams()
   const { id }: any = params
   const { data, isLoading } = useGetUserTweetsQuery(id)

   return (
      <div className="mt-5">
         <div>
            <TweetList tweets={data?.tweets} loading={isLoading} />
         </div>
      </div>
   )
}

export default UserTweetList

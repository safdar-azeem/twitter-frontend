import { useParams } from 'react-router'
import TweetList from '../tweet/TweetList'
import { useGetTweetsLikeByUserQuery } from '../../store/services/tweets.services'

const UserOnlyLikeTweetList = () => {
   const params = useParams()
   const { id }: any = params

   const { data, isLoading } = useGetTweetsLikeByUserQuery(id)

   return (
      <div className="mt-5">
         <TweetList tweets={data?.tweets} loading={isLoading} />
      </div>
   )
}

export default UserOnlyLikeTweetList

import Cookies from 'js-cookie'
import { lazy, useEffect } from 'react'
import { useGetTweetsQuery } from '../../store/services/tweets.services'

const TweetList = lazy(() => import('../../components/tweet/TweetList'))
const TweetCreate = lazy(() => import('../../components/tweet/TweetCreate'))

const Dashboard = () => {
   const { data, error, isLoading } = useGetTweetsQuery()

   useEffect(() => {
      console.log(data)
   }, [data])

   return (
      <div>
         <TweetCreate />
         <div className="mx-md-4 mt-5">
            <TweetList tweets={data?.tweets} loading={isLoading} />
         </div>
      </div>
   )
}

export default Dashboard

import TweetList from '../../components/tweet/TweetList'
import { useGetBookmarksQuery } from '../../store/services/tweets.services'

const Bookmarks = () => {
   const { data, isLoading } = useGetBookmarksQuery()

   return (
      <div>
         <div className="mx-md-4 py-md-5 pt-1">
            <h4 className="fs-21 mb-5">Bookmarks</h4>
            <TweetList tweets={data?.bookmarks} loading={isLoading} error="No Bookmarks yet" />
         </div>
      </div>
   )
}

export default Bookmarks

import Cookies from 'js-cookie'
import {
   useAddBookmarkMutation,
   useLikeTweetMutation,
   useRetweetMutation,
} from '../../store/services/tweets.services'
import { ITweet } from '../../types/tweet.type'

interface TweetActionsProps {
   tweet: ITweet
   isCommentBtnHidden?: boolean
   handleSetTweet: (tweet: ITweet) => void
}

const TweetActions = ({ tweet, handleSetTweet, isCommentBtnHidden }: TweetActionsProps) => {
   const currentUserId = Cookies.get('user_Id')

   const [doLike] = useLikeTweetMutation()
   const [retweet] = useRetweetMutation()
   const [addBookmark, { isLoading: bookmarkLoading }] = useAddBookmarkMutation()

   const handleTweetLike = () => {
      doLike(tweet._id)
   }

   const handleRetweet = () => retweet(tweet._id)

   const handleTweetBookmark = async (tweetId: string) => addBookmark(tweetId)

   return (
      <footer className="d-flex  justify-content-between ">
         <div className="d-flex align-items-center">
            {!isCommentBtnHidden && (
               <div className="me-4 d-flex align-items-center">
                  <button
                     className="btn btn-outline-secondary text-dark text-opacity-50 border-0 me-1px w-40px h-40px center"
                     onClick={() => handleSetTweet(tweet)}>
                     <i className="fa-regular fa-comment fs-18 "></i>
                  </button>
                  <span>{tweet.comments.length > 0 && tweet.comments.length}</span>
               </div>
            )}
            <button
               className="btn btn-outline-secondary text-dark text-opacity-50  me-2px border-0 w-40px h-40px center"
               onClick={handleRetweet}>
               <i
                  className={`fa-solid  fa-retweet fs-18 ${
                     tweet.retweetedBy.includes(currentUserId as string) && 'text-success'
                  } `}></i>
            </button>
            <span className={`${tweet.retweetedBy.includes(currentUserId as string) && 'text-success'}`}>
               {tweet.retweetedBy.length > 0 && tweet.retweetedBy.length}
            </span>
            <button
               className="btn btn-outline-secondary ms-4 text-dark text-opacity-50 border-0 w-40px h-40px center"
               onClick={handleTweetLike}>
               <i
                  className={`fa-${
                     tweet.likes.includes(currentUserId as string) ? 'solid text-danger' : 'regular'
                  }  fa-heart fs-18`}></i>
            </button>
            {tweet.likes.length > 0 && (
               <span
                  className={`${tweet.likes.includes(currentUserId as string) && 'text-danger'} ms-1 mt-1`}>
                  {tweet.likes.length}
               </span>
            )}
         </div>
         <button
            className="btn btn-outline-secondary text-dark text-opacity-50 border-0 w-40px h-40px center"
            onClick={() => handleTweetBookmark(tweet._id)}
            disabled={bookmarkLoading}>
            <i
               className={`fa-${
                  tweet.bookmarks.includes(currentUserId as string) ? 'solid' : 'regular'
               } fa-bookmark fs-18 `}></i>
         </button>
      </footer>
   )
}

export default TweetActions

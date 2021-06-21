import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import stringUtils from '../../utils/string.utils'
import { useDeleteTweetMutation } from '../../store/services/tweets.services'
import { useDeleteTrendMutation } from '../../store/services/trends.services'

interface Iprops {
   userId: string
   userName: string
   tweetId: string
   content: string
}

const TweetActionMenu = ({ userId, userName, tweetId, content }: Iprops) => {
   const currentUserId = Cookies.get('user_Id')
   const [deleteTweet] = useDeleteTweetMutation()
   const [deleteTrend] = useDeleteTrendMutation()

   const handleTweetDelete = async (tweetId: string) => {
      deleteTweet(tweetId)
      const trends = stringUtils.extractTrends(content)
      console.log(trends)
      trends.forEach((trend) => {
         deleteTrend({ trend, tweetId })
      })
   }

   return (
      <div>
         <div className="dropdown">
            <button
               className="btn btn-outline-secondary border-0 text-dark text-opacity-75  h-33px w-33px center"
               type="button"
               id="dropdownMenuButton1"
               data-bs-toggle="dropdown"
               aria-expanded="false">
               <i className="fa-solid fa-ellipsis-vertical fs-17"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
               {currentUserId === userId && (
                  <li className="dropdown-item py-2 cursor" onClick={() => handleTweetDelete(tweetId)}>
                     <i className="fa-solid fa-trash me-3 fs-13"></i>
                     Delete
                  </li>
               )}
               <Link className="dropdown-item py-2 cursor" to={`/profile/${userId}`}>
                  <i className="fa-solid fa-user me-3 fs-14"></i>
                  {userName.split(' ')[0]}
               </Link>
            </ul>
         </div>
      </div>
   )
}

export default TweetActionMenu

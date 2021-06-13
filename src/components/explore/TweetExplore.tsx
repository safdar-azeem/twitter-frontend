import { Link } from 'react-router-dom'
import { ITweet } from '../../types/tweet.type'
import stringUtils from '../../utils/string.utils'

interface Iprops {
   tweet: ITweet
}

const TweetExplore = ({ tweet }: Iprops) => {
   return (
      <div className="w-100">
         <Link to={`/tweet/${tweet._id}`} className="cursor">
            {tweet.content && (
               <p
                  className={`fs-14 ${
                     !tweet.photo ? 'bg-secondary bg-opacity-50 p-4 rounded-2' : 'mb-10px ps-5px'
                  } `}>
                  {stringUtils.heighLightTrends(tweet.content)}
               </p>
            )}
            {tweet.photo && <img src={tweet.photo} className="w-100 rounded-2" alt="" />}
         </Link>
      </div>
   )
}

export default TweetExplore

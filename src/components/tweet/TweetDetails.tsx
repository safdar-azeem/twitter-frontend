import { Link } from 'react-router-dom'
import { ITweet } from '../../types/tweet.type'
import stringUtils from '../../utils/string.utils'

interface Iprops {
   tweet: ITweet
}

const TweetDetails = ({ tweet }: Iprops) => {
   return (
      <Link to={`/tweet/${tweet._id}`}>
         <main className="px-1 my-3 w-100">
            <p>{stringUtils.heighLightTrends(tweet.content)}</p>
            {tweet.photo && (
               <img
                  src={tweet.photo}
                  className="w-100 object-contain bg-secondary  rounded mt-1"
                  style={{ maxHeight: '500px' }}
                  alt=""
               />
            )}
         </main>
      </Link>
   )
}

export default TweetDetails

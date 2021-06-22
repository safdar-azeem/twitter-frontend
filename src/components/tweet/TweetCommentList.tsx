import TweetComment from './TweetComment'
import { IComment } from '../../types/comment.type'

const TweetCommentList = ({ comments }: { comments: IComment[] | undefined }) => {
   return (
      <div>
         <h4>Comments {comments?.length} </h4>
         {comments &&
            comments?.length > 0 &&
            comments?.map((comment: IComment) => (
               <div key={comment._id}>
                  <TweetComment comment={comment} />
               </div>
            ))}
      </div>
   )
}

export default TweetCommentList

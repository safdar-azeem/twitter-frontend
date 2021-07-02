import Cookies from 'js-cookie'
import { lazy, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../../components/reusable/Spinner'
import { useAddCommentMutation, useFindTweetByIdQuery } from '../../store/services/tweets.services'

const TweetContent = lazy(() => import('../../components/tweet/Tweet'))
const TweetCommentList = lazy(() => import('../../components/tweet/TweetCommentList'))
const TweetCommentCreate = lazy(() => import('../../components/tweet/TweetCommentCreate'))

const Tweet = () => {
   const { id } = useParams()
   const navigate = useNavigate()

   const [content, setContent] = useState('')
   const [commentAction] = useAddCommentMutation()
   const { data, isLoading, isError, error, isSuccess } = useFindTweetByIdQuery(id as string)

   const tweet = useMemo(() => {
      const tweet = data && data?.tweet
      if (isSuccess && !tweet) {
         navigate('/')
      }
      return tweet
   }, [data, isSuccess])

   const handleChange = (e: any) => {
      setContent(e.target.value)
   }

   const handleAddComment = async () => {
      const data = {
         content,
         tweetId: tweet?._id as string,
         userId: Cookies.get('user_Id') as string,
      }
      commentAction(data)
      setContent('')
   }

   if (isLoading) return <Spinner size="sm" height="10vw" />

   if (isError)
      return <div className="center mt-5 fs-17 alert alert-danger w-md mx-auto">{String(error)} ☹️</div>

   return (
      <div className="px-md-4 pt-lg-5 pt-md-3">
         {tweet && <TweetContent tweet={tweet} isCommentBtnHidden={true} />}
         <footer className="mt-3">
            <TweetCommentCreate handleChange={handleChange} content={content} />
            <div className="d-flex justify-content-end  pb-4 mb-5 mt-4 border-bottom">
               <div>
                  <button className="btn ms-4 btn-dark" onClick={handleAddComment} disabled={false}>
                     Comment
                  </button>
               </div>
            </div>
            <TweetCommentList comments={tweet?.comments} />
         </footer>
      </div>
   )
}

export default Tweet

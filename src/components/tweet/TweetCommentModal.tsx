import React from 'react'
import Tweet from './Tweet'
import Cookies from 'js-cookie'
import Spinner from '../reusable/Spinner'
import { Button, Modal } from 'react-bootstrap'
import { ITweet } from '../../types/tweet.type'
import TweetCommentCreate from './TweetCommentCreate'
import { useAddCommentMutation } from '../../store/services/tweets.services'

interface Iprops {
   tweet: ITweet
   handleModelClose: any
   showCommentModel: boolean
}

const TweetCommentModal = ({ tweet, showCommentModel, handleModelClose }: Iprops) => {
   const [content, setContent] = React.useState('')
   const [commentAction, { isLoading }] = useAddCommentMutation()

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
      handleModelClose()
   }

   return (
      <div>
         <Modal show={showCommentModel} onHide={handleModelClose} dialogClassName="mw-lg">
            <Modal.Header closeButton>
               <Modal.Title>Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Tweet tweet={tweet} />
               <TweetCommentCreate handleChange={handleChange} content={content} />
            </Modal.Body>
            <Modal.Footer className="border-0">
               <Button variant="secondary" onClick={handleModelClose}>
                  Close
               </Button>
               <Button
                  variant="dark"
                  onClick={handleAddComment}
                  disabled={isLoading || !content}
                  className="ms-3">
                  {isLoading ? <Spinner size="xsm" /> : 'Add Comment'}
               </Button>
            </Modal.Footer>
         </Modal>
      </div>
   )
}

export default TweetCommentModal

import moment from 'moment'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import Avatar from '../reusable/Avatar'
import TweetActions from './TweetActions'
import TweetDetails from './TweetDetails'
import { ITweet } from '../../types/tweet.type'
import TweetActionMenu from './TweetActionMenu'
import React, { useMemo, useState } from 'react'
import { useMeQuery } from '../../store/services/auth.services'
import { useLazyFindUserByIdQuery } from '../../store/services/users.services'

interface Iprops {
   tweet: ITweet
   handleSetTweet?: any
   isCommentBtnHidden?: boolean
}

const Tweet = ({ tweet, handleSetTweet, isCommentBtnHidden }: Iprops) => {
   const currentUserId = Cookies.get('user_Id')
   const { data } = useMeQuery()
   const currentUser = useMemo(() => data?.user, [data])
   const [whoRetweeted, setWhoRetweeted] = useState('')
   const [findUserById] = useLazyFindUserByIdQuery()

   const isCurrentUserInRetweets = () => tweet.retweetedBy.includes(currentUserId as string)

   React.useEffect(() => {
      setWhoRetweeted('')
      if (tweet.retweetedBy.length > 0) {
         if (isCurrentUserInRetweets()) {
            setWhoRetweeted('You')
            return
         }
         currentUser?.following.forEach(async (followingId: string) => {
            if (tweet.retweetedBy.includes(followingId)) {
               const data = await findUserById(followingId)
               setWhoRetweeted(data?.data?.user.name as string)
            }
         })
      }
   }, [tweet])

   return (
      <section className="border-bottom pb-4 mb-4">
         <header className="d-flex w-100">
            <Link to={`/profile/${tweet.user._id}`}>
               <Avatar avatar={tweet.user.avatar} />
            </Link>
            <section className="d-flex w-100 justify-content-between align-items-start">
               <section>
                  <div className="mb-1px d-flex">
                     <Link to={`/profile/${tweet.user._id}`} className="fw-bold me-3 fs-16 mb-0">
                        {tweet.user.name}
                     </Link>
                     {whoRetweeted && (
                        <div className="text-dark text-opacity-75 mt-2px">
                           <i className="fa-solid fw-bold fa-retweet fs-13"></i>
                           <span className="fs-13 ms-1 fw-bold">{whoRetweeted} Retweeted</span>
                        </div>
                     )}
                  </div>
                  <span className="fs-13 text-dark text-opacity-75 me-2">
                     {moment(tweet.createdAt).fromNow()}
                  </span>
                  <i
                     className={`fa-solid ${
                        tweet.is_Public ? ' fa-globe' : ' fa-lock'
                     }  fs-12 text-dark text-opacity-50 `}></i>
               </section>
               <TweetActionMenu
                  userId={tweet.user._id}
                  content={tweet.content}
                  userName={tweet.user.name}
                  tweetId={tweet._id}
               />
            </section>
         </header>
         <footer className="w-100 ps-sm-7">
            <TweetDetails tweet={tweet} />
            <TweetActions
               tweet={tweet}
               isCommentBtnHidden={isCommentBtnHidden}
               handleSetTweet={handleSetTweet}
            />
         </footer>
      </section>
   )
}

export default Tweet

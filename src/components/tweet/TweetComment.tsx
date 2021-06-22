import moment from 'moment'
import { Link } from 'react-router-dom'
import Avatar from '../reusable/Avatar'
import { IComment } from '../../types/comment.type'

interface Iprops {
   comment: IComment
}

const TweetComment = ({ comment }: Iprops) => {
   return (
      <div className="d-flex py-3  border-bottom">
         <Link to={`/profile/${comment.user._id}`}>
            <Avatar avatar={comment.user.avatar} />
         </Link>
         <main>
            <div className="d-flex">
               <div>
                  <div className="mb-1px d-flex">
                     <Link to={`/profile/${comment.user._id}`} className="fw-bold me-3 fs-16 mb-0">
                        {comment.user.name}
                     </Link>
                  </div>
                  <span className="fs-13 text-dark text-opacity-75 me-2">
                     {moment(comment.createdAt).fromNow()}
                  </span>
               </div>
            </div>
            <main className="py-3">{comment.content}</main>
            {/* <footer className='d-flex  justify-content-between '>
					<div className='d-flex align-items-center'>
						<button className='btn btn-outline-secondary text-dark text-opacity-50 border-0 me-1px w-40px h-40px center'>
							<i className='fa-regular fa-comment fs-18 '></i>
						</button>
						<span>
							{comment.replies.length > 0 &&
								comment.replies.length}
						</span>
						<button className='btn btn-outline-secondary ms-4 text-dark text-opacity-50 border-0 w-40px h-40px center'>
							<i
								className={`fa-${
									comment.likes.includes(currentUserId)
										? 'solid text-danger'
										: 'regular'
								}  fa-heart fs-18`}></i>
						</button>
						{comment.likes.length > 0 && (
							<span
								className={`${
									comment.likes.includes(currentUserId) &&
									'text-danger'
								} ms-1 mt-1`}>
								{comment.likes.length}
							</span>
						)}
					</div>
					<button className='btn btn-outline-secondary text-dark text-opacity-50 border-0 w-40px h-40px center'>
						<i className='fa-solid fa-arrow-up-from-bracket fs-18 '></i>
					</button>
				</footer> */}
         </main>
      </div>
   )
}

export default TweetComment

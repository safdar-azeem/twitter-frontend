import { useMemo } from 'react'
import { useMeQuery } from '../../store/services/auth.services'
import Avatar from '../reusable/Avatar'

interface Iprops {
   handleChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
   content?: string
}

const TweetCommentCreate = ({ handleChange, content }: Iprops) => {
   const { data } = useMeQuery()
   const currentUser = useMemo(() => data?.user, [data])
   return (
      <div className="d-flex align-items-start mt-3">
         <Avatar avatar={currentUser?.avatar} />
         <textarea
            className="form-control mt-1 fs-17 border-0 ps-0 h-40px"
            placeholder="Write a comment..."
            onChange={handleChange}
            value={content}></textarea>
      </div>
   )
}

export default TweetCommentCreate

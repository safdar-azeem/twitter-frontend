import Avatar from '../reusable/Avatar'
import { Link } from 'react-router-dom'
import { IUser } from '../../types/user.type'

interface Iprops {
   user: IUser
}

const SearchUserItem = ({ user }: Iprops) => {
   return (
      <Link
         to={`/profile/${user._id}`}
         className={`d-flex ${!user.bio && 'align-items-center'} cursor hover-bg-secondary p-3 rounded-2`}>
         <Avatar avatar={user.avatar} />
         <div>
            <p className="mb-0 fw-medium">{user.name}</p>
            <small className="mt-2px fs-13">{user.bio}</small>
         </div>
      </Link>
   )
}
export default SearchUserItem

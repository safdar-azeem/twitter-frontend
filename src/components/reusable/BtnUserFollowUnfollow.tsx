import Cookies from 'js-cookie'
import { IUser } from '../../types/user.type'
import { useFollowUserMutation } from '../../store/services/users.services'

interface Iprops {
   user: IUser
}

const BtnUserFollowUnfollow = ({ user }: Iprops) => {
   const currentUserId = Cookies.get('user_Id')

   const [followUser] = useFollowUserMutation()
   const handleFollowUser = () => followUser(user._id)
   const isCurrentUserInFollowers = () => user.followers.includes(currentUserId as string)

   return (
      <button
         className={`btn ${
            isCurrentUserInFollowers() ? 'btn-outline-secondary text-dark border-dark' : 'btn-dark'
         } btn-sm`}
         onClick={handleFollowUser}>
         {isCurrentUserInFollowers() ? 'Unfollow' : 'Follow'}
      </button>
   )
}

export default BtnUserFollowUnfollow

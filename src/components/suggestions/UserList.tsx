import UserListItem from './UserListItem'
import { IUser } from '../../types/user.type'

interface Iprops {
   users: IUser[] | undefined
}

const UserList = ({ users }: Iprops) => {
   return (
      <div>
         {users &&
            users.length > 0 &&
            users.map((user: IUser) => {
               return <UserListItem user={user} key={user._id} />
            })}
      </div>
   )
}

export default UserList

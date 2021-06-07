import moment from 'moment'
import { IUser } from '../../types/user.type'

interface Iprops {
   user: IUser
}

const UserInformation = ({ user }: Iprops) => {
   return (
      <div>
         <div className="mt-4">
            <h3>{user?.name}</h3>
            <p>{user?.bio}</p>
            <section className="d-flex flex-wrap mt-4">
               {user.location && (
                  <div className="me-6 mb-4">
                     <i className="fa-solid fa-location-pin me-2"></i>
                     <span>{user?.location}</span>
                  </div>
               )}
               {user?.website && (
                  <div className="me-6 mb-4">
                     <i className="fa-solid fa-link me-2"></i>
                     <a href={user?.website} target="_blank">
                        {user?.website}
                     </a>
                  </div>
               )}
               {user?.date_Of_birth && (
                  <div className="me-6 mb-4">
                     <i className="fa-solid fa-clock me-2"></i>
                     <span>Born {moment(user?.date_Of_birth).format('LL')}</span>
                  </div>
               )}
               {user?.date_Created && (
                  <div className="me-6 mb-4">
                     <i className="fa-solid fa-calendar-days me-2"></i>
                     <span>Joined {moment(user?.date_Created).format('MMM YYYY')}</span>
                  </div>
               )}
            </section>

            <section className="mt-2">
               <span className="me-3">
                  <b>{user?.following.length}</b> Following
               </span>
               <span>
                  <b>{user?.followers.length}</b> Followers
               </span>
            </section>
         </div>
      </div>
   )
}

export default UserInformation

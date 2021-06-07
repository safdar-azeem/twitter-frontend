import React from 'react'
import { IUser } from '../../types/user.type'
import { useFollowUserMutation } from '../../store/services/users.services'
import EditProfileModel from '../../components/Profile/EditProfileModel.profile'

interface Iprops {
   profileUser: IUser
   currentUser: IUser
}

const ProfileCover = ({ profileUser, currentUser }: Iprops) => {
   const [followUser] = useFollowUserMutation()

   const handleFollowUser = (id: string) => {
      followUser(id)
   }

   const [show, setShow] = React.useState(false)

   const handleClose = () => setShow(false)
   const handleShow = () => setShow(true)

   const isCurrentUserInFollowers = () => profileUser.followers.includes(currentUser._id)

   return (
      <>
         <div className="position-relative">
            <div>
               {profileUser.cover ? (
                  <img src={profileUser.cover} className="w-100 h-sm bg-secondary object-cover" alt="" />
               ) : (
                  <div className="w-100 h-sm bg-secondary"></div>
               )}
            </div>

            <div className="position-relative" style={{ marginTop: '-50px', zIndex: '2' }}>
               <div>
                  {profileUser.avatar ? (
                     <img
                        src={profileUser.avatar}
                        className="h-122px border border-white   border-4 w-122px rounded-circle"
                        alt=""
                     />
                  ) : (
                     <div className="h-122px border border-white bg-secondary center text-dark text-opacity-50 border-4 w-122px rounded-circle">
                        <i className="fa-solid fa-user fs-30"></i>
                     </div>
                  )}
               </div>

               {currentUser && currentUser._id === profileUser._id ? (
                  <button
                     className="btn btn-outline-secondary text-dark  float-end"
                     style={{ marginTop: '-55px', marginRight: '20px' }}
                     onClick={handleShow}>
                     Edit Profile
                  </button>
               ) : (
                  <button
                     className={`${
                        isCurrentUserInFollowers() ? 'btn-outline-secondary text-dark' : 'btn-dark text-white'
                     } btn px-4  float-end `}
                     style={{ marginTop: '-55px', marginRight: '20px' }}
                     onClick={() => handleFollowUser(profileUser._id)}>
                     {isCurrentUserInFollowers() ? 'Unfollow' : 'Follow'}
                  </button>
               )}
            </div>
         </div>
         <EditProfileModel user={profileUser} handleClose={handleClose} show={show} />
      </>
   )
}

export default ProfileCover

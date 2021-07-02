import { lazy, useEffect } from 'react'
import { useParams } from 'react-router'
import { Outlet } from 'react-router-dom'
import { useMeQuery } from '../../store/services/auth.services'
import { useFindUserByIdQuery } from '../../store/services/users.services'
const NavigationsTweet = lazy(() => import('../../components/Profile/NavigationsTweet'))
const ProfileCover = lazy(() => import('../../components/Profile/ProfileCover.profile'))
const UserInformation = lazy(() => import('../../components/Profile/UserInformation.profile'))

const Profile = () => {
   const params = useParams()
   const { id }: any = params

   const { data: profileUserData, isLoading, error, isError } = useFindUserByIdQuery(id)
   const { data: currentUserData, isLoading: currentUserLoading } = useMeQuery()

   if (isLoading || currentUserLoading) return <div>Loading...</div>
   if (error) return <div className="vh-50 center">{JSON.stringify(error)}</div>

   return (
      <div className="px-md-4">
         {currentUserData && profileUserData && (
            <div>
               <ProfileCover currentUser={currentUserData?.user} profileUser={profileUserData?.user} />
               <UserInformation user={profileUserData.user} />
               <NavigationsTweet id={id} />
               <div className="mt-4">
                  <Outlet />
               </div>
            </div>
         )}
      </div>
   )
}

export default Profile

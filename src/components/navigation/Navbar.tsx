import { useMemo } from 'react'
import BtnLogOut from '../reusable/BtnLogOut'
import { IUser } from '../../types/user.type'
import NavigationsList from '../navigation/NavigationsList'
import { useMeQuery } from '../../store/services/auth.services'
import NavigationDropdown from '../navigation/NavigationDropdown'
import { useCountUnreadNotificationsQuery } from '../../store/services/notification.services'

const Navbar = () => {
   const { data } = useMeQuery()
   const currentUser = useMemo<IUser>(() => data?.user as IUser, [data])

   useCountUnreadNotificationsQuery('', {
      pollingInterval: 5000,
      refetchOnMountOrArgChange: true,
      skip: false,
   })

   return (
      <section className="w-100 vh-lg-100 py-lg-0 py-3 px-lg-0 px-4">
         <main className="d-flex flex-lg-column justify-content-between h-100">
            <NavigationsList currentUser={currentUser} />
            <BtnLogOut />
            <div className="dropdown d-lg-none d-inline">
               <NavigationDropdown currentUser={currentUser} />
            </div>
         </main>
      </section>
   )
}

export default Navbar

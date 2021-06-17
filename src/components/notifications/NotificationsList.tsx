import React from 'react'
import Spinner from '../../components/reusable/Spinner'
import { INotification } from '../../types/notification.type'
import NotificationItem from '../../components/notifications/NotificationItem'
import {
   useGetNotificationsQuery,
   useMarkAsSeenNotificationMutation,
} from '../../store/services/notification.services'

const NotificationsList = () => {
   const [markAsSeenNotification] = useMarkAsSeenNotificationMutation()
   const { data, isLoading } = useGetNotificationsQuery()

   React.useEffect(() => {
      markAsSeenNotification()
   }, [])

   return (
      <main>
         {isLoading && <Spinner height="20vh" />}
         {!isLoading && data && data?.notifications.length === 0 && (
            <p className="text-center fs-17 mt-6">No notifications yet</p>
         )}
         {!isLoading && data && data.notifications.length > 0 && (
            <ul className="list-group">
               {data?.notifications.map((notification: INotification) => (
                  <NotificationItem key={notification._id} notification={notification} />
               ))}
            </ul>
         )}
      </main>
   )
}

export default NotificationsList

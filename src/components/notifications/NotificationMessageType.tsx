import { INotification } from '../../types/notification.type'

interface Iprops {
   notification: INotification
}

const NotificationMessageType = ({ notification }: Iprops) => {
   const messages = {
      follow: 'followed you',
      like: 'liked your post',
      retweet: 'retweeted your post',
      comment: 'commented on your post',
      mention: 'mentioned you in a post',
   }

   return <div className="mb-0 fs-14 me-3"> {messages[notification.type]}</div>
}

export default NotificationMessageType

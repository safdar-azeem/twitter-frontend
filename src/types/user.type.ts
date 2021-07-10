import { ITweet } from './tweet.type'

export interface IUser {
   _id: string
   bio: string
   name: string
   email: string
   cover: string
   avatar: string
   website: string
   password: string
   location: string
   date_Created: Date
   is_Verified: boolean
   date_Of_birth: string
   tweets: Array<ITweet>
   total_Messages: number
   following: Array<string>
   followers: Array<string>
   bookmarks: Array<ITweet>
   total_Notifications: number
}

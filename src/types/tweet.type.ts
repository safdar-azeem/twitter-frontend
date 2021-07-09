import { IComment } from './comment.type'
import { IUser } from './user.type'

export interface ITweet {
   _id: string
   content: string
   photo: string
   user: IUser
   createdAt: Date
   updatedAt: Date
   likes: Array<string>
   comments: Array<IComment>
   retweetedBy: Array<string>
   is_Public: boolean
   is_Pinned: boolean
   bookmarks: Array<string>
   isRetweeted: boolean
}

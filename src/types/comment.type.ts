import { ITweet } from './tweet.type'
import { IUser } from './user.type'

export interface IComment {
	_id: string
	content: string
	user: IUser
	tweet: ITweet
	createdAt: Date
	updatedAt: Date
	likes: Array<IUser>
	replies: Array<IComment>
	is_Pinned: boolean
}

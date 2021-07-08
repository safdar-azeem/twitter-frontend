import { ITweet } from './tweet.type'

export interface ITrend {
	_id: string
	name: string
	createdAt: Date
	count: number
	tweets: ITweet[]
}

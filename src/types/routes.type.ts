export interface IRoute {
	path: string
	element: React.ComponentType<any>
	exact?: boolean
	childrens?: IRoute[]
}

export enum Routes {
	Home = '/',
	Login = '/login',
	SignUp = '/signup',
	Tweet = '/tweet/:id',
	Explore = '/explore',
	Dashboard = '/dashboard',
	Bookmarks = '/Bookmarks',
	Trends = '/trends/:slug',
	Profile = '/profile/:id/',
	Notfication = '/notifications',
	UserOnlyLikeTweetList = '/likes',
	UserOnlyMediaTweetList = '/media',
}

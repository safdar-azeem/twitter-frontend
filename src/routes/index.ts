import { lazy } from 'react';
import { IRoute, Routes } from '../interfaces/routes/routes.types';

export const secureRoutes: IRoute[] = [
	{
		path: Routes.Home,
		element: lazy(() => import('../pages/secure/Home')),
		childrens: [
			{
				path: Routes.Home,
				element: lazy(() => import('../pages/secure/Dashboard')),
			},
			{
				path: Routes.Profile,
				element: lazy(() => import('../pages/secure/Profile')),
				childrens: [
					{
						path: '/',
						element: lazy(() => import('../components/Profile/ProfileTweets.profile')),
					},
					{
						path: Routes.ProfileMedia,
						element: lazy(() => import('../components/Profile/ProfileMedia.profile')),
					},
					{
						path: Routes.ProfileLikes,
						element: lazy(() => import('../components/Profile/ProfileLikes.profile')),
					},
				],
			},
			{
				path: Routes.Tweet,
				element: lazy(() => import('../pages/secure/Tweet')),
			},
			{
				path: Routes.Bookmarks,
				element: lazy(() => import('../pages/secure/Bookmarks')),
			},
			{
				path: Routes.Trends,
				element: lazy(() => import('../pages/secure/Trends')),
			},
			{
				path: Routes.Notfication,
				element: lazy(() => import('../pages/secure/Notification')),
			},
			{
				path: Routes.Explore,
				element: lazy(() => import('../pages/secure/Explore')),
			},
		],
	},
];

export const authRoutes: IRoute[] = [
	{
		path: Routes.Home,
		element: lazy(() => import('../pages/auth/Register')),
		childrens: [
			{
				path: Routes.Home,
				element: lazy(() => import('../pages/auth/Login')),
			},
			{
				path: Routes.SignUp,
				element: lazy(() => import('../pages/auth/SignUp')),
			},
		],
	},
];

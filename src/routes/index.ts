import { lazy } from 'react'
import { IRoute, Routes } from '../types/routes.type'

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
                  element: lazy(() => import('../components/Profile/UserTweetList')),
               },
               {
                  path: Routes.UserOnlyMediaTweetList,
                  element: lazy(() => import('../components/Profile/UserOnlyMediaTweetList')),
               },
               {
                  path: Routes.UserOnlyLikeTweetList,
                  element: lazy(() => import('../components/Profile/UserOnlyLikeTweetList')),
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
]

export const authRoutes: IRoute[] = [
   {
      path: Routes.Home,
      element: lazy(() => import('../pages/auth/Auth')),
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
]

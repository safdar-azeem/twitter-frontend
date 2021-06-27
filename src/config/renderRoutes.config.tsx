import { IRoute } from '../types/routes.type'
import { Route } from 'react-router-dom'

const renderRoutes = (routes: IRoute[]) => {
   return routes.map((route: IRoute, index: number) => {
      return (
         <Route path={route.path} key={index} element={<route.element />}>
            {route.childrens && route.childrens.length > 0 && renderNestedRoutes(route.childrens)}
         </Route>
      )
   })
}

export const renderNestedRoutes = (routes: IRoute[]) => {
   return routes.map((route: IRoute, index: number) => {
      const path = route.path.startsWith('/') ? route.path.slice(1) : route.path
      return (
         <Route path={path} key={index} element={<route.element childRoutes={route.childrens} />}>
            {route.childrens && route.childrens.length > 0 && renderNestedRoutes(route.childrens)}
         </Route>
      )
   })
}

export default renderRoutes

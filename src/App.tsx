import Cookies from 'js-cookie'
import React, { useMemo } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Spinner from './components/reusable/Spinner'
import { authRoutes, secureRoutes } from './routes'
import renderRoutes from './config/renderRoutes.config'
import { useLazyMeQuery } from './store/services/auth.services'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

const App = () => {
   const [getMe, { isLoading, data, isError }] = useLazyMeQuery()

   const isAuthenticated = useMemo(() => {
      return !isError && !isLoading && !!data && !!data.user
   }, [data, isError, isLoading])

   React.useEffect(() => {
      const token = Cookies.get('token')
      if (token) getMe()
   }, [])

   if (isLoading) return <Spinner height="80vh"></Spinner>

   return (
      <>
         <Router>
            <Routes>
               {renderRoutes(isAuthenticated ? secureRoutes : authRoutes)}
               <Route path="*" element={<h1>404</h1>} />
            </Routes>
         </Router>
         <ToastContainer />
      </>
   )
}

export default App

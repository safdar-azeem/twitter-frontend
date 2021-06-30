import { lazy } from 'react'
import { Outlet } from 'react-router-dom'
const Navbar = lazy(() => import('../../components/navigation/Navbar'))
const SideBar = lazy(() => import('../../components/sidebar/SideBar'))

const Home = () => {
   return (
      <div>
         <section className="container">
            <div className="row gx-0">
               <aside className="col-xl-2 col-lg-1 col-12 border-end-md">
                  <div className="w-100 position-relative">
                     <div
                        className="position-fixed borde  px-lg-0 px-md-4 px-2 w-lg-auto w-100 left-lg-0 bg-white"
                        style={{ zIndex: '10' }}>
                        <Navbar />
                     </div>
                  </div>
               </aside>

               <main className="col-xl-6 col-lg-7  col-md-7 col-12">
                  <div className="rounded-3 rounded-lg-0 min-vh-100 my-lg-0 my-9">
                     <Outlet />
                  </div>
               </main>

               <aside className="col-xl-4 col-lg-4 col-md-5 col-12 border-start">
                  <div className="d-md-block d-none">
                     <SideBar />
                  </div>
               </aside>
            </div>
         </section>
      </div>
   )
}

export default Home

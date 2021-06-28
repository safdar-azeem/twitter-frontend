import { Outlet } from 'react-router-dom'

const Register = () => {
   return (
      <div className="bg-dark bg-opacity-35 py-7 min-vh-100">
         <section className="w-md-xl2 w-sm-lg2 w-md2  bg-white shadow-lg mx-auto  p-6 px-md-9  rounded-3">
            <div className="text-center mb-5">
               <i className="fa-brands fa-twitter fs-39"></i>
            </div>
            <aside className="col">
               <Outlet />
            </aside>
         </section>
      </div>
   )
}

export default Register

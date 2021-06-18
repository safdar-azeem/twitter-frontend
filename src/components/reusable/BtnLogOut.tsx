import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../../store/services/auth.services'

interface Iprops {
   displayInDropDown?: boolean
}

const BtnLogOut = ({ displayInDropDown }: Iprops) => {
   const navigate = useNavigate()
   const [logout] = useLogoutMutation()

   const handleLogOut = () => {
      Cookies.remove('token')
      Cookies.remove('user_Id')
      localStorage.removeItem('user')
      logout()
      navigate('/')
   }

   return (
      <div>
         <button
            className={` btn bg-secondary mb-lg-4 w-100 ${
               displayInDropDown ? 'w-100 py-2 rounded-0 rounded-bottom mt-1' : 'd-lg-flex d-none py-3'
            } justify-content-center align-items-center me-xl-2 btn-lg   me-1`}
            onClick={handleLogOut}>
            <i className="fa-solid fa-arrow-right-from-bracket mt-1 me-xl-3  fs-18"></i>
            <span className="mt-1 fs-17 d-xl-inline d-none">Log Out</span>
         </button>
      </div>
   )
}

export default BtnLogOut

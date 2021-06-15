import { useMemo } from 'react'
import CustomLink from './CustomLink'
import Avatar from '../reusable/Avatar'
import BtnLogOut from '../reusable/BtnLogOut'
import navigationsJson from '../../jsons/navigations.json'
import { useMeQuery } from '../../store/services/auth.services'
import { IUser } from '../../types/user.type'

const NavigationDropdown = ({ currentUser }: { currentUser: IUser }) => {
   return (
      <div>
         <button
            type="button"
            aria-expanded="false"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            className="btn pt-3 h-42px w-42px center">
            <Avatar avatar={currentUser?.avatar} />
         </button>
         <ul className="dropdown-menu pb-0 top-10px" aria-labelledby="dropdownMenuButton1">
            {navigationsJson
               .filter((item) => item.hideOnMd)
               .map((item, index) => {
                  return (
                     <li key={index} className="dropdown-item fs-18 py-2px">
                        <CustomLink iconSize="fs-17" link={item} meID={currentUser?._id} />
                     </li>
                  )
               })}
            <BtnLogOut displayInDropDown={true} />
         </ul>
      </div>
   )
}

export default NavigationDropdown

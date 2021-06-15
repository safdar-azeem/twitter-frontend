import CustomLink from './CustomLink'
import navigationsJson from '../../jsons/navigations.json'
import { IUser } from '../../types/user.type'

const NavigationsList = ({ currentUser }: { currentUser: IUser }) => {
   return (
      <ul className="nav py-lg-5 flex-lg-column">
         {navigationsJson.map((item, index) => {
            return (
               <li
                  key={index}
                  className={`nav-item py-1 mb-lg-2 hover-bg-secondary rounded-lg-7 rounded-2 ${
                     item.hideOnMd
                        ? 'd-lg-inline d-none'
                        : 'w-lg-auto h-lg-auto w-47px me-lg-0 me-3 h-47px d-lg-inline d-flex justify-content-center align-items-center '
                  } `}>
                  {<CustomLink iconSize="fs-20" link={item} meID={currentUser?._id} />}
               </li>
            )
         })}
      </ul>
   )
}

export default NavigationsList

import { memo } from 'react'
import { Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Spinner from '../reusable/Spinner'
import { IUser } from '../../types/user.type'
import UserList from '../suggestions/UserList'
import { IRootState } from '../../types/store/IRootState.type'

interface Iprops {
   user: IUser
   type: string
   page: number
   show: boolean
   totalPages: number
   nextPage: () => void
   handleClose: () => void
}

const UserPeopleModel = ({ handleClose, show, totalPages, page, type, nextPage }: Iprops) => {
   const { userPeople, loading, error } = useSelector((state: IRootState) => state.userPeople)
   return (
      <div>
         <Modal show={show} onHide={handleClose} dialogClassName="mw-sm modal-dialog-scrollable">
            <Modal.Header closeButton>
               <Modal.Title className="text-capitalize">{type}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-2">
               {loading ? (
                  <Spinner height="15vh" />
               ) : userPeople.length === 0 ? (
                  <p className="text-center my-4">{error ? error : `No ${type} yet`}</p>
               ) : (
                  <UserList users={userPeople} />
               )}
               {totalPages > 1 && totalPages !== page && (
                  <div className="center my-3" onClick={nextPage}>
                     <button className="btn py-7px fs-13 btn-dark">Load More </button>
                  </div>
               )}
            </Modal.Body>
         </Modal>
      </div>
   )
}

export default memo(UserPeopleModel)

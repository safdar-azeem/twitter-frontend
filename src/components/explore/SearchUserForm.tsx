import React from 'react'
import { toast } from 'react-toastify'
import Spinner from '../reusable/Spinner'
import axios from '../../config/axios.config'
import { IUser } from '../../types/user.type'
import SearchUsersList from './SearchUsersList'

const SearchUserForm = () => {
   const [users, setUsers] = React.useState<IUser[]>([])
   const [loading, setLoading] = React.useState(false)
   const [search, setSearch] = React.useState('')
   const [error, setError] = React.useState('')

   const findUsersByName = async (name: string) => {
      try {
         setLoading(true)
         setError('')
         const res = await axios.get(`/user/findUsersByName/${name}`)
         const data = await res.data
         setUsers(data.users)
         data.users.length === 0 && setError('No users found')
         setLoading(false)
      } catch (err: any) {
         setError('')
         toast.error(err.response.data.message)
         setLoading(false)
      }
   }

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const name: string = e.target.value
      setTimeout(() => {
         findUsersByName(name)
      }, 100)
      setSearch(name)
   }

   const handleClear = () => {
      setSearch('')
      setUsers([])
   }

   return (
      <div className="mb-5  position-relative mx-md-3">
         <form className="position-relative">
            <span className="translate-left-middle start-14px">
               <i className="fa-solid fa-magnifying-glass fs-14 text-black-50"></i>
            </span>
            <div>
               <input
                  type="text"
                  className="form-control ps-6"
                  placeholder="Search for a user"
                  value={search}
                  onChange={handleChange}
               />
            </div>
            {(search || users.length > 0) && !loading && (
               <span className="translate-right-middle cursor px-3 py-2 end-7px" onClick={handleClear}>
                  <i className="fa-solid fa-close fs-15 text-black-50"></i>
               </span>
            )}
            {loading && (
               <div className="translate-right-middle end-14px">
                  <Spinner size="xsm" />
               </div>
            )}
         </form>
         {(search || users.length > 0) && <SearchUsersList users={users} error={error} loading={loading} />}
      </div>
   )
}

export default SearchUserForm

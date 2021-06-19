import UserList from './UserList'
import Spinner from '../reusable/Spinner'
import { useGetSuggestedUsersQuery } from '../../store/services/users.services'

const SuggestionsList = () => {
   const { data, isLoading } = useGetSuggestedUsersQuery({ limit: 5, page: 1 })

   return (
      <div className="bg-secondary bg-opacity-25 rounded pt-25px pb-3	 px-2 mt-5">
         <header className="ms-3 mb-2">
            <h5 className="fs-19">Suggestions for you</h5>
         </header>
         <main>
            {isLoading ? <Spinner size="sm" height="8vh" /> : <UserList users={data?.users} />}
            {data?.users.length === 0 && !isLoading && (
               <div className="mt-6 text-center">
                  <p>No suggestions found</p>
               </div>
            )}
         </main>
      </div>
   )
}

export default SuggestionsList

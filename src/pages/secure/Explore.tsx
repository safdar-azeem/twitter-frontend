import { lazy } from 'react'
const SearchUserForm = lazy(() => import('../../components/explore/SearchUserForm'))
const TweetExploreList = lazy(() => import('../../components/explore/TweetExploreList'))

const Explore = () => {
   return (
      <div className="py-md-5 px-md-2 pt-1">
         <SearchUserForm />
         <TweetExploreList />
      </div>
   )
}

export default Explore

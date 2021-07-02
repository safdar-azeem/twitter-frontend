import React from 'react'
import { toast } from 'react-toastify'
import TweetList from '../../components/tweet/TweetList'
import { useNavigate, useParams } from 'react-router-dom'
import SearchTrends from '../../components/trends/SearchTrends'
import { useLazyFindTrendsQuery } from '../../store/services/trends.services'

const Trends = () => {
   const { slug } = useParams()
   const navigate = useNavigate()
   const [search, setSearch] = React.useState(slug)
   const [findTrends, { isLoading, data }] = useLazyFindTrendsQuery()

   const handleSearch = (value: string) => setSearch(value)

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (search) {
         findTrends(search)
         navigate(`/trends/${search}`)
      } else {
         toast.error('Please enter a search term')
      }
   }

   React.useEffect(() => {
      setSearch(slug)
      slug && findTrends(slug)
   }, [slug])

   return (
      <div className="mx-md-4 mt-5">
         <header>
            <SearchTrends search={search} handleSearch={handleSearch} handleSubmit={handleSubmit} />
         </header>
         <div className="mt-6">
            <TweetList
               loading={isLoading}
               tweets={data?.trend?.tweets}
               error="No tweets found for this trend"
            />
         </div>
      </div>
   )
}

export default Trends

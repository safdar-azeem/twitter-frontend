import TrendItem from './TrendItem'
import Spinner from '../reusable/Spinner'
import { ITrend } from '../../types/trend.type'
import { useGetTopTrendsQuery } from '../../store/services/trends.services'

const TrendsList = () => {
   const { data, isLoading } = useGetTopTrendsQuery()

   return (
      <div className="bg-secondary bg-opacity-25 rounded py-4	 px-lg-3 px-2">
         <div className="ms-2">
            <h5 className="fs-19">Trends for you</h5>
         </div>

         <main className="mt-3">
            {isLoading && (
               <div className="mt-5">
                  <Spinner size="sm" />
               </div>
            )}

            {data?.trends &&
               data?.trends?.length > 0 &&
               data?.trends?.map((trend: ITrend) => <TrendItem trend={trend} key={trend._id} />)}

            {data?.trends?.length === 0 && !isLoading && (
               <div className="mt-6 text-center">
                  <p>No trends found</p>
               </div>
            )}
         </main>
      </div>
   )
}

export default TrendsList

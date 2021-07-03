import { getQueryData } from '../../utils/getQueryData'
import UsersApi from '../services/users.services'

export const updateUserAction = (
   dispatch: any,
   state: any,
   userId: string,
   currentUserId: string,
   callback: any
) => {
   const findUserByIdUser = getQueryData(state, 'users', userId, 'user')
   const findCurrentUser = getQueryData(state, 'users', currentUserId, 'user')
   const getSuggestedUsers = getQueryData(state, 'users', 'getSuggestedUsers', 'users')

   if (findUserByIdUser) {
      dispatch(
         UsersApi.util.upsertQueryData('findUserById', userId, {
            user: callback(findUserByIdUser),
            message: '',
         })
      )
   }

   if (findCurrentUser) {
      dispatch(
         UsersApi.util.upsertQueryData('findUserById', currentUserId, {
            user: callback(findCurrentUser),
            message: '',
         })
      )
   }

   if (getSuggestedUsers) {
      dispatch(
         UsersApi.util.upsertQueryData(
            'getSuggestedUsers',
            { page: 1, limit: 5 },
            {
               users: callback(getSuggestedUsers),
               message: '',
            }
         )
      )
   }
}

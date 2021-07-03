import Cookies from 'js-cookie'

export const prepareHeaders = (headers: any) => {
   const token = Cookies.get('token')
   if (token) {
      headers.set('authorization', `Bearer ${token}`)
   }
   return headers
}

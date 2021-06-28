import React from 'react'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import useForm from '../../hooks/useForm'
import { IForm } from '../../types/form.type'
import loginJson from '../../jsons/login.json'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../../components/reusable/Spinner'
import { useLazyMeQuery, useLoginMutation } from '../../store/services/auth.services'

const Login = () => {
   const navigate = useNavigate()
   const [loginAction, loginResult] = useLoginMutation()
   const [getMe, meResult] = useLazyMeQuery()

   const { form, handleChange, doValidate } = useForm(loginJson)

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!doValidate()) return
      loginAction({
         email: form.email.value,
         password: form.password.value,
      })
   }

   React.useEffect(() => {
      const data = loginResult?.data
      if (data) {
         Cookies.set('token', data.token)
         toast.success('Login Successful')
         getMe()
         navigate('/')
      }
   }, [loginResult])

   React.useEffect(() => {
      console.log(meResult)
   }, [meResult])

   return (
      <div>
         <header>
            <h1 className="text-3xl font-bold text-center text-gray-900">Sign in to Twitter</h1>
         </header>
         <section className="mt-6">
            <form onSubmit={handleSubmit}>
               {loginJson.map((field: IForm, index) => {
                  return (
                     <div key={index} className="mb-3">
                        <label htmlFor={field.name} className="form-label">
                           {field.placeholder}
                        </label>
                        <input
                           type={field.type}
                           className="form-control"
                           id={field.name}
                           required={field.required}
                           name={field.name}
                           value={form[field.name].value}
                           onChange={handleChange}
                        />
                        <div className="mt-2 fs-14 text-danger">{form[field.name].error}</div>
                     </div>
                  )
               })}
               <div>
                  <button
                     className="btn btn-lg btn-dark mt-4 w-100 btn-block"
                     disabled={loginResult.isLoading}
                     type="submit">
                     {loginResult.isLoading ? <Spinner size="sm" /> : 'Login'}
                  </button>
               </div>
            </form>
         </section>

         <footer className="mt-5">
            <div className="text-center text-gray-600">
               Don't have an account?{' '}
               <Link to="/signup">
                  <span className="fw-bold fs-17">Sign up</span>
               </Link>
            </div>
         </footer>
      </div>
   )
}

export default Login

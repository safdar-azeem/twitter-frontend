import App from './App'
import ReactDOM from 'react-dom'
import { store } from './store/store'
import './assets/scss/bootstrap.scss'
import { Provider } from 'react-redux'
import React, { Suspense } from 'react'
import Spinner from './components/reusable/Spinner'

ReactDOM.render(
   <React.StrictMode>
      <Provider store={store}>
         <Suspense fallback={<Spinner height="80vh" />}>
            <App />
         </Suspense>
      </Provider>
   </React.StrictMode>,
   document.getElementById('root')
)

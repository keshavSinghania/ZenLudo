import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from '../routes/router.jsx'
import {Provider} from "react-redux"
import { store } from '../ReactRedux/store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <App></App>
  </Provider>
)

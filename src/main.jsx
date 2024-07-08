import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import store from './redux/store'
import { Provider } from 'react-redux'
import Navbar from './components/Navbar'

ReactDOM.createRoot(document.querySelector('body')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Navbar />
    </Provider>
  </React.StrictMode>,
)

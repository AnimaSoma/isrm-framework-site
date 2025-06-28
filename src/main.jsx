
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import ISRMBackground from './components/ISRMBackground'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ISRMBackground />
    <App />
  </React.StrictMode>
)

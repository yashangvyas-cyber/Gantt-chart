import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { initDemo } from './components/demo/demo.js'
import { DEMO } from './data/demo.js'

initDemo(DEMO)   // PROTOTYPE ONLY: the Demo menu's people (src/data/demo.js)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

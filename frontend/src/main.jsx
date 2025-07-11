// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserProvider from '/Users/gautamaggarwal/Desktop/webd_projects/virtualassistant/frontend/src/context/UserContext.jsx' 

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserProvider> 
      <App />
    </UserProvider>
  </BrowserRouter>
)

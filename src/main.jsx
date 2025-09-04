import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { Home } from './Home'
import { LoginPage } from './Login'
import { Contact } from './Contact'
import { SignupPage } from './Signup'
import { ProtectedRoute } from './ProtectedRoute'
import { Dashboard } from './Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path="/dashboard" element={<ProtectedRoute children={<Dashboard />} />}/>
        <Route path='/contact' element={<ProtectedRoute children={<Contact />} />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

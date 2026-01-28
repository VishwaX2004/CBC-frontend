import { GoogleOAuthProvider } from '@react-oauth/google'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminPage from './Pages/AdminPage.jsx'
import HomePage from './Pages/HomePage.jsx'
import Test from './Pages/Test.jsx'
import Loginpage from './Pages/Loginpage.jsx'
import { Toaster } from 'react-hot-toast'
import RegisterPage from './Pages/register.jsx'
import ForgetPassword from './components/forgetPassword.jsx'



function App() {
  return (
    <BrowserRouter>

    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>

      <div className="w-full h-[100vh]">
        <Toaster position="top-right" />

        <Routes path="/">

          <Route path='/*' element={<HomePage/>}/>

          <Route path="/register/*" element={<RegisterPage/>}/>

          <Route path="/forget-password/*" element={<ForgetPassword/>}/>

          <Route path="/login/*" element={<Loginpage/>}/>

          <Route path="/admin/*" element={<AdminPage/>}/>

          <Route path="/test/*" element={<Test/>}/>

        </Routes>

      </div>

      </GoogleOAuthProvider>

    </BrowserRouter>
  )
}

export default App

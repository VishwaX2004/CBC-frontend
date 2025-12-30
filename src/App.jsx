import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductCard from './components/productCard.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminPage from './Pages/AdminPage.jsx'
import HomePage from './Pages/HomePage.jsx'
import Test from './Pages/Test.jsx'

function App() {
  return (
    <BrowserRouter>

      <div className="w-full h-[100vh]">

        <Routes path="/">

          <Route path='/*' element={<HomePage/>}/>

          <Route path="/register/*" element={<h1>Register Page</h1>}/>

          <Route path="/admin/*" element={<AdminPage/>}/>

          <Route path="/test/*" element={<Test/>}/>

        </Routes>

      </div>

    </BrowserRouter>
  )
}

export default App

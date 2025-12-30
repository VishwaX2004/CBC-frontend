import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductCard from './components/productCard.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="h-[700px] w-[700px] border-[5px] flex justify-center items-center relative">
      
      <div className='w-[300px] h-[200px] bg-blue-700 flex justify-center items-center text-[20px] relative'>

        <button className="bg-red-600 absolute top-[0px] right-[0px]">X</button>

        <button className='bg-green-600 text-white fixed bottom-0 right-0 p-[10px] font-bold m-[10px]'>Chat with Whatsapp</button>

        Your Time is over
      </div>

      </div>
    </>
  )
}

export default App

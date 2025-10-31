import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/footer'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
  
        

    <div className='min-h-screen mb-100'>
      
      <Manager/>
    </div>


    

      <Footer/>
       
    </>
  )
}

export default App

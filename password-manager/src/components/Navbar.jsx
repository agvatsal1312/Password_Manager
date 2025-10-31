import React from 'react'

const Navbar = () => {
  return (
    <div className='flex bg-purple-600 justify-between px-10 py-2'>
        <div className='font-bold text-2xl'>
          <span> &lt;</span>
          <span className='text-white'>PASSOP</span>
          <span>/&gt;</span>
        </div>

        {/* <ul >
            <li className='gap-2 flex p-2'>
                <a className= "hover: pointer hover:font-bold"href="">Contact</a>
                <a className= "hover: pointer hover:font-bold"href="">Home</a>
                <a className= "hover: pointer hover:font-bold"href="">About</a>
            </li>

        </ul> */}
        <button className='flex justify-center items-center gap-2 cursor-pointer'>
          <img className = "w-8 py-1" src="/icons/github-sign.png" alt="github" />
          <span className='text-xl font-bold'>Github</span>
        </button>
    </div>
  )
}

export default Navbar   
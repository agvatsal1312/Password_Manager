import React from 'react'

const Footer = () => {
  return (
    <div className='text-center bg-purple-500 pt-2 fixed bottom-0 w-full'>
      <div className='font-bold text-2xl'>
          <span> &lt;</span>
          <span className='text-white'>PASSOP</span>
          <span>/&gt;</span>
        </div>
        <div className='flex justify-center items-center'>
            Created with <img className = "w-10 "src="https://cdn-icons-png.flaticon.com/128/9484/9484251.png" alt="" />
            by Krishna (Developer)
        </div>
    </div>
  )
}

export default Footer

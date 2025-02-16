import React from 'react'
import { IoIosReturnRight } from "react-icons/io";

const AnimatedButton = ({title = "Get Started"}) => {
  return (
    <div className='w-fit px-3 py-2 gap-4 bg-zinc-100 text-black rounded-full flex items-center justify-between'>
        <span className='text-sm font-medium'>{title}</span>
        <IoIosReturnRight /> 
    </div>
  )
}

export default AnimatedButton
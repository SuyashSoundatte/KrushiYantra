import React from 'react'
import AnimatedButton from './Animated/AnimatedButton'

const Product = ({ val , mover, count }) => {
  return (
    <div className='w-full h-[17rem] py-10 px-5 text-white font-["Navbar"]'>
      <div 
      onMouseEnter={() => {
        mover(count)
      }}
      className='max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left text-black'>
        <h1 className='text-4xl md:text-6xl capitalize font-semibold mb-5 md:mb-0'>{val.title}</h1>
        <div className='details w-full md:w-1/3'>
          <p className='mb-6'>{val.description}</p>
          <div className='flex flex-wrap justify-center md:justify-start items-center gap-5'>
            {val.live && <AnimatedButton />}
            {val.case && <AnimatedButton title='Case Study' />}
          </div>
        </div>
      </div>
    </div>  
  )
}

export default Product;

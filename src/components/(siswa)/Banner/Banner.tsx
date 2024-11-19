import Image from 'next/image'
import React from 'react'

const Banner = () => {
  return (
    <div className='min-h-screen bg-cover bg-center bg-no-repeat relative'>
        <Image src={"/images/banner.svg"} alt="Banner" width={10000} height={10000} className='bg-cover bg-center bg-no-repeat relative' />
    </div>
  )
}

export default Banner
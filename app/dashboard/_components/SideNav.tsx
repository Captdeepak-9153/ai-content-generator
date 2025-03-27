"use client"
import React, { use, useEffect } from 'react'
import Image from 'next/image'
import { FileClock, Home, Settings, Wallet, WalletCards } from 'lucide-react'
import { usePathname } from 'next/navigation'
// import UsageTrack from './UsageTrack'

function SideNav() {
  const MenuList = [
    {
      name: 'Home',
      icon: Home,
      path: '/dashboard'
    },
    {
      name: 'History',
      icon: FileClock,
      path: '/dashboard/history'
    },
    {
      name: 'Billing',
      icon: WalletCards,
      path: '/dashboard/billing'
    },
    {
      name: 'Settings',
      icon: Settings,
      path: '/dashboard/settings'
    },
  ]

  const path =usePathname();
  useEffect(() => {
    console.log(path)
  }, []);

  return (
    <div className='h-screen relative p-5 shadow-lg border-r border-gray-400 bg-white'>
      <div 
        className='flex justify-center items-center mb-5 cursor-pointer' 
        onClick={() => window.location.href = '/'}
      >
        <Image src={'/logo.svg'} alt="logo" width={120} height={100} />
      </div>
      <hr className='my-6 border' />
      <div className='mt-3'>
        {MenuList.map((menu, index) => (
          <div key={index} className={`flex gap-2 mb-2 p-3 hover:bg-cyan-500 hover:text-black rounded-lg cursor-pointer items-center
            ${path === menu.path && 'bg-primary text-white'}`
          }>
            <menu.icon className='h-6 w-6'/>
            <h2 className='text-lg'>{menu.name}</h2>
          </div>
        ))}
      </div>
      <div className='absolute bottom-15 left-0 w-full'>
        {/* <UsageTrack/> */}
      </div>
    </div>
  )
}

export default SideNav
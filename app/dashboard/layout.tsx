"use client";

import React, { useState } from 'react'
import SideNav from './_components/SideNav';
import Header from './_components/Header';
import { UserSubscriptionContext } from '../(context)/UserSubscriptionContext';

function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const [UserSubscription,setUserSubscription]=useState<boolean>(false);
  return (
    <UserSubscriptionContext.Provider value={{UserSubscription,setUserSubscription}}>
      <div className='flex h-screen bg-slate-100'>
        {/* Sidebar */}
        <div className='hidden md:block fixed left-0 top-0 h-screen w-64 z-20'>
          <SideNav/>
        </div>
        {/* Main content */}
        <div className='flex-1 md:ml-64 h-screen overflow-auto'>
          <Header/>
          {/* Render child routes here */}
          {children}
        </div>
      </div>
    </UserSubscriptionContext.Provider>
  )
}

export default layout
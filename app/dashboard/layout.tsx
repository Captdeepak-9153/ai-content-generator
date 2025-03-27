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
    <div className='bg-slate-100 h-screen'>
        <div className='md:w-64 hidden md:block fixed'>
            <SideNav/>
        </div>
        <div className='md:ml-64'>
          <Header/>
          {/* Render child routes here */}
          {children}
        </div>
    </div>
    </UserSubscriptionContext.Provider>
  )
}

export default layout
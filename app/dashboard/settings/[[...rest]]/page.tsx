"use client"
import { UserProfile } from '@clerk/nextjs'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

function Settings() {
  return (
    <div className='min-h-screen w-full p-4 md:p-8'>
        <UserProfile 
          routing="path" 
          path="/dashboard/settings"
        />
      
    </div>
  )
}

export default Settings 
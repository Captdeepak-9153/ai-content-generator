"use client"
import { UserProfile } from '@clerk/nextjs'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

function Settings() {
  return (
    <div className='min-h-screen w-full p-4 md:p-8'>
      <Link href="/dashboard">
        <Button variant="outline" className='mb-8 flex items-center gap-2'>
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </Link>

      {/* User Profile Container */}
      
        <UserProfile 
          routing="path" 
          path="/dashboard/settings"
        />
      
    </div>
  )
}

export default Settings 
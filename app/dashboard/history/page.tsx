"use client"
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

function HistoryPage() {
  return (
    <div className='min-h-screen w-full p-4 md:p-8'>
      <Link href="/dashboard">
        <Button variant="outline" className='mb-8 flex items-center gap-2'>
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </Link>

      <div className='max-w-7xl mx-auto'>
        <h1 className='text-2xl font-bold'>History</h1>
      </div>
    </div>
  )
}

export default HistoryPage
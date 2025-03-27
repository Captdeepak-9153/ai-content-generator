"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Copy, Check } from 'lucide-react'
import { db } from '@/utils/db'
import { AIOutput } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import moment from 'moment'

function HistoryPage() {
  const [history, setHistory] = useState<any[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const { user } = useUser()

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        if (user?.emailAddresses[0].emailAddress) {
          const result = await db.select().from(AIOutput)
            .where(eq(AIOutput.createdBy, user.emailAddresses[0].emailAddress))
            .execute()
          setHistory(result.reverse()) // Most recent first
        }
      } catch (error) {
        console.error('Error fetching history:', error)
      }
    }

    fetchHistory()
  }, [user])

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const getWordCount = (text: string) => {
    return text.split(/\s+/).filter(word => word.length > 0).length
  }

  const formatDate = (dateString: string) => {
    let date = moment(dateString);
    if (!date.isValid()) {
      date = moment(dateString, 'DD/MM/YYYY');
    }
    if (!date.isValid()) {
      return dateString;
    }
    return date.format('DD/MM/YYYY');
  }

  return (
    <div className="relative min-h-screen bg-[#050A1C] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute left-0 top-1/4 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#6366F1] opacity-20 blur-3xl"></div>
      <div className="absolute right-0 top-1/2 h-[500px] w-[800px] translate-x-1/3 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] opacity-20 blur-3xl"></div>

      <div className="relative z-10 w-full min-h-screen py-12 px-4">
        <Link href="/dashboard">
          <Button variant="outline" className='mb-8 flex items-center gap-2'>
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 mb-8"
          >
            <h1 className="text-4xl font-bold text-white">History</h1>
            <p className="text-gray-400">Search your previously generated AI content</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-3xl shadow-lg overflow-hidden border border-white/20"
          >
            <div className="grid grid-cols-5 gap-4 p-6 text-sm font-medium text-white/70 border-b border-white/10">
              <div>TEMPLATE</div>
              <div className="col-span-2">AI RESPONSE</div>
              <div>DATE</div>
              <div className="flex justify-between">
                <span>WORDS</span>
                <span>COPY</span>
              </div>
            </div>

            <div className="divide-y divide-white/10">
              {history.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="grid grid-cols-5 gap-4 p-6 items-center hover:bg-white/5 transition-colors"
                >
                  <div className="font-medium text-white">{item.templateSlug}</div>
                  <div className="col-span-2 text-sm text-gray-400 truncate">
                    {item.aiResponse}
                  </div>
                  <div className="text-sm text-gray-400">
                    {formatDate(item.createdAt)}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400 bg-white/5 px-2 py-0.5 rounded">
                      {getWordCount(item.aiResponse)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#0EA5E9] hover:text-[#6366F1] transition-colors"
                      onClick={() => copyToClipboard(item.aiResponse, index)}
                    >
                      {copiedIndex === index ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default HistoryPage
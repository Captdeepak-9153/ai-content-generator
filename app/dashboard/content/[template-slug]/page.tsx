"use client"
import React, { useState } from 'react'
import FormSection from './_components/FormSection'
import OutputSection from './_components/OutputSection'
import Templates from '@/app/(data)/Templates'
import { TEMPLATE } from '../../_components/TemplateListSection'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { chatSession } from '@/utils/AiModel'
import { use } from 'react'
import { db } from '@/utils/db'
import { AIOutput } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'

interface PROPS {
  params: Promise<{
    'template-slug': string
  }>
}

function CreateNewContent(props: PROPS) {
  const params = use(props.params)
  const selectedTemplate: TEMPLATE | undefined = Templates?.find((item) => item.slug == params['template-slug'])
   
  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const {user}=useUser();


  const SaveInDb = async (formData: any, slug: string, aiOutput: string) => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      throw new Error('User email is required');
    }
    const result = await db.insert(AIOutput).values({
      formData: JSON.stringify(formData),
      templateSlug: slug,
      aiResponse: aiOutput,
      createdBy: user.primaryEmailAddress.emailAddress,
      createdAt: moment().format('DD/MM/yyyy')
    });
    console.log(result);
  }

  const GenerateAIContent = async (formData: any) => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const SelectedPrompt = selectedTemplate?.aiPrompt;
      const FinalAIPrompt = JSON.stringify(formData) + ',' + SelectedPrompt;
      if (!selectedTemplate) {
        throw new Error('Selected template is undefined.');
      }
      const result = await chatSession.sendMessage(FinalAIPrompt);
      console.log(result.response.text());
      setAiOutput(result?.response.text());
      await SaveInDb(formData, selectedTemplate?.slug, aiOutput)
    } catch (err: any) {
      console.error('Error generating AI content:', err);
      if (err.message.includes('503')) {
        setError('The service is currently unavailable. Please try again later.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='p-5'>
      <Link  href={"/dashboard"}>
        <Button className='cursor-pointer'> <ArrowLeft /> Back</Button>
      </Link>
      {error && <div className='error-message'>{error}</div>}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-5'>
        {/* formSection */}
        <FormSection selectedTemplate={selectedTemplate}
          UserFormInput={(v: any) => GenerateAIContent(v)}
          loading={loading}
        />
        <div className='col-span-2'>
          {/* outputSection */}
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  )
}

export default CreateNewContent

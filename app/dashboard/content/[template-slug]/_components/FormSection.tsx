"use client";
import { TEMPLATE } from '@/app/dashboard/_components/TemplateListSection';
import { Input } from "@/components/ui/input"
import React from 'react'
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';
import { on } from 'events';
import { useState } from 'react';
import { Loader2Icon } from 'lucide-react';
interface PROPS{
    selectedTemplate?:TEMPLATE;
    UserFormInput:any,
    loading:boolean
}

function   FormSection({selectedTemplate,UserFormInput,loading}:PROPS) {
    const [formData, setFormData] = useState<any>();

    const onSubmit=(e:any)=>{
        e.preventDefault();
        UserFormInput(formData);
    }
    const handleInputChange=(e:any)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value});
    }
  return (
    <div className='p-5 shadow-md border rounded-lg bg-white '>
        <Image src={selectedTemplate?.icon || '/placeholder.png'} width={70} height={70} alt='icon' />
        <h2 className='font-bold text-2xl mb-2 text-black'>{selectedTemplate?.name}</h2>
        <p className='text-gray-500 text-sm'>{selectedTemplate?.desc}</p>

        <form className='mt-6' onSubmit={onSubmit}>

            {selectedTemplate?.form?.map((item,index)=>(
                <div key={index} className='my-2 flex flex-col gap-2 mb-7'>
                    <label htmlFor={item.field} className='block text-sm font-bold text-gray-700'>{item.label}</label>
                    {item.field=='input'? 
                    <Input name={item.name} required={item?.required}
                    onChange={handleInputChange}
                    />
                    : item.field == 'textarea'?
                    <Textarea name={item.name} required={item?.required}
                    onChange={handleInputChange} /> : null
                }
                      
                </div>
            ))}
            <button type="submit" className='bg-blue-500 text-white  py-6 rounded-md w-full cursor-pointer '
            disabled={loading}
            >
                {loading&&<Loader2Icon className='animate-spin  '/>}
                Generate Content</button>
        </form>
    </div>
  )
}

export default FormSection
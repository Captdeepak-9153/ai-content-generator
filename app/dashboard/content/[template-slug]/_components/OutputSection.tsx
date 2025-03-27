import React, { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import { fromString } from '@iarna/rtf-to-html'

// Dynamically import the Editor component
const Editor = dynamic(() => import('@toast-ui/react-editor').then(mod => mod.Editor), { ssr: false })

interface props {
  aiOutput: string  
} 

function OutputSection({ aiOutput }: props) {
  const editorRef:any = useRef();

  useEffect(() => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      
      
      fromString(aiOutput, (err, aiOutput1) => {
        if (err) {
          console.error('Failed to parse RTF:', err);
          return;
        }
         editorInstance.setMarkdown(aiOutput);
        //editorInstance.setHTML(aiOutput1);
      });
    }
  }, [aiOutput]);

  return (
    <div className='bg-white shadow-lg border rounded-lg'>
      <div className='flex justify-between items-center p-3'>
        <h2 className='font-medium text-lg'>Your Result</h2>
        <Button 
          className='flex gap-2 cursor-pointer' 
          onClick={() => navigator.clipboard.writeText(aiOutput)}
        >
          <Copy className='w-4 h-4' />
          Copy
        </Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Your Result will be displayed here"
        initialEditType="wysiwyg"
        previewStyle="vertical"
        height="600px"
        useCommandShortcut={true}
        onChange={() => console.log(editorRef.current?.getInstance().getMarkdown())}
      />
    </div>
  )
}

export default OutputSection


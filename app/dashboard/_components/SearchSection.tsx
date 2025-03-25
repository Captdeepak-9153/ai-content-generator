import React from 'react'
import { Search } from 'lucide-react'
function SearchSection({onSearchInput}:any) {
  return (
    <div className='p-10 bg-gradient-to-br from-purple-500 via-purple-700 to-blue-600 flex flex-col justify-center items-center text-white'>
        <h2 className='text-3xl font-bold'>Browse All Templates</h2>
        <p>What would you like to create today?</p>

        <div className='w-full flex justify-center'>
            <div className='flex gap-2 items-center p-2 border rounded-md my-5 w-[80%] bg-white'>
                <Search className='text-black'/>
                <input type="text" placeholder='Search for templates' 
                onChange={(event)=>onSearchInput(event.target.value)}
                className=' rounded-lg text-black outline-none '/>

            </div>
        </div>
    </div>
  )
}

export default SearchSection
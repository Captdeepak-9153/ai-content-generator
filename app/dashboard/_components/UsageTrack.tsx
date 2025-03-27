// "use client"
// import { Button } from '@/components/ui/button'
// import { db } from '@/utils/db';
// import { AIOutput } from '@/utils/schema';
// import { useUser } from '@clerk/nextjs';
// import { currentUser } from '@clerk/nextjs/server'
// import { eq } from 'drizzle-orm';
// import { AirVent } from 'lucide-react';
// import React from 'react'
// import { useEffect } from 'react';

// import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
// import { db } from "@/utils/db";
// import { eq } from "drizzle-orm";
// import { useContext } from "react";

//  function UsageTrack() {
//   const {user} = useUser();

//const{UserSubscription,setUserSubscription}=useContext(UserSubscriptionContext)
//    useEffect(() => {
//     user&&GetData();
      // user&&IsUserSubscribe();
//    }, [user])

//    const GetData = async()=>{
//     const result = await db.select().from(AIOutput).where(eq(AIOutput.createdBy,user?.primaryEmailAddress?.emailAddress));
//     GetTotalUsage(result);
//    }
   
// const IsUserSubscribe=async()=>{
//     const result = await db.select().from(UserSubscription).where(eq(UserSubscription.email,user?.primaryEmailAddress?.emailAddress));


//     if(result){
//         setUserSubscription(true);
//     }
// }


//   const GetTotalUsage=(result:)=>{
//     let total:number=0;
//     result.forEach(element =>{
//       total=total+Number(element.aiResponse?.length)
//     });
//     console.log(total);
//   }
//   return (
//     <div className='m-5'>
//         <div className='bg-primary text-white p-3 rounded-lg'>
//             <h2 className='font-medium'>Credits</h2>
//             <div className='h-2 bg-[#9981f9] w-full rounded-full mt-3'>
//                 <div className='h-2 bg-white rounded-full' style={{
//                     width:'35%'
//                 }}>

//                 </div>
//             </div>
//             <h2 className='text-sm my-2'>350/10,0000 credit used</h2>
//         </div>
//         <Button  variant={'secondary'} className='w-full my-3 cursor-pointer text-primary'>Upgrade</Button>
//     </div>
//   )
// }

// export default UsageTrack
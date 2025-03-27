"use client"
import { ArrowLeft, Check, Loader2Icon } from "lucide-react"
import axio from 'axios'
import { useContext, useState } from "react"
import { error } from "console";
import { db } from "@/utils/db";
import { UserSubscription } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function BillingPage() {

  const [loading,setLoading] = useState(false);
  const{user}=useUser();
  const {userSubscription,setUserSubscription}=useContext(UserSubscriptionContext);

  const CreateSubscription=()=>{
    setLoading(true)
    axio.post('/api/create-subscription',{}).then(resp=>{
      console.log(resp.data);
      OnPayment(resp.data.id)
    },(error)=>{
      setLoading(false);
    })
  }
  const OnPayment=(subId:string)=>{
    const options={
      "key":process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      "subscription_id":subId,
      "name":"Deepak kumar kar",
      description:"Yearly Subscription",
      handler:async(resp:any)=>{
        console.log(resp);
        if(resp){
          SaveSubcription(resp?.razorpay_payment_id)
        }
        setLoading(false);
      }
    }
    // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open()
  }
  const SaveSubcription = async(paymentId:string)=>{
    const result = await db.insert(UserSubscription).values({
      email:user?.primaryEmailAddress?.emailAddress,
      userName:user?.fullName,
      active:true,
      paymentId:paymentId,
      joinDate:moment().format('DD/MM/yyyy')
    });
    console.log(result)
    if(result){
      window.location.reload();
    }

  }

  return (
    <div className="w-full min-h-screen bg-gray-50 py-12 px-4">
      <Link  href={"/dashboard"}>
        <Button className='cursor-pointer'> <ArrowLeft /> Back</Button>
      </Link>
     <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Upgrade With Monthly Plan</h1>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
            <div className="p-6 text-center">
              <h2 className="text-2xl font-semibold mb-6">Free</h2>

              <div className="mb-8">
                <span className="text-6xl font-bold">0$</span>
                <span className="text-gray-500 ml-1">/month</span>
              </div>

              <ul className="space-y-4 text-left mb-8">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>10,000 Words/Month</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>50+ Content Templates</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Unlimited Download & Copy</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>1 Month of History</span>
                </li>
              </ul>
            </div>

            <div className="px-6 pb-6">
              <button className="w-full py-4 bg-gray-600 text-white rounded-full font-medium hover:bg-gray-700 transform transition duration-300 hover:scale-105">
                Currently Active Plan
              </button>
            </div>
          </div>

          {/* Monthly Plan */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
            <div className="p-6 text-center">
              <h2 className="text-2xl font-semibold mb-6">Monthly</h2>

              <div className="mb-8">
                <span className="text-6xl font-bold">9.99$</span>
                <span className="text-gray-500 ml-1">/month</span>
              </div>

              <ul className="space-y-4 text-left mb-8">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>100,000 Words/Month</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>50+ Template Access</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Unlimited Download & Copy</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="inline-flex items-center">
                    <span className="bg-blue-100 px-2 py-0.5 rounded">1 Year of History</span>
                  </span>
                </li>
              </ul>
            </div>

            <div className="px-6 pb-6">
              <button 
              disabled={loading}
              onClick={()=>CreateSubscription()}
              className="w-full py-4 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors transform duration-300 hover:scale-105">
                {loading&&<Loader2Icon className="animate-spin"/>}
                {userSubscription ? 'Active Plan' : 'Get Started'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


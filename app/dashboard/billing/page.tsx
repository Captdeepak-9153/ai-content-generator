"use client"
import { ArrowLeft, Check, Loader2Icon } from "lucide-react"
import axio from 'axios'
import { useContext, useEffect, useState } from "react"
import { error } from "console";
import { db } from "@/utils/db";
import { UserSubscription } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

// Add Razorpay to the Window interface
declare global {
  interface Window {
    Razorpay?: any;
  }
}

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (document.getElementById('razorpay-script')) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function BillingPage() {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext);

  const CreateSubscription = () => {
    setLoading(true)
    axio.post('/api/create-subscription', {}).then(resp => {
      console.log(resp.data);
      OnPayment(resp.data.id)
    }, (error) => {
      setLoading(false);
    })
  }

  const OnPayment = async (subId: string) => {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert('Razorpay SDK failed to load.');
      return;
    }
    if (typeof window === 'undefined' || !window.Razorpay) {
      alert('Razorpay not available');
      return;
    }
    const options = {
      "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      "subscription_id": subId,
      "name": "Deepak kumar kar",
      description: "Yearly Subscription",
      handler: async (resp: any) => {
        console.log(resp);
        if (resp) {
          SaveSubcription(resp?.razorpay_payment_id)
        }
        setLoading(false);
      }
    }
    // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open()
  }

  const SaveSubcription = async (paymentId: string) => {
    const result = await db.insert(UserSubscription).values({
      email: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      active: true,
      paymentId: paymentId,
      joinDate: moment().format('DD/MM/yyyy')
    });
    console.log(result)
    if (result) {
      window.location.reload();
    }
  }

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  return (
    <div className="relative h-full bg-[#050A1C] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute left-0 top-1/4 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#6366F1] opacity-20 blur-3xl"></div>
      <div className="absolute right-0 top-1/2 h-[500px] w-[800px] translate-x-1/3 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] opacity-20 blur-3xl"></div>

      <div className="relative z-10 w-full h-full py-12 px-4">
       
        <div className="max-w-6xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-12 text-white"
          >
            Choose Your Plan
          </motion.h1>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 border border-white/20"
            >
              <div className="p-6 text-center">
                <h2 className="text-2xl font-semibold mb-6 text-white">Free</h2>

                <div className="mb-8">
                  <span className="text-6xl font-bold text-white">0$</span>
                  <span className="text-gray-300 ml-1">/month</span>
                </div>

                <ul className="space-y-4 text-left mb-8">
                  <li className="flex items-start text-white">
                    <Check className="h-5 w-5 text-[#0EA5E9] mr-2 mt-0.5 flex-shrink-0" />
                    <span>10,000 Words/Month</span>
                  </li>
                  <li className="flex items-start text-white">
                    <Check className="h-5 w-5 text-[#0EA5E9] mr-2 mt-0.5 flex-shrink-0" />
                    <span>50+ Content Templates</span>
                  </li>
                  <li className="flex items-start text-white">
                    <Check className="h-5 w-5 text-[#0EA5E9] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Unlimited Download & Copy</span>
                  </li>
                  <li className="flex items-start text-white">
                    <Check className="h-5 w-5 text-[#0EA5E9] mr-2 mt-0.5 flex-shrink-0" />
                    <span>1 Month of History</span>
                  </li>
                </ul>
              </div>

              <div className="px-6 pb-6">
                <button className="w-full py-4 bg-gray-600/50 text-white rounded-full font-medium hover:bg-gray-600/70 transform transition duration-300 hover:scale-105 backdrop-blur-sm">
                  Currently Active Plan
                </button>
              </div>
            </motion.div>

            {/* Monthly Plan */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-[#0EA5E9]/20 to-[#8B5CF6]/20 backdrop-blur-md rounded-3xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 border border-white/20"
            >
              <div className="p-6 text-center">
                <h2 className="text-2xl font-semibold mb-6 text-white">Monthly</h2>

                <div className="mb-8">
                  <span className="text-6xl font-bold text-white">9.99$</span>
                  <span className="text-gray-300 ml-1">/month</span>
                </div>

                <ul className="space-y-4 text-left mb-8">
                  <li className="flex items-start text-white">
                    <Check className="h-5 w-5 text-[#0EA5E9] mr-2 mt-0.5 flex-shrink-0" />
                    <span>100,000 Words/Month</span>
                  </li>
                  <li className="flex items-start text-white">
                    <Check className="h-5 w-5 text-[#0EA5E9] mr-2 mt-0.5 flex-shrink-0" />
                    <span>50+ Template Access</span>
                  </li>
                  <li className="flex items-start text-white">
                    <Check className="h-5 w-5 text-[#0EA5E9] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Unlimited Download & Copy</span>
                  </li>
                  <li className="flex items-start text-white">
                    <Check className="h-5 w-5 text-[#0EA5E9] mr-2 mt-0.5 flex-shrink-0" />
                    <span className="inline-flex items-center">
                      <span className="bg-[#0EA5E9]/20 px-2 py-0.5 rounded text-white">1 Year of History</span>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="px-6 pb-6">
                <button
                  disabled={loading}
                  onClick={() => CreateSubscription()}
                  className="w-full py-4 bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] text-white rounded-full font-medium hover:opacity-90 transition-all transform duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  {loading && <Loader2Icon className="animate-spin" />}
                  {userSubscription ? 'Active Plan' : 'Get Started'}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
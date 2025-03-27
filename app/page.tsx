"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BookOpen, Clock, FileText, Settings } from "lucide-react"
import { motion } from "framer-motion"
import { StarParticle } from "./star-particle"

export default function LandingPage() {
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // This will run only on the client side
    if (typeof window !== "undefined" && particlesRef.current) {
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e
        const x = clientX / window.innerWidth - 0.5
        const y = clientY / window.innerHeight - 0.5

        if (particlesRef.current) {
          particlesRef.current.style.transform = `translate(${x * 20}px, ${y * 20}px)`
        }
      }

      window.addEventListener("mousemove", handleMouseMove)

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050A1C]">
      {/* Animated background elements */}
      <div className="absolute left-0 top-1/4 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#6366F1] opacity-20 blur-3xl"></div>
      <div className="absolute right-0 top-1/2 h-[500px] w-[800px] translate-x-1/3 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] opacity-20 blur-3xl"></div>

      {/* Star particles container */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div ref={particlesRef} className="absolute inset-0 transition-transform duration-300 ease-out">
          <StarParticle color="#0EA5E9" size={2} top="10%" left="20%" duration={15} delay={0} />
          <StarParticle color="#6366F1" size={3} top="15%" left="70%" duration={20} delay={2} />
          <StarParticle color="#8B5CF6" size={2.5} top="5%" left="40%" duration={18} delay={5} />
          <StarParticle color="#EC4899" size={2} top="8%" left="85%" duration={25} delay={7} />
          <StarParticle color="#0EA5E9" size={3.5} top="3%" left="10%" duration={22} delay={10} />
          <StarParticle color="#6366F1" size={1.5} top="12%" left="60%" duration={17} delay={3} />
          <StarParticle color="#8B5CF6" size={2.8} top="7%" left="30%" duration={19} delay={8} />
          <StarParticle color="#EC4899" size={2.2} top="2%" left="50%" duration={21} delay={12} />
          <StarParticle color="#0EA5E9" size={1.8} top="9%" left="75%" duration={16} delay={6} />
          <StarParticle color="#6366F1" size={3.2} top="4%" left="90%" duration={23} delay={9} />
        </div>
      </div>

      {/* Animated flowing element */}
      <motion.div
        className="absolute right-0 top-1/3 z-0 h-auto w-[800px]"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 1, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/flow-element.svg"
            alt="Flow Element"
            width={800}
            height={400}
            className="h-auto w-full"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Header */}
      <motion.header
        className="container relative z-10 mx-auto flex items-center justify-between py-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Image src="/logo-light.svg" alt="Logo" width={150} height={40} className="h-10 w-auto" />
        </motion.div>

        <div className="hidden items-center rounded-full bg-[#0A1232]/50 px-2 py-1 backdrop-blur-md md:flex">
          {["Channels", "Pricing", "Solutions", "Resources"].map((item, index) => (
            <motion.div key={item} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={`/${item.toLowerCase()}`}
                className="px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link
            href="/get-started"
            className="rounded-full bg-[#0EA5E9] px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-[#0EA5E9]/20 transition-all hover:bg-[#0EA5E9]/90 hover:shadow-xl hover:shadow-[#0EA5E9]/30"
          >
            Start Free Trial
          </Link>
        </motion.div>
      </motion.header>

      {/* Main Content */}
      <main className="container relative z-10 mx-auto px-4 py-16 md:px-6 lg:py-24">
        {/* Membership Banner */}
        <motion.div
          className="mx-auto mb-16 flex max-w-max items-center justify-center rounded-full bg-white/10 px-5 py-2 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
          }}
        >
          <span className="text-sm font-medium text-white">AI ContentGenerator Membership - Join Now</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <ArrowRight className="ml-2 h-4 w-4 text-white/70" />
          </motion.div>
        </motion.div>

        {/* Hero Section */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            className="mb-6 text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <span>AI Content </span>
            <motion.span
              className="bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              Generator
            </motion.span>
          </motion.h1>
          <motion.p
            className="mx-auto mb-10 max-w-2xl text-lg text-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Revolutionize your content creation with our AI-powered app, delivering engaging and high-quality text in
            seconds.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(139, 92, 246, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] px-8 py-3.5 text-base font-medium text-white transition-all"
            >
              Get started
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="mt-32 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <FileText className="h-7 w-7" />,
              title: "25+ templates",
              description: "Responsive, and mobile-first project on the web",
              link: "/templates",
              gradient: "from-[#0EA5E9] to-[#3B82F6]",
              textColor: "text-[#0EA5E9]",
              hoverColor: "hover:text-[#38BDF8]",
              delay: 0.3,
            },
            {
              icon: <Settings className="h-7 w-7" />,
              title: "Customizable",
              description: "Components are easily customized and extendable",
              link: "/customization",
              gradient: "from-[#3B82F6] to-[#6366F1]",
              textColor: "text-[#3B82F6]",
              hoverColor: "hover:text-[#60A5FA]",
              delay: 0.5,
            },
            {
              icon: <BookOpen className="h-7 w-7" />,
              title: "Free to Use",
              description: "Every component and plugin is well documented",
              link: "/documentation",
              gradient: "from-[#6366F1] to-[#8B5CF6]",
              textColor: "text-[#6366F1]",
              hoverColor: "hover:text-[#818CF8]",
              delay: 0.7,
            },
            {
              icon: <Clock className="h-7 w-7" />,
              title: "24/7 Support",
              description: "Contact us 24 hours a day, 7 days a week",
              link: "/support",
              gradient: "from-[#8B5CF6] to-[#EC4899]",
              textColor: "text-[#8B5CF6]",
              hoverColor: "hover:text-[#A78BFA]",
              delay: 0.9,
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-start rounded-xl bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: feature.delay }}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <motion.div
                className={`mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br ${feature.gradient} text-white shadow-lg shadow-${feature.gradient.split("to-")[1].replace("]", "")}/20`}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)",
                }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="mb-2 text-xl font-bold text-white">{feature.title}</h3>
              <p className="mb-4 text-white/70">{feature.description}</p>
              <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link href={feature.link} className={`flex items-center ${feature.textColor} ${feature.hoverColor}`}>
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom text */}
        <motion.div
          className="mt-24 flex justify-between text-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.div
            whileHover={{ scale: 1.1, color: "#0EA5E9" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Optimize
          </motion.div>
          <motion.div
            className="text-center"
            whileHover={{ scale: 1.1, color: "#8B5CF6" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Hire a chatbot as your WhatsApp
            <br />
            AI sales manager
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1, color: "#EC4899" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Automate
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}


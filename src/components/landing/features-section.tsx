"use client"

import { motion } from "framer-motion"
import { Share2, ShieldCheck, ToggleRight, UserX, Sparkles, MailCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export function FeaturesSection() {
  const container = { 
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0 },
  }

  const features = [
    {
      title: "Simple Sharing",
      description: "Share a unique link anywhere — email, chat, or social media — and start receiving feedback instantly.",
      icon: <Share2 className="size-5" />,
    },
    {
      title: "Secure Access",
      description: "With email verification and NextAuth authentication, your account and messages stay safe and private..",
      icon: <ShieldCheck className="size-5" />,
    },
    {
      title: "Message Control",
      description: "Toggle feedback collection on or off anytime to manage when you want to receive responses.",
      icon: <ToggleRight className="size-5" />,
    },
    {
      title: "Anonymous Trust",
      description: "Feedback is collected without revealing identity, ensuring honesty and openness from your audience",
      icon: <UserX className="size-5" />,
    },
    {
      title: "Smart Suggestions",
      description: "AI helps anonymous users by suggesting thoughtful messages, making it easier for them to express feedback.",
      icon: <Sparkles className="size-5" />,
    },
    {
      title: "Resend Verification",
      description: "Never get locked out — resend verification emails easily to keep your account active and secure.",
      icon: <MailCheck className="size-5" />,
    },
  ]

  return (
    <section id="features" className="w-full py-20 lg:pt-5 md:py-32">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center my-12"
        >
          <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
            features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Feedback Without Barriers</h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            This environment empowers you to collect honest feedback effortlessly — anonymous, secure, and always under your control.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, i) => (
            <motion.div key={i} variants={item}>
              <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="size-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

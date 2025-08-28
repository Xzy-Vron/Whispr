"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FaqSection() {
  return (
    <section id="faq" className="w-full py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
            FAQ
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Frequently Asked Questions</h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Find answers to common questions about our platform.
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {[
              {
                question: "Why should I use anonymous feedback instead of direct feedback?",
                answer:
                  "Anonymous feedback often gives people the freedom to share their honest thoughts without hesitation. This helps you receive more authentic, constructive, and unbiased input.",
              },
              {
                question: "How do you ensure the privacy of users sending feedback?",
                answer:
                  "We never store identifiable information about the sender unless they voluntarily include it in their message. All communication is encrypted to keep data secure.",
              },
              {
                question: "What makes this platform different from other feedback tools?",
                answer:
                  "Unlike traditional forms or surveys, our platform combines anonymous sharing, user-controlled message toggling, email verification for authenticity, and AI-powered suggestions to make feedback both safe and actionable.",
              },
              {
                question: "Why is email verification required?",
                answer:
                  "Email verification prevents fake accounts, ensures that feedback links are tied to real users, and keeps the platform trustworthy.",
              },
              {
                question: "Can this platform be used in professional settings?",
                answer:
                  "Yes. It can be used in classrooms, workplaces, events, or teams—anywhere you want authentic feedback without pressuring people to reveal their identity.",
              },
              {
                question: "How does this platform help me grow?",
                answer:
                  "By receiving candid, unbiased feedback, you gain insights that might otherwise remain unspoken. Combined with AI-driven suggestions, this helps you reflect, improve, and take meaningful action.",
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <AccordionItem value={`item-${i}`} className="border-b border-border/40 py-2">
                  <AccordionTrigger className="text-left font-medium hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

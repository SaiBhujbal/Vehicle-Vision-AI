"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"

export default function FaqAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="border-gray-700 overflow-hidden">
        <AccordionTrigger className="text-left hover:text-blue-400 transition-colors">
          What is Vehicle Vision AI and how does it work?
        </AccordionTrigger>
        <AccordionContent className="text-gray-400">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            Vehicle Vision AI is an advanced platform that uses artificial intelligence to detect and analyze humans,
            vehicles, and other objects in video feeds. It processes video in real-time using TensorFlow.js and the
            COCO-SSD model directly in your browser, providing instant insights without requiring downloads or server
            processing. The system identifies objects with high accuracy and provides an AI chatbot interface for
            interacting with the analysis results.
          </motion.div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2" className="border-gray-700 overflow-hidden">
        <AccordionTrigger className="text-left hover:text-blue-400 transition-colors">
          What types of vehicles can the system detect?
        </AccordionTrigger>
        <AccordionContent className="text-gray-400">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            Our system can detect a wide range of vehicles including cars, trucks, buses, motorcycles, bicycles, and
            more. The AI model is trained on diverse datasets to ensure high accuracy across different vehicle types,
            sizes, and orientations. The detection works in various lighting conditions and environments, making it
            suitable for traffic monitoring, parking management, and security applications.
          </motion.div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3" className="border-gray-700 overflow-hidden">
        <AccordionTrigger className="text-left hover:text-blue-400 transition-colors">
          Can Vehicle Vision AI be used for traffic monitoring?
        </AccordionTrigger>
        <AccordionContent className="text-gray-400">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            Yes, Vehicle Vision AI is ideal for traffic monitoring applications. It can track vehicle movement, count
            vehicles by type, detect pedestrians, and identify potential hazards. The system provides real-time
            analytics that can help optimize traffic flow, enhance safety measures, and improve urban planning. The
            analytics dashboard offers valuable insights into traffic patterns, peak hours, and potential congestion
            points.
          </motion.div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4" className="border-gray-700 overflow-hidden">
        <AccordionTrigger className="text-left hover:text-blue-400 transition-colors">
          How accurate is the detection system?
        </AccordionTrigger>
        <AccordionContent className="text-gray-400">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            Our detection system achieves high accuracy rates, typically above 90% for most common vehicle types and
            pedestrians under standard conditions. Factors like lighting, weather, camera angle, and video quality can
            affect accuracy. The system uses the COCO-SSD model, which is trained on a diverse dataset and optimized for
            real-time detection. The confidence score displayed with each detection indicates the model's certainty
            about the classification.
          </motion.div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-5" className="border-gray-700 overflow-hidden">
        <AccordionTrigger className="text-left hover:text-blue-400 transition-colors">
          Is my data secure when using Vehicle Vision AI?
        </AccordionTrigger>
        <AccordionContent className="text-gray-400">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            Yes, we take data security very seriously. All video processing happens directly in your browser using
            TensorFlow.js, meaning your video content never leaves your device. Only the detection results are stored in
            our secure database if you choose to save them. Our platform uses encryption for data in transit and at
            rest, and we comply with industry-standard security practices to protect your information. You have full
            control over your data and can delete it at any time.
          </motion.div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

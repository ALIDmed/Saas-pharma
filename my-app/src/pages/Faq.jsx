import React from "react";
import Navbar from "@/components/Navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {faq} from '../../constants/index'

const Faq = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full h-screen flex justify-center items-center">
        <Accordion type="single" collapsible className="w-full mx-auto max-w-[1000px]">
          {faq.map((item, index) => (
            <AccordionItem value={index +1}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent style={{ whiteSpace: 'pre-wrap' }}>
              {item.answer}
            </AccordionContent>
          </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Faq;

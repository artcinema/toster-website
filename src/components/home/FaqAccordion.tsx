'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ArrowRight } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <Accordion.Root type="single" collapsible className="space-y-2">
      {items.map((item, i) => (
        <Accordion.Item
          key={i}
          value={`item-${i}`}
          className="rounded-xl border border-[#E5E5E5] overflow-hidden"
        >
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium text-[#0A0A0A] hover:bg-[#F5F5F5] transition-colors [&[data-state=open]>svg]:rotate-180">
              {item.question}
              <ArrowRight className="h-4 w-4 shrink-0 text-[#A3A3A3] transition-transform duration-200 rotate-90" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <div className="px-6 pb-4 text-[#525252] leading-relaxed border-t border-[#F5F5F5] pt-3">
              {item.answer}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

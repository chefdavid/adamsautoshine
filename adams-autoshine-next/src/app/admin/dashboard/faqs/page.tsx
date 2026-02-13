"use client";

import { useState } from "react";
import { SectionEditor } from "@/components/admin/SectionEditor";
import {
  InlineText,
  InlineTextArea,
  InlineArrayManager,
  DarkPreviewContainer,
} from "@/components/admin/inline";
import { ChevronDown } from "lucide-react";
import type { FAQData } from "@/lib/admin-types";

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionEditor
      section="faqs"
      title="FAQs"
      description="Frequently asked questions."
    >
      {({ data, updateData }) => {
        const faqs = data as unknown as FAQData[];
        return (
          <DarkPreviewContainer sectionBg="section">
            <div className="max-w-[800px] mx-auto">
              <InlineArrayManager
                items={faqs}
                onChange={(items) => updateData(items as unknown as Record<string, unknown>)}
                createItem={() => ({ question: "", answer: "" })}
                addLabel="Add FAQ"
                className="flex flex-col gap-3"
                renderItem={(item, index, update) => (
                  <div
                    className={`bg-bg-card border rounded-xl overflow-hidden transition-colors duration-300 ${
                      openIndex === index ? "border-border-accent" : "border-border-subtle"
                    }`}
                  >
                    <button
                      type="button"
                      className="w-full px-6 py-5 flex items-center justify-between text-left"
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    >
                      <InlineText
                        value={item.question}
                        onChange={(v) => update({ ...item, question: v })}
                        className="text-base font-medium text-text-white hover:text-amber-400 flex-1"
                        placeholder="Question..."
                      />
                      <ChevronDown
                        className={`h-4 w-4 text-amber-400 shrink-0 ml-4 transition-transform duration-300 ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openIndex === index && (
                      <div className="px-6 pb-5">
                        <InlineTextArea
                          value={item.answer}
                          onChange={(v) => update({ ...item, answer: v })}
                          className="text-[0.9rem] text-text-muted leading-relaxed"
                          placeholder="Answer..."
                        />
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
          </DarkPreviewContainer>
        );
      }}
    </SectionEditor>
  );
}

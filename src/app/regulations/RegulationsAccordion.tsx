"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  formatInlineMarkdown,
  type RegulationSection,
} from "@/lib/regulations-content";

function RichText({ text }: { text: string }) {
  return (
    <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(text) }} />
  );
}

export function RegulationsAccordion({
  sections,
}: {
  sections: RegulationSection[];
}) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="section-0"
      className="space-y-4"
    >
      {sections.map((section, sectionIndex) => (
        <AccordionItem
          key={`${section.title}-${sectionIndex}`}
          value={`section-${sectionIndex}`}
          className="overflow-hidden rounded-3xl border border-[#E8EAF0] bg-white shadow-[0_10px_36px_rgba(16,17,23,0.04)] border-b-0"
        >
          <AccordionTrigger className="px-4 py-4 hover:no-underline lg:px-6 lg:py-5 [&[data-state=open]]:bg-[linear-gradient(90deg,#F7F9FF_0%,#FFFFFF_100%)] [&[data-state=open]]:border-b [&[data-state=open]]:border-[#EEF0F4] [&>svg]:size-5 [&>svg]:text-[#416CEA] [&>svg]:translate-y-0">
            <div className="flex items-center gap-3 text-right">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#416CEA] text-sm font-bold text-white">
                {sectionIndex + 1}
              </span>
              <span className="text-base font-bold text-[#101117] lg:text-lg">
                {section.title}
              </span>
            </div>
          </AccordionTrigger>

          <AccordionContent className="px-4 pb-5 pt-4 lg:px-6 lg:pb-6">
            <div className="space-y-4">
              {section.blocks.map((block, blockIndex) => {
                if (block.type === "paragraph") {
                  return (
                    <p
                      key={`p-${blockIndex}`}
                      className="text-sm leading-8 text-[#3F4045] lg:text-[15px] lg:leading-9"
                    >
                      <RichText text={block.text} />
                    </p>
                  );
                }

                if (block.ordered) {
                  return (
                    <ol key={`ol-${blockIndex}`} className="space-y-3">
                      {block.items.map((item, itemIndex) => (
                        <li
                          key={`oli-${itemIndex}`}
                          className="flex items-start gap-3 text-sm leading-8 text-[#3F4045] lg:text-[15px] lg:leading-9"
                        >
                          <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] text-[11px] font-bold text-[#416CEA]">
                            {itemIndex + 1}
                          </span>
                          <span className="min-w-0 flex-1">
                            <RichText text={item} />
                          </span>
                        </li>
                      ))}
                    </ol>
                  );
                }

                return (
                  <ul
                    key={`ul-${blockIndex}`}
                    className="space-y-2.5 rounded-2xl bg-[#F8F9FC] px-4 py-3.5"
                  >
                    {block.items.map((item, itemIndex) => (
                      <li
                        key={`uli-${itemIndex}`}
                        className="flex items-start gap-2.5 text-sm leading-8 text-[#3F4045] lg:text-[15px]"
                      >
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#416CEA]" />
                        <span className="min-w-0 flex-1">
                          <RichText text={item} />
                        </span>
                      </li>
                    ))}
                  </ul>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import instance from '@/helper/interceptor';
import { ApiHelper } from '@/helper/api-request';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { SearchIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface FaqClientProps {
  initialCategories: any[];
  initialQuestionsByCategory: Record<string, any[]>;
}

// Mobile Carousel Tabs Component
function MobileCarouselTabs({
  categories,
  activeTab,
  onTabChange,
}: {
  categories: any;
  activeTab: string;
  onTabChange: (id: string) => void;
}) {
  return (
    <div className="lg:hidden">
      <Carousel className="w-full">
        <CarouselContent className="gap-2 ml-0">
          {categories.map((cat: any) => (
            <CarouselItem key={cat.Id} className="basis-auto pl-2">
              <button
                onClick={() => onTabChange(String(cat?.Id))}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === String(cat.Id)
                    ? 'bg-[#3456bb] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat?.Name}
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

// Desktop Flex Tabs Component
function DesktopFlexTabs({
  categories,
  activeTab,
  onTabChange,
}: {
  categories: any;
  activeTab: string;
  onTabChange: (id: string) => void;
}) {
  return (
    <div className="hidden lg:flex gap-4 flex-wrap">
      {categories.map((cat: any) => (
        <button
          key={cat.Id}
          onClick={() => onTabChange(String(cat.Id))}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === String(cat.Id)
              ? 'bg-[#3456bb] text-white'
              : 'bg-white border border-[#A6A6A6] text-[#A6A6A6] cursor-pointer'
          }`}
        >
          {cat.Name}
        </button>
      ))}
    </div>
  );
}

export function FaqClient({ initialCategories, initialQuestionsByCategory }: FaqClientProps) {
  const [faqCategories] = useState<any>(initialCategories ?? []);
  const [questionsByCategory, setQuestionsByCategory] = useState<Record<string, any[]>>(
    initialQuestionsByCategory ?? {}
  );

  const firstCategoryId = initialCategories?.[0]?.Id != null ? String(initialCategories[0].Id) : '1';
  const [activeTab, setActiveTab] = useState(firstCategoryId);

  // اگر پاسخ‌های یک دسته از قبل بارگذاری نشده باشد، در سمت کلاینت فچ می‌شود
  useEffect(() => {
    if (questionsByCategory[activeTab]) return;
    instance
      .get(ApiHelper.get('GetFAQWithCategoryId') + '?CategoryId=' + activeTab)
      .then((res: any) => {
        setQuestionsByCategory((prev) => ({ ...prev, [activeTab]: res?.FAQ ?? [] }));
      })
      .catch(() => {});
  }, [activeTab, questionsByCategory]);

  const activeCategory = faqCategories.find((cat: any) => String(cat.Id) === activeTab);
  const faqCategoriesContent = questionsByCategory[activeTab] ?? [];

  return (
    <div dir="rtl" className="w-full max-w-6xl mx-auto px-4  font-IranSans">
      {/* Header */}
      <div className="my-6 py-2">
        <h1 className="text-base lg:text-2xl font-normal text-[#101117] mb-2">پرسش های متداول</h1>
        <Label className="my-4 text-[#101117] font-extralight text-sm lg:text-lg">موضوع موردنظرتون را جستجو نمایید.</Label>
        <InputGroup className="px-4 flex items-center !py-6 border border-[#DFDFDF] rounded-full text-[#55565A]">
          <InputGroupInput placeholder="جستجو در موضوع" />
          <InputGroupAddon align="inline-end">
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="my-4">
        <span>دسته بندی:</span>
      </div>

      {/* Mobile Carousel Tabs */}
      <MobileCarouselTabs categories={faqCategories} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Desktop Flex Tabs */}
      <DesktopFlexTabs categories={faqCategories} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content Accordion */}
      {activeCategory && (
        <div className="mt-8">
          <Accordion type="single" collapsible className="w-full ">
            {faqCategoriesContent?.map((q: any) => (
              <AccordionItem key={q.Id} value={String(q.Id)} className="border-none bg-[#F0F2F4] px-4 py-2 rounded-3xl !mb-2">
                <AccordionTrigger className="text-right text-gray-800 hover:text-[#3456bb]">
                  {q.Question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-right">
                  {q.Answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}

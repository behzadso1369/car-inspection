'use client';

import { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import instance from '@/helper/interceptor';
import { ApiHelper } from '@/helper/api-request';
import { HelpCircleIcon, MessageQuestionIcon } from 'hugeicons-react';
import Link from 'next/link';
import { NavigationBar } from '@/app/components/mobile/Home/NavigationBar';

interface FaqClientProps {
  initialCategories: any[];
  initialQuestionsByCategory: Record<string, any[]>;
}

function CategoryPill({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'whitespace-nowrap rounded-2xl px-4 py-2.5 text-sm font-medium transition-all duration-200',
        active
          ? 'bg-gradient-to-l from-[#3456bb] to-[#416CEA] text-white shadow-[0_4px_16px_rgba(53,99,233,0.28)]'
          : 'border border-[#E8ECF4] bg-white text-[#55565A] hover:border-[#3456bb]/30 hover:bg-[#F8FAFF] hover:text-[#3456bb]',
      ].join(' ')}
    >
      {label}
    </button>
  );
}

function MobileCategoryTabs({
  categories,
  activeTab,
  onTabChange,
}: {
  categories: any[];
  activeTab: string;
  onTabChange: (id: string) => void;
}) {
  return (
    <div className="lg:hidden">
      <Carousel className="w-full" opts={{ align: 'start', direction: 'rtl' }}>
        <CarouselContent className="ml-0 gap-2">
          {categories.map((cat: any) => (
            <CarouselItem key={cat.Id} className="basis-auto pl-0">
              <CategoryPill
                active={activeTab === String(cat.Id)}
                label={cat?.Name}
                onClick={() => onTabChange(String(cat.Id))}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

function DesktopCategoryList({
  categories,
  activeTab,
  onTabChange,
}: {
  categories: any[];
  activeTab: string;
  onTabChange: (id: string) => void;
}) {
  return (
    <div className="hidden lg:flex lg:flex-col lg:gap-2">
      {categories.map((cat: any) => (
        <button
          key={cat.Id}
          type="button"
          onClick={() => onTabChange(String(cat.Id))}
          className={[
            'flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-right text-sm font-medium transition-all duration-200',
            activeTab === String(cat.Id)
              ? 'border-[#3456bb]/25 bg-gradient-to-l from-[#EEF2FD] to-[#F8FAFF] text-[#3456bb] shadow-[0_4px_16px_rgba(53,99,233,0.08)]'
              : 'border-[#E8ECF4] bg-white text-[#55565A] hover:border-[#3456bb]/20 hover:bg-[#FAFBFF]',
          ].join(' ')}
        >
          <span
            className={[
              'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
              activeTab === String(cat.Id)
                ? 'bg-[#3456bb] text-white'
                : 'bg-[#F0F2F4] text-[#6B6C70]',
            ].join(' ')}
          >
            <MessageQuestionIcon size={18} />
          </span>
          <span className="leading-6">{cat.Name}</span>
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
    <div dir="rtl" className="relative min-h-screen overflow-hidden bg-white pb-28 font-IranSans lg:pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-[#3563E9]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-16 h-64 w-64 rounded-full bg-[#416CEA]/8 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-10">
        <section className="mb-8 text-center lg:mb-10">
          <Badge className="mb-4 border border-[#3456bb]/20 bg-[#EEF2FD] px-4 py-1.5 text-[#3456bb]">
            پشتیبانی و راهنما
          </Badge>
          <h1 className="text-2xl font-black text-[#101117] md:text-3xl lg:text-4xl">
            پرسش‌های متداول
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#6B6C70] md:text-base">
            پاسخ سوالات رایج درباره کارشناسی خودرو، قیمت‌گذاری، رزرو و خدمات کارماچک را
            در دسته‌بندی‌های زیر پیدا کنید.
          </p>
        </section>

        <div className="lg:hidden">
          <p className="mb-3 text-sm font-semibold text-[#101117]">دسته‌بندی‌ها</p>
          <MobileCategoryTabs
            categories={faqCategories}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8">
          <aside className="hidden lg:block">
            <p className="mb-4 text-sm font-semibold text-[#101117]">دسته‌بندی‌ها</p>
            <DesktopCategoryList
              categories={faqCategories}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            <div className="mt-6 rounded-3xl border border-[#3456bb]/15 bg-gradient-to-b from-[#F8FAFF] to-[#EEF2FD] p-5">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#3456bb] text-white">
                <HelpCircleIcon size={22} />
              </div>
              <h2 className="text-base font-bold text-[#101117]">پاسخی پیدا نکردید؟</h2>
              <p className="mt-2 text-sm leading-7 text-[#6B6C70]">
                تیم پشتیبانی کارماچک آماده پاسخگویی به سوالات شماست.
              </p>
              <Link
                href="/contact-us"
                className="mt-4 inline-flex rounded-2xl bg-[#3456bb] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#416CEA]"
              >
                تماس با ما
              </Link>
            </div>
          </aside>

          <section>
            {activeCategory && (
              <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-[#E8ECF4] bg-white/80 px-4 py-3 shadow-[0_4px_20px_rgba(16,17,23,0.04)] lg:hidden">
                <div>
                  <p className="text-xs text-[#6B6C70]">دسته فعال</p>
                  <p className="text-sm font-bold text-[#101117]">{activeCategory.Name}</p>
                </div>
                <span className="rounded-full bg-[#EEF2FD] px-3 py-1 text-xs font-semibold text-[#3456bb]">
                  {faqCategoriesContent.length} سوال
                </span>
              </div>
            )}

            {activeCategory && (
              <div className="hidden items-center justify-between gap-4 rounded-3xl border border-[#E8ECF4] bg-white px-5 py-4 shadow-[0_6px_24px_rgba(16,17,23,0.05)] lg:flex">
                <div>
                  <p className="text-sm text-[#6B6C70]">سوالات دسته</p>
                  <h2 className="mt-1 text-xl font-black text-[#101117]">{activeCategory.Name}</h2>
                </div>
                <span className="rounded-full bg-[#EEF2FD] px-4 py-1.5 text-sm font-semibold text-[#3456bb]">
                  {faqCategoriesContent.length} سوال
                </span>
              </div>
            )}

            <div className="mt-4 lg:mt-5">
              {faqCategoriesContent.length > 0 ? (
                <Accordion type="single" collapsible className="w-full space-y-3">
                  {faqCategoriesContent.map((q: any, index: number) => (
                    <AccordionItem
                      key={q.Id}
                      value={String(q.Id)}
                      className="overflow-hidden rounded-3xl border border-[#E8ECF4] bg-white px-4 shadow-[0_4px_18px_rgba(16,17,23,0.04)] transition hover:border-[#3456bb]/20 hover:shadow-[0_8px_24px_rgba(53,99,233,0.08)] data-[state=open]:border-[#3456bb]/30 data-[state=open]:bg-gradient-to-b data-[state=open]:from-white data-[state=open]:to-[#F8FAFF]"
                    >
                      <AccordionTrigger className="py-4 text-right text-sm font-bold leading-7 text-[#101117] hover:no-underline md:text-base [&[data-state=open]]:text-[#3456bb]">
                        <span className="flex items-start gap-3 text-right">
                          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EEF2FD] text-xs font-black text-[#3456bb]">
                            {index + 1}
                          </span>
                          <span>{q.Question}</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="border-t border-[#EEF2FD] pb-4 text-right text-sm leading-8 text-[#55565A] md:text-base">
                        {q.Answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="rounded-3xl border border-dashed border-[#E8ECF4] bg-white/80 px-6 py-12 text-center">
                  <MessageQuestionIcon size={40} className="mx-auto text-[#3456bb]/50" />
                  <p className="mt-4 text-base font-semibold text-[#101117]">
                    سوالی برای این دسته ثبت نشده است
                  </p>
                  <p className="mt-2 text-sm text-[#6B6C70]">
                    دسته دیگری را انتخاب کنید یا با پشتیبانی تماس بگیرید.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 rounded-3xl border border-[#3456bb]/15 bg-gradient-to-b from-[#F8FAFF] to-[#EEF2FD] p-5 lg:hidden">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#3456bb] text-white">
                <HelpCircleIcon size={22} />
              </div>
              <h2 className="text-base font-bold text-[#101117]">پاسخی پیدا نکردید؟</h2>
              <p className="mt-2 text-sm leading-7 text-[#6B6C70]">
                تیم پشتیبانی کارماچک آماده پاسخگویی به سوالات شماست.
              </p>
              <Link
                href="/contact-us"
                className="mt-4 inline-flex rounded-2xl bg-[#3456bb] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#416CEA]"
              >
                تماس با ما
              </Link>
            </div>
          </section>
        </div>
      </div>

      <div className="lg:hidden">
        <NavigationBar activePath="/faq" />
      </div>
    </div>
  );
}

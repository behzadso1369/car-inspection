'use client';

import { useState, useRef, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Banner from '../components/mobile/Home/Banner';
import CallAction from '../components/mobile/Home/CallAction';
import { Header } from '../components/mobile/Home/Header';
import instance from '@/helper/interceptor';
import { ApiHelper } from '@/helper/api-request';

const FAQ_DATA = [
  {
    id: 'car-inspection',
    label: 'کارشناسی خودرو',
    questions: [
      {
        id: 'q1',
        question: 'با توجه تلفیق اطلاعات و استفاده از چارت و مدلهای نزدیک به فناوری غیرفنی است؟',
        answer: 'پاسخ سوال اول درباره کارشناسی خودرو و روش های مختلف آن',
      },
      {
        id: 'q2',
        question: 'با توجه تلفیق اطلاعات و استفاده از تسهیلات طراحی، دریچه برنامه نویسی چگونه است؟',
        answer: 'پاسخ سوال دوم درباره تسهیلات و برنامه نویسی',
      },
      {
        id: 'q3',
        question: 'با توجه تلفیق اطلاعات و استفاده و مستخدم درفناوری غیرفنی است؟',
        answer: 'پاسخ سوال سوم درباره فناوری و استفاده از آن',
      },
    ],
  },
  {
    id: 'general-questions',
    label: 'سوالات متداول',
    questions: [
      {
        id: 'q1',
        question: 'مراحل کارشناسی چگونه انجام می شود؟',
        answer: 'کارشناسی خودرو از طریق چندین مرحله انجام می شود: بررسی خارجی، بررسی داخلی، تست سیستم ها و صدور گزارش.',
      },
      {
        id: 'q2',
        question: 'مدت زمان کارشناسی چقدر است؟',
        answer: 'معمولا کارشناسی یک خودرو بین 30 تا 60 دقیقه طول می کشد.',
      },
      {
        id: 'q3',
        question: 'آیا کارشناسی در محل کار انجام می شود؟',
        answer: 'بله، ما سرویس کارشناسی در محل را ارائه می دهیم.',
      },
    ],
  },
  {
    id: 'warranty',
    label: 'گارانتی و بیمه',
    questions: [
      {
        id: 'q1',
        question: 'گزارش کارشناسی چه مدت اعتبار دارد؟',
        answer: 'گزارش کارشناسی برای 24 ساعت اعتبار دارد.',
      },
      {
        id: 'q2',
        question: 'آیا خودرو در هنگام کارشناسی بیمه می شود؟',
        answer: 'بله، خودرو شما در هنگام کارشناسی توسط بیمه ما پوشش داده می شود.',
      },
    ],
  },
  {
    id: 'payment',
    label: 'پرداخت',
    questions: [
      {
        id: 'q1',
        question: 'روش های پرداخت کدام هستند؟',
        answer: 'ما روش های مختلفی شامل کارت اعتباری، تراز بانکی و پرداخت نقدی را قبول می کنیم.',
      },
      {
        id: 'q2',
        question: 'آیا امکان بازپرداخت وجود دارد؟',
        answer: 'بله، اگر با سرویس راضی نباشید می توانید درخواست بازپرداخت کنید.',
      },
    ],
  },
];

// Mobile Carousel Tabs Component
function MobileCarouselTabs({
  categories,
  activeTab,
  onTabChange,
}: {
  categories: typeof FAQ_DATA;
  activeTab: string;
  onTabChange: (id: string) => void;
}) {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
  });

  return (
    <div className="lg:hidden">
      <Carousel className="w-full">
        <CarouselContent className="gap-2 ml-0">
          {categories.map((cat) => (
            <CarouselItem key={cat.id} className="basis-auto pl-2">
              <button
                onClick={() => onTabChange(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === cat.id
                    ? 'bg-[#3456bb] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat.label}
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
  categories: typeof FAQ_DATA;
  activeTab: string;
  onTabChange: (id: string) => void;
}) {
  return (
    <div className="hidden lg:flex gap-4 flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onTabChange(cat.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === cat.id
              ? 'bg-[#3456bb] text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

export default function RegulationsPage() {
       const [data,setData] = useState<any>([]);
  useEffect(() => {
    instance.get(ApiHelper.get("GetMasterPageData"))
      .then((res: any) => {
        setData(res);
      })
      .catch((err: any) => {
        console.error("Error fetching data:", err);
      });
  }, []);
  const [activeTab, setActiveTab] = useState(FAQ_DATA[0].id);

  const activeCategory = FAQ_DATA.find((cat) => cat.id === activeTab);

  return (
    <div dir="rtl" className="w-full max-w-6xl mx-auto px-4  font-IranSans">
        <Banner data={data?.MasterSiteData?.NavbarPhoneNumber}/>
               <div className="block lg:hidden">
          <CallAction data={data?.MasterSiteData?.PhoneNumbers}/>
               </div>
                  <div className="hidden lg:block px-20 mb-6 bg-white">
             <Header data={data?.MasterSiteData?.PhoneNumbers} />
             </div>
      {/* Header */}
      <div className="mb-8 py-2">
        <h1 className="text-base lg:text-3xl font-bold text-[#101117] mb-2">قوانین و مقررات کارچک</h1>
        <p className="text-gray-600">ورود شما از طریق شماره همراه به منزله تایید قوانین ومقررات کارچک می باشد.</p>
      </div>

      {/* Mobile Carousel Tabs */}
      <MobileCarouselTabs
        categories={FAQ_DATA}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Desktop Flex Tabs */}
      <DesktopFlexTabs
        categories={FAQ_DATA}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Content Accordion */}
      {activeCategory && (
        <div className="mt-8">
          <Accordion type="single" collapsible className="w-full ">
            {activeCategory.questions.map((q) => (
              <AccordionItem key={q.id} value={q.id} className="border-none bg-[#F0F2F4] px-4 py-2 rounded-3xl !mb-2">
                <AccordionTrigger className="text-right text-gray-800 hover:text-[#3456bb]">
                  {q.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-right">
                  {q.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}

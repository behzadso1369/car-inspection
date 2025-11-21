"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Check } from "lucide-react"
import Banner from "../components/mobile/Home/Banner"
import { Header } from "../components/mobile/Home/Header"
import instance from "@/helper/interceptor"
import { ApiHelper } from "@/helper/api-request"

export default function NewServicePage() {
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
  const features = [
    {
      id: 1,
      icon: "/service-box-1.svg",
      title: "تجهیزات با کیفیت",
    },
    {
      id: 2,
      icon: "/service-box-1.svg",
      title: "تجهیزات با کیفیت",
    },
    {
      id: 3,
      icon: "/professiona-tools.svg",
      title: "تجهیزات با کیفیت",
    },
    {
      id: 4,
      icon: "/professional-expoerts.svg",
      title: "کارشناسان حرفه ای",
    },
  ]

  const serviceTypes = [
    {
      id: 1,
      icon: "/standard-inspection.svg",
      title: "کارشناسی استاندارد",
      description: "بررسی کامل خودروی شما با تجهیزات جدید",
      features: [
        "بررسی موتور و گیربکس",
        "بررسی سیستم برق",
        "بررسی تایرها و ترمزها",
        "بررسی سیستم سوخت",
      ],
      price: "۲۵۰,۰۰۰ تومان",
      buttonText: "انجام کارشناسی",
    },
    {
      id: 2,
      icon: "/vip-inspect.svg",
      title: "کارشناسی VIP",
      description: "بررسی جامع با خدمات اضافی و راهنمایی تخصصی",
      features: [
        "بررسی موتور و گیربکس",
        "بررسی سیستم برق",
        "بررسی تایرها و ترمزها",
        "بررسی سیستم سوخت",
      ],
      price: "۴۵۰,۰۰۰ تومان",
      buttonText: "انجام کارشناسی",
    },
  ]

  const faqs = [
    {
      id: 1,
      question: "نام سوال اول در مورد کارشناسی خودرو شما چیست؟",
      answer: "پاسخ سوال اول در مورد کارشناسی خودرو شما و کلیه جزئیات مربوط به آن.",
    },
    {
      id: 2,
      question: "نام سوال دوم در مورد کارشناسی خودرو شما چیست؟",
      answer: "پاسخ سوال دوم در مورد کارشناسی خودرو شما و کلیه جزئیات مربوط به آن.",
    },
    {
      id: 3,
      question: "نام سوال سوم در مورد کارشناسی خودرو شما چیست؟",
      answer: "پاسخ سوال سوم در مورد کارشناسی خودرو شما و کلیه جزئیات مربوط به آن.",
    },
    {
      id: 4,
      question: "نام سوال چهارم در مورد کارشناسی خودرو شما چیست؟",
      answer: "پاسخ سوال چهارم در مورد کارشناسی خودرو شما و کلیه جزئیات مربوط به آن.",
    },
    {
      id: 5,
      question: "نام سوال پنجم در مورد کارشناسی خودرو شما چیست؟",
      answer: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاری می باشد.",
    },
  ]

  return (
    <div className="font-IranSans bg-white">
          <Banner data={data?.MasterSiteData?.NavbarPhoneNumber}/>
                                   <div className="hidden lg:block px-20 mb-6 bg-transparent sticky  top-11 z-10">
                       <Header data={data?.MasterSiteData?.PhoneNumbers} />
                       </div>
      {/* Hero Section */}
      <section className="w-full lg:max-w-7xl lg:mx-auto">
        
        <div className="flex flex-col lg:flex-row items-center gap-6 px-4 py-8 lg:py-16 lg:px-12">
          {/* Left: Image */}
          <div className="w-full lg:w-1/2 h-64 lg:h-80 relative rounded-2xl overflow-hidden lg:order-1">
            <Image
              src="/services.png"
              fill
              alt="خدمات کارشناسی خودرو"
              className="object-cover"
            />
          </div>

          {/* Right: Content */}
          <div className="w-full lg:w-1/2 lg:px-8 lg:order-0">
            <h1 className="text-2xl lg:text-3xl font-bold text-[#101117] mb-4">
              سرویس عمومی و رفع مشکلات خودرو
            </h1>
            <p className="text-base lg:text-lg text-gray-700 font-light leading-relaxed mb-6">
              ما تیمی باتجربه و کارآمد داریم که با دقت و تعهد کار می‌کنه تا
              مطمئن بشیم خودروی شما همیشه در بهترین وضعیت ممکن قرار داره. در
              هر سرویس دوره‌ای، چراغ‌ها، سیستم برق و سایر قطعاتی که ممکنه
              دچار استهلاک بشن رو بررسی می‌کنیم.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-40 h-40 lg:w-24 lg:h-24 bg-secondary-background rounded-2xl flex items-center justify-center mb-2 bg-[#F0F2F4]">
                    <div className="w-24 h-24 lg:9 lg:h-9 relative">
  <Image
                      src={feature.icon}
                      alt={feature.title}
                   fill
                   className="objext-cover"
                    />
                    </div>
                  
                  </div>
                  <h3 className="text-xs lg:text-sm font-medium text-[#101117]">
                    {feature.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Types Section */}
      <section className="w-full lg:max-w-7xl lg:mx-auto px-4 py-12 lg:py-16 lg:px-12">
        <h2 className="text-2xl lg:text-3xl font-bold text-[#101117] mb-8 lg:mb-12 text-center">
          انواع خدمات کارشناسی
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {serviceTypes.map((service) => (
            <div
              key={service.id}
              className="bg-[#F0F2F4] rounded-3xl p-6 lg:p-8 flex flex-col"
            >
              {/* Icon */}
              <div className="w-24 h-24  rounded-2xl flex items-center justify-center mb-4 mx-auto relative">
                <Image
                  src={service.icon}
                  alt={service.title}
                  fill className="object-cover"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl lg:text-2xl font-bold text-[#416CEA]  mb-3 text-center">
                {service.title}
              </h3>

           

              {/* Features List */}
              <div className="space-y-3 mb-6 flex-grow">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                <p className="text-sm text-gray-600 mb-1">قیمت از</p>
                <p className="text-xl lg:text-2xl font-bold text-primary">
                  {service.price}
                </p>
              </div>

              {/* Button */}
              <Button className="w-full rounded-2xl bg-[#416CEA] hover:bg-primary/90 text-white font-bold py-2 lg:py-3">
                {service.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full lg:max-w-7xl lg:mx-auto px-4 py-12 lg:py-16 lg:px-12">
        <h2 className="text-2xl lg:text-3xl font-bold text-[#101117] mb-8 lg:mb-12 text-center">
          سوالات متداول
        </h2>

        <div className="bg-secondary-background rounded-2xl p-6 lg:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                <AccordionTrigger className="text-right hover:text-primary">
                  <span className="text-sm lg:text-base font-medium text-[#101117]">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-right">
                  <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Spacing */}
      <div className="h-8" />
    </div>
  )
}

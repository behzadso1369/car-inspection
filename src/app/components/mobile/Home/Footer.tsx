import { Clock01Icon, Location01Icon, SmartPhone01Icon } from "hugeicons-react"
import Link from "next/link"
import { EnamadBadge } from "@/components/seo/EnamadBadge"
import { SocialLinks } from "@/components/SocialLinks"

function toTelHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function parsePhoneNumbers(phoneNumbers?: string) {
  if (!phoneNumbers) return [];
  return phoneNumbers.split(/\s*[-–—/|]\s*/).map((phone) => phone.trim()).filter(Boolean);
}

function FooterPhoneNumbers({ phoneNumbers }: { phoneNumbers?: string }) {
  const phones = parsePhoneNumbers(phoneNumbers);

  return (
    <div className="flex my-3 lg:my-4">
      <SmartPhone01Icon size={24} />
      <span className="text-base mx-2">
        {phones.map((phone, index) => (
          <span key={`${phone}-${index}`}>
            <a href={toTelHref(phone)} className="hover:text-[#3456bb] transition-colors">
              {phone}
            </a>
            {index < phones.length - 1 ? " - " : ""}
          </span>
        ))}
      </span>
    </div>
  );
}

export const Footer = (data: any) => {
  
    return (
      <>
        <footer className="px-4 py-12 bg-[#F0F2F4] text-black font-IranSans w-full lg:hidden">
        <div className="flex my-3">
            <Location01Icon size={24}/>
            <span className="text-base mx-2 leading-8">{data?.data?.Address}</span>
          </div>
          <div className="flex my-3">
            <Clock01Icon size={24}/>
            <span className="text-base mx-2">{data?.data?.WorkingHours}</span>
          </div>
          <FooterPhoneNumbers phoneNumbers={data?.data?.PhoneNumbers} />
          <div className="mt-6">
            <p className="text-[#101117] font-medium mb-3">شبکه‌های اجتماعی</p>
            <SocialLinks />
          </div>
          <div className="mt-8 flex justify-between flex-wrap">
            <Link href="./faq" prefetch={false}>سوالات متداول</Link>
            <span className="w-0.5 h-3 bg-[#D9D9D9]"></span>
            <Link href="./contact-us">ارتباط با ما</Link>
            <span className="w-0.5 h-3 bg-[#D9D9D9]"></span>
            <Link href="about-us" prefetch={false}>درباره ما</Link>
            <span className="w-0.5 h-3 bg-[#D9D9D9]"></span>
            <Link href="/blog" prefetch={false}>بلاگ</Link>
            <span className="w-0.5 h-3 bg-[#D9D9D9]"></span>
            <Link href="./regulations">قوانین و مقررات</Link>

          </div>
          <div className="my-8 mx-18">
            <div className="flex justify-between">
                               <EnamadBadge />
            </div>
          </div>
          <div className="h-8 bg-white"></div>
        </footer>
        <footer className="px-4 py-12 bg-[#F0F2F4] text-black font-IranSans w-full hidden lg:flex ">
          <div>
 <div className="flex flex-wrap ">
  <h3 className="my-4 w-full text-[#101117] font-bold text-xl">اطلاعات تماس</h3>
            <Location01Icon size={24}/>
            <span className="text-base mx-2">{data?.data?.Address}</span>
          </div>
          <div className="flex my-4">
            <Clock01Icon size={24}/>
            <span className="text-base mx-2">{data?.data?.WorkingHours}</span>
          </div>
          <FooterPhoneNumbers phoneNumbers={data?.data?.PhoneNumbers} />
          <div className="mt-4">
            <h3 className="my-4 w-full text-[#101117] font-bold text-xl">شبکه‌های اجتماعی</h3>
            <SocialLinks />
          </div>
          </div>
       
          <div className="mx-16 flex flex-col">
               <h3 className="my-4 w-full text-[#101117] font-bold text-xl">دسترسی سریع</h3>
              <Link href="./regulations" className="my-1">قوانین و مقررات</Link>
           
             <Link href="about-us" prefetch={false} className="my-1">درباره ما</Link>
            
             <Link href="./contact-us" className="my-1">ارتباط با ما</Link>
            
                       <Link href="./faq" prefetch={false} className="my-1">سوالات متداول</Link>

             <Link href="/blog" prefetch={false} className="my-1">بلاگ</Link>

          </div>
          <div className="my-8 mr-96">
            <div className="flex justify-between">
                <EnamadBadge />
            </div>
          </div>
          <div className="h-8 bg-white"></div>
        </footer>
      </>
      
    )
}
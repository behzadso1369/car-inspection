import { Clock01Icon, Location01Icon, SmartPhone01Icon } from "hugeicons-react"
import Image from "next/image"
import Link from "next/link"

export const Footer = (data: any) => {
  
    return (
      <>
        <footer className="px-4 py-12 bg-[#F0F2F4] text-black font-IranSans w-full lg:hidden">
        <div className="flex my-3">
            <Location01Icon size={24}/>
            <span className="text-base mx-2">{data?.data?.Address}</span>
          </div>
          <div className="flex my-3">
            <Clock01Icon size={24}/>
            <span className="text-base mx-2">{data?.data?.WorkingHours}</span>
          </div>
          <div className="flex my-3">
            <SmartPhone01Icon size={24}/>
            <span className="text-base mx-2">{data?.data?.PhoneNumbers}</span>
          </div>
          <div className="mt-8 flex justify-between flex-wrap">
            <Link href="./faq" prefetch={false}>سوالات متداول</Link>
            <span className="w-0.5 h-3 bg-[#D9D9D9]"></span>
            <Link href="./contact-us">ارتباط با ما</Link>
            <span className="w-0.5 h-3 bg-[#D9D9D9]"></span>
            <Link href="about-us" prefetch={false}>درباره ما</Link>
            <span className="w-0.5 h-3 bg-[#D9D9D9]"></span>
            <Link href="./regulations">قوانین و مقررات</Link>

          </div>
          <div className="my-8 mx-18">
            <div className="flex justify-between">
                               <a referrerPolicy="origin" target='_blank' href='https://trustseal.enamad.ir/?id=682294&Code=2SthnI2hgSdKSbpaD83fP1MtRtbLB1wD'><img referrerPolicy="origin" src='https://trustseal.enamad.ir/logo.aspx?id=682294&Code=2SthnI2hgSdKSbpaD83fP1MtRtbLB1wD' alt='' style={{cursor: "pointer"}} /></a>
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
          <div className="flex my-4">
            <SmartPhone01Icon size={24}/>
            <span className="text-base mx-2">{data?.data?.PhoneNumbers}</span>
          </div>
          </div>
       
          <div className="mx-16 flex flex-col">
               <h3 className="my-4 w-full text-[#101117] font-bold text-xl">دسترسی سریع</h3>
              <Link href="./regulations" className="my-1">قوانین و مقررات</Link>
           
             <Link href="about-us" prefetch={false} className="my-1">درباره ما</Link>
            
             <Link href="./contact-us" className="my-1">ارتباط با ما</Link>
            
                       <Link href="./faq" prefetch={false} className="my-1">سوالات متداول</Link>

          </div>
          <div className="my-8 mr-96">
            <div className="flex justify-between">
                <a referrerPolicy="origin" target='_blank' href='https://trustseal.enamad.ir/?id=682294&Code=2SthnI2hgSdKSbpaD83fP1MtRtbLB1wD'><img referrerPolicy="origin" src='https://trustseal.enamad.ir/logo.aspx?id=682294&Code=2SthnI2hgSdKSbpaD83fP1MtRtbLB1wD' alt='' style={{cursor: "pointer"}} /></a>
            </div>
          </div>
          <div className="h-8 bg-white"></div>
        </footer>
      </>
      
    )
}
import { Clock01Icon, Location01Icon, SmartPhone01Icon } from "hugeicons-react"
import Image from "next/image"

export const Footer = () => {
    return (
      <>
        <footer className="px-4 py-12 bg-[#F0F2F4] text-black font-IranSans w-full lg:hidden">
        <div className="flex my-3">
            <Location01Icon size={24}/>
            <span className="text-base mx-2">تهران،ونک،ملاصدرا،بن‌بست صدر، پلاک ۶ واحد ۴</span>
          </div>
          <div className="flex my-3">
            <Clock01Icon size={24}/>
            <span className="text-base mx-2">شنبه تا چهارشنبه از ساعت 15-17</span>
          </div>
          <div className="flex my-3">
            <SmartPhone01Icon size={24}/>
            <span className="text-base mx-2">02191001740 - 09981982905</span>
          </div>
          <div className="mt-8 flex justify-between flex-wrap">
            <div>سوالات متداول</div>
            <span className="w-0.5 h-3 bg-[#D9D9D9]"></span>
            <div>ارتباط با ما</div>
            <span className="w-0.5 h-3 bg-[#D9D9D9]"></span>
            <div>درباره ما</div>
            <span className="w-0.5 h-3 bg-[#D9D9D9]"></span>
            <div>قوانین و مقررات</div>

          </div>
          <div className="my-8 mx-18">
            <div className="flex justify-between">
                <Image width={74} height={80} className="object-cover" src="/footer1.png" alt="enamad"/>
                <Image width={74} height={80} className="object-cover" src="/footer2.png" alt="unity"/>
                <Image width={74} height={80} className="object-cover" src="/footer3.png" alt="footer3"/>
            </div>
          </div>
          <div className="h-8 bg-white"></div>
        </footer>
        <footer className="px-4 py-12 bg-[#F0F2F4] text-black font-IranSans w-full hidden lg:flex ">
          <div>
 <div className="flex flex-wrap ">
  <h3 className="my-4 w-full text-[#101117] font-bold text-xl">اطلاعات تماس</h3>
            <Location01Icon size={24}/>
            <span className="text-base mx-2">تهران،ونک،ملاصدرا،بن‌بست صدر، پلاک ۶ واحد ۴</span>
          </div>
          <div className="flex my-4">
            <Clock01Icon size={24}/>
            <span className="text-base mx-2">شنبه تا چهارشنبه از ساعت 15-17</span>
          </div>
          <div className="flex my-4">
            <SmartPhone01Icon size={24}/>
            <span className="text-base mx-2">02191001740 - 09981982905</span>
          </div>
          </div>
       
          <div className="mx-16">
               <h3 className="my-4 w-full text-[#101117] font-bold text-xl">دسترسی سریع</h3>
            <div className="my-4">سوالات متداول</div>
           
            <div className="my-4">ارتباط با ما</div>
            
            <div className="my-4">درباره ما</div>
            
            <div className="my-4">قوانین و مقررات</div>

          </div>
          <div className="my-8 mr-96">
            <div className="flex justify-between">
                <Image width={74} height={80} className="object-cover mx-6" src="/footer1.png" alt="enamad"/>
                <Image width={74} height={80} className="object-cover mx-6" src="/footer2.png" alt="unity"/>
                <Image width={74} height={80} className="object-cover mx-6" src="/footer3.png" alt="footer3"/>
            </div>
          </div>
          <div className="h-8 bg-white"></div>
        </footer>
      </>
      
    )
}
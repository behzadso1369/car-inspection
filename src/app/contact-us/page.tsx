import { BubbleChatIcon, Call02Icon, CallRinging04Icon, Clock01Icon, Location01Icon, SmartPhone01Icon } from "hugeicons-react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
export default function ContactUs() {
    return (
        <div className="px-4 bg-white font-IranSans">
            <div className="px-8 py-3 flex justify-between  shadow-[0px_6px_20px_-2px_#10182814]">
<ArrowRight/>
     <div className="flex items-center">
 <Image alt="کارچک" width={32} height={30} src={"/assets/images/logo.svg"}/>
 <h1 className="font-IranSans-UltraLight text-xl text-black mx-1 font-semibold">کارچک</h1>
 </div>
 <span className="text-[#101117] flex items-center font-IranSans">
    
     <Call02Icon size={16}/>
 </span>



</div>
<h2 className="mt-6 mb-4 text-[#101117] text-sm">راه های ارتباطی</h2>
 <div className="flex justify-between mt-4 mb-8">
    <div className="py-4 px-12 rounded-2xl bg-[#f1f3f7] flex flex-col items-center">
        <CallRinging04Icon size={24} color="#1434CB"/>
        <span className="text-[#101117]">تماس با ما</span>
        <span className="text-[#27292D]">۰۲۱۹۱۰۰۱۷۴۰</span>
    </div>
    <div className="py-4 px-12 rounded-2xl  bg-[#f1f3f7] flex flex-col items-center">
        <BubbleChatIcon size={24} color="#1434CB"/>
        <span className="text-[#101117]">گفتگوی آنلاین</span>
        <span className="text-[#27292D] font-IranSans">09:00-18:00</span>
    </div>

 </div>
 <h1 className="text-[#101117]">اطلاعات کارچک</h1>
 <h3 className="text-[#55565A]">ما به شما کمک می‌کنیم تا بهترین کارشناسی خودرو را با بهترین قیمت تهیه کنید.</h3>
 <div className="my-4">
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
 </div>
        </div>
        

    )
}
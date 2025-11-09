import Image from "next/image";

export default function Introduction() {
    return (
        <section className="bg-secondary-background px-4 py-16 font-IranSans my-16  bg-[#F0F2F4] ">
            <h2 className="text-lg text-black text-center lg:text-2xl my-2">چرا کارچک؟</h2>
            <div className="flex  flex-wrap justify-between lg:hidden">
                <div className="w-1/3">
                    <h3 className="text-[#101117] text-sm text-center py-4 font-medium">گزارش شفاف و دقیق</h3>
                    <p className="text-xs text-[#55565A] text-center leading-6">
                    همه جزئیات فنی و بدنه با عکس و توضیحات کامل ثبت میشه؛ چیزی از چشم کارشناس پنهون نمی‌مونه.
                    </p>
                </div>
                <div className="w-1/3">
                    <h3 className="text-[#101117] text-sm text-center py-4 font-medium">کارشناسان معتبر و حرفه‌ای</h3>
                    <p className="text-xs text-[#55565A] text-center leading-6">
                    شبکه‌ای از متخصصان تأییدشده و باتجربه، تا مطمئن باشی انتخابت روی اصوله.
                    </p>
                </div>
                <div className="w-full flex justify-center">
                    <Image className="rotate-90" src={"/whycarcheck.png"} width="171" height="240" alt="چرا کارچک"/>
                </div>
                <div className="w-1/3">
                    <h3 className="text-[#101117] text-sm text-center py-4 font-medium">سریع و راحت</h3>
                    <p className="text-xs text-[#55565A] text-center leading-6">
                    ثبت درخواست آنلاین، کارشناسی در محل تو، و تحویل گزارش در کوتاه‌ترین زمان.
                    </p>
                </div>
                <div className="w-1/3">
                    <h3 className="text-[#101117] text-sm text-center py-4 font-medium">صرفه‌جویی در هزینه‌ها</h3>
                    <p className="text-xs text-[#55565A] text-center leading-6">
                    با یک بار کارشناسی، جلوی ضررهای میلیونی خرید خودروی مشکل‌دار رو بگیر
                    </p>
                </div>
                
             
            </div>
            <div className="hidden  flex-wrap  lg:flex ">
                <div className="w-1/5 mx-60">
                  <div className="w-full my-2">
                    <h3 className="text-[#101117] text-center py-4 font-medium text-2xl lg:text-justify">گزارش شفاف و دقیق</h3>
                    <p className="text-[#55565A] text-center leading-6 text-lg lg:text-justify lg:leading-8">
                    همه جزئیات فنی و بدنه با عکس و توضیحات کامل ثبت میشه؛ چیزی از چشم کارشناس پنهون نمی‌مونه.
                    </p>
                </div>
                <div className="w-full my-2">
                    <h3 className="text-[#101117]  text-center py-4 font-medium text-2xl lg:text-justify">کارشناسان معتبر و حرفه‌ای</h3>
                    <p className=" text-[#55565A] text-center leading-6 text-lg lg:text-justify lg:leading-8">
                    شبکه‌ای از متخصصان تأییدشده و باتجربه، تا مطمئن باشی انتخابت روی اصوله.
                    </p>
                </div>
                <div className="w-full my-2">
                    <h3 className="text-[#101117] text-center py-4 font-medium text-2xl lg:text-justify">سریع و راحت</h3>
                    <p className="text-[#55565A] text-center leading-6 text-lg lg:text-justify lg:leading-8">
                    ثبت درخواست آنلاین، کارشناسی در محل تو، و تحویل گزارش در کوتاه‌ترین زمان.
                    </p>
                </div>
                <div className="w-full my-2">
                    <h3 className="text-[#101117]  text-center py-4 font-medium text-2xl lg:text-justify">صرفه‌جویی در هزینه‌ها</h3>
                    <p className="text-[#55565A] text-center leading-6 text-lg lg:text-justify lg:leading-8">
                    با یک بار کارشناسی، جلوی ضررهای میلیونی خرید خودروی مشکل‌دار رو بگیر
                    </p>
                </div>
                </div>
              
                <div className="w-1/3 flex justify-center">
                    <Image src={"/whycarcheck.png"} width="348" height="489" alt="چرا کارچک"/>
                </div>
                
                
             
            </div>
            

        </section>
    )
}
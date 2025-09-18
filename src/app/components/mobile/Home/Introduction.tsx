import Image from "next/image";

export default function Introduction() {
    return (
        <section className="bg-secondary-background px-4 py-8 font-IranSans">
            <h2 className="text-lg text-black text-center ">چرا کارچک؟</h2>
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <h3 className="text-[#101117] text-sm text-center py-4 font-medium">گزارش شفاف و دقیق</h3>
                    <p className="text-xs text-[#55565A] text-center leading-6">
                    همه جزئیات فنی و بدنه با عکس و توضیحات کامل ثبت میشه؛ چیزی از چشم کارشناس پنهون نمی‌مونه.
                    </p>
                </div>
                <div>
                    <h3 className="text-[#101117] text-sm text-center py-4 font-medium">کارشناسان معتبر و حرفه‌ای</h3>
                    <p className="text-xs text-[#55565A] text-center leading-6">
                    شبکه‌ای از متخصصان تأییدشده و باتجربه، تا مطمئن باشی انتخابت روی اصوله.
                    </p>
                </div>
                <div className="col-span-2 flex justify-center">
                    <Image className="rotate-90" src={"/whycarcheck.png"} width="171" height="240" alt="چرا کارچک"/>
                </div>
                <div>
                    <h3 className="text-[#101117] text-sm text-center py-4 font-medium">سریع و راحت</h3>
                    <p className="text-xs text-[#55565A] text-center leading-6">
                    ثبت درخواست آنلاین، کارشناسی در محل تو، و تحویل گزارش در کوتاه‌ترین زمان.
                    </p>
                </div>
                <div>
                    <h3 className="text-[#101117] text-sm text-center py-4 font-medium">صرفه‌جویی در هزینه‌ها</h3>
                    <p className="text-xs text-[#55565A] text-center leading-6">
                    با یک بار کارشناسی، جلوی ضررهای میلیونی خرید خودروی مشکل‌دار رو بگیر
                    </p>
                </div>
             
            </div>
            

        </section>
    )
}
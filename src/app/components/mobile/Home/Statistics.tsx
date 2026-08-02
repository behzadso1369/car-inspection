export default function Statistics() {
    return (
        <section className="py-16 bg-white px-4 font-IranSans">
            <div className="bg-[#F0F2F4] text-black p-14 text-center rounded-4xl grid grid-cols-3">
                <p className="flex flex-col mb-12 col-span-3 lg:col-span-1">
                    <strong className="text-5xl font-medium">۵۷۵۳</strong>
                    <strong className="text-[#55565A] text-lg font-medium mt-1">کارشناسی انجام‌شده</strong>
                </p>
                <p className="flex flex-col mb-12 col-span-3 lg:col-span-1">
                    <strong className="text-5xl font-medium">۹۵٪</strong>
                    <strong className="text-[#55565A] text-lg font-medium mt-1">رضایت مشتریان</strong>
                </p>
                <p className="flex flex-col col-span-3 lg:col-span-1">
                    <strong className="text-3xl font-medium leading-tight md:text-4xl">نهایتا یک ساعت</strong>
                    <strong className="text-[#55565A] text-lg font-medium mt-1">میانگین زمان اعزام به محل</strong>
                </p>
            </div>
        </section>
    )
}

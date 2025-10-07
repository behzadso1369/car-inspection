export default function Statistics({data}:any) {
    return (
        <section className="py-16 bg-white px-4 font-IranSans">
            <div className="bg-[#F0F2F4] text-black p-14 text-center rounded-4xl">
                <p className="flex flex-col mb-12">
                    <strong className="text-5xl font-medium">{data?.CarInspectionCount}</strong>
                    <strong className="text-[#55565A] text-lg font-medium mt-1">خودرو کارشناسی شده</strong>
                </p>
                <p className="flex flex-col mb-12">
                    <strong className="text-5xl font-medium">{data?.CustomerSatisfactionPercentage} %</strong>
                    <strong className="text-[#55565A] text-lg font-medium mt-1">پیشنهاد مشتریان</strong>
                </p>
                <p className="flex flex-col">
                    <strong className="text-5xl font-medium">{data?.CustomerSuggestionPercentage} %</strong>
                    <strong className="text-[#55565A] text-lg font-medium mt-1">رضایت مشتریان</strong>
                </p>

            </div>
        </section>
    )
}
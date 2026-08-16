export default function Banner (_props?: { data?: unknown }) {
    return (
        <header className="bg-primary banner-bg-pattern py-2 px-4 h-11 text-white flex justify-between items-center sticky top-0 z-20">
            <div className="flex items-center">
            <img src="/car-approved.svg" width={24} height={24} alt="" aria-hidden="true"/>
            <strong className="font-IranSans text-[#FFFBFB] text-sm mx-1 font-normal">کارشناسی خودرو در کمترین زمان</strong>
            </div>
            <a className="rounded-3xl font-IranSans border border-white px-2" href="/car-inspection">رزرو کارشناس</a>
        </header>
    )
}

export default function Banner (_props?: { data?: unknown }) {
    return (
        <header className="bg-primary banner-bg-pattern px-3 sm:px-4 h-11 text-white flex justify-between items-center sticky top-0 z-[60] gap-2">
            <div className="flex items-center min-w-0">
            <img src="/car-approved.svg" width={24} height={24} alt="" aria-hidden="true" className="shrink-0"/>
            <strong className="font-IranSans text-[#FFFBFB] text-[11px] sm:text-sm mx-1 font-bold whitespace-nowrap">
              یک میلیون تخفیف کارشناسی خودرو
            </strong>
            </div>
            <a
              className="banner-cta shrink-0 inline-flex items-center gap-1 rounded-full font-IranSans font-bold text-[11px] sm:text-sm leading-none bg-[#FFD54F] text-[#1A237E] px-3.5 py-2 hover:bg-[#FFC107] hover:scale-[1.04] active:scale-[0.97] transition-transform"
              href="/car-inspection"
            >
              رزرو کارشناس
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M7.5 2.5 4 6l3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
        </header>
    )
}

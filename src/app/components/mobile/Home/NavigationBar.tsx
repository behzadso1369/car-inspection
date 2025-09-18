import { Home01Icon } from "hugeicons-react"
import Image from "next/image"
import Link from "next/link"

export const NavigationBar = () => {
    return (


        <nav className="fixed font-IranSans w-11/12 left-1/2 transform -translate-x-1/2 bottom-8 h-16 px-8 bg-[#f6f6f6] rounded-2xl shadow-[0px_4px_8px_0px_#00000014] flex justify-between items-center">
        <Link className="flex flex-col text-[#999A9C] active:text-[#416CEA]" href="/">
        <Home01Icon size={24}/>
        <span className="text-xs my-1">خانه</span>
        </Link>
        <Link className="flex flex-col items-center justify-between text-[#999A9C] active:text-[#416CEA]" href="/flow">
        <Image alt="کارشناسی خودرو" src="/car-inspection.svg" width={24} height={24}/>
        <span className="text-xs my-1">کارشناسی خودرو</span>
        </Link>
        <Link className="flex flex-col   justify-between items-center text-[#999A9C] active:text-[#416CEA]" href="/test">
        <Image alt="کارشناسی خودرو" src="/car-service.svg" width={24} height={24}/>
        <span className="text-xs my-1">خدمات کارچک</span>
        </Link>
        <Link className="flex flex-col justify-between items-center text-[#999A9C] active:text-[#416CEA]" href="/test">
        <Image alt="کارشناسی خودرو" src="/profile.svg" width={24} height={24}/>
        <span className="text-xs my-1">پروفایل</span>
        </Link>
        </nav>
    )
}
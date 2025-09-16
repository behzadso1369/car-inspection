import { Home01Icon } from "hugeicons-react"
import Link from "next/link"

export const NavigationBar = () => {
    return (


        <nav className="fixed w-11/12 left-1/2 transform -translate-x-1/2 bottom-12 h-16 px-8 bg-[#f6f6f6] rounded-2xl shadow-[0px_4px_8px_0px_#00000014] flex justify-between items-center">
        <Link className="flex flex-col text-[#999A9C] active:text-[#416CEA]" href="/">
        <Home01Icon size={24}/>
        <span>خانه</span>
        </Link>
        <Link className="flex flex-col text-[#999A9C] active:text-[#416CEA]" href="/flow">
        <Home01Icon size={24}/>
        <span>خانه</span>
        </Link>
        <Link className="flex flex-col text-[#999A9C] active:text-[#416CEA]" href="/test">
        <Home01Icon size={24} />
        <span>خانه</span>
        </Link>
        <Link className="flex flex-col text-[#999A9C] active:text-[#416CEA]" href="/test">
        <Home01Icon size={24}/>
        <span>خانه</span>
        </Link>
        </nav>
    )
}
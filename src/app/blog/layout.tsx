import { Call02Icon } from "hugeicons-react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import BlogFooter from "./components/BlogFooter";

export default function BlogLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div>
                 <div className="px-8 py-3 flex justify-between   shadow-[0px_6px_20px_-2px_#10182814]">
           <ArrowRight/>
                <div className="flex items-center">
            <Image alt="کارماچک" width={32} height={30} src={"/assets/images/logo.svg"}/>
            <h1 className="font-IranSans-UltraLight text-xl text-black mx-1 font-semibold">کارماچک</h1>
            </div>
            <span className="text-[#101117] flex items-center font-IranSans">
               
                <Call02Icon size={16}/>
            </span>


        </div>
        {children}
        <BlogFooter/>
        </div>
    )
}
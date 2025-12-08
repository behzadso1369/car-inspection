import { Facebook01Icon, FaceIdIcon, InstagramIcon, Pulse01Icon, TwitterIcon, WhatsappIcon } from "hugeicons-react";
import { PlusIcon } from "lucide-react";

export default function BlogFooter() {
    return (
        <div className="font-IranSans px-4">
            <h3 className="text-[#416CEA] text-xl font-medium">فروشگاه کارماچک</h3>
            <h4 className="text-[#101117] font-medium border-b py-6 border-[#A6A6A6] ">کارشناسی خودرو</h4>
            <div className="flex justify-between text-[#101117] font-medium mt-6 mb-12">
                <h5>لینک های پر کاربرد</h5>
                <PlusIcon size={24}/>
            </div>
            <div className="social-media flex justify-end mb-6">
                <WhatsappIcon size={24} className="mx-2"/>
                <InstagramIcon size={24} className="mx-2"/>
                <Facebook01Icon size={24} className="mx-2"/>
                <TwitterIcon size={24} className="mx-2"/>

            </div>
        </div>
    )
}
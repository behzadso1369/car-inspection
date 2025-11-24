import { Button } from "@/components/ui/button";
import { CheckmarkCircle01Icon } from "hugeicons-react";
import Link from "next/link";

export default function QualityBox({data}:any) {

    
    return (
        <div className="bg-quality bg-center w-full py-8 px-4  font-IranSans">
            <div className="bg-[#151313E5] text-white py-8 px-4 rounded-4xl w-full lg:w-2/5">
                <h6 className="my-3 text-lg">{data?.Title}</h6>
                <p className="my-3 text-base leading-8">
{data?.MoreDescription}
                </p>
                <ul className="my-3">
                    <li className="my-3 text-lg flex">
                        <CheckmarkCircle01Icon color="#416CEA" size={24}/>
                        <strong className="mx-2 font-normal">ارتقا چرخ و لاستیک</strong>
                    </li>
                    <li className="my-3 text-lg flex">
                        <CheckmarkCircle01Icon color="#416CEA" size={24}/>
                        <strong className="mx-2 font-normal">بازرسی و تعمیر ترمزها</strong>
                    </li>
                    <li className="my-3 text-lg flex">
                        <CheckmarkCircle01Icon color="#416CEA" size={24}/>
                        <strong className="mx-2 font-normal">سرویس و تعویض روغن موتور</strong>
                    </li>
                    <li className="my-3 text-lg flex">
                        <CheckmarkCircle01Icon color="#416CEA" size={24}/>
                        <strong className="mx-2 font-normal">بازرسی و تعمیر ترمزها</strong>
                    </li>

                </ul>
                <Link href="./car-inspection-flow/select-car-group" prefetch={false}  className="rounded-3xl py-3 px-4 inline-block text-center w-full my-4 bg-[#416CEA] text-white">رزرو کارشناسی</Link>
            </div>
            
        </div>
    )
}
import { Button } from "@/components/ui/button";
import { CheckmarkCircle01Icon } from "hugeicons-react";

export default function QualityBox({data}:any) {

    
    return (
        <div className="bg-quality bg-center py-8 px-4 w-full font-IranSans">
            <div className="bg-[#15131399] text-white py-8 px-4 rounded-4xl">
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
                <Button  className="rounded-3xl h-11 w-full my-4 bg-[#416CEA] text-white">رزرو کارشناسی</Button>
            </div>
            
        </div>
    )
}
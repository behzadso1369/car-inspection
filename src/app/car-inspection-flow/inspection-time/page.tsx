import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useState } from "react";
import InLocation from "../inspection-location/InLocation";
import InWorkShop from "../inspection-location/InWorkShop";

export default function InspectionTime() {
     const [openModal, setOpenModal] = useState(false);
       const [selected, setSelected] = useState("1");
    return (
           <div className="bg-white font-IranSans">
              
            <div className="px-4">
                <div className="bg-white  px-4 py-6 rounded-3xl my-6">

                    <div className="flex">
                        <div>chart</div>
                        <div>
       <h3 className="text-base text-black my-2 font-medium">مرحله چهارم :  محل کارشناسی</h3>
       <h4 className="text-[#55565A] font-light text-sm"> بعدی:   انتخاب زمان کارشناسی</h4>
       

                        </div>
                 
                    </div>

                

                </div>

            </div>
            <Tabs defaultValue="در محل شما" className="w-full bg-white py-6 font-IranSans px-4" dir="rtl">
        <TabsList  className="px-2 w-full" >
          <TabsTrigger className=" text-[#A6A6A6] data-[state=active]:!border-b data-[state=active]:border-b-[#416CEA]     px-4 mx-2" value="در محل شما">در محل شما</TabsTrigger>
          <TabsTrigger className="text-[#A6A6A6]  data-[state=active]:!border-b  data-[state=active]:border-b-[#416CEA]          px-4 mx-2" value="حضور در شعبه">حضور در شعبه</TabsTrigger>

        </TabsList>
        <TabsContent value="در محل شما">
            <InLocation/>
        </TabsContent>
        <TabsContent value="حضور در شعبه">
            <InWorkShop/>
        </TabsContent>
       
      </Tabs>
            </div>
    )
}
       
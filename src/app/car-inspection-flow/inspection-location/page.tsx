"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import OpenSheet from "../CarGroupSheet";
import { RadioGroup } from "@/components/ui/radio-group";
import { Edit3Icon } from "lucide-react";
import Link from "next/link";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import InWorkShop from "./InWorkShop";
import InLocation from "./InLocation";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
import DirectionsMap from "./workshop-map/page";
import { useRouter } from "next/navigation";


export default function InsertInformation() {
     const [locations, setLocations] = useState<any>([]);
     const [defaultTab,setDefaultTab] = useState<string>("");
     const router = useRouter();
          const moveToCarInspectionTime = () => {
        const params:any = {
                      "isBack": false,
              "orderId": Number(localStorage.getItem("OrderId")),
              "carInspectionLocationTypeId":defaultTab

        }
      
     
         instance.post(ApiHelper.get("MovePrivateOrder"),params)
        .then((res:any) => {
         if(res) {
             router.push("./inspection-time")
         }
        
            
        }).catch((err:any) => {
          console.log(err)
        })
       }
  
      
       const getCarInspectionLocationData = () => { 
        instance.get(ApiHelper.get("GetCarInspectionLocationData")).then((res:any) => {
            setDefaultTab(res?.CarInspectionLocationPage[0].Id)
            
setLocations(res?.CarInspectionLocationPage);
        })
       }
       useEffect(() => {
        getCarInspectionLocationData();
       },[])
    return (
          <div className="bg-white font-IranSans lg:px-4 lg:py-4">
              
            <div className="px-4">
                <div className="bg-white  px-4 py-6 rounded-3xl my-6">

                    <div className="flex items-center">
                          <div className="aspect-[2] relative w-16 h-8 ml-4">
                                                                             <Image src="/step2.png" alt="step2.png" fill className="object-fill"/>
                                                                       </div>
                        <div>
       <h3 className="text-base text-black my-2 font-medium">مرحله چهارم :  محل کارشناسی</h3>
       <h4 className="text-[#55565A] font-light text-sm"> بعدی:   انتخاب زمان کارشناسی</h4>
       

                        </div>
                 
                    </div>

                

                </div>

            </div>
           <div className="flex ">
               <Image src="/sample-car.png" width={74} height={74} alt="کارشناسی خودرو"/> 
               <div className="flex flex-col text-base text-[#101117] mx-4">
                   <span>خودرو سواری 206 اتومات</span>
                   <span>مالک : محیا محمودی</span>
               </div>
           
           </div>
           <div>
            <h1>رزرو کارشناسی</h1>
                          <Tabs    value={defaultTab}
      onValueChange={setDefaultTab} className="w-full bg-white py-6 font-IranSans px-4" dir="rtl">
          
  <TabsList onChange={(e:any) => console.log(e)}  className="px-2 w-full" >

      {locations.map((item:any) => (
          <TabsTrigger className=" text-[#A6A6A6] data-[state=active]:!border-b data-[state=active]:border-b-[#416CEA]     px-4 mx-2" value={item.Id}>{item.Name}</TabsTrigger>

     ))}
                        <TabsTrigger disabled className=" text-[#A6A6A6] data-[state=active]:!border-b data-[state=active]:border-b-[#416CEA]     px-4 mx-2" value="0">در محل شما</TabsTrigger>

        </TabsList>
       

      
        <TabsContent value="0">
            <InLocation/>
        </TabsContent>
        {locations.map((item:any) => (
    <TabsContent value={item.Id}>
            <InWorkShop LocationTypeDescription={item.LocationTypeDescription}/>
        </TabsContent>
        ))}
    
       
      </Tabs>
           </div>
             <div className="px-4 lg:my-4 lg:static lg:mt-8 w-full fixed flex justify-center  bottom-0 b-white   shadow-[0px_4px_32px_0px_#CBD5E0] py-5">
                               
                              <Button onClick={moveToCarInspectionTime} type="submit" className="bg-[#416CEA] text-white rounded-3xl py-6 px-12 w-full" >
                            تایید محل کارشناسی
                         </Button>
                               
                      
                           
           
                       </div>
                 
          
             
                 
          </div>
    )
}
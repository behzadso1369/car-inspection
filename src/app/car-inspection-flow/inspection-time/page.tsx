"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useEffect, useState } from "react";
import InLocation from "../inspection-location/InLocation";
import InWorkShop from "../inspection-location/InWorkShop";
import instance from "@/helper/interceptor";
import { ApiHelper } from "@/helper/api-request";
import InspectionDateTypeCar from "./inspectionDateTypeCar";
import { RadioGroup } from "@/components/ui/radio-group";

export default function InspectionTime() {
       const [selected, setSelected] = useState("");
       const [carInspectionDateType,setCarInspectionDateType] = useState<any>([]);
       const [carInspectionDateTime,setCarInspectionDateTime] = useState<any>([]);
            const [defaultTab,setDefaultTab] = useState<string>("");
         const GetCarInspectionDateTime = () => {
        instance.get(ApiHelper.get("GetCarInspectionDateAndTime"))
        .then((res:any) => {
            debugger
            setCarInspectionDateTime(res);
              if (res?.length > 0) {
        setSelected(String(res[0].Id));
      }
            
        }).catch((err:any) => {
          console.log(err)
        })
       }
         const GetCarInspectionDateType = () => {
        instance.get(ApiHelper.get("GetCarInspectionDateType"))
        .then((res:any) => {
            
            setCarInspectionDateType(res?.CarInspectionDateTypes);
              if (res?.CarInspectionDateTypes?.length > 0) {
                
        setSelected(String(res?.CarInspectionDateTypes?.[0]?.Id));
      }
            
        }).catch((err:any) => {
          console.log(err)
        })
       }
       useEffect(()=>{
        GetCarInspectionDateType();
        GetCarInspectionDateTime();
       },[])
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
            <div className="px-4">
                           <RadioGroup  value={selected} onValueChange={setSelected}>
                              {carInspectionDateType.map((item:any) => (
                    <InspectionDateTypeCar inspectionType={selected} data={item} selected={selected} onSelect={setSelected}  />

                ))}
                           </RadioGroup>
              

            </div>
                            <Tabs    value={defaultTab}
      onValueChange={setDefaultTab} className="w-full bg-white py-6 font-IranSans px-4" dir="rtl">
          
  <TabsList onChange={(e:any) => console.log(e)}  className="px-2 w-full" >

      {carInspectionDateTime.map((item:any) => (
          <TabsTrigger className=" text-[#A6A6A6] data-[state=active]:!border-b data-[state=active]:border-b-[#416CEA]     px-4 mx-2" value={item.Id}>{item.Name}</TabsTrigger>

     ))}
                        <TabsTrigger disabled className=" text-[#A6A6A6] data-[state=active]:!border-b data-[state=active]:border-b-[#416CEA]     px-4 mx-2" value="0">در محل شما</TabsTrigger>

        </TabsList>
       

      
        <TabsContent value="0">
            <InLocation/>
        </TabsContent>
        {carInspectionDateTime.map((item:any) => (
    <TabsContent value={item.Id}>
            <InWorkShop LocationTypeDescription={item.LocationTypeDescription}/>
        </TabsContent>
        ))}
    
       
      </Tabs>
            </div>
    )
}
       
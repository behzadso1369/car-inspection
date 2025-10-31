"use client";
import { Dialog } from "@/components/ui/dialog";
import { Clock01Icon, Location01Icon, SmartPhone01Icon } from "hugeicons-react";
import { useState } from "react";
import DirectionsMap from "./workshop-map/page";
import { Button } from "@/components/ui/button";

export default function InWorkShop({LocationTypeDescription}:any) {
     const [openModal,setOpenModal] = useState<boolean>(false);
      return(
        <div className="my-4">
 <div className="flex my-3">
            <Location01Icon size={24}/>
            <span className="text-base mx-2">{LocationTypeDescription}</span>
          </div>
          {/* <div className="flex my-3">
            <Clock01Icon size={24}/>
            <span className="text-base mx-2">شنبه تا چهارشنبه از ساعت 15-17</span>
          </div>
          <div className="flex my-3">
            <SmartPhone01Icon size={24}/>
            <span className="text-base mx-2">02191001740 - 09981982905</span>
          </div> */}
           <div className="flex my-3">
           
            <Button onClick={() => setOpenModal(true)}>مشاهده آدرس</Button>
          </div>
                 <Dialog open={openModal}>
                       
                                     <DirectionsMap/>
                                    </Dialog>
 </div>
    )
}
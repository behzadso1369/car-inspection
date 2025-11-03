import Image from "next/image";

export default function FinalConfirm() {
    return (
              <div className="bg-white font-IranSans">
                      
                    <div className="px-4">
                        <div className="bg-white  px-4 py-6 rounded-3xl my-6">
        
                            <div className="flex items-center">
                                  <div className="aspect-[2] relative w-16 h-8 ml-4">
                                                                                     <Image src="/step-5.png" alt="step2.png" fill className="object-fill"/>
                                                                               </div>
                                <div>
               <h3 className="text-base text-black my-2 font-medium">مرحله چهارم :  محل کارشناسی</h3>
               <h4 className="text-[#55565A] font-light text-sm"> بعدی:   انتخاب زمان کارشناسی</h4>
               
        
                                </div>
                         
                            </div>
        
                        
        
                        </div>
        
                    </div>
                    </div>
    )
}
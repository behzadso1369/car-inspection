'use client';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowRight, X } from 'lucide-react';
import instance from '@/helper/interceptor';
import { ApiHelper } from '@/helper/api-request';

export default function OpenSheet({inputValue,setInputValue,openModal,setOpenModal,moveToInspectionMethod}:any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [brands,setBrands] = useState([]);
  const [carGroups,setCarGroups] = useState([]);
  const [showGroup,setShowGroups] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const getAllData = useCallback((e:any) => {
    setSearchTerm(e);
                   instance.get(ApiHelper.get("GetAllData") + "?terms=" + e)
      .then((res: any) => {


        setBrands(res?.Results.filter((item:any) => item.IsCarBrand == 1));
        setCarGroups(res?.Results.filter((item:any) => item.IsCarBrand == 0));
      })
      .catch((err: any) => {
        console.error("Error fetching data:", err);
      });

            }, []);

  const resetSheet = useCallback(() => {
    setShowGroups(false);
    setSearchTerm("");
    getAllData("");
  }, [getAllData]);
          
            useEffect(() => {
              getAllData("");

            }, [getAllData])

  useEffect(() => {
    if (!openModal) {
      resetSheet();
    }
  }, [openModal, resetSheet]);

  const getGroupById = (id:any) => {
     instance.get(ApiHelper.get("GetCarGroupWithBrandId") + "?CarBrandId=" + id)
      .then((res: any) => {
      
        
        
        setCarGroups(res?.CarGroups);
      })
      .catch((err: any) => {
        console.error("Error fetching data:", err);
      });

  }

  const backToBrands = () => {
    setShowGroups(false);
    setSearchTerm("");
    setCarGroups([]);
  };

  return (
<DialogContent showCloseButton={false} className="w-screen h-full overflow-auto  max-w-none p-0 border-none  bg-white font-IranSans">
            <DialogClose className="absolute top-4 right-4 z-10 rounded-full p-1 text-[#101117] opacity-80 transition-opacity hover:opacity-100 focus:outline-none">
              <X size={32} strokeWidth={2.25} />
              <span className="sr-only">بستن</span>
            </DialogClose>
            {showGroup && !searchTerm && (
              <button
                type="button"
                onClick={backToBrands}
                className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-[#416CEA]/30 bg-[#416CEA]/10 px-3.5 py-2 text-xs font-semibold text-[#416CEA] shadow-sm transition-all hover:bg-[#416CEA] hover:text-white hover:shadow-md active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#416CEA]/40"
              >
                <ArrowRight size={16} strokeWidth={2.5} />
                بازگشت به برند خودرو
              </button>
            )}
            <div className="px-4">
 <DialogHeader>
            <DialogTitle className="text-base text-[#101117] font-medium flex justify-center py-4 font-bold ">انتخاب خودرو</DialogTitle>
            
          </DialogHeader>
            <div className='my-4 py-6'>
                                    <Label className="text-sm font-light text-[#101117] ">نام خودرو</Label>
                                    <Input  value={searchTerm} onChange={(e:any) => {
                                      getAllData(e.target.value);
                                      if (!e.target.value.trim()) {
                                        setShowGroups(false);
                                      }
                                    }}              placeholder="جستجو" className="items-center !py-4 border border-[#DFDFDF] rounded-full text-[#55565A]  text-xs my-4"/>
            </div>
            {searchTerm ? (
              // Show both brands and carGroups when searching
              <div className='w-full'>
                {brands?.map((item:any) => (
                  <div key={`brand-${item.Id}`} className="flex w-full items-center my-4 border-b border-[#CFCFD0] py-2" onClick={() => {
                    setSearchTerm("");
                    setShowGroups(true);
                    getGroupById(item.Id);
                  }}>
                     <Image width={25} height={25} src={"https://api.carmacheck.com/" + item.ImagePath} alt={item.Name}/>
                  <span className='mx-2'>{item.Name}</span>
                  <span className='text-xs text-gray-500 mr-auto'>برند</span>
                  </div>
                ))}
                {carGroups?.map((item:any) => (
                  <div key={`group-${item.Id}`} className="flex w-full items-center my-4 border-b border-[#CFCFD0] py-2" onClick={() => {
                    setInputValue({name: item.Name,value:item.Id});
                    // فراخوانی مستقیم moveToInspectionMethod با carGroupId
                    if (moveToInspectionMethod) {
                      moveToInspectionMethod(item.Id);
                    }
                  }}>
                     <Image width={25} height={25} src={"https://api.carmacheck.com/" + item.ImagePath} alt={item.Name}/>
                  <span className='mx-2'>{item.Name}</span>
                  <span className='text-xs text-gray-500 mr-auto'>گروه خودرو</span>
                  </div>
                ))}
              </div>
            ) : !showGroup ? (
              // Default behavior: show brands first
              <div className='w-full'>
                {brands?.map((item:any) => (
                  <div key={item.id} className="flex w-full items-center my-4 border-b border-[#CFCFD0] py-2" onClick={(e:any) => {
                    setShowGroups(true);
                    getGroupById(item.Id);
                  } }>
                     <Image width={25} height={25} src={"https://api.carmacheck.com/" + item.ImagePath} alt={item.Name}/>
                  <span className='mx-2'>{item.Name}</span>
                  </div>
                ))}
              </div>
            ) : (
              // Show carGroups when a brand is selected
              <div className='w-full'>
                {carGroups?.map((item:any) => (
                  <div key={item.id} className="flex w-full items-center my-4 border-b border-[#CFCFD0] py-2" onClick={() => {
                    setInputValue({name: item.Name,value:item.Id});
                    // فراخوانی مستقیم moveToInspectionMethod با carGroupId
                    if (moveToInspectionMethod) {
                      moveToInspectionMethod(item.Id);
                    }
                  }}>
                     <Image width={25} height={25} src={"https://api.carmacheck.com/" + item.ImagePath} alt={item.Name}/>
                  <span className='mx-2'>{item.Name}</span>
                  </div>
                ))}
              </div>
            )}
           
     
    
    
            </div>
          
        </DialogContent>
  );
}
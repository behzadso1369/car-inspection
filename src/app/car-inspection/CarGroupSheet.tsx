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
<DialogContent showCloseButton={false} className="fixed top-1/2 left-1/2 z-[200] -translate-x-1/2 -translate-y-1/2 flex !flex-col !gap-0 w-[calc(100%-2rem)] max-w-lg h-[min(90dvh,800px)] max-h-[90dvh] overflow-hidden p-0 border border-[#DFDFDF] rounded-2xl bg-white font-IranSans shadow-lg">
            <DialogHeader className="shrink-0 space-y-0 bg-white border-b border-[#EFEEF0] p-0 text-center">
              <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 px-3 py-3 min-h-14">
                <div className="flex justify-start min-w-0">
                  {showGroup && !searchTerm && (
                    <button
                      type="button"
                      onClick={backToBrands}
                      className="inline-flex max-w-full items-center gap-1 rounded-full border border-[#416CEA]/30 bg-[#416CEA]/10 px-2.5 py-1.5 text-[11px] sm:text-xs font-semibold text-[#416CEA] shadow-sm transition-all hover:bg-[#416CEA] hover:text-white hover:shadow-md active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#416CEA]/40"
                    >
                      <ArrowRight size={14} strokeWidth={2.5} className="shrink-0" />
                      <span className="truncate">بازگشت به برند</span>
                    </button>
                  )}
                </div>
                <DialogTitle className="text-sm sm:text-base text-[#101117] font-bold whitespace-nowrap px-1">
                  انتخاب خودرو
                </DialogTitle>
                <div className="flex justify-end">
                  <DialogClose className="rounded-full p-1 text-[#101117] opacity-80 transition-opacity hover:opacity-100 focus:outline-none">
                    <X size={28} strokeWidth={2.25} />
                    <span className="sr-only">بستن</span>
                  </DialogClose>
                </div>
              </div>
            </DialogHeader>
            <div className="min-h-0 flex-1 overflow-y-auto px-4 pt-4 pb-6">
            <div className="mb-2">
                                    <Label className="text-sm font-light text-[#101117] ">نام خودرو</Label>
                                    <Input  value={searchTerm} onChange={(e:any) => {
                                      getAllData(e.target.value);
                                      if (!e.target.value.trim()) {
                                        setShowGroups(false);
                                      }
                                    }}              placeholder="جستجو" className="items-center !py-4 border border-[#DFDFDF] rounded-full text-[#55565A] placeholder:text-[#C5C9D3] text-base mt-2 mb-4"/>
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
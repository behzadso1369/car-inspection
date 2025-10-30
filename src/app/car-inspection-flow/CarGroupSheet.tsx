'use client';
import { useEffect, useState } from 'react';
import { Sheet } from 'react-modal-sheet';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { DialogDescription } from '@radix-ui/react-dialog';
import instance from '@/helper/interceptor';
import { ApiHelper } from '@/helper/api-request';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function OpenSheet({inputValue,setInputValue}:any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products,setProducts] = useState<any>([]);
  const [disableDrag,setDisableDrag] = useState<boolean>(false);
  const [brands,setBrands] = useState([]);
  const [carGroups,setCarGroups] = useState([]);
  const [showGroup,setShowGroups] = useState(false);

  
  const pathname = usePathname()
  const currentLocale = pathname.split('/')[1]
  const getAllData = (e:any) => {
    
                   instance.post(ApiHelper.get("GetAllData"),{
                    terms:e
                   })
      .then((res: any) => {
      
        
        setBrands(res?.Results.filter((item:any) => item.IsCarBrand == 1));
        setCarGroups(res?.Results.filter((item:any) => item.IsCarBrand == 0));
      })
      .catch((err: any) => {
        console.error("Error fetching data:", err);
      });

            }
          
            useEffect(() => {
              getAllData("");
            
            },[])

  const getGroupById = (id:any) => {
     instance.get(ApiHelper.get("GetCarGroupWithBrandId") + "?CarBrandId=" + id)
      .then((res: any) => {
      
        
        
        setCarGroups(res?.CarGroups);
      })
      .catch((err: any) => {
        console.error("Error fetching data:", err);
      });

  }

  return (
<DialogContent className="w-screen h-screen overflow-auto  max-w-none p-0 border-none  bg-white font-IranSans">
            <div className="px-4">
 <DialogHeader>
            <DialogTitle className="text-base text-[#101117] font-medium">انتخاب خودرو</DialogTitle>
            
          </DialogHeader>
            <div className='my-4 py-6'>
                                    <Label className="text-sm font-light text-[#101117] ">نام خودرو</Label>
                                    <Input  onChange={(e:any) => getAllData(e.target.value)}              placeholder="جستجو" className="items-center !py-4 border border-[#DFDFDF] rounded-full text-[#55565A]  text-xs my-4"/>
            </div>
            {!showGroup ? <div className='w-full'>
 {brands?.map((item:any) => (

          <div key={item.id} className="flex w-full items-center my-4 border-b border-[#CFCFD0] py-2" onClick={(e:any) => {
            setShowGroups(true);
            getGroupById(item.Id);
          } }>
             <Image width={25} height={25} src={"https://api.carmacheck.com/" + item.ImagePath} alt={item.Name}/>
          <span className='mx-2'>{item.Name}</span>
          </div>
         
    
      ))}
           </div> : <div className='w-full'>
 {carGroups?.map((item:any) => (

          <div key={item.id} className="flex w-full items-center my-4 border-b border-[#CFCFD0] py-2" onClick={() => {
            setInputValue({name: item.Name,value:item.Id})
          }}>
             <Image width={25} height={25} src={"https://api.carmacheck.com/" + item.ImagePath} alt={item.Name}/>
          <span className='mx-2'>{item.Name}</span>
          </div>
         
    
      ))}
           </div>}
           
     
    
    
            </div>
          
        </DialogContent>
  );
}
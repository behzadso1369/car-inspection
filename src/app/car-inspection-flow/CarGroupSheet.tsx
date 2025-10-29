'use client';
import { useEffect, useState } from 'react';
import { Sheet } from 'react-modal-sheet';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';

export default function OpenSheet({ isOpen, setIsOpen }:any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products,setProducts] = useState<any>([]);
  const [disableDrag,setDisableDrag] = useState<boolean>(false);
  const pathname = usePathname()
  const currentLocale = pathname.split('/')[1]



  return (
    <Sheet 
    disableDrag={disableDrag}
    
 
    
    isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <Sheet.Container>
        <Sheet.Header onPanStart={() => setDisableDrag(false)}/>
        <Sheet.Content  onPanStart={() => setDisableDrag(true)} className="overflow-y-auto  font-IranSans" >
            <div className="px-4">
 <h2>انتخاب خودرو</h2>
            <div className='my-4'>
                                    <Label className="text-sm font-light text-[#101117] ">نام خودرو</Label>
                                    <Input                 onClick={() => setIsOpen(true)} placeholder="جستجو" className="items-center !py-4 border border-[#DFDFDF] rounded-full text-[#55565A]  text-xs my-4"/>
            </div>
            </div>
          
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={() => setIsOpen(false)} />
    </Sheet>
  );
}
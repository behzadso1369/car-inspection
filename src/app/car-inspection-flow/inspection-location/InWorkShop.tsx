import { Clock01Icon, Location01Icon, SmartPhone01Icon } from "hugeicons-react";
import Link from "next/link";

export default function InWorkShop() {
      return(
        <div className="my-4">
 <div className="flex my-3">
            <Location01Icon size={24}/>
            <span className="text-base mx-2">تهران،ونک،ملاصدرا،بن‌بست صدر، پلاک ۶ واحد ۴</span>
          </div>
          <div className="flex my-3">
            <Clock01Icon size={24}/>
            <span className="text-base mx-2">شنبه تا چهارشنبه از ساعت 15-17</span>
          </div>
          <div className="flex my-3">
            <SmartPhone01Icon size={24}/>
            <span className="text-base mx-2">02191001740 - 09981982905</span>
          </div>
           <div className="flex my-3">
           
            <Link href="./" className="text-base mx-2">مشاهده آدرس</Link>
          </div>
 </div>
    )
}
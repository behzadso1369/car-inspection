import Image from "next/image"

export const Header = () => {
    return (


        <header  className="w-full shadow-[0px_4px_32px_0px_#CBD5E099] px-8 py-8 bg-white rounded-b-3xl">
     
                      <div className="flex items-center">
                            <Image alt="کارچک" width={32} height={30} src={"/assets/images/logo.svg"}/>
                            <h1 className="font-IranSans-UltraLight text-xl text-black mx-1 font-semibold">کارچک</h1>
                            </div>


          
            
        </header>
    )
}
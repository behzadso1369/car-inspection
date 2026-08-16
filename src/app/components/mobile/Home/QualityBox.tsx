import Image from "next/image";

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="#416CEA" strokeWidth="1.6" />
      <path d="M8 12.2 10.6 15 16 9.5" stroke="#416CEA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function QualityBox({data}:any) {
    return (
        <div className="relative w-full overflow-hidden py-8 px-4 font-IranSans">
            <Image
                src="/service-background.webp"
                alt=""
                fill
                className="object-cover object-center"
                sizes="100vw"
                quality={70}
                loading="lazy"
            />
            <div className="relative z-10 bg-[#151313E5] text-white py-8 px-4 rounded-4xl w-full lg:w-2/5">
                <h2 className="my-3 text-lg">{data?.Title}</h2>
                <p className="my-3 text-base leading-8">
{data?.MoreDescription}
                </p>
                <ul className="my-3">
                    <li className="my-3 text-lg flex">
                        <CheckIcon />
                        <strong className="mx-2 font-normal">ارتقا چرخ و لاستیک</strong>
                    </li>
                    <li className="my-3 text-lg flex">
                        <CheckIcon />
                        <strong className="mx-2 font-normal">بازرسی و تعمیر ترمزها</strong>
                    </li>
                    <li className="my-3 text-lg flex">
                        <CheckIcon />
                        <strong className="mx-2 font-normal">سرویس و تعویض روغن موتور</strong>
                    </li>
                    <li className="my-3 text-lg flex">
                        <CheckIcon />
                        <strong className="mx-2 font-normal">بازرسی و تعمیر ترمزها</strong>
                    </li>

                </ul>
                <a href="/car-inspection" className="rounded-3xl py-3 px-4 inline-block text-center w-full my-4 bg-[#416CEA] text-white">رزرو کارشناسی</a>
            </div>
            
        </div>
    )
}

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const experts = [
  {
    name: "صالح جوان",
    title: "برق‌کار خودرو",
    img: "/assets/images/expert-1.jpg",
  },
  {
    name: "جمال احمدی",
    title: "تکنسین تعمیر بدنه",
    img: "/assets/images/expert-2.jpg",
  },
  {
    name: "محمد کامیابی",
    title: "تکنسین مکانیک‌کاری",
    img: "/assets/images/expert-3.jpg",
  },
  {
    name: "روزبه چشمی",
    title: "تکنسین لاستیک و بالانس",
    img: "/assets/images/expert-4.jpg",
  },
];

export default function AboutUsPage() {
  return (
    <main className="bg-white dark:bg-black min-h-screen w-full">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <span className="text-xl">کارچک</span>
          <img src="/assets/images/logo.svg" alt="logo" className="w-8 h-8" />
        </div>
        <div>
          <a href="tel:02100000000" className="text-blue-600">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13 1.13.37 2.24.72 3.31a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c1.07.35 2.18.59 3.31.72A2 2 0 0 1 22 16.92z"/></svg>
          </a>
        </div>
      </header>

      {/* About Section */}
      <section className="flex flex-col md:flex-row items-center gap-8 px-4 md:px-16 py-8">
        <img src="/assets/images/mechanic.jpg" alt="mechanic" className="w-full md:w-1/3 rounded-xl object-cover" />
        <div className="flex-1">
          <h2 className="text-lg md:text-2xl font-bold mb-4 text-right">درباره ما</h2>
          <ul className="space-y-2 text-right text-gray-700 dark:text-gray-200">
            <li>ما بیش از ۲۵ سال تجربه و کارآمد داریم که با دقت و تعهد کار می‌کنیم تا مطمئن بشیم خودروی شما همیشه در بهترین وضعیت ممکن قرار داره. در هر سرویس دوره‌ای، چراغ‌ها، سیستم برق، بدنه و فنی خودرو، قطعات و مصرفی‌ها رو بررسی می‌کنیم.</li>
            <li>کیفیت بالا <span className="text-blue-600 ml-2">✔</span></li>
            <li>قابل اعتماد <span className="text-blue-600 ml-2">✔</span></li>
            <li>رضایت مشتریان <span className="text-blue-600 ml-2">✔</span></li>
          </ul>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-8 px-4 md:px-16">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-lg md:text-xl font-semibold mb-2">با بیش از ۲۵ سال تجربه تخصصی در خدمات خودرو</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">ارزش یعنی خدمت همراه با اعتماد. اعتمادی که شما به تیم ما دارید. استراتژی‌ها و سیستم‌های خود را داریم و اینکه همیشه مطابق انتظار، نتیجه را تحویل دهید.</p>
          <Button className="mb-6 bg-blue-600 text-white hover:bg-blue-700">ثبت درخواست</Button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card className="flex flex-col items-center py-6">
              <svg width="40" height="40" fill="none" stroke="#2563eb" strokeWidth="2" viewBox="0 0 24 24" className="mb-2"><path d="M9 17v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M7 7h10M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/><rect x="7" y="7" width="10" height="10" rx="2"/></svg>
              <div className="text-lg font-bold">بیش از ۹۰٪</div>
              <div className="text-sm text-gray-500">دقت در گزارش کارشناسی</div>
            </Card>
            <Card className="flex flex-col items-center py-6">
              <svg width="40" height="40" fill="none" stroke="#2563eb" strokeWidth="2" viewBox="0 0 24 24" className="mb-2"><path d="M5 16v-1a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v1"/><circle cx="12" cy="7" r="4"/></svg>
              <div className="text-lg font-bold">بیش از ۲۵۰۰۰۰</div>
              <div className="text-sm text-gray-500">کارشناسی موفق</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Experts Section */}
      <section className="bg-black text-white py-8 px-4 md:px-16">
        <h3 className="text-lg md:text-xl font-semibold mb-6 text-center">کارشناسان حرفه ای</h3>
        <p className="max-w-2xl mx-auto text-center text-gray-300 mb-8">از مدت‌ها پیش ثابت شده که وقتی یک صفحه نگاه می‌کنید، محتوای قابل خواندن صفحه را از تمرکز اصلی منحرف می‌کند. دلیل استفاده از متن لورم ایپسوم این است که توزیع حروف در آن تقریباً نسبت به یک متن معمولی است.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {experts.map((expert, idx) => (
            <Card key={idx} className="flex flex-col items-center bg-gray-900 py-6">
              <img src={expert.img} alt={expert.name} className="w-24 h-24 rounded-xl object-cover mb-4" />
              <div className="font-bold text-base mb-1">{expert.name}</div>
              <div className="text-sm text-gray-400">{expert.title}</div>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}

import instance from "./interceptor";
import { ApiHelper } from "./api-request";

/**
 * تابع مشترک برای logout
 * API Logout را کال می‌کند و همه cookies و localStorage را پاک می‌کند
 * @param redirectPath مسیر redirect بعد از logout (پیش‌فرض: "/")
 */
export const handleLogout = async (redirectPath: string = "/") => {
  try {
    // کال کردن API Logout
    await instance.post(ApiHelper.get("Logout"));
  } catch (err: any) {
    console.error("Error logging out:", err);
    // حتی اگه API fail شد، ادامه بده و localStorage و cookies رو پاک کن
  } finally {
    if (typeof window !== 'undefined') {
      // پاک کردن همه localStorage
      localStorage.clear();
      
      // پاک کردن همه cookies
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
        // پاک کردن cookie با تنظیم expires به تاریخ گذشته
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=${window.location.hostname};`;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=.${window.location.hostname};`;
      }
      
      // Redirect به صفحه اصلی یا مسیر مشخص شده
      window.location.href = redirectPath;
    }
  }
};


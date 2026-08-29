export const SOCIAL_LINKS = [
  {
    id: "bale",
    name: "بله",
    href: "https://ble.ir/carmacheck",
    handle: "@carmacheck",
  },
  {
    id: "telegram",
    name: "تلگرام",
    href: "https://t.me/carmachecksite",
    handle: "@carmachecksite",
  },
  {
    id: "instagram",
    name: "اینستاگرام",
    href: "https://www.instagram.com/carmacheck",
    handle: "@carmacheck",
  },
  {
    id: "aparat",
    name: "آپارات",
    href: "https://www.aparat.com/carmacheck",
    handle: "@carmacheck",
  },
] as const;

export type SocialNetworkId = (typeof SOCIAL_LINKS)[number]["id"];

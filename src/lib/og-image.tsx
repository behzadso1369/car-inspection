import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_ALT = "کارماچک | کارشناسی تخصصی خودرو";
export const OG_CONTENT_TYPE = "image/png";

const FONT_DIR = "public/assets/fonts/iran-sans/ttf";

function readAsset(relativePath: string) {
  return readFileSync(join(process.cwd(), relativePath));
}

type BrandOgOptions = {
  title?: string;
  subtitle?: string;
  badge?: string;
};

/**
 * تولید تصویر OG برند کارماچک با لوگوی واقعی و فونت IRANSans.
 * به‌صورت داینامیک از طریق فایل‌های opengraph-image/twitter-image استفاده می‌شود.
 */
export async function renderBrandOgImage(options: BrandOgOptions = {}) {
  const {
    title = "کارماچک",
    subtitle = "کارشناسی تخصصی خودرو",
    badge = "بیش از ۲۵٬۰۰۰ کارشناسی موفق",
  } = options;

  const fontRegular = readAsset(`${FONT_DIR}/IRANSansWeb(FaNum).ttf`);
  const fontBold = readAsset(`${FONT_DIR}/IRANSansWeb(FaNum)_Bold.ttf`);

  const logoBase64 = readAsset("public/assets/images/logo.svg").toString("base64");
  const logoSrc = `data:image/svg+xml;base64,${logoBase64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          direction: "rtl",
          fontFamily: "IRANSans",
          padding: "72px",
          backgroundColor: "#0B1E6B",
          backgroundImage:
            "linear-gradient(135deg, #071449 0%, #12277A 52%, #2A46C8 100%)",
          position: "relative",
        }}
      >
        {/* درخشش تزئینی بالا-چپ */}
        <div
          style={{
            position: "absolute",
            top: -170,
            left: -140,
            width: 520,
            height: 520,
            borderRadius: 9999,
            display: "flex",
            backgroundImage:
              "radial-gradient(circle, rgba(94,140,255,0.45) 0%, rgba(94,140,255,0) 70%)",
          }}
        />
        {/* درخشش تزئینی پایین-راست */}
        <div
          style={{
            position: "absolute",
            bottom: -190,
            right: -120,
            width: 460,
            height: 460,
            borderRadius: 9999,
            display: "flex",
            backgroundImage:
              "radial-gradient(circle, rgba(42,70,200,0.55) 0%, rgba(42,70,200,0) 70%)",
          }}
        />

        {/* ستون متن (سمت راست در RTL) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            maxWidth: 660,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.28)",
              color: "#DCE6FF",
              fontSize: 27,
              padding: "10px 26px",
              borderRadius: 9999,
              marginBottom: 30,
            }}
          >
            {badge}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 108,
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.05,
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 44,
              fontWeight: 400,
              color: "#C8D4FF",
              marginTop: 20,
            }}
          >
            {subtitle}
          </div>

          <div
            style={{
              display: "flex",
              width: 140,
              height: 8,
              backgroundColor: "#5E8CFF",
              borderRadius: 8,
              marginTop: 36,
              marginBottom: 36,
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              fontSize: 30,
              color: "#AEBEF7",
            }}
          >
            <div style={{ display: "flex" }}>carmacheck.com</div>
            <div style={{ display: "flex", margin: "0 18px", color: "#5E8CFF" }}>|</div>
            <div style={{ display: "flex" }}>۰۲۱-۹۱۰۰۱۷۴۰</div>
          </div>
        </div>

        {/* کارت لوگو (سمت چپ در RTL) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 330,
            height: 330,
            backgroundColor: "#FFFFFF",
            borderRadius: 52,
            boxShadow: "0 30px 60px rgba(0,0,0,0.35)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={196} height={184} alt="کارماچک" />
        </div>
      </div>
    ),
    {
      width: OG_SIZE.width,
      height: OG_SIZE.height,
      fonts: [
        { name: "IRANSans", data: fontRegular, weight: 400, style: "normal" },
        { name: "IRANSans", data: fontBold, weight: 700, style: "normal" },
      ],
    }
  );
}

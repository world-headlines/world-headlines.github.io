import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactNode } from "react";
import Script from "next/script";
import { getCountryCodes, getHeadlineMetadata } from "./services";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "World Headlines - Global News in Your Language",
  description: "Wolrd Headline with translation. "+
  "번역이 포함된 세계 주요 뉴스 헤드라인입니다." +
  "世界頭條新聞及翻譯。"+
  "世界头条新闻及翻译。" +
  "翻訳付き世界のトップニュース. " +
  "Tiêu đề tin tức thế giới có bản dịch." +
  "Мировые новости с переводами. "+
  "Weltweite Schlagzeilen mit Übersetzungen."+
  "Titres de l'actualité mondiale avec traductions. "+
  "عناوين الأخبار العالمية مع الترجمة."
};

function getCountryNameElement(countryCode:string, countryName:string): ReactNode {
  return <li key={countryCode}><a href={'/'+countryCode}>{countryName}</a></li>
}

async function getCountryNameElementList(): Promise<ReactNode[]> {

  const countryCodes = await getCountryCodes()

  let result: ReactNode[] = []
  await Promise.all(countryCodes.map(
    async (val, idx, arr) => {
      const headlineMetadata = await getHeadlineMetadata(val)
      const countryNameElement = getCountryNameElement(headlineMetadata.countryCode, headlineMetadata.countryName)
      result.push(countryNameElement)
    }
  ))

  return new Promise(
    async (resolve, reject) => {
      resolve(result)
    }
  )
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  let countryElementList: ReactNode[] = await getCountryNameElementList()

  let result = (
    <html>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header>
            <h1>
              <a href="/">
                World Headlines
              </a>
            </h1>
            <nav>
                <ul>
                  {countryElementList}
                </ul>
            </nav>
        </header>
        <section className="translator-section" id="google_translate_element"></section>
        {children}
        <Script src="/js/common.js"/>
        <Script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"/>
        <Script src="/js/google_translate.js"/>
      </body>
    </html>
  );

  return new Promise(
    (resolve, reject) => {
      resolve(result)
    }
  )
}

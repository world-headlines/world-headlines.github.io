import type { Metadata } from "next";
import localFont from "next/font/local";
import GlobalData from "../app.data";
import "./styles.css";
import { DetailedHTMLProps } from "react";
import { Headline } from "../models";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default async function NewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

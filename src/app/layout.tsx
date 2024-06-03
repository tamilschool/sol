import type { Metadata } from "next";
// import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils"

// const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// })

export const metadata: Metadata = {
  title: "வார்த்தை விளையாட்டு",
  description: "Tamil word game to learn and play with Tamil words",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
      )}>{children}</body>
    </html>
  );
}

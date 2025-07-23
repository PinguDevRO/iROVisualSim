import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClientThemeProvider from "./ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "iRO Wiki - Character Simulator",
  description: "Try out different headgears and costumes to see how your character would look in Ragnarok Online! This web app lets you mix and match visual equipment in real time, helping you plan the perfect style. Powered by iRO Wiki.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientThemeProvider>
          {children}
        </ClientThemeProvider>
      </body>
    </html>
  );
}

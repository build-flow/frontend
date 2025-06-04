import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import QueryProvider from "@/context/QueryProvider";
import Header from "@/components/components/Header";
import Sidebar from "@/components/components/Sidebar";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BuildFlow",
  description: "Construction Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <div>
            <Header />
            <div className="flex gap-4">
              <Sidebar />
              {children}
            </div>
          </div>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}

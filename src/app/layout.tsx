import RecoilProvider from "@/providers/recoil";
import InitialAuthProvider from "@/providers/initial";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ale",
  description: "タブーから始まるエール",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <RecoilProvider>
        <body className={inter.className}>
          <InitialAuthProvider>{children}</InitialAuthProvider>
        </body>
      </RecoilProvider>
    </html>
  );
}

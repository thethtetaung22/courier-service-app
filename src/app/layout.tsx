import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SideNav from "@/components/component/side-nav";
import Header from "@/components/component/header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Courier Service App",
    description: "Welcome to courier service!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="flex h-screen w-full">
                    <SideNav />
                    <div className="flex flex-1 flex-col">
                        <Header />
                        <main className="flex flex-1 bg-secondary flex-col gap-4 p-4 md:gap-8 md:p-6">
                            {children}
                        </main>
                    </div>
                </div>
            </body>
        </html>
    );
}

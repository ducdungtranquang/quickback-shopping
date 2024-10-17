import { Inter } from "next/font/google";
import "./globals.css"; 
import ClientLayout from "@/layout/clientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "QuickBack Shopping",
  description: "Shopping with us",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout> {/* Client logic here */}
      </body>
    </html>
  );
}

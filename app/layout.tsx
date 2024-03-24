import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({ subsets: ["latin"],
weight: ['400','500','600','700'],
variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "EventPlanner360",
  description: "EventPlanner360 is a platform for event management",
  icons: {
    icon: '/assets/images/logo',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={poppins.variable}>{children}</body>
    </html>
    </ClerkProvider>
  );
}

import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimatedLayout from "../components/AnimatedLayout"; // 👈 new client wrapper

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Petruswise",
  description: "Building People, Shaping Purpose.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: {
      rel: "manifest",
      url: "/site.webmanifest",
    },
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Petruswise",
    description:
      "Empowering lives through education, consulting, and human capital development.",
    url: "https://petruswise.vercel.app",
    siteName: "Petruswise",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Petruswise Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Petruswise",
    description:
      "Empowering lives through education, consulting, and human capital development.",
    images: ["/android-chrome-512x512.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${lexend.variable} min-h-screen flex flex-col antialiased bg-white`}
      >
        <Header />
        <AnimatedLayout>{children}</AnimatedLayout>
        <Footer />
      </body>
    </html>
  );
}

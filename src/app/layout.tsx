import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Gidi Real Estate E-commerce",
    template: "%s | Gidi Real Estate"
  },
  description:
    "Browse, filter, and manage real estate products with a fast, SEO-optimized Next.js platform.",
  keywords: ["real estate", "e-commerce", "property", "buy", "sell", "rent"],
  authors: [{ name: "Gidi Real Estate" }],
  creator: "Gidi Real Estate",
  publisher: "Gidi Real Estate",
  openGraph: {
    title: "Gidi Real Estate E-commerce",
    description:
      "Browse, filter, and manage real estate products with a fast, SEO-optimized Next.js platform.",
    url: "*",
    siteName: "Gidi Real Estate",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "*",
        width: 1200,
        height: 630,
        alt: "Gidi Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gidi Real Estate E-commerce",
    description: "Browse, filter, and manage real estate products",
    creator: "@gidirealestate",
    images: ["*"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "*",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="py-4 px-4 sm:py-8 sm:px-6">{children}</div>
      </body>
    </html>
  );
}

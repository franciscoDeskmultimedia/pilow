import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#C2F5F8" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1419" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pilow.dev"),
  title: {
    default: "Pilow | Premium Web Development Agency",
    template: "%s | Pilow",
  },
  description:
    "Pilow is a premium web development agency crafting exceptional digital experiences. We specialize in modern web applications, e-commerce, and custom software solutions.",
  keywords: [
    "web development",
    "web agency",
    "Next.js development",
    "React development",
    "custom software",
    "e-commerce",
    "digital agency",
    "web design",
    "UI/UX",
    "Pilow",
  ],
  authors: [{ name: "Pilow", url: "https://pilow.dev" }],
  creator: "Pilow",
  publisher: "Pilow",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pilow.dev",
    siteName: "Pilow",
    title: "Pilow | Premium Web Development Agency",
    description:
      "Crafting exceptional digital experiences. We specialize in modern web applications, e-commerce, and custom software solutions.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pilow - Premium Web Development Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pilow | Premium Web Development Agency",
    description:
      "Crafting exceptional digital experiences. Modern web applications, e-commerce, and custom software solutions.",
    images: ["/og-image.png"],
    creator: "@pilow",
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

import { RefreshRouteOnSave } from "@/components/RefreshRouteOnSave";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Initialize Dark Mode to avoid flash of unstyled content */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <RefreshRouteOnSave />
        {/* Skip Navigation Link for Accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}

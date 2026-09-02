import "./globals.css";
import PwaRegister from "../components/PwaRegister";
import PwaInstallBanner from "../components/PwaInstallBanner";

export const metadata = {
  title: "LàmViệc360 | Find Jobs & Hire Talent in Vietnam",
  description:
    "LàmViệc360 connects job seekers and employers across Vietnam with smarter job search, recruitment tools and AI-assisted hiring.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "LàmViệc360",
  },
};

export const viewport = {
  themeColor: "#1464b4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <PwaRegister />
        <PwaInstallBanner />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import App from "@/components/layouts/app";
import { Work_Sans, Roboto } from "next/font/google";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

// Combined class name
const fontClass = `${workSans.variable} ${roboto.variable}`;

export const metadata: Metadata = {
  title:
    "lendsqr - lendsqr help lenders launch, scale, and succeed their lending business with our loan management system and lending APIs.",
  description:
    "At lendsqr We help lenders launch, scale, and succeed their lending business with our loan management system and lending APIs.",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "lendsqr",
  url: "https://lendsqr.com",
  logo: "https://res.cloudinary.com/dxvf9uqwe/image/upload/v1756315030/WhatsApp_Image_2025-07-07_at_09.34.44_755afb7a_kpnaod.jpg",
  description:
    "At lendsqr We help lenders launch, scale, and succeed their lending business with our loan management system and lending APIs.",
  sameAs: ["https://www.instagram.com/lendsqr"],
  contactPoint: {
    "@type": "ContactPoint",
    email: "lendsqr.dev@gmail.com",
    contactType: "customer support",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className={fontClass}>
      <head>
        <script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body>
        <App>{children}</App>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { SanityLive } from "@/sanity/lib/live";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import { Bricolage_Grotesque, Geist_Mono, Abril_Fatface } from "next/font/google";
import { CartProvider } from "@/components/Cart/CartProvider";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const abrilFatface = Abril_Fatface({
  variable: "--font-abril",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fuchsia & Fig",
  description: "Fuchsia and Fig",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en" className={`${bricolageGrotesque.variable} ${geistMono.variable} ${abrilFatface.variable}`}>
      <body className="antialiased">
        <CartProvider>
          {children}
        </CartProvider>
        {isDraftMode ? <VisualEditing /> : <SanityLive />}
      </body>
    </html>
  );
}

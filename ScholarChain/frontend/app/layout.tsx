import type { Metadata } from "next";
import { Inter, Lora } from 'next/font/google';
import { Providers } from '@/components/Providers';
import "./globals.css";

// Stellar-inspired font configuration
const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '600'],
});

const lora = Lora({ 
  subsets: ['latin'], 
  variable: '--font-lora',
  display: 'swap',
  weight: ['400', '600'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: "ScholarChain - Blockchain Tabanlı Öğrenci Ödül Platformu",
  description: "Öğrencilerin akademik başarılarını blockchain ile ödüllendiren yenilikçi eğitim platformu. Stellar Soroban ile güçlendirilmiştir.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${lora.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/scholar-icon.svg" />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

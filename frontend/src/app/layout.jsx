import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import ClientLayout from './ClientLayout';
import SegmentedNav from '@/components/SegmentedNav';
import ThemeChanger from '../components/Header/themeChanger';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: '票票盒',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-full`}>
        <ClientLayout>
          <header className="portal-header flex items-center px-2 min-h-14 border-b border-gray-200">
            <div className="w-[250px] logo text-2xl font-bold">票票盒</div>
            <SegmentedNav />
            <ThemeChanger />
          </header>
          <main className="portal-default-layout-wrappe flex-1 h-[calc(100%-3.5rem)]">
            {children}
          </main>
        </ClientLayout>
      </body>
    </html>
  );
}

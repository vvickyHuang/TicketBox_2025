'use client';
import { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Provider } from 'react-redux';
import { Geist, Geist_Mono } from 'next/font/google';
import ClientLayout from './ClientLayout';
import ThemeChanger from '@/components/DefaultLayout/ThemeChanger';
import DFHeader from '@/components/DefaultLayout/Header';

import SegmentedNav from '@/components/SegmentedNav';
import SearchConcert from '@/components/DefaultLayout/SearchConcert';
import SnackbarList from '@/components/SnackbarList';
import Footer from '@/components/DefaultLayout/Footer';
import store from '@/lib/store';
import { I18nProvider } from '@/context/i18nContext';
import { useIsMobile } from '@/hook/useIsMobile';
const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export default function Initializer({ children, currentLang }) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const params = useParams();
  const lang = params.lang;

  const dict = useMemo(() => currentLang, [currentLang]);

  return (
    <Provider store={store}>
      <ClientLayout>
        <SnackbarList />

        <I18nProvider dict={dict}>
          {isMobile ? (
            <DFHeader lang={lang} />
          ) : (
            // <header className="portal-header fixed top-0 max-h-14 w-full z-50 border-b border-gray-200 bg-[#F9F8FF]">
            //   <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-between py-2 px-4 sm:px-2">
            //     <img
            //       onClick={() => router.push(`/${lang}/concert`)}
            //       src="/img/logo.svg"
            //       alt="logo"
            //       className="h-10 sm:h-14 max-w-[120px] object-contain"
            //     />
            //     <div className="flex items-center gap-2  sm:mt-0">
            //       <ThemeChanger />
            //       <SegmentedNav className="hidden sm:flex" />
            //     </div>
            //   </div>
            // </header>
            <header className='portal-header flex px-2 max-h-14 border-b border-gray-200 bg-[#F9F8FF] fixed top-0 w-full z-50'>
              <div className='w-full mx-auto flex items-center justify-between py-2'>
                <img
                  onClick={() => router.push(`/${lang}/concert`)}
                  src='/img/logo.svg'
                  className='w-auto h-14 object-contain'
                  alt='首頁'
                />

                <div className='flex justify-between items-center gap-2'>
                  <SegmentedNav />
                  <SearchConcert />
                  <ThemeChanger />
                </div>
              </div>
            </header>
          )}

          <main className='portal-default-layout-wrappe flex-1 h-[calc(100%-3.5rem)]'>
            <div className='max-h-14 min-h-14 h-14'></div>

            {children}
            <Footer />
          </main>
        </I18nProvider>
      </ClientLayout>
    </Provider>
  );
}

import './globals.css';
import Providers from './providers';
import Header from '@/component/Header/Header';
import Footer from '@/component/Footer/Footer';
import { sans, serif } from './fonts';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s · ${SITE_NAME}`,
    default: `${SITE_NAME} — Ethiopian food delivery in Addis Ababa`,
  },
  description:
    'Handcrafted Ethiopian wats and honey wine, delivered hot across Addis Ababa in woven mesob packaging.',
  openGraph: {
    siteName: SITE_NAME,
    locale: 'en_ET',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="heght-100%">
        {/* 1. Put the layout container directly under body */}
        <div className="min-h-dvh grid grid-rows-[auto_1fr_auto]">
          {' '}
          <header className="bg-blue-600 text-white">
            <Providers>
              <Header />
            </Providers>
          </header>
          <main className="bg-gray-100 p-6">
            <Providers>{children}</Providers>
          </main>
          <footer className="bg-gray-800 text-white">
            <Providers>
              <Footer />
            </Providers>
          </footer>
        </div>
      </body>
    </html>
  );
}

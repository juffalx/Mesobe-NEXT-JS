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
      <body>
        <div className="app-shell">
          <Providers>
            <Header />
          </Providers>
          <div className="app-content">
            <Providers>{children}</Providers>
          </div>
          <footer>
            <Providers>
              <Footer />
            </Providers>
          </footer>
        </div>
      </body>
    </html>
  );
}

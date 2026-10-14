import './globals.css';
import Providers from './providers';
import Header from '@/component/Header/Header';
import Footer from '@/component/Footer/Footer';
import { sans, serif } from './fonts';

export const metadata = {
  title: 'Mesob House',
  description: 'Handcrafted Ethiopian wats and honey wine, delivered hot across Addis Ababa',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <Providers>
          <div className="main-layout">
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

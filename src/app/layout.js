import './globals.css';
import Providers from './providers';
import Header from '../component/Header';
import Footer from '../component/Footer';

export const metadata = {
  title: 'Addis Eats',
  description: 'Ethiopian food, delivered in Addis Ababa',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

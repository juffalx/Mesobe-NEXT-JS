import localFont from 'next/font/local';

export const sans = localFont({
  src: './fonts/inter-latin-wght-normal.woff2',
  variable: '--font-sans',
  weight: '100 900',
  display: 'swap',
});

export const serif = localFont({
  src: './fonts/playfair-display-latin-wght-normal.woff2',
  variable: '--font-serif',
  weight: '400 900',
  display: 'swap',
});

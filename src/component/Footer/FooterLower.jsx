import Link from 'next/link';
import './FooterLower.css';
import { FOOTER_LEGAL_LINKS } from '@/lib/footerLinks';

export default function FooterLower() {
  const year = new Date().getFullYear();

  return (
    <div className="footer-lower">
      <p className="footer-lower-copyright">
        © {year} Mesob House Habesha Dining. Authentic Ethiopian &amp; Eritrean Heritage.
      </p>

      <ul className="footer-lower-links">
        {FOOTER_LEGAL_LINKS.map(({ text, href }) => (
          <li key={text}>
            <Link href={href}>{text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

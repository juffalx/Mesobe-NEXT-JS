import './FooterBrand.css';
import { CoffeeIcon } from './FooterIcons';
import { FOOTER_BRAND } from '@/lib/footerLinks';

export default function FooterBrand() {
  const { title, tagline, note } = FOOTER_BRAND;

  return (
    <div className="footer-card footer-brand">
      <p className="footer-brand-title">{title}</p>

      <div className="footer-brand-tagline">
        {tagline.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <div className="footer-brand-note">
        <CoffeeIcon />
        <p>{note}</p>
      </div>
    </div>
  );
}

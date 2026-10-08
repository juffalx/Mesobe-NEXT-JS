import './FooterUpper.css';
import FooterBrand from './FooterBrand';
import FooterColumn from './FooterColumn';
import { FOOTER_COLUMNS } from '@/lib/footerLinks';

export default function FooterUpper() {
  return (
    <div className="footer-upper">
      <FooterBrand />
      {FOOTER_COLUMNS.map((column) => (
        <FooterColumn key={column.title} {...column} />
      ))}
    </div>
  );
}

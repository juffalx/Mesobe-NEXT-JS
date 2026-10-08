import './Footer.css';
import FooterLower from './FooterLower';
import FooterUpper from './FooterUpper';

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <FooterUpper />
        <FooterLower />
      </div>
    </div>
  );
}

import Link from 'next/link';
import './FooterColumn.css';
import { DineIcon, DeviceIcon, ShareIcon } from './FooterIcons';

export default function FooterColumn({ title, items, showSocialIcons }) {
  return (
    <div className="footer-card footer-column">
      <h2 className="footer-column-title">{title}</h2>

      <ul className="footer-column-list">
        {items.map(({ text, href, highlight, emphasis }) => {
          const className = highlight ? 'is-highlight' : emphasis ? 'is-emphasis' : '';
          return (
            <li key={text}>
              {href?.startsWith('/') ? (
                <Link href={href} className={className}>{text}</Link>
              ) : href ? (
                <a href={href} className={className}>{text}</a>
              ) : (
                <span className={className}>{text}</span>
              )}
            </li>
          );
        })}
      </ul>

      {showSocialIcons && (
        <div className="footer-column-icons">
          <DineIcon />
          <DeviceIcon />
          <ShareIcon />
        </div>
      )}
    </div>
  );
}

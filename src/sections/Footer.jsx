import Logo from '../components/Logo.jsx';
import { ecosystem, nav, social } from '../content/site.js';
import './Footer.css';

const follow = [
  { label: 'Instagram', href: social.instagram },
  { label: 'LinkedIn', href: social.linkedin },
  { label: 'YouTube', href: social.youtube },
];

export default function Footer() {
  return (
    <footer className="footer theme-dark">
      <div className="wrap">
        <div className="footer__top">
          <Logo variant="primary" tone="ivory" alt="Crystal Kizor" className="footer__logo" loading="lazy" />
          <p className="footer__line display">
            Climate-responsive, culturally grounded, <em>built around people.</em>
          </p>
        </div>

        <div className="footer__cols">
          <nav aria-label="Footer">
            <h2 className="label footer__heading">Explore</h2>
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="label footer__heading">The ecosystem</h2>
            <ul>
              {ecosystem.map((item) => (
                <li key={item.id}>
                  <a href="#ecosystem">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="label footer__heading">Follow</h2>
            <ul>
              {follow.map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.label}
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <Logo variant="circle" tone="ivory" alt="" className="footer__seal" loading="lazy" />
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Crystal Kizor. All rights reserved.</p>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

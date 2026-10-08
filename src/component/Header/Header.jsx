import './Header.css';
import Logo from './Logo';
import Nav from './Nav';
import CartForm from './CartForm';

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Logo />
        <Nav />
        <CartForm />
      </div>
    </header>
  );
}

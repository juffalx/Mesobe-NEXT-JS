import Link from 'next/link';
const Header = () => {
  return (
    <div>
      <h1 className="text-red-900 bg-yellow-300 flex gap-20">SOME TITLE</h1>
      <p>
        <Link href="/cart">Cart</Link>
      </p>
      <Link href="/menu">Menu</Link>
    </div>
  );
};

export default Header;

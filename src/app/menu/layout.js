import MenuCartBar from '@/component/FullMenu/MenuCartBar';

export default function MenuLayout({ children }) {
  return (
    <>
      {children}
      <MenuCartBar />
    </>
  );
}

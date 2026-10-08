import './TodaySpecial.css';
import Section4 from './Section4';
import Section5 from './Section5';
import Section6 from './Section6';
import { getDish } from '@/lib/menu';

export default async function TodaySpecial() {
  const injera = await getDish('injera-3');

  return (
    <main>
      <Section4 dish={injera} />
      <Section5 />
      <Section6 />
    </main>
  );
}

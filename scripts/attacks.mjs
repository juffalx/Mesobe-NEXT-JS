import { readFileSync } from 'node:fs';

const BASE = process.argv[2] || 'http://localhost:3000';
const STAFF_PHONE = process.env.STAFF_PHONE || '900000001';
const STAFF_PASSWORD = process.env.STAFF_PASSWORD || 'kitchen123';
const FORGED = '11111111-1111-1111-1111-111111111111';

const manifest = JSON.parse(readFileSync('.next/server/server-reference-manifest.json', 'utf8')).node;
const ids = Object.fromEntries(Object.entries(manifest).map(([id, v]) => [v.exportedName, id]));

let failed = 0;
const check = (label, ok, extra = '') => {
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label} ${extra}`);
};

class Person {
  constructor(cookie = null) {
    this.cookie = cookie;
  }

  async get(path) {
    const res = await fetch(BASE + path, {
      redirect: 'manual',
      headers: this.cookie ? { Cookie: `session=${this.cookie}` } : {},
    });
    this.keepCookie(res);
    return { status: res.status, location: res.headers.get('location'), text: await res.text() };
  }

  async act(name, arg) {
    const path = name === 'signUp' ? '/signup' : '/login';
    const headers = {
      'Next-Action': ids[name],
      'Content-Type': 'text/plain;charset=UTF-8',
      Accept: 'text/x-component',
    };
    if (this.cookie) headers.Cookie = `session=${this.cookie}`;
    const res = await fetch(BASE + path, {
      method: 'POST',
      headers,
      body: JSON.stringify(arg === undefined ? [] : [arg]),
    });
    this.keepCookie(res);
    const text = await res.text();
    const line = text.split('\n').find((l) => l.startsWith('1:'));
    return { setCookie: res.headers.getSetCookie(), result: line ? JSON.parse(line.slice(2)) : null };
  }

  keepCookie(res) {
    for (const c of res.headers.getSetCookie()) {
      const match = c.match(/^session=([^;]*)/);
      if (match) this.cookie = match[1] || null;
    }
  }
}

const phone = () => '9' + String(Math.floor(Math.random() * 1e8)).padStart(8, '0');
const account = (name) => ({
  name,
  phone: phone(),
  email: 'test@example.com',
  password: 'secret123',
  confirm: 'secret123',
  pref: 'x',
  terms: true,
});
const order = {
  name: 'Test Person',
  phone: '911223344',
  email: 'test@example.com',
  subcity: 'Bole',
  street: 'Bole Road 12 flat 4',
  landmark: 'Blue gate',
  timing: 'immediate',
  payment: 'cash',
  lines: [{ id: 'doro-wat', option: null, optionPrice: 0, qty: 1 }],
  coupon: null,
};

console.log(`Checking ${BASE}\n`);

console.log('Layer 1: the proxy');
const guest = new Person();
for (const path of ['/checkout', '/orders', '/orders/MH-111111', '/kitchen']) {
  const res = await guest.get(path);
  check(`signed out, ${path} goes to sign in`, res.status === 307 && res.location.startsWith('/login?next='), res.location);
}
const bad = new Person('abc');
check('a cookie that is not a session id is refused', (await bad.get('/orders')).status === 307);
check('/menu stays public', (await new Person().get('/menu')).status === 200);

console.log('\nAttack 1: signed out (a made-up session id)');
const forged = new Person(FORGED);
const a1 = await forged.act('placeOrder', order);
check('placeOrder is refused with 401', a1.result?.status === 401, JSON.stringify(a1.result));
const a1b = await forged.act('cancelOrder', 'MH-111111');
check('cancelOrder is refused with 401', a1b.result?.status === 401, JSON.stringify(a1b.result));

console.log('\nSign in and sign up');
const abebe = new Person();
const up = await abebe.act('signUp', account('Abebe Kebede'));
check('sign up works and sets a cookie', up.result?.ok === true && up.setCookie.length > 0);
const flags = (up.setCookie[0] || '').toLowerCase();
check('cookie has httpOnly and sameSite', flags.includes('httponly') && flags.includes('samesite=lax'), up.setCookie[0]);
console.log('      (the secure flag is on in a production build, so it is also expected here:', flags.includes('secure'), ')');
check('wrong password is refused', (await new Person().act('signIn', { phone: STAFF_PHONE, password: 'wrong-password' })).result?.ok === false);

const bruk = new Person();
await bruk.act('signUp', account('Bruk Tadesse'));
const staff = new Person();
const staffIn = await staff.act('signIn', { phone: STAFF_PHONE, password: STAFF_PASSWORD });
check('staff can sign in', staffIn.result?.ok === true && staffIn.result.user.role === 'staff');

const placed = await abebe.act('placeOrder', order);
const orderNo = placed.result?.orderNo;
check('Abebe places an order', placed.result?.ok === true, orderNo);

console.log('\nAttack 2: signed in as someone else');
const a2 = await bruk.act('cancelOrder', orderNo);
check("Bruk cancels Abebe's order: refused with 403", a2.result?.status === 403, JSON.stringify(a2.result));
check("Bruk reads Abebe's order page: 404", (await bruk.get('/orders/' + orderNo)).status === 404);
check("Bruk reads Abebe's order from the api: 404", (await bruk.get('/api/orders/' + orderNo)).status === 404);
check("Bruk's order list does not show it", !(await bruk.get('/orders')).text.includes(orderNo));
check('Abebe sees it in her list', (await abebe.get('/orders')).text.includes(orderNo));
check('/kitchen is closed to a customer', (await abebe.get('/kitchen')).location === '/');
check('/kitchen shows the order to staff', (await staff.get('/kitchen')).text.includes(orderNo));

console.log('\nSeeding');
const page = await abebe.get('/orders/' + orderNo);
check('the order page arrives with the status already in it', page.text.includes('Order received') || page.text.includes('preparing'));

console.log('\nCancel rules');
check('owner can cancel', (await abebe.act('cancelOrder', orderNo)).result?.ok === true);
check('second cancel is refused with 409', (await abebe.act('cancelOrder', orderNo)).result?.status === 409);

console.log('\nSign out');
await abebe.act('signOut');
check('cookie is cleared', abebe.cookie === null);
check('/orders needs sign in again', (await abebe.get('/orders')).status === 307);

console.log('\nAttack 3: a crafted sign-in link');
console.log('      This one runs in the browser. Open /login?next=https://example.com and sign in.');
console.log('      Expected: you land on /. The rule is in src/lib/nextPath.js');

console.log('\nDiscovery');
const robots = await new Person().get('/robots.txt');
check('robots.txt disallows the private routes', ['/cart', '/checkout', '/orders', '/kitchen'].every((p) => robots.text.includes('Disallow: ' + p)));
const sitemap = await new Person().get('/sitemap.xml');
check('sitemap lists the dishes', sitemap.text.includes('/menu/doro-wat'));
check('sitemap has no private route', !/\/(cart|checkout|orders|kitchen)/.test(sitemap.text));
const dish = (await new Person().get('/menu/doro-wat')).text;
check('dish page has a description and og:image', dish.includes('name="description"') && dish.includes('property="og:image"'));
check('og:image is an absolute address', /property="og:image" content="https?:\/\//.test(dish));

console.log(failed === 0 ? '\nAll checks passed.' : `\n${failed} check(s) failed.`);
process.exit(failed === 0 ? 0 : 1);

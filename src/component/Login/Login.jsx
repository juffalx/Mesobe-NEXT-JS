'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import './Login.css';
import { useAuthStore } from '@/store/useAuthStore';
import { loginSchema } from '@/lib/schemas';
import { signIn } from '@/app/actions';
import { nextPath } from '@/lib/nextPath';

function Login() {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [welcome, setWelcome] = useState('');

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { phone: '', password: '' },
  });

  const onSubmit = async (data) => {
    const result = await signIn(data);
    if (!result.ok) {
      Object.entries(result.fieldErrors || {}).forEach(([field, messages]) => {
        setError(field, { message: messages[0] });
      });
      return;
    }
    login(result.user);
    setWelcome('Selam! You are signed in (demo — no real backend yet).');
    await new Promise((resolve) => setTimeout(resolve, 700));
    router.push(nextPath());
  };

  return (
    <main className="auth-page">
      <p className="crumbs">HOME / ACCOUNT / <b>SIGN IN</b></p>
      <div className="auth-grid">
        <aside className="auth-side">
          <span className="badge gold">MESOB FEAST CIRCLE & PERKS</span>
          <h1>A table shared is a <em>bond celebrated.</em></h1>
          <p className="auth-copy">Sign into your culinary sanctuary. Track your seasonal fasting platters, express your Je Buna preferences, and summon traditional Addis feasts straight to your door.</p>
          <div className="side-img-wrap">
            <img src="/login-image.png" alt="Sunday Je Buna Buna Circle" style={{ minHeight: 180 }} />
            <span className="side-img-tag">Sunday Je Buna Circle · Exclusive roasting access for verified members</span>
          </div>
          <ul className="perk-list">
            <li>𫚔 <b>10 Gursha Points / ETB 100</b><span>Redeem against rare honey tej batches or special communal platters.</span></li>
            <li>🛵 <b>Free Bole & Kazanchis Delivery</b><span>Priority courier dispatch with heat-insulated clay-stone trays.</span></li>
            <li>🧾 <b>Instant Telebirr & CBE Birr</b><span>Zero-fee instant table settlement and 1-tap reordering.</span></li>
          </ul>
          <p className="quote">&quot;The table ordering is as seamless as eating from our grandmother&apos;s mesob.&quot;<br /><b>DR. SELAMAWIT H. — BOLE MEMBER</b></p>
        </aside>

        <section className="auth-card">
          <p className="kicker">MEMBER PORTAL</p>
          <h2>Welcome to the Mesob Table</h2>
          <p className="auth-sub">Sign in to manage your feasts, Telebirr rewards, and reserved dining mesobs.</p>
          <div className="social-row">
            <button type="button" className="social-btn">💛 Telebirr SuperApp →</button>
            <button type="button" className="social-btn">🇬 Continue with Google →</button>
          </div>
          <p className="divider">——— OR WITH PHONE / EMAIL ———</p>

          {welcome ? (
            <p className="welcome-msg">{welcome}</p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="field">
                <label>Ethiopian Mobile Number <span style={{ float: 'right', textTransform: 'none' }}>SMS OTP Supported</span></label>
                <div className="phone-wrap">
                  <span className="prefix">🇪🇹 +251</span>
                  <input {...register('phone')} placeholder="091 123 4567" />
                </div>
                {errors.phone && <span className="err">{errors.phone.message}</span>}
              </div>

              <div className="field">
                <label>Password <Link href="/login" style={{ float: 'right', textTransform: 'none' }}>Forgot Password?</Link></label>
                <div className="phone-wrap">
                  <input {...register('password')} type={showPw ? 'text' : 'password'} placeholder="Enter your confidential password" style={{ borderRadius: '10px 0 0 10px' }} />
                  <button type="button" className="prefix eye" onClick={() => setShowPw((value) => !value)}>{showPw ? '🙈' : '👁'}</button>
                </div>
                {errors.password && <span className="err">{errors.password.message}</span>}
              </div>

              <div className="check-row">
                <label><input type="checkbox" /> Keep me signed in on this device</label>
                <label><input type="checkbox" /> Remember Addis address</label>
              </div>

              <button className="btn-red auth-submit" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Signing In...' : 'Sign In to Mesob House →'}
              </button>
            </form>
          )}

          <div className="auth-foot">
            <p>New to our dining family?<br /><Link href="/signup"><b>Join the Mesob Table & Register ›</b></Link></p>
            <Link href="/menu" className="btn-ghost">Continue as Guest</Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;

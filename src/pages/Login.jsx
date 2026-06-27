import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RiBuilding2Line, RiEyeLine, RiEyeOffLine, RiLockLine, RiMailLine } from 'react-icons/ri';

export default function Login() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = i18n.language;

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError(lang === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill in all fields.');
      return;
    }

    setLoading(true);
    // Simulate auth — accept any non-empty credentials
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 1200);
  };

  return (
    <div
      className="min-h-screen flex"
      style={{
        background: 'linear-gradient(160deg, #1e2a4a 0%, #162040 35%, #0f1a38 70%, #0c1530 100%)',
      }}
    >
      {/* ── Decorative blurred orbs ── */}
      <div
        className="pointer-events-none fixed -top-24 -start-16 w-96 h-96 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #4f70e0 0%, transparent 70%)', filter: 'blur(60px)' }}
      />
      <div
        className="pointer-events-none fixed bottom-0 end-0 w-80 h-80 rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)', filter: 'blur(50px)' }}
      />
      <div
        className="pointer-events-none fixed top-1/2 start-1/3 w-64 h-64 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)', filter: 'blur(45px)' }}
      />

      {/* ── Left panel — branding (hidden on mobile) ── */}
      <div className="hidden lg:flex flex-col justify-between w-[52%] relative p-12 overflow-hidden">

        {/* Top shimmer line */}
        <div
          className="absolute top-0 start-0 end-0 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(99,130,255,0.6) 40%, rgba(16,185,129,0.6) 60%, transparent 100%)',
          }}
        />

        {/* Brand */}
        <div className="flex items-center gap-3 relative z-10">
          <div
            className="relative w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: 'linear-gradient(135deg, #4f70e0 0%, #6366f1 50%, #10b981 100%)',
              boxShadow: '0 4px 20px rgba(79,112,224,0.5)',
            }}
          >
            <RiBuilding2Line className="text-white text-xl" />
            <div
              className="absolute inset-0 rounded-xl"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 60%)' }}
            />
          </div>
          <div>
            <span className="block text-base font-bold tracking-wide" style={{ color: '#e8eeff' }}>
              {lang === 'ar' ? 'عقارك' : 'EstateHub'}
            </span>
            <span className="block text-[9px] tracking-[0.22em] uppercase font-medium" style={{ color: 'rgba(150,180,255,0.55)' }}>
              {lang === 'ar' ? 'لوحة إدارية' : 'Real Estate'}
            </span>
          </div>
        </div>

        {/* Hero text */}
        <div className="relative z-10 space-y-6">
          <div>
            <h1
              className="text-5xl font-extrabold leading-tight"
              style={{ color: '#e8eeff', letterSpacing: '-0.02em' }}
            >
              {lang === 'ar' ? (
                <>إدارة عقاراتك<br /><span style={{ color: '#10b981' }}>بكل احترافية</span></>
              ) : (
                <>Manage your<br /><span style={{ color: '#10b981' }}>real estate</span><br />portfolio.</>
              )}
            </h1>
            <p className="mt-4 text-base leading-relaxed" style={{ color: 'rgba(180,200,255,0.5)' }}>
              {lang === 'ar'
                ? 'منصة متكاملة لإدارة العقارات، العملاء، والصفقات في مكان واحد.'
                : 'A unified platform to manage properties, clients, and deals — all in one place.'}
            </p>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-8">
            {[
              { value: '10+', label: lang === 'ar' ? 'عقارات' : 'Properties' },
              { value: '98%', label: lang === 'ar' ? 'رضا العملاء' : 'Client Satisfaction' },
              { value: '5★',  label: lang === 'ar' ? 'تقييم' : 'Rated' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-bold" style={{ color: '#7eb8f7' }}>{value}</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(150,180,255,0.45)' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom testimonial card */}
        <div
          className="relative z-10 p-5 rounded-2xl"
          style={{
            background: 'rgba(99,130,255,0.08)',
            border: '1px solid rgba(99,130,255,0.2)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(200,216,255,0.75)' }}>
            {lang === 'ar'
              ? '"لوحة الإدارة سهّلت علينا تتبع العقارات والعملاء بشكل لم نكن نتخيله."'
              : '"EstateHub transformed how we track properties and close deals. Incredibly intuitive."'}
          </p>
          <div className="flex items-center gap-3 mt-4">
            <img
              src="https://i.pravatar.cc/36?img=12"
              alt="Testimonial"
              className="w-8 h-8 rounded-lg object-cover"
              style={{ boxShadow: '0 0 0 2px rgba(99,130,255,0.4)' }}
            />
            <div>
              <p className="text-xs font-semibold" style={{ color: '#c8d8ff' }}>
                {lang === 'ar' ? 'سارة الأحمدي' : 'Sarah Al-Ahmadi'}
              </p>
              <p className="text-[10px]" style={{ color: 'rgba(150,180,255,0.4)' }}>
                {lang === 'ar' ? 'مديرة مبيعات' : 'Sales Manager'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel — login form ── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 relative">
        {/* Vertical separator (desktop only) */}
        <div
          className="hidden lg:block absolute start-0 inset-y-10 w-[1px]"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(99,130,255,0.25) 30%, rgba(99,130,255,0.25) 70%, transparent)' }}
        />

        <div className="w-full max-w-md">

          {/* Mobile brand */}
          <div className="flex lg:hidden items-center gap-3 mb-10 justify-center">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #4f70e0 0%, #6366f1 50%, #10b981 100%)',
                boxShadow: '0 4px 16px rgba(79,112,224,0.45)',
              }}
            >
              <RiBuilding2Line className="text-white text-lg" />
            </div>
            <span className="text-base font-bold tracking-wide" style={{ color: '#e8eeff' }}>
              {lang === 'ar' ? 'عقارك' : 'EstateHub'}
            </span>
          </div>

          {/* Form card */}
          <div
            className="rounded-2xl p-8 sm:p-10"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(99,130,255,0.18)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
            }}
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold" style={{ color: '#e8eeff' }}>
                {lang === 'ar' ? 'مرحباً بعودتك 👋' : 'Welcome back 👋'}
              </h2>
              <p className="text-sm mt-1.5" style={{ color: 'rgba(150,180,255,0.5)' }}>
                {lang === 'ar' ? 'سجّل دخولك للمتابعة' : 'Sign in to your account to continue'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>

              {/* Email field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold tracking-wide" style={{ color: 'rgba(180,200,255,0.6)' }}>
                  {lang === 'ar' ? 'البريد الإلكتروني' : 'Email address'}
                </label>
                <div className="relative">
                  <RiMailLine
                    className="absolute start-3.5 top-1/2 -translate-y-1/2 text-lg pointer-events-none"
                    style={{ color: 'rgba(150,180,255,0.35)' }}
                  />
                  <input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={lang === 'ar' ? 'admin@example.com' : 'admin@example.com'}
                    autoComplete="email"
                    className="w-full ps-10 pe-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{
                      background: 'rgba(99,130,255,0.07)',
                      border: '1px solid rgba(99,130,255,0.2)',
                      color: '#e8eeff',
                    }}
                    onFocus={(e) => {
                      e.target.style.border = '1px solid rgba(99,130,255,0.55)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(79,112,224,0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.border = '1px solid rgba(99,130,255,0.2)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold tracking-wide" style={{ color: 'rgba(180,200,255,0.6)' }}>
                  {lang === 'ar' ? 'كلمة المرور' : 'Password'}
                </label>
                <div className="relative">
                  <RiLockLine
                    className="absolute start-3.5 top-1/2 -translate-y-1/2 text-lg pointer-events-none"
                    style={{ color: 'rgba(150,180,255,0.35)' }}
                  />
                  <input
                    id="login-password"
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full ps-10 pe-11 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{
                      background: 'rgba(99,130,255,0.07)',
                      border: '1px solid rgba(99,130,255,0.2)',
                      color: '#e8eeff',
                    }}
                    onFocus={(e) => {
                      e.target.style.border = '1px solid rgba(99,130,255,0.55)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(79,112,224,0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.border = '1px solid rgba(99,130,255,0.2)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    className="absolute end-3.5 top-1/2 -translate-y-1/2 cursor-pointer transition-colors"
                    style={{ color: 'rgba(150,180,255,0.4)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(150,180,255,0.8)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(150,180,255,0.4)')}
                  >
                    {showPass ? <RiEyeOffLine className="text-lg" /> : <RiEyeLine className="text-lg" />}
                  </button>
                </div>
              </div>

              {/* Forgot password */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-xs font-medium cursor-pointer transition-colors"
                  style={{ color: 'rgba(126,184,247,0.7)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#7eb8f7')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(126,184,247,0.7)')}
                >
                  {lang === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
                </button>
              </div>

              {/* Error message */}
              {error && (
                <div
                  className="px-4 py-3 rounded-xl text-sm"
                  style={{
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.25)',
                    color: '#fca5a5',
                  }}
                >
                  {error}
                </div>
              )}

              {/* Submit button */}
              <button
                id="login-submit"
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer relative overflow-hidden"
                style={{
                  background: loading
                    ? 'rgba(79,112,224,0.4)'
                    : 'linear-gradient(135deg, #4f70e0 0%, #6366f1 50%, #10b981 100%)',
                  color: '#fff',
                  boxShadow: loading ? 'none' : '0 4px 20px rgba(79,112,224,0.4)',
                }}
                onMouseEnter={(e) => {
                  if (!loading) e.currentTarget.style.boxShadow = '0 6px 28px rgba(79,112,224,0.6)';
                }}
                onMouseLeave={(e) => {
                  if (!loading) e.currentTarget.style.boxShadow = '0 4px 20px rgba(79,112,224,0.4)';
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    {lang === 'ar' ? 'جارٍ الدخول...' : 'Signing in...'}
                  </span>
                ) : (
                  lang === 'ar' ? 'تسجيل الدخول' : 'Sign in'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px" style={{ background: 'rgba(99,130,255,0.15)' }} />
              <span className="text-xs" style={{ color: 'rgba(150,180,255,0.35)' }}>
                {lang === 'ar' ? 'أو' : 'or'}
              </span>
              <div className="flex-1 h-px" style={{ background: 'rgba(99,130,255,0.15)' }} />
            </div>

            {/* Demo login hint */}
            <p className="text-center text-xs" style={{ color: 'rgba(150,180,255,0.4)' }}>
              {lang === 'ar'
                ? 'يمكنك تسجيل الدخول بأي بيانات تجريبية'
                : 'Enter any credentials to access the demo dashboard'}
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-xs mt-6" style={{ color: 'rgba(120,150,220,0.3)' }}>
            © {new Date().getFullYear()} {lang === 'ar' ? 'عقارك' : 'EstateHub'}.{' '}
            {lang === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </div>
  );
}

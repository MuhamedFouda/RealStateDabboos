import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Layout:
 * - Manages sidebar open/close state (mobile drawer)
 * - Syncs <html> dir + lang attributes with i18n language selection (RTL/LTR)
 * - Sidebar is fixed; main content has inline-start margin to avoid overlap
 */
export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { i18n } = useTranslation();

  // Whenever the language changes, update the HTML dir and lang attributes
  useEffect(() => {
    const dir = i18n.dir();     // 'rtl' for Arabic, 'ltr' for English
    const lang = i18n.language;
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
  }, [i18n]);

  return (
    <div className="min-h-screen bg-surface">
      {/* Sidebar — fixed, responsive */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content area — offset by sidebar width on large screens */}
      <div className="flex-1 flex flex-col min-h-screen lg:ms-64">
        <Navbar onMenuToggle={() => setSidebarOpen((prev) => !prev)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  RiUserLine,
  RiMailLine,
  RiPhoneLine,
  RiBuilding4Line,
  RiMapPinLine,
  RiBuildingLine,
  RiBriefcaseLine,
  RiPercentLine,
  RiEditLine,
  RiCheckLine,
  RiLockPasswordLine,
} from 'react-icons/ri';

export default function Profile() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  // State for editable inputs
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'Muhamed Fouda',
    email: 'muhamed.fouda@example.com',
    phone: '+971 50 123 4567',
    role: lang === 'ar' ? 'مدير النظام' : 'Super Admin',
    agency: lang === 'ar' ? 'دبوس العقارية' : 'Daboos Real Estate',
    office: lang === 'ar' ? 'مرسى دبي، دبي' : 'Dubai Marina, Dubai',
  });

  const handleChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // You could persist the data here (e.g., localStorage or API call)
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* ── Profile Header Card ── */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Cover Photo */}
        <div className="h-44 bg-gradient-to-r from-navy-900 to-navy-700 relative">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 10% 20%, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}
          />
          <div className="absolute top-4 end-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="cursor-pointer flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-semibold rounded-xl border border-white/20 transition-all shadow-sm"
            >
              {isEditing ? (
                <>
                  <RiCheckLine className="text-sm text-emerald-400" />
                  <span onClick={handleSave}>{t('profile.saveChanges')}</span>
                </>
              ) : (
                <>
                  <RiEditLine className="text-sm" />
                  <span>{t('profile.editProfile')}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Profile Avatar & Info Overlay */}
        <div className="px-6 pb-6 relative flex flex-col sm:flex-row items-center sm:items-end gap-5 -mt-16">
          {/* Avatar */}
          <div className="relative shrink-0">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face&q=80"
              alt="User profile large"
              className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-md bg-white"
            />
            <span className="absolute bottom-2 end-2 w-4.5 h-4.5 rounded-full bg-[#5cb87a] border-4 border-white" />
          </div>

          {/* User Info Text */}
          <div className="flex-1 text-center sm:text-start pb-2 space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-800 leading-tight">
              {profileData.fullName}
            </h2>
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-4 gap-y-1 text-sm text-slate-500 font-medium">
              <span className="text-emerald-600 font-semibold">{profileData.role}</span>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-slate-300" />
              <span className="flex items-center gap-1">
                <RiBuilding4Line className="text-slate-400" />
                {profileData.agency}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Col — Info Card & Options (2 cols wide) */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-emerald-500 shrink-0" />
              <h3 className="font-semibold text-slate-800 text-sm">{t('profile.personalInfo')}</h3>
            </div>
            
            <div className="p-6 space-y-5">
              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    {t('profile.fullName')}
                  </label>
                  {isEditing ? (
                    <div className="relative">
                      <RiUserLine className="absolute start-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={profileData.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition shadow-sm"
                      />
                    </div>
                  ) : (
                    <p className="text-sm font-medium text-slate-700 bg-slate-50 px-4 py-2.5 rounded-xl">
                      {profileData.fullName}
                    </p>
                  )}
                </div>

                {/* Email address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    {t('profile.email')}
                  </label>
                  {isEditing ? (
                    <div className="relative">
                      <RiMailLine className="absolute start-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition shadow-sm"
                      />
                    </div>
                  ) : (
                    <p className="text-sm font-medium text-slate-700 bg-slate-50 px-4 py-2.5 rounded-xl">
                      {profileData.email}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    {t('profile.phone')}
                  </label>
                  {isEditing ? (
                    <div className="relative">
                      <RiPhoneLine className="absolute start-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={profileData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition shadow-sm"
                      />
                    </div>
                  ) : (
                    <p className="text-sm font-medium text-slate-700 bg-slate-50 px-4 py-2.5 rounded-xl">
                      {profileData.phone}
                    </p>
                  )}
                </div>

                {/* Office Location */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    {t('profile.office')}
                  </label>
                  {isEditing ? (
                    <div className="relative">
                      <RiMapPinLine className="absolute start-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={profileData.office}
                        onChange={(e) => handleChange('office', e.target.value)}
                        className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition shadow-sm"
                      />
                    </div>
                  ) : (
                    <p className="text-sm font-medium text-slate-700 bg-slate-50 px-4 py-2.5 rounded-xl">
                      {profileData.office}
                    </p>
                  )}
                </div>

              </div>

              {/* Password security preview placeholder */}
              <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 text-lg">
                    <RiLockPasswordLine />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">
                      {lang === 'ar' ? 'كلمة المرور والأمان' : 'Password & Security'}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {lang === 'ar' ? 'تحديث كلمة المرور والمصادقة الثنائية' : 'Manage your password and active sessions'}
                    </p>
                  </div>
                </div>
                <button
                  className="cursor-pointer text-xs font-bold text-emerald-600 hover:text-emerald-700 transition"
                  onClick={() => alert(t('common.editDisabled'))}
                >
                  {lang === 'ar' ? 'تغيير' : 'Change'}
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Right Col — Stats & Performance (1 col wide) */}
        <div className="space-y-6">
          
          {/* Performance Stats */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-blue-500 shrink-0" />
              <h3 className="font-semibold text-slate-800 text-sm">{t('profile.stats')}</h3>
            </div>

            <div className="p-5 space-y-4">
              {/* Stat 1 — Listings */}
              <div className="flex items-center justify-between p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-100/50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 text-lg">
                    <RiBuildingLine />
                  </div>
                  <span className="text-xs font-semibold text-slate-500">{t('profile.activeListings')}</span>
                </div>
                <span className="text-lg font-extrabold text-slate-800">12</span>
              </div>

              {/* Stat 2 — Deals */}
              <div className="flex items-center justify-between p-3.5 bg-violet-50/50 rounded-xl border border-violet-100/50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600 text-lg">
                    <RiBriefcaseLine />
                  </div>
                  <span className="text-xs font-semibold text-slate-500">{t('profile.dealsClosed')}</span>
                </div>
                <span className="text-lg font-extrabold text-slate-800">48</span>
              </div>

              {/* Stat 3 — Commission */}
              <div className="flex items-center justify-between p-3.5 bg-cyan-50/50 rounded-xl border border-cyan-100/50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-100 flex items-center justify-center text-cyan-600 text-lg">
                    <RiPercentLine />
                  </div>
                  <span className="text-xs font-semibold text-slate-500">{t('profile.commission')}</span>
                </div>
                <span className="text-lg font-extrabold text-slate-800">2.5%</span>
              </div>

            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 space-y-4">
            <h4 className="font-semibold text-slate-800 text-xs uppercase tracking-wider">
              {lang === 'ar' ? 'ساعات العمل' : 'Business Hours'}
            </h4>
            <div className="space-y-2.5 text-xs font-medium text-slate-500">
              <div className="flex justify-between">
                <span>{lang === 'ar' ? 'الإثنين - الجمعة' : 'Monday - Friday'}</span>
                <span className="text-slate-700">09:00 AM - 06:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>{lang === 'ar' ? 'السبت' : 'Saturday'}</span>
                <span className="text-slate-700">10:00 AM - 02:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>{lang === 'ar' ? 'الأحد' : 'Sunday'}</span>
                <span className="text-emerald-600 font-semibold">{lang === 'ar' ? 'مغلق' : 'Closed'}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

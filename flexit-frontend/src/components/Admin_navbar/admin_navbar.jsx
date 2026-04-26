import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSessionUser, clearSessionUser } from '../../utils/sessionUser';
import { getPasswordStatus } from '../../api/authApi';

function AdminNavbar() {
  const navigate = useNavigate();
  const sessionUser = getSessionUser();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [hasPassword, setHasPassword] = useState(() => sessionUser.hasPassword ?? true);
  const profileDropdownRef = useRef(null);

  useEffect(() => {
    const fetchPasswordStatus = async () => {
      if (!sessionUser.userId) return;
      if (typeof sessionUser.hasPassword === 'boolean') {
        setHasPassword(sessionUser.hasPassword);
        return;
      }
      try {
        const status = await getPasswordStatus(sessionUser.userId);
        setHasPassword(Boolean(status.hasPassword));
      } catch {
        setHasPassword(true);
      }
    };
    fetchPasswordStatus();
  }, [sessionUser.userId]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleLogout = () => {
    clearSessionUser();
    navigate('/login');
  };

  const handleChangePassword = () => {
    setIsProfileOpen(false);
    navigate('/admin/profile/change-password');
  };

  const handleUpdateDetails = () => {
    setIsProfileOpen(false);
    navigate('/admin/profile/update');
  };

  const adminName = sessionUser.userName || 'Admin';

  return (
    <nav className="w-full bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.05)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Left Side: Logo and Navigation */}
          <div className="flex items-center gap-6">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer transition-transform hover:scale-105 active:scale-95 duration-300">
              <img
                className="h-12 w-auto object-cover rounded-xl shadow-sm ring-1 ring-black/5"
                src="/flexit.jpeg"
                alt="FlexIT Logo"
              />
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center ml-4 gap-2">
              <a
                href="/admin/dashboard"
                className="relative px-5 py-2.5 rounded-full bg-gray-50 text-gray-700 font-semibold text-sm transition-all hover:bg-white hover:text-[#61CE70] hover:shadow-md border border-transparent hover:border-gray-200 group"
              >
                Dashboard
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#61CE70] group-hover:w-1/2 group-hover:-translate-x-1/2 transition-all duration-300 ease-out rounded-full"></span>
              </a>

              <a
                href="/admin/resources"
                className="relative px-5 py-2.5 rounded-full text-gray-600 font-semibold text-sm transition-all hover:bg-white hover:text-[#61CE70] hover:shadow-md border border-transparent hover:border-gray-200 group"
              >
                Resources
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#61CE70] group-hover:w-1/2 group-hover:-translate-x-1/2 transition-all duration-300 ease-out rounded-full"></span>
              </button>
            </div>
          </div>

          {/* Right Side: Profile Dropdown */}
          <div className="flex items-center gap-4">
            <div className="relative" ref={profileDropdownRef}>
              {/* Profile Button */}
              <button
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="flex items-center gap-3 p-1.5 pr-4 rounded-full bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all duration-300 group"
                aria-label="Open admin profile menu"
              >
                <div className="h-10 w-10 rounded-full bg-[#0a192f] flex justify-center items-center text-[#61CE70] font-bold shadow-inner border-2 border-[#61CE70]/20">
                  {adminName.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:block font-semibold text-sm text-gray-700 group-hover:text-[#61CE70] transition-colors">
                  {adminName}
                </span>
              </button>

              {/* Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-[330px] rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl z-50">
                  {/* User Details Card */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
                    <p className="text-sm font-semibold text-slate-900">
                      {sessionUser.userName || 'Admin'}
                    </p>
                    <p className="mt-1 text-xs text-slate-600">
                      {sessionUser.userEmail || 'No email available'}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      User ID: {sessionUser.userId || 'N/A'}
                    </p>
                    <p className="text-xs text-slate-500">
                      Role: {sessionUser.role || 'ADMIN'}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-3 space-y-2">
                    <button
                      onClick={handleUpdateDetails}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      Update Details
                    </button>
                    <button
                      onClick={handleChangePassword}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      {hasPassword ? 'Change Password' : 'Set a Password'}
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;

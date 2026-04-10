import React from 'react';

function AdminNavbar() {
  return (
    <nav className="w-full bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.05)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Left Side: Logo and Dashboard */}
          <div className="flex items-center gap-6">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer transition-transform hover:scale-105 active:scale-95 duration-300">
              <img 
                className="h-12 w-auto object-cover rounded-xl shadow-sm ring-1 ring-black/5" 
                src="/flexit.jpeg" 
                alt="FlexIT Logo" 
              />
              <span className="ml-3 font-extrabold text-2xl tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                FlexIT
              </span>
            </div>
            
            {/* Navigation Link: Dashboard */}
            <div className="hidden md:flex items-center ml-4">
              <a 
                href="/dashboard" 
                className="relative px-5 py-2.5 rounded-full bg-gray-50 text-gray-700 font-semibold text-sm transition-all hover:bg-white hover:text-blue-600 hover:shadow-md border border-transparent hover:border-gray-200 group"
              >
                Dashboard
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-1/2 group-hover:-translate-x-1/2 transition-all duration-300 ease-out rounded-full"></span>
              </a>
            </div>
          </div>

          {/* Right Side: Profile and Logout */}
          <div className="flex items-center gap-4">
            {/* Profile */}
            <button className="flex items-center gap-3 p-1.5 pr-4 rounded-full bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all duration-300 group">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex justify-center items-center text-white font-bold shadow-inner border-2 border-white">
                ME
              </div>
              <span className="hidden sm:block font-semibold text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
                My Profile
              </span>
            </button>
            
            {/* Logout */}
            <button className="px-6 py-2.5 rounded-full bg-gray-900 text-white font-semibold text-sm transition-all duration-300 hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30 focus:ring-4 focus:ring-red-200 active:scale-95">
              Logout
            </button>
          </div>
          
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;

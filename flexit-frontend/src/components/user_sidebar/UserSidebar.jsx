import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  PlusCircle,
  History,
  UserCircle,
  LogOut,
} from "lucide-react";

function UserSidebar() {
  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
      isActive
        ? "bg-[#61CE70] text-white shadow-sm"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <aside className="h-screen w-72 border-r border-slate-200 bg-white px-5 py-6 shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Flexit</h2>
        <p className="mt-1 text-sm text-slate-500">User Dashboard</p>
      </div>

      <nav className="flex flex-col gap-2">
        <NavLink to="/user-dashboard" className={navItemClass}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/book-resource" className={navItemClass}>
          <PlusCircle size={20} />
          <span>Book Resource</span>
        </NavLink>

        <NavLink to="/my-bookings" className={navItemClass}>
          <ClipboardList size={20} />
          <span>My Bookings</span>
        </NavLink>

        <NavLink to="/booking-history" className={navItemClass}>
          <History size={20} />
          <span>Booking History</span>
        </NavLink>

        <NavLink to="/profile" className={navItemClass}>
          <UserCircle size={20} />
          <span>Profile</span>
        </NavLink>
      </nav>

      <div className="mt-10 border-t border-slate-200 pt-5">
        <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default UserSidebar;
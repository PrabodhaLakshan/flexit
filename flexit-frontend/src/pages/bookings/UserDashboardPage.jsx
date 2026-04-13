import React from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  ClipboardList,
  CheckCircle2,
  Clock3,
  ArrowRight,
} from "lucide-react";

function UserDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            <CalendarDays size={16} />
            User Portal
          </div>

          <h1 className="text-4xl font-bold text-slate-900">
            Welcome Back 👋
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your bookings and submit new requests from your dashboard.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-slate-500">Total Bookings</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">12</h2>
              </div>

              <div className="rounded-2xl bg-blue-100 p-3 text-blue-600">
                <ClipboardList size={22} />
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-slate-500">Pending Requests</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">4</h2>
              </div>

              <div className="rounded-2xl bg-yellow-100 p-3 text-yellow-600">
                <Clock3 size={22} />
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-slate-500">Approved</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">8</h2>
              </div>

              <div className="rounded-2xl bg-green-100 p-3 text-green-600">
                <CheckCircle2 size={22} />
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          <Link
            to="/book-resource"
            className="group rounded-3xl bg-white p-8 shadow-sm border border-slate-200 hover:shadow-md transition"
          >
            <h3 className="text-2xl font-bold text-slate-900">
              Book a Resource
            </h3>

            <p className="mt-2 text-slate-500">
              Submit a new booking request for rooms, labs, or equipment.
            </p>

            <div className="mt-6 flex items-center gap-2 text-[#61CE70] font-semibold">
              Go to Booking Form
              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </div>
          </Link>

          <Link
            to="/my-bookings"
            className="group rounded-3xl bg-white p-8 shadow-sm border border-slate-200 hover:shadow-md transition"
          >
            <h3 className="text-2xl font-bold text-slate-900">
              My Bookings
            </h3>

            <p className="mt-2 text-slate-500">
              View your booking history and current request statuses.
            </p>

            <div className="mt-6 flex items-center gap-2 text-[#61CE70] font-semibold">
              View Booking History
              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}

export default UserDashboardPage;
import React from "react";
import { CalendarDays, Clock3, Users, FileText, CheckSquare } from "lucide-react";

function BookingsFormPage() {
  return (
    <div className="mx-auto max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#61CE70]/10 px-4 py-2 text-sm font-semibold text-[#2d9d45]">
          <CheckSquare size={16} />
          User Booking Portal
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Book a Resource
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Submit a booking request for a room, lab, or equipment.
        </p>
      </div>

      {/* Form Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* User ID */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              User ID
            </label>
            <input
              type="text"
              placeholder="Enter your user ID"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#61CE70] focus:bg-white"
            />
          </div>

          {/* Resource ID */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Resource ID
            </label>
            <input
              type="text"
              placeholder="Enter resource ID"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#61CE70] focus:bg-white"
            />
          </div>

          {/* Start Time */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <CalendarDays size={16} />
              Start Time
            </label>
            <input
              type="datetime-local"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#61CE70] focus:bg-white"
            />
          </div>

          {/* End Time */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Clock3 size={16} />
              End Time
            </label>
            <input
              type="datetime-local"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#61CE70] focus:bg-white"
            />
          </div>

          {/* Purpose */}
          <div className="md:col-span-2">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <FileText size={16} />
              Booking Purpose
            </label>
            <textarea
              rows="4"
              placeholder="Enter the purpose of this booking request"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#61CE70] focus:bg-white"
            ></textarea>
          </div>

          {/* Expected Attendees */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Users size={16} />
              Expected Attendees
            </label>
            <input
              type="number"
              min="1"
              placeholder="Enter attendee count"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#61CE70] focus:bg-white"
            />
          </div>
        </div>

        {/* Info box */}
        <div className="mb-8 rounded-2xl border border-[#61CE70]/20 bg-[#61CE70]/10 p-4">
          <p className="text-sm text-slate-700">
            Your booking request will be submitted with a{" "}
            <span className="font-semibold text-amber-600">PENDING</span> status
            and must be reviewed by an admin before approval.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            Clear Form
          </button>

          <button className="rounded-2xl bg-[#61CE70] px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-[#52ba60]">
            Submit Booking Request
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingsFormPage;
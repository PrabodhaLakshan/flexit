import React from "react";
import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";

function MyBookingsPage() {
  const myBookings = [
    {
      id: 1,
      resource: "Computer Lab A",
      date: "2026-04-20",
      time: "10:00 AM - 12:00 PM",
      status: "APPROVED",
    },
    {
      id: 2,
      resource: "Meeting Room B",
      date: "2026-04-22",
      time: "01:00 PM - 03:00 PM",
      status: "PENDING",
    },
    {
      id: 3,
      resource: "Projector X1",
      date: "2026-04-24",
      time: "09:00 AM - 10:00 AM",
      status: "REJECTED",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "APPROVED":
        return (
          <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            <CheckCircle2 size={14} />
            Approved
          </span>
        );
      case "PENDING":
        return (
          <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
            <AlertCircle size={14} />
            Pending
          </span>
        );
      case "REJECTED":
        return (
          <span className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
            <XCircle size={14} />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-6xl py-10 px-6">
      <div className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
          <CalendarDays size={16} />
          User Dashboard
        </div>

        <h1 className="text-3xl font-bold text-slate-900">My Bookings</h1>
        <p className="mt-2 text-sm text-slate-500">
          Track and manage all your submitted booking requests.
        </p>
      </div>

      <div className="grid gap-6">
        {myBookings.map((booking) => (
          <div
            key={booking.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {booking.resource}
                </h3>

                <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <CalendarDays size={14} />
                    {booking.date}
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock3 size={14} />
                    {booking.time}
                  </span>
                </div>
              </div>

              <div>{getStatusBadge(booking.status)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookingsPage;
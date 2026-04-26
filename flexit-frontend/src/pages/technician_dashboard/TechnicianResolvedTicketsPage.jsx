import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAllTickets } from "../../api/ticketApi";
import { getSessionUser } from "../../utils/sessionUser";

function formatDate(value) {
  if (!value) {
    return "N/A";
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
}

function TechnicianResolvedTicketsPage() {
  const sessionUser = useMemo(() => getSessionUser(), []);
  const technicianIds = useMemo(
    () =>
      new Set(
        [sessionUser.userId, sessionUser.userCode]
          .map((value) => (value || "").trim())
          .filter(Boolean)
      ),
    [sessionUser.userId, sessionUser.userCode]
  );
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadResolvedTickets = async () => {
    setError("");

    try {
      const allTickets = await getAllTickets();
      const resolved = (Array.isArray(allTickets) ? allTickets : [])
        .filter((ticket) => {
          const assignedTechnicianId = (ticket.assignedTechnicianId || "").trim();
          const status = (ticket.status || "OPEN").trim();
          return technicianIds.has(assignedTechnicianId) && status === "RESOLVED";
        })
        .sort(
          (left, right) =>
            new Date(right.resolvedAt || right.updatedAt || right.createdAt || 0) -
            new Date(left.resolvedAt || left.updatedAt || left.createdAt || 0)
        );

      setTickets(resolved);
    } catch (loadError) {
      setError(loadError.message || "Unable to load resolved tickets.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await loadResolvedTickets();
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadResolvedTickets();
    setRefreshing(false);
  };

  return (
    <section className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-cyan-200/40 bg-linear-to-r from-slate-950 via-slate-900 to-[#0a192f] p-6 text-white shadow-2xl sm:p-8">
        <div className="pointer-events-none absolute -top-20 -right-16 h-44 w-44 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-emerald-300/20 blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#61CE70]">Technician Panel</p>
            <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Resolved Tickets</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Tickets completed by you are listed here for quick review and follow-up.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
            className="inline-flex items-center justify-center rounded-xl bg-linear-to-r from-[#61CE70] to-cyan-300 px-4 py-2 text-xs font-semibold text-[#0a192f] shadow-lg transition hover:-translate-y-0.5 hover:from-white hover:to-[#c6ffd4] disabled:opacity-60"
          >
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-dashed border-cyan-300 bg-linear-to-br from-cyan-50 to-emerald-50 p-10 text-center text-slate-600 shadow-sm">
          Loading resolved tickets...
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-rose-300 bg-linear-to-br from-rose-50 to-orange-50 p-6 text-rose-800 shadow-sm">
          <p className="font-semibold">Unable to load resolved tickets</p>
          <p className="mt-1 text-sm">{error}</p>
        </div>
      ) : !tickets.length ? (
        <div className="rounded-3xl border border-dashed border-cyan-300 bg-linear-to-br from-cyan-50 to-emerald-50 p-10 text-center text-slate-600 shadow-sm">
          <p className="text-lg font-semibold text-slate-900">No resolved tickets found.</p>
          <p className="mt-2 text-sm">Resolved tickets assigned to you will appear here.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-cyan-200 bg-white shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed text-sm">
              <thead className="bg-linear-to-r from-cyan-50 to-emerald-50">
                <tr className="text-left text-slate-600">
                  <th className="w-[14%] px-4 py-3 font-semibold">Ticket ID</th>
                  <th className="w-[20%] px-4 py-3 font-semibold">Title</th>
                  <th className="w-[11%] px-4 py-3 font-semibold">Priority</th>
                  <th className="w-[10%] px-4 py-3 font-semibold">Status</th>
                  <th className="w-[13%] px-4 py-3 font-semibold">Resolved At</th>
                  <th className="w-[17%] px-4 py-3 font-semibold">Reporter</th>
                  <th className="w-[15%] px-4 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="border-t border-slate-100 align-top transition hover:bg-cyan-50/50">
                    <td className="px-4 py-4 break-words font-medium text-slate-900">{ticket.id || "N/A"}</td>
                    <td className="px-4 py-4 break-words text-slate-800">{ticket.title || "Untitled ticket"}</td>
                    <td className="px-4 py-4 text-slate-800">{ticket.priority || "MEDIUM"}</td>
                    <td className="px-4 py-4">
                      <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                        {ticket.status || "RESOLVED"}
                      </span>
                    </td>
                    <td className="px-4 py-4 break-words text-slate-700">
                      {formatDate(ticket.resolvedAt || ticket.updatedAt || ticket.createdAt)}
                    </td>
                    <td className="px-4 py-4 break-words text-slate-700">
                      {ticket.reportedByUserName || ticket.reportedByUserId || "Unknown"}
                    </td>
                    <td className="px-4 py-4">
                      <Link
                        to={`/technician/tickets/${ticket.id}`}
                        className="inline-flex rounded-xl border border-cyan-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-500 hover:text-[#0a192f]"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}

export default TechnicianResolvedTicketsPage;

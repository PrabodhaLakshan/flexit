import { Bell, CalendarClock, Send, SquarePen } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createAdminBroadcastNotification,
  formatNotificationTime,
  getAdminSentNotifications,
  getMyNotifications,
  markMyNotificationAsRead,
} from "../../api/notificationApi";
import { getSessionUser } from "../../utils/sessionUser";

const AUDIENCE_OPTIONS = [
  { label: "To all", value: "TO_ALL", hint: "Users, technicians, and admins" },
  { label: "To users", value: "TO_USERS", hint: "Only USER role" },
  { label: "To technicians", value: "TO_TECHNICIANS", hint: "Only TECHNICIAN role" },
  { label: "To admins", value: "TO_ADMINS", hint: "Only ADMIN role" },
];

const INITIAL_FORM = {
  audiences: [],
  title: "",
  message: "",
  actionUrl: "",
};

function AdminNotificationsPage() {
  const navigate = useNavigate();
  const sessionUser = getSessionUser();
  const adminSenderId = sessionUser.userCode || sessionUser.userId;

  const [receivedNotifications, setReceivedNotifications] = useState([]);
  const [sentNotifications, setSentNotifications] = useState([]);

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const totalUnread = useMemo(
    () => receivedNotifications.filter((item) => !item.isRead).length,
    [receivedNotifications]
  );

  const refreshNotifications = async () => {
    if (!sessionUser.userId) {
      setReceivedNotifications([]);
      setSentNotifications([]);
      return;
    }

    setLoading(true);
    try {
      const [received, sent] = await Promise.all([
        getMyNotifications(sessionUser.userId, sessionUser.role, 200),
        getAdminSentNotifications(adminSenderId, 200),
      ]);

      setReceivedNotifications(Array.isArray(received) ? received : []);
      setSentNotifications(Array.isArray(sent) ? sent : []);
    } catch (error) {
      console.error("Failed to load admin notifications:", error);
      setReceivedNotifications([]);
      setSentNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshNotifications();
  }, [sessionUser.userId, sessionUser.role, adminSenderId]);

  const handleNotificationClick = async (notification) => {
    try {
      await markMyNotificationAsRead(notification.id, sessionUser.userId, sessionUser.role);
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }

    refreshNotifications();

    if (notification.actionUrl) {
      const target = String(notification.actionUrl || "").trim();
      if (target.startsWith("http://") || target.startsWith("https://")) {
        window.location.assign(target);
      } else {
        const safePath = target.startsWith("/") ? target : `/${target}`;
        navigate(safePath);
      }
      return;
    }

    navigate("/admin/dashboard");
  };

  const toggleAudience = (value) => {
    setFormData((previous) => {
      const selected = new Set(previous.audiences);

      if (value === "TO_ALL") {
        if (selected.has("TO_ALL")) {
          return { ...previous, audiences: [] };
        }

        return { ...previous, audiences: ["TO_ALL"] };
      }

      selected.delete("TO_ALL");
      if (selected.has(value)) {
        selected.delete(value);
      } else {
        selected.add(value);
      }

      return { ...previous, audiences: Array.from(selected) };
    });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.audiences.length) return "Select at least one audience.";
    if (!formData.title.trim()) return "Title is required.";
    if (!formData.message.trim()) return "Notification message is required.";
    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    setSuccessMessage("");

    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setSending(true);
    try {
      await createAdminBroadcastNotification({
        senderUserId: adminSenderId,
        senderRole: sessionUser.role,
        senderName: sessionUser.userName,
        audiences: formData.audiences,
        title: formData.title.trim(),
        message: formData.message.trim(),
        actionUrl: formData.actionUrl.trim() || "/admin/notifications",
      });

      setSuccessMessage("Notification sent successfully.");
      setFormData(INITIAL_FORM);
      refreshNotifications();
    } catch (error) {
      setFormError(error?.response?.data?.message || error?.message || "Failed to send notification.");
    } finally {
      setSending(false);
    }
  };

  const audienceLabel = (notification) => {
    if (notification?.recipientRole) {
      return `To ${String(notification.recipientRole).toLowerCase()}`;
    }

    return "Direct";
  };

  return (
    <section className="space-y-6">
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#61CE70]">Admin notifications</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Notification Center
            </h1>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
            <Bell size={16} />
            {receivedNotifications.length} received ({totalUnread} unread)
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5">
          <div className="mb-4 flex items-center gap-2">
            <SquarePen size={16} className="text-slate-600" />
            <p className="text-sm font-semibold text-slate-800">Create admin notification</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Send to</p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {AUDIENCE_OPTIONS.map((option) => {
                  const selected = formData.audiences.includes(option.value);
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => toggleAudience(option.value)}
                      className={`rounded-xl border px-3 py-2 text-left transition ${
                        selected
                          ? "border-[#61CE70] bg-[#61CE70]/10"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <p className="text-sm font-semibold text-slate-800">{option.label}</p>
                      <p className="text-xs text-slate-500">{option.hint}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                placeholder="Ex: Maintenance notice"
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-[#61CE70] focus:ring-2 focus:ring-[#61CE70]/30"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Link (click destination)</label>
              <input
                name="actionUrl"
                value={formData.actionUrl}
                onChange={handleFormChange}
                placeholder="Ex: /admin/tickets"
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-[#61CE70] focus:ring-2 focus:ring-[#61CE70]/30"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Notification message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                rows={4}
                placeholder="Write your notification content..."
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-[#61CE70] focus:ring-2 focus:ring-[#61CE70]/30"
              />
            </div>
          </div>

          {formError ? (
            <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
              {formError}
            </p>
          ) : null}

          {successMessage ? (
            <p className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
              {successMessage}
            </p>
          ) : null}

          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0a192f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#10274a] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send size={15} />
              {sending ? "Sending..." : "Send Notification"}
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-slate-900">Notifications Sent by You</h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {sentNotifications.length} total
            </span>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
              Loading sent notifications...
            </div>
          ) : sentNotifications.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
              You have not sent notifications yet.
            </div>
          ) : (
            <div className="space-y-3">
              {sentNotifications.map((notification) => (
                <div key={notification.id} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{notification.title}</p>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                      {audienceLabel(notification)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{notification.message}</p>
                  <p className="mt-2 text-xs text-slate-500">{formatNotificationTime(notification.createdAt)}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-slate-900">Notifications Received by Admin</h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {receivedNotifications.length} total
            </span>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
              Loading admin notifications...
            </div>
          ) : receivedNotifications.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
              No notifications received yet.
            </div>
          ) : (
            <div className="space-y-3">
              {receivedNotifications.map((notification) => (
                <button
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    notification.isRead ? "border-slate-200 bg-white" : "border-[#61CE70]/40 bg-[#61CE70]/10"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 sm:text-base">{notification.title}</h3>
                      <p className="mt-1 text-sm text-slate-600">{notification.message}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                      <CalendarClock size={13} />
                      {formatNotificationTime(notification.createdAt)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default AdminNotificationsPage;

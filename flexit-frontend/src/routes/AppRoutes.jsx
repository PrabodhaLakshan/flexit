import { BrowserRouter, Navigate, Outlet, Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import TechnicianLayout from "../layouts/TechnicianLayout";
import AdminDashboard from "../pages/admin_dashboard/admin_dashboard";
import ResourcesPage from "../pages/resources/ResourcesPage";
import CreateResourcePage from "../pages/resources/CreateResourcePage";
import EditResourcePage from "../pages/resources/EditResourcePage";
import ResourceDetailsPage from "../pages/resources/ResourceDetailsPage";
import TicketsPage from "../pages/tickets/TicketsPage";
import TechnicianDashboard from "../pages/technician_dashboard/TechnicianDashboard";
import LoginPage from "../pages/auth/LoginPage";
import { getSessionUser, isAuthenticated } from "../utils/sessionUser";

function RequireAuth() {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

function RequireRole({ role }) {
  const sessionUser = getSessionUser();

  if (sessionUser.role !== role) {
    if (sessionUser.role === "TECHNICIAN") {
      return <Navigate to="/technician/dashboard" replace />;
    }

    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
}

function AppRoutes() {
  const sessionUser = getSessionUser();
  const landingPage = !isAuthenticated()
    ? <Navigate to="/login" replace />
    : sessionUser.role === "TECHNICIAN"
      ? <Navigate to="/technician/dashboard" replace />
      : <Navigate to="/admin/dashboard" replace />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={landingPage} />

        <Route element={<RequireAuth />}>
          <Route element={<RequireRole role="TECHNICIAN" />}>
            <Route element={<TechnicianLayout />}>
              <Route path="/technician/dashboard" element={<TechnicianDashboard />} />
            </Route>
          </Route>

          <Route element={<RequireRole role="ADMIN" />}>
            <Route element={<AdminLayout />}>
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />

              {/* Resource Routes - both /resources and /admin/resources work */}
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/resources/create" element={<CreateResourcePage />} />
              <Route path="/resources/edit/:id" element={<EditResourcePage />} />
              <Route path="/resources/:id" element={<ResourceDetailsPage />} />

              <Route path="/admin/resources" element={<ResourcesPage />} />
              <Route path="/admin/resources/create" element={<CreateResourcePage />} />
              <Route path="/admin/resources/edit/:id" element={<EditResourcePage />} />
              <Route path="/admin/resources/:id" element={<ResourceDetailsPage />} />

              {/* Ticket Routes - admin management table */}
              <Route path="/tickets" element={<TicketsPage />} />
              <Route path="/admin/tickets" element={<TicketsPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
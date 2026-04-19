import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/footer';
import Home from './components/home/Home';
import Resources from './components/resources/Resources';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

function AdminRoute({ children }) {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem('flexitUser') || 'null');
  } catch {
    user = null;
  }

  if (!user?.userId) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'ADMIN') {
    return <Navigate to="/resources" replace />;
  }

  return children;
}

function AppLayout() {
  const location = useLocation();
  const hideLayout = location.pathname === '/login' || location.pathname === '/signup';
  const showFooter = location.pathname === '/';

  return (
    <>
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<Resources />} />
        <Route
          path="/admin-dashboard"
          element={(
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          )}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      {showFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;

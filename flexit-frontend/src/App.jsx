import { useState, useEffect } from 'react';
import ResourceForm from './components/resources/ResourceForm';
import AdminNavbar from './components/Admin_navbar/admin_navbar';
import AdminDashboard from './pages/admin_dashboard/admin_dashboard';
import AppRoutes from "./routes/AppRoutes";
function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const handleSubmit = (formData) => {
    console.log('Form submitted:', formData);
    alert('Resource submitted: ' + JSON.stringify(formData));
  };

  // Route mapping
  if (currentPath === '/admin/dashboard' || currentPath === '/') {
    return <AdminDashboard />;
  }

  if (currentPath === '/admin/resources') {
    return (
      
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ResourceForm 
            onSubmit={handleSubmit}
            submitLabel="Add Resource"
          />
        </main>
      </div>
      
    );
  }
  else if (currentPath.startsWith('/ ')) {
    return <AppRoutes />;
  }

  // 404 Fallback
  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col">
       <h1 className="text-2xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
       <a href="/admin/dashboard" className="text-[#61CE70] font-semibold hover:underline">
         Return to Dashboard
       </a>
    </div>
  );
 
}

export default App;


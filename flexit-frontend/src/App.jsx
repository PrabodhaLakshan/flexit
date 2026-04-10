import { useState } from 'react';
import ResourceForm from './components/resources/ResourceForm';
import AdminNavbar from './components/Admin_navbar/admin_navbar';
// Removed restricting './App.css' import since we use Tailwind now

function App() {
  const handleSubmit = (formData) => {
    console.log('Form submitted:', formData);
    alert('Resource submitted: ' + JSON.stringify(formData));
  };

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

export default App;


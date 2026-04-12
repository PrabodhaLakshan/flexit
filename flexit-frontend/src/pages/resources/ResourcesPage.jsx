import { useEffect, useState } from "react";
import { deleteResource, getAllResources } from "../../api/resourceApi";
import { Link } from "react-router-dom";

function ResourcesPage() {
  const [resources, setResources] = useState([]);

  const loadResources = async () => {
    try {
      const response = await getAllResources();
      setResources(response.data);
    } catch (error) {
      console.error("Failed to load resources", error);
    }
  };

  useEffect(() => {
    loadResources();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this resource?")) {
      await deleteResource(id);
      loadResources();
    }
  };

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resource Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage all available resources across branches.</p>
        </div>
        <Link 
          to="/admin/resources/create" 
          className="px-4 py-2 bg-[#0a192f] text-white font-semibold rounded-lg hover:bg-[#61CE70] hover:text-[#0a192f] shadow-md transition-all active:scale-95 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Resource
        </Link>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4 text-center">Capacity</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {resources.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No resources found. Click 'Add Resource' to create one.
                  </td>
                </tr>
              ) : (
                resources.map((resource) => (
                  <tr key={resource.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{resource.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                        {resource.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-700">{resource.capacity}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{resource.location}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        resource.status === 'ACTIVE' 
                          ? 'bg-green-50 text-green-700 border-green-100' 
                          : 'bg-red-50 text-red-700 border-red-100'
                      }`}>
                        {resource.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <Link 
                        to={`/admin/resources/${resource.id}`} 
                        className="text-blue-600 hover:text-blue-900 font-medium text-sm transition-colors"
                      >
                        View
                      </Link>
                      <Link 
                        to={`/admin/resources/edit/${resource.id}`} 
                        className="text-indigo-600 hover:text-indigo-900 font-medium text-sm transition-colors"
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(resource.id)}
                        className="text-red-600 hover:text-red-900 font-medium text-sm transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ResourcesPage;
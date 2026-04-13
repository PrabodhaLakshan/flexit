import { useNavigate, Link } from "react-router-dom";
import { createResource } from "../../api/resourceApi";
import ResourceForm from "../../components/resources/ResourceForm";

function CreateResourcePage() {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
      await createResource(data);
      navigate("/admin/resources");
    } catch (err) {
      throw err; // Let ResourceForm catch & display the error
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-2">
       <div className="mb-6 flex gap-4 items-center">
        <Link to="/admin/resources" className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Resource</h1>
          <p className="text-sm text-gray-500 mt-1">Add a new resource to the system.</p>
        </div>
      </div>
      <ResourceForm onSubmit={handleCreate} submitLabel="Create Resource" />
    </div>
  );
}

export default CreateResourcePage;
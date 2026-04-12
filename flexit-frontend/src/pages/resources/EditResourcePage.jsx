import { useEffect, useState } from "react";
import { getResourceById, updateResource } from "../../api/resourceApi";
import { useNavigate, useParams } from "react-router-dom";
import ResourceForm from "../../components/resources/ResourceForm";

function EditResourcePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState(null);

  useEffect(() => {
    const loadResource = async () => {
      const response = await getResourceById(id);
      setResource(response.data);
    };
    loadResource();
  }, [id]);

  const handleUpdate = async (data) => {
    await updateResource(id, data);
    navigate("/resources");
  };

  if (!resource) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Resource</h1>
      <ResourceForm initialData={resource} onSubmit={handleUpdate} submitLabel="Update Resource" />
    </div>
  );
}

export default EditResourcePage;
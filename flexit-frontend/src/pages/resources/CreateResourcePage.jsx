import { useNavigate } from "react-router-dom";
import { createResource } from "../../api/resourceApi";
import ResourceForm from "../../components/resources/ResourceForm";

function CreateResourcePage() {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    await createResource(data);
    navigate("/resources");
  };

  return (
    <div>
      <h1>Create Resource</h1>
      <ResourceForm onSubmit={handleCreate} submitLabel="Create Resource" />
    </div>
  );
}

export default CreateResourcePage;
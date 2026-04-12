import { useEffect, useState } from "react";
import { getResourceById } from "../../api/resourceApi";
import { useParams } from "react-router-dom";

function ResourceDetailsPage() {
  const { id } = useParams();
  const [resource, setResource] = useState(null);

  useEffect(() => {
    const loadResource = async () => {
      const response = await getResourceById(id);
      setResource(response.data);
    };
    loadResource();
  }, [id]);

  if (!resource) return <p>Loading...</p>;

  return (
    <div>
      <h1>{resource.name}</h1>
      <p><strong>Type:</strong> {resource.type}</p>
      <p><strong>Capacity:</strong> {resource.capacity}</p>
      <p><strong>Location:</strong> {resource.location}</p>
      <p><strong>Availability:</strong> {resource.availabilityStart} - {resource.availabilityEnd}</p>
      <p><strong>Status:</strong> {resource.status}</p>
      <p><strong>Description:</strong> {resource.description}</p>
    </div>
  );
}

export default ResourceDetailsPage;
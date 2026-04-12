import { useEffect, useState } from "react";
import { deleteResource, getAllResources } from "../../api/resourceApi";
import { Link } from "react-router-dom";

function ResourcesPage() {
  const [resources, setResources] = useState([]);

  const loadResources = async () => {
    const response = await getAllResources();
    setResources(response.data);
  };

  useEffect(() => {
    loadResources();
  }, []);

  const handleDelete = async (id) => {
    await deleteResource(id);
    loadResources();
  };

  return (
    <div>
      <h1>Resources</h1>
      <Link to="/resources/create">Add Resource</Link>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Capacity</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((resource) => (
            <tr key={resource.id}>
              <td>{resource.name}</td>
              <td>{resource.type}</td>
              <td>{resource.capacity}</td>
              <td>{resource.location}</td>
              <td>{resource.status}</td>
              <td>
                <Link to={`/resources/${resource.id}`}>View</Link>{" | "}
                <Link to={`/resources/edit/${resource.id}`}>Edit</Link>{" | "}
                <button onClick={() => handleDelete(resource.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResourcesPage;
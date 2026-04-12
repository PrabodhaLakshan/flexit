import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResourcesPage from "../pages/resources/ResourcesPage";
import CreateResourcePage from "../pages/resources/CreateResourcePage";
import EditResourcePage from "../pages/resources/EditResourcePage";
import ResourceDetailsPage from "../pages/resources/ResourceDetailsPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ResourcesPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/resources/create" element={<CreateResourcePage />} />
        <Route path="/resources/edit/:id" element={<EditResourcePage />} />
        <Route path="/resources/:id" element={<ResourceDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
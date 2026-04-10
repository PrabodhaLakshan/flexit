import { useState } from "react";

function ResourceForm({ initialData, onSubmit, submitLabel }) {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      type: "LAB",
      capacity: 1,
      location: "",
      availabilityStart: "",
      availabilityEnd: "",
      status: "ACTIVE",
      description: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "capacity" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Resource</h2>
        <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" name="name" placeholder="Resource Name" value={formData.name} onChange={handleChange} required />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" name="type" value={formData.type} onChange={handleChange}>
                  <option value="LECTURE_HALL">Lecture Hall</option>
                  <option value="LAB">Lab</option>
                  <option value="MEETING_ROOM">Meeting Room</option>
                  <option value="PROJECTOR">Projector</option>
                  <option value="CAMERA">Camera</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                <input className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" name="capacity" type="number" min="1" value={formData.capacity} onChange={handleChange} required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" name="location" placeholder="e.g. Building A, Room 101" value={formData.location} onChange={handleChange} required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                <input className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" name="availabilityStart" type="time" value={formData.availabilityStart} onChange={handleChange} required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                <input className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" name="availabilityEnd" type="time" value={formData.availabilityEnd} onChange={handleChange} required />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" name="status" value={formData.status} onChange={handleChange}>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="OUT_OF_SERVICE">OUT_OF_SERVICE</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all min-h-[100px]" name="description" placeholder="Any additional details..." value={formData.description} onChange={handleChange} />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button className="px-6 py-2.5 bg-gray-900 text-white font-semibold rounded-xl shadow-md hover:bg-gray-800 hover:shadow-lg transition-all active:scale-95 focus:ring-4 focus:ring-gray-200" type="submit">
                {submitLabel}
              </button>
            </div>
          </form>
      </div>
    </div>
  );
}

export default ResourceForm;
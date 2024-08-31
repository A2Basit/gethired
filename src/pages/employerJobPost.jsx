import React, { useState } from "react";
import { supabase } from "../../supabase/config";
import { useNavigate } from "react-router-dom";
const EmployerJobPost = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    requirements: "",
    responsibilities: "",
    location: "",
    salaryRange: "",
    customSalaryRange: "",
  });
  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let salaryRange = formData.salaryRange;
    if (salaryRange === "custom") {
      salaryRange = formData.customSalaryRange;
    }

    const dataToSubmit = {
      title: formData.title,
      company: formData.company,
      description: formData.description,
      requirements: formData.requirements,
      responsibilities: formData.responsibilities,
      location: formData.location,
      salary_range: salaryRange,
    };

    try {
      const { data, error } = await supabase
        .from("job_postings")
        .insert([dataToSubmit]);

      if (error) {
        console.error("Error:", error.message);
        alert("Failed to create job posting.");
      } else {
        alert("Job posting created successfully!");
        // Reset form after submission
        setFormData({
          title: "",
          description: "",
          requirements: "",
          responsibilities: "",
          location: "",
          salaryRange: "",
          customSalaryRange: "",
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An error occurred while submitting the form.");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md space-y-4 md:mt-24"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Company</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Requirements
        </label>
        <textarea
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Responsibilities
        </label>
        <textarea
          name="responsibilities"
          value={formData.responsibilities}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Salary Range
        </label>
        <select
          name="salaryRange"
          value={formData.salaryRange}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        >
          <option value="">Select a range</option>
          <option value="30-50k">30-50k</option>
          <option value="50-70k">50-70k</option>
          <option value="70-90k">70-90k</option>
          <option value="custom">Custom</option>
        </select>

        {formData.salaryRange === "custom" && (
          <input
            type="text"
            name="customSalaryRange"
            value={formData.customSalaryRange}
            onChange={handleChange}
            placeholder="Enter custom salary range"
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
          />
        )}
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
export default EmployerJobPost;

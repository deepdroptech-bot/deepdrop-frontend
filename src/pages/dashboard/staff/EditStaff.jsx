import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { staffAPI } from "../../../services/staffService";

export default function EditStaff() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    nin: "",
    position: "",
    baseSalary: "",
    employmentStatus: ""
  });

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    staffAPI.getById(id).then(res => {
      const s = res.data;
      setForm({
        firstName: s.firstName,
        lastName: s.lastName,
        phone: s.phone,
        nin: s.nin,
        position: s.position,
        baseSalary: s.baseSalary,
        employmentStatus: s.employmentStatus
      });
      setPreview(s.photo?.url || "");
      setLoading(false);
    });
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) =>
      data.append(key, value)
    );

    if (photo) data.append("photo", photo);

    await staffAPI.update(id, data);

    setSaving(false);
    navigate(`/dashboard/staff/${id}`);
  };

  if (loading)
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl px-12 py-10 shadow-2xl text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-tr from-red-500 to-blue-600 flex items-center justify-center animate-pulse">
          <span className="text-white text-2xl font-black">⏳</span>
        </div>
        <h2 className="text-2xl font-extrabold text-gray-800 mb-2">
          Loading Staff Details
        </h2>
        <p className="text-gray-500 text-base">
          Please wait while we fetch your staff details
        </p>
      </div>
    </div>
  );

return (
  <div className="max-w-3xl mx-auto space-y-8">
    {/* PAGE HEADER */}
    <div>
      <h1 className="text-3xl font-bold text-gray-800">
        Edit Staff
      </h1>
      <p className="text-gray-500 mt-1">
        Update staff information and employment details
      </p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-8">
      {/* PHOTO CARD */}
      <div className="card flex items-center gap-6">
        <img
          src={preview || "/avatar.png"}
          className="w-24 h-24 rounded-full object-cover border border-gray-200"
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">
            Profile Photo
          </label>
          <input
            type="file"
            accept="image/*"
            className="file-input"
            onChange={e => {
              setPhoto(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />
          <p className="text-xs text-gray-400">
            JPG, PNG. Max 5MB.
          </p>
        </div>
      </div>

      {/* BASIC INFO */}
      <div className="card space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
          />

          <input
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            name="nin"
            placeholder="NIN"
            value={form.nin}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* JOB INFO */}
      <div className="card space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Employment Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="position"
            value={form.position}
            onChange={handleChange}
            required
          >
            <option value="">Select Position</option>
            <option value="Pump Attendant">Pump Attendant</option>
            <option value="Cashier">Cashier</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Manager">Manager</option>
            <option value="Accountant">Accountant</option>
          </select>

          <input
            name="baseSalary"
            type="number"
            placeholder="Base Salary"
            value={form.baseSalary}
            onChange={handleChange}
            required
          />

          <select
            name="employmentStatus"
            value={form.employmentStatus}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
            <option value="terminated">Terminated</option>
          </select>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={saving}
          className="btn-primary min-w-[160px]"
        >
          {saving ? "Saving changes…" : "Save Changes"}
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn-outline"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
);
}
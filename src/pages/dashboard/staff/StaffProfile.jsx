import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { staffAPI } from "../../services/staffService";

export default function StaffProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);

  const [bonus, setBonus] = useState({ amount: "", reason: "" });
  const [deduction, setDeduction] = useState({ amount: "", reason: "" });

  useEffect(() => {
    staffAPI.getById(id)
      .then(res => setStaff(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading staff profile...</p>;
  if (!staff) return <p>Staff not found</p>;

  const handleBonus = async () => {
    await staffAPI.addBonus(id, bonus);
    const updated = await staffAPI.getById(id);
    setStaff(updated.data);
    setBonus({ amount: "", reason: "" });
  };

  const handleDeduction = async () => {
    await staffAPI.addDeduction(id, deduction);
    const updated = await staffAPI.getById(id);
    setStaff(updated.data);
    setDeduction({ amount: "", reason: "" });
  };

  const toggleStatus = async () => {
    staff.isActive
      ? await staffAPI.deactivate(id)
      : await staffAPI.activate(id);

    const updated = await staffAPI.getById(id);
    setStaff(updated.data);
  };

  const deleteStaff = async () => {
    if (!confirm("Are you sure you want to delete this staff?")) return;
    await staffAPI.delete(id);
    navigate("/dashboard/staff");
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-center gap-6 bg-white p-6 rounded-xl shadow">
        <img
          src={staff.photo?.url || "/avatar.png"}
          className="w-24 h-24 rounded-full object-cover border"
        />

        <div className="flex-1">
          <h1 className="text-2xl font-bold">
            {staff.firstName} {staff.lastName}
          </h1>
          <p className="text-gray-500 capitalize">
            {staff.position.replace("_", " ")}
          </p>
          <p className="text-sm text-gray-400">Staff ID: {staff.staffId}</p>
        </div>

        <span
          className={`px-4 py-1 rounded-full text-sm font-medium ${
            staff.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {staff.employmentStatus}
        </span>
      </div>

      {/* INFO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BIO */}
        <div className="card">
          <h3 className="font-semibold mb-4">Staff Information</h3>
          <ul className="space-y-2 text-sm">
            <li><strong>Phone:</strong> {staff.phone}</li>
            <li><strong>NIN:</strong> {staff.nin}</li>
            <li><strong>Hire Date:</strong> {new Date(staff.hireDate).toDateString()}</li>
          </ul>
        </div>

        {/* SALARY */}
        <div className="card">
          <h3 className="font-semibold mb-4">Salary Overview</h3>
          <ul className="space-y-2 text-sm">
            <li>Base Salary: ₦{staff.baseSalary.toLocaleString()}</li>
            <li>Total Bonuses: ₦{staff.bonuses.reduce((s,b)=>s+b.amount,0).toLocaleString()}</li>
            <li>Total Deductions: ₦{staff.deductions.reduce((s,d)=>s+d.amount,0).toLocaleString()}</li>
            <li className="font-bold text-lg">
              Net Salary: ₦{staff.netSalary.toLocaleString()}
            </li>
          </ul>
        </div>
      </div>

      {/* ADJUSTMENTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BONUS */}
        <div className="card">
          <h3 className="font-semibold mb-3">Add Bonus</h3>
          <input
            placeholder="Amount"
            type="number"
            value={bonus.amount}
            onChange={e => setBonus({ ...bonus, amount: e.target.value })}
          />
          <input
            placeholder="Reason"
            value={bonus.reason}
            onChange={e => setBonus({ ...bonus, reason: e.target.value })}
          />
          <button className="btn-primary mt-2" onClick={handleBonus}>
            Add Bonus
          </button>
        </div>

        {/* DEDUCTION */}
        <div className="card">
          <h3 className="font-semibold mb-3">Add Deduction</h3>
          <input
            placeholder="Amount"
            type="number"
            value={deduction.amount}
            onChange={e => setDeduction({ ...deduction, amount: e.target.value })}
          />
          <input
            placeholder="Reason"
            value={deduction.reason}
            onChange={e => setDeduction({ ...deduction, reason: e.target.value })}
          />
          <button className="btn-secondary mt-2" onClick={handleDeduction}>
            Apply Deduction
          </button>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-4">
        <button
          className="btn-outline"
          onClick={() => navigate(`/dashboard/staff/${id}/edit`)}
        >
          Edit Staff
        </button>

        <button
          className={staff.isActive ? "btn-warning" : "btn-success"}
          onClick={toggleStatus}
        >
          {staff.isActive ? "Deactivate" : "Activate"}
        </button>

        <button className="btn-danger" onClick={deleteStaff}>
          Delete Staff
        </button>
      </div>
    </div>
  );
}
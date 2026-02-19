import { useEffect, useState } from "react";
import { pmsPLAPI } from "../../../services/pmsPLService";

export default function PMSPLManagement() {

  const [activeTab, setActiveTab] = useState("list");
  const [records, setRecords] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    periodFrom: "",
    periodTo: "",
    purchaseCost: "",
    cashAdjustments: 0
  });

  const fetchAll = async () => {
    const res = await pmsPLAPI.getAll();
    setRecords(res.data);
  };

  useEffect(() => {
    fetchAll();
        // Simulate loading time for better UX
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const formatCurrency = (val) =>
    `₦${Number(val || 0).toLocaleString()}`;

  /* ================= CREATE ================= */
  const handleCreate = async (e) => {
    e.preventDefault();
    await pmsPLAPI.create(form);
    setActiveTab("list");
    fetchAll();
  };

  /* ================= VIEW ================= */
  const handleView = async (id) => {
    const res = await pmsPLAPI.getById(id);
    setSelected(res.data);
    setActiveTab("view");
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (id) => {
    await pmsPLAPI.submit(id);
    fetchAll();
  };

  /* ================= APPROVE ================= */
  const handleApprove = async (id) => {
    await pmsPLAPI.approve(id);
    fetchAll();
  };

  const statusBadge = (status) => {
    const colors = {
      draft: "bg-gray-200 text-gray-700",
      submitted: "bg-yellow-100 text-yellow-700",
      approved: "bg-green-100 text-green-700"
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status]}`}>
        {status}
      </span>
    );
  };

    if (loading)
      return (
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl px-12 py-10 shadow-2xl text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center animate-pulse">
              <span className="text-white text-2xl font-black">⏳</span>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-800 mb-2">
              Loading PMS Profit & Loss Records
            </h2>
            <p className="text-gray-500 text-base">
              Please wait while we prepare the financial data
            </p>
          </div>
        </div>
      );

  return (
    <div className="p-6 space-y-8">

      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold">
          PMS Profit & Loss
        </h1>
        <p className="text-emerald-100 mt-2">
          Period financial performance & approval workflow
        </p>
      </div>

      {/* ================= TABS ================= */}
      <div className="flex gap-4">
        <button
          onClick={() => setActiveTab("list")}
          className={`px-6 py-2 rounded-xl ${
            activeTab === "list"
              ? "bg-emerald-600 text-white"
              : "bg-white shadow"
          }`}
        >
          All Records
        </button>

        <button
          onClick={() => setActiveTab("create")}
          className={`px-6 py-2 rounded-xl ${
            activeTab === "create"
              ? "bg-emerald-600 text-white"
              : "bg-white shadow"
          }`}
        >
          Create P&L
        </button>
      </div>

      {/* ====================================================
         LIST TAB
      ==================================================== */}
      {activeTab === "list" && (
        <div className="bg-white p-6 rounded-3xl shadow-xl">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-3">Period</th>
                <th>Net Sales</th>
                <th>Purchase Cost</th>
                <th>Profit / Loss</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {records.map((rec) => (
                <tr key={rec._id} className="border-b hover:bg-gray-50">
                  <td className="py-3">
                    {new Date(rec.periodFrom).toLocaleDateString()} - {" "}
                    {new Date(rec.periodTo).toLocaleDateString()}
                  </td>

                  <td>{formatCurrency(rec.pmsNetSales)}</td>
                  <td>{formatCurrency(rec.purchaseCost)}</td>

                  <td className={`font-bold ${
                    rec.profitOrLoss >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}>
                    {formatCurrency(rec.profitOrLoss)}
                  </td>

                  <td>{statusBadge(rec.status)}</td>

                  <td className="space-x-2">
                    <button
                      onClick={() => handleView(rec._id)}
                      className="text-indigo-600"
                    >
                      View
                    </button>

                    {rec.status === "draft" && (
                      <button
                        onClick={() => handleSubmit(rec._id)}
                        className="text-yellow-600"
                      >
                        Submit
                      </button>
                    )}

                    {rec.status === "submitted" && (
                      <button
                        onClick={() => handleApprove(rec._id)}
                        className="text-green-600"
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ====================================================
         CREATE TAB
      ==================================================== */}
      {activeTab === "create" && (
        <div className="bg-white p-6 rounded-3xl shadow-xl">
          <form onSubmit={handleCreate} className="grid md:grid-cols-2 gap-6">

            <input type="date" required
              className="border p-3 rounded-xl"
              onChange={(e)=>setForm({...form, periodFrom: e.target.value})}
            />

            <input type="date" required
              className="border p-3 rounded-xl"
              onChange={(e)=>setForm({...form, periodTo: e.target.value})}
            />

            <input type="number" placeholder="Purchase Cost" required
              className="border p-3 rounded-xl"
              onChange={(e)=>setForm({...form, purchaseCost: e.target.value})}
            />

            <input type="number" placeholder="Cash Adjustments"
              className="border p-3 rounded-xl"
              onChange={(e)=>setForm({...form, cashAdjustments: e.target.value})}
            />

            <button className="bg-emerald-600 text-white p-3 rounded-xl hover:bg-emerald-700 transition col-span-2">
              Create P&L
            </button>

          </form>
        </div>
      )}

      {/* ====================================================
         VIEW TAB
      ==================================================== */}
      {activeTab === "view" && selected && (
        <div className="bg-white p-6 rounded-3xl shadow-xl space-y-4">

          <h2 className="text-xl font-bold">
            PMS Profit & Loss Details
          </h2>

          <p><strong>Period:</strong> {new Date(selected.periodFrom).toLocaleDateString()} - {new Date(selected.periodTo).toLocaleDateString()}</p>

          <p><strong>Net Sales:</strong> {formatCurrency(selected.pmsNetSales)}</p>
          <p><strong>Purchase Cost:</strong> {formatCurrency(selected.purchaseCost)}</p>
          <p><strong>Cash Adjustments:</strong> {formatCurrency(selected.cashAdjustments)}</p>

          <p className={`text-xl font-bold ${
            selected.profitOrLoss >= 0
              ? "text-green-600"
              : "text-red-600"
          }`}>
            Profit / Loss: {formatCurrency(selected.profitOrLoss)}
          </p>

          <p><strong>Status:</strong> {selected.status}</p>

          <button
            onClick={()=>setActiveTab("list")}
            className="bg-gray-800 text-white px-6 py-2 rounded-xl"
          >
            Back
          </button>
        </div>
      )}

    </div>
  );
}

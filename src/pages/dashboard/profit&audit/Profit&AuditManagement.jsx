import { useState } from "react";
import { profitAuditAPI } from "../../../services/profit&AuditService";

export default function ProfitAuditManagement() {

  const [activeTab, setActiveTab] = useState("daily");

  const [dailyDate, setDailyDate] = useState("");
  const [dailyReport, setDailyReport] = useState(null);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [summary, setSummary] = useState(null);

  const [auditdate, setAuditDate] = useState("");
  const [auditData, setAuditData] = useState(null);

  const [loading, setLoading] = useState(false);

  const formatCurrency = (val) =>
    `₦${Number(val || 0).toLocaleString()}`;

  /* ================= DAILY REPORT ================= */

  const fetchDailyReport = async () => {
    try {
      const res = await profitAuditAPI.getDailyReport(dailyDate);
      setDailyReport(res.data);
      setLoading(true);
    } catch (err) {
      alert("No approved sales found for this date");
      setDailyReport(null);
    }
  };

  /* ================= SUMMARY REPORT ================= */

  const fetchSummary = async () => {
    try {
      const res = await profitAuditAPI.getSummary(from, to);
      setSummary(res.data);
    } catch (err) {
      alert("Failed to generate summary");
    }
  };

  /* ================= AUDIT TRAIL ================= */

  const fetchAuditTrail = async () => {
    try {
      const res = await profitAuditAPI.getAuditTrail(auditdate);
      setAuditData(res.data);
    } catch (err) {
      alert("Sales record not found");
    }
  };

  if (loading)
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl px-12 py-10 shadow-2xl text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center animate-pulse">
          <span className="text-white text-2xl font-black">⏳</span>
        </div>
        <h2 className="text-2xl font-extrabold text-gray-800 mb-2">
          Loading Profit & Audit Data
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
      <div className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold">
          Profit & Audit Center
        </h1>
        <p className="text-indigo-200 mt-2">
          Financial insights and accountability tracking
        </p>
      </div>

      {/* ================= TABS ================= */}
      <div className="flex gap-4">
        {["daily", "summary", "audit"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-xl font-semibold transition ${
              activeTab === tab
                ? "bg-indigo-600 text-white"
                : "bg-white shadow"
            }`}
          >
            {tab === "daily" && "Daily Report"}
            {tab === "summary" && "Profit Summary"}
            {tab === "audit" && "Audit Trail"}
          </button>
        ))}
      </div>

      {/* ============================================================
         DAILY PROFIT REPORT TAB
      ============================================================ */}
      {activeTab === "daily" && (
        <div className="bg-white p-6 rounded-3xl shadow-xl space-y-6">

          <div className="flex gap-4">
            <input
              type="date"
              className="border p-3 rounded-xl"
              value={dailyDate}
              onChange={(e) => setDailyDate(e.target.value)}
            />
            <button
              onClick={fetchDailyReport}
              className="bg-indigo-600 text-white px-6 rounded-xl"
            >
              Generate
            </button>
          </div>

          {dailyReport && (
            <div className="grid md:grid-cols-3 gap-6">

              <div className="bg-blue-50 p-6 rounded-2xl">
                <h3 className="font-bold mb-2">PMS</h3>
                <p>Revenue: {formatCurrency(dailyReport.PMS.revenue)}</p>
                <p>Expenses: {formatCurrency(dailyReport.PMS.expenses)}</p>
                <p className="font-bold text-green-600">
                  Net: {formatCurrency(dailyReport.PMS.netProfit)}
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-2xl">
                <h3 className="font-bold mb-2">AGO</h3>
                <p>Revenue: {formatCurrency(dailyReport.AGO.revenue)}</p>
                <p>Expenses: {formatCurrency(dailyReport.AGO.expenses)}</p>
                <p className="font-bold text-green-600">
                  Net: {formatCurrency(dailyReport.AGO.netProfit)}
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-2xl">
                <h3 className="font-bold mb-2">Total Profit</h3>
                <p className="text-2xl font-bold text-indigo-700">
                  {formatCurrency(dailyReport.totalNetProfit)}
                </p>
              </div>

            </div>
          )}
        </div>
      )}

      {/* ============================================================
         PROFIT SUMMARY TAB
      ============================================================ */}
      {activeTab === "summary" && (
        <div className="bg-white p-6 rounded-3xl shadow-xl space-y-6">

          <div className="flex gap-4">
            <input type="date" className="border p-3 rounded-xl" value={from} onChange={e => setFrom(e.target.value)} />
            <input type="date" className="border p-3 rounded-xl" value={to} onChange={e => setTo(e.target.value)} />
            <button onClick={fetchSummary} className="bg-purple-600 text-white px-6 rounded-xl">
              Generate
            </button>
          </div>

          {summary && (
            <div className="grid md:grid-cols-3 gap-6">

              <div className="bg-blue-50 p-6 rounded-2xl">
                <h3 className="font-bold">PMS Net</h3>

                // We can also show lites, revenue and expenses with color here if needed
                <p className="text-sm text-gray-500">
                  {summary.PMS.litres} litres | Revenue: {formatCurrency(summary.PMS.revenue)} | Expenses: {formatCurrency(summary.PMS.expenses)}
                </p>
                <p className="text-xl font-bold text-green-600">
                  {formatCurrency(summary.PMS.netProfit)} Net Profit
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-2xl">
                <h3 className="font-bold">AGO Net</h3>
                <p className="text-sm text-gray-500">
                  {summary.AGO.litres} litres | Revenue: {formatCurrency(summary.AGO.revenue)} | Expenses: {formatCurrency(summary.AGO.expenses)}
                </p>
                <p className="text-xl font-bold text-green-600">
                  {formatCurrency(summary.AGO.netProfit)}
                </p>
              </div>

              <div className="bg-indigo-50 p-6 rounded-2xl">
                <h3 className="font-bold">Grand Profit</h3>
                <p className="text-2xl font-bold text-indigo-700">
                  {formatCurrency(summary.grandTotalProfit)}
                </p>
              </div>

            </div>
          )}
        </div>
      )}

      {/* ============================================================
         AUDIT TRAIL TAB
      ============================================================ */}
      {activeTab === "audit" && (
        <div className="bg-white p-6 rounded-3xl shadow-xl space-y-6">

          <div className="flex gap-4">
            <input
              type="date"
              placeholder="Enter Sales Date (YYYY-MM-DD)"
              className="border p-3 rounded-xl w-full"
              value={auditdate}
              onChange={(e) => setAuditDate(e.target.value)}
            />
            <button
              onClick={fetchAuditTrail}
              className="bg-gray-800 text-white px-6 rounded-xl"
            >
              Check
            </button>
          </div>

          {auditData && (
            <div className="space-y-4 bg-gray-50 p-6 rounded-2xl">

              <p><strong>Sales Date:</strong> {new Date(auditData.salesDate).toLocaleDateString()}</p>
              <p><strong>Created By:</strong> {auditData.createdBy?.name}</p>
              <p><strong>Submitted By:</strong> {auditData.submittedBy?.name}</p>
              <p><strong>Approved By:</strong> {auditData.approvedBy?.name}</p>
              <p><strong>Updated By:</strong> {auditData.updatedBy?.name}</p>
              <p><strong>Update Reason:</strong> {auditData.updateReason || "-"}</p>
              <p><strong>Deleted:</strong> {auditData.deleted ? "Yes" : "No"}</p>
              <p><strong>Delete Reason:</strong> {auditData.deleteReason || "-"}</p>

            </div>
          )}
        </div>
      )}

    </div>
  );
}

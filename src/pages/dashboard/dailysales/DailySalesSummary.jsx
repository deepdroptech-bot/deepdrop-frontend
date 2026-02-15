export default function DailySalesSummary() {
  const [summary, setSummary] = useState(null);

  const fetchSummary = async (start, end) => {
    const res = await dailySalesAPI.getSummary(start, end);
    setSummary(res.data);
  };

  return (
    <div className="space-y-8">

      <div className="card-premium flex gap-4">
        <input type="date" id="start" className="input-premium" />
        <input type="date" id="end" className="input-premium" />

        <button
          className="btn-primary"
          onClick={() =>
            fetchSummary(
              document.getElementById("start").value,
              document.getElementById("end").value
            )
          }
        >
          Generate
        </button>
      </div>

      {summary && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card-premium">
            <h4>Total PMS Litres</h4>
            <p className="text-2xl font-bold">
              {summary.totals.totalPMSLitres}
            </p>
          </div>

          <div className="card-premium">
            <h4>Total Sales</h4>
            <p className="text-2xl font-bold">
              ₦{summary.totals.totalSales.toLocaleString()}
            </p>
          </div>

          <div className="card-premium">
            <h4>Net Sales</h4>
            <p className="text-2xl font-bold text-green-600">
              ₦{summary.totals.netSales.toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

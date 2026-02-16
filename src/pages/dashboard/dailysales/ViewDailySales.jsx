import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dailySalesAPI } from "../../../services/dailySalesService";

export default function ViewDailySales() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sales, setSales] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await dailySalesAPI.getById(id);
      setSales(res.data);
      setLoading(false);
    } catch (err) {
      alert("Failed to load daily sales");
      navigate("/dashboard/daily-sales");
    }
  };

  if (loading) return <p className="p-8">Loading...</p>;
  if (!sales) return null;

  const statusBadge = sales.isLocked
    ? "bg-green-100 text-green-700"
    : "bg-yellow-100 text-yellow-700";

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">

      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Daily Sales Report
          </h1>
          <p className="text-gray-500 mt-1">
            {new Date(sales.salesDate).toDateString()}
          </p>
        </div>

        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${statusBadge}`}>
          {sales.isLocked ? "Approved" : "Draft"}
        </span>
      </div>


      {/* SUMMARY CARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <p className="text-sm text-gray-500">Total PMS Sales</p>
          <p className="text-2xl font-bold mt-2">
            ₦{sales.PMS?.totalAmount || 0}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <p className="text-sm text-gray-500">Total AGO Sales</p>
          <p className="text-2xl font-bold mt-2">
            ₦{sales.AGO?.totalAmount || 0}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <p className="text-sm text-gray-500">Net Sales</p>
          <p className="text-2xl font-bold mt-2 text-blue-600">
            ₦{sales.netSales || 0}
          </p>
        </div>

      </div>


      {/* PMS SECTION */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">
          PMS Details
        </h2>

        {sales.PMS?.pumps?.map((pump, index) => (
          <div
            key={index}
            className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl"
          >
            <div>
              <p className="text-xs text-gray-400">Pump</p>
              <p className="font-semibold">{pump.pumpNumber}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Opening</p>
              <p>{pump.openingMeter}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Closing</p>
              <p>{pump.closingMeter}</p>
            </div>
          </div>
        ))}

        <div>
          <p className="text-sm text-gray-500">
            Price Per Litre
          </p>
          <p className="font-semibold">
            ₦{sales.PMS?.pricePerLitre}
          </p>
        </div>
      </div>


      {/* AGO SECTION */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          AGO Details
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-xl">
          <div>
            <p className="text-xs text-gray-400">Opening</p>
            <p>{sales.AGO?.openingMeter}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Closing</p>
            <p>{sales.AGO?.closingMeter}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Price/Litre</p>
            <p>₦{sales.AGO?.pricePerLitre}</p>
          </div>
        </div>
      </div>


      {/* PRODUCTS SOLD */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Products Sold
        </h2>

        {sales.productsSold?.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl"
          >
            <div>{item.itemName}</div>
            <div>{item.quantitySold}</div>
            <div>₦{item.pricePerUnit}</div>
          </div>
        ))}
      </div>


      {/* OTHER INCOME */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Other Income
        </h2>

        {sales.otherIncome?.map((item, index) => (
          <div
            key={index}
            className="flex justify-between bg-gray-50 p-4 rounded-xl"
          >
            <span>{item.itemName}</span>
            <span>₦{item.amount}</span>
          </div>
        ))}
      </div>


      {/* AUDIT TRAIL */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-2">
        <h2 className="text-lg font-semibold text-gray-700">
          Audit Information
        </h2>

        <p className="text-sm text-gray-500">
          Last Updated: {sales.updatedAt ? new Date(sales.updatedAt).toLocaleString() : "N/A"}
        </p>

        {sales.updateReason && (
          <p className="text-sm text-gray-500">
            Update Reason: {sales.updateReason}
          </p>
        )}
      </div>

    </div>
  );
}

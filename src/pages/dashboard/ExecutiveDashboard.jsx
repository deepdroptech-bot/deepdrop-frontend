import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from "recharts";

export default function ExecutiveDashboard({ data }) {
  return (
    <>
      {/* KPI Cards */}
      <div className="grid md:grid-cols-4 gap-6">

        <KpiCard title="Total PMS Profit" value={data.totalPMSProfit} />
        <KpiCard title="Total AGO Profit" value={data.totalAGOProfit} />
        <KpiCard title="Other Income" value={data.otherIncome} />
        <KpiCard title="Net Profit" value={data.totalNetProfit} highlight />
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Sales Trend */}
        <ChartCard title="Sales Trend">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.salesTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#dc2626"
                fill="#dc2626"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Profit Trend */}
        <ChartCard title="Net Profit Trend">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.profitTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#1d4ed8"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

      </div>
    </>
  );
}

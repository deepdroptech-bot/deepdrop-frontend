import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Chip,
  CircularProgress,
  Box
} from "@mui/material";

export default function ViewDailySales() {
  const { id } = useParams();
  const [sales, setSales] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await api.get(`/daily-sales/${id}`);
      setSales(res.data.sales);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  if (!sales) return <Typography>No sales record found.</Typography>;

  const formatCurrency = (value) =>
    `₦${Number(value || 0).toLocaleString()}`;

  return (
    <Box p={4}>

      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Daily Sales Report
        </Typography>

        <Chip
          label={sales.approvalStatus.toUpperCase()}
          color={
            sales.approvalStatus === "approved"
              ? "success"
              : sales.approvalStatus === "submitted"
              ? "warning"
              : "default"
          }
        />
      </Box>

      <Typography variant="subtitle1" mb={3}>
        Date: {new Date(sales.salesDate).toDateString()}
      </Typography>

      <Grid container spacing={3}>

        {/* ================= PMS ================= */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                PMS Sales
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {sales.PMS.pumps.map((pump) => (
                <Box key={pump.pumpNumber} mb={2}>
                  <Typography fontWeight="bold">
                    Pump {pump.pumpNumber}
                  </Typography>
                  <Typography>Opening: {pump.openingMeter}</Typography>
                  <Typography>Closing: {pump.closingMeter}</Typography>
                  <Typography>Litres Sold: {pump.litresSold}</Typography>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              <Typography>Price/Litre: {formatCurrency(sales.PMS.pricePerLitre)}</Typography>
              <Typography>Total Litres: {sales.PMS.totalLitres}</Typography>
              <Typography>Total Amount: {formatCurrency(sales.PMS.totalAmount)}</Typography>
              <Typography>Total Expenses: {formatCurrency(sales.PMS.totalExpenses)}</Typography>
              <Typography fontWeight="bold">
                Net Sales: {formatCurrency(sales.PMS.netSales)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* ================= AGO ================= */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                AGO Sales
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Typography>Opening: {sales.AGO?.openingMeter}</Typography>
              <Typography>Closing: {sales.AGO?.closingMeter}</Typography>
              <Typography>Litres Sold: {sales.AGO?.litresSold}</Typography>
              <Typography>Price/Litre: {formatCurrency(sales.AGO?.pricePerLitre)}</Typography>
              <Typography>Total Amount: {formatCurrency(sales.AGO?.totalAmount)}</Typography>
              <Typography>Total Expenses: {formatCurrency(sales.AGO?.totalExpenses)}</Typography>
              <Typography fontWeight="bold">
                Net Sales: {formatCurrency(sales.AGO?.netSales)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* ================= PRODUCTS ================= */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Products Sold
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {sales.productsSold.map((item, index) => (
                <Box key={index} mb={1}>
                  <Typography>
                    {item.itemName} — Qty: {item.quantitySold} × {formatCurrency(item.pricePerUnit)} ={" "}
                    {formatCurrency(item.totalAmount)}
                  </Typography>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />
              <Typography fontWeight="bold">
                Total Product Sales: {formatCurrency(sales.totalProductsSales)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* ================= OTHER INCOME ================= */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Other Income
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {sales.otherIncome.map((item, index) => (
                <Typography key={index}>
                  {item.itemName}: {formatCurrency(item.amount)}
                </Typography>
              ))}

              <Divider sx={{ my: 2 }} />
              <Typography fontWeight="bold">
                Total Other Income: {formatCurrency(sales.totalOtherIncome)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* ================= GRAND SUMMARY ================= */}
        <Grid item xs={12}>
          <Card elevation={5}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Financial Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Typography>Total Sales Amount: {formatCurrency(sales.totalSalesAmount)}</Typography>
              <Typography>Total Expenses: {formatCurrency(sales.totalExpenses)}</Typography>
              <Typography variant="h6" fontWeight="bold" mt={2}>
                Net Sales: {formatCurrency(sales.netSales)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* ================= AUDIT INFO ================= */}
        <Grid item xs={12}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Audit Information
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Typography>
                Created By: {sales.createdBy?.name}
              </Typography>

              {sales.submittedBy && (
                <Typography>
                  Submitted By: {sales.submittedBy?.name}
                </Typography>
              )}

              {sales.approvedBy && (
                <Typography>
                  Approved By: {sales.approvedBy?.name}
                </Typography>
              )}

              {sales.updateReason && (
                <Typography>
                  Update Reason: {sales.updateReason}
                </Typography>
              )}

              {sales.isLocked && (
                <Chip
                  label="LOCKED"
                  color="error"
                  sx={{ mt: 2 }}
                />
              )}
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Box>
  );
}

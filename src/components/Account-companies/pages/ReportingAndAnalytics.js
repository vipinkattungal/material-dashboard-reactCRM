import React from "react";
import {
  Box,
  Card,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const ReportingAndAnalytics = () => {
  // Chart Data
  const salesData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Revenue",
        data: [10000, 8500, 12000, 9000],
        backgroundColor: "#4caf50",
      },
    ],
  };

  const activityData = {
    labels: ["Calls", "Meetings", "Emails"],
    datasets: [
      {
        label: "Activity",
        data: [300, 150, 400],
        backgroundColor: ["#2196f3", "#ff9800", "#8e24aa"],
      },
    ],
  };

  const kpiData = {
    labels: ["Conversion Rate", "Win Rate", "Lead Response Time"],
    datasets: [
      {
        data: [35, 22, 43],
        backgroundColor: ["#4caf50", "#ff5722", "#2196f3"],
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Leads",
        data: [100, 150, 200, 250, 300],
        fill: false,
        borderColor: "#ff5722",
        tension: 0.4,
      },
    ],
  };

  return (
    <Box sx={{ p: 3, marginLeft: "280px" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333", mb: 3 }}>
        Reporting & Analytics
      </Typography>

      <Grid container spacing={3}>
        {/* KPI Pie Chart */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: "12px", boxShadow: 3, p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#1976d2" }}>
              KPI Breakdown
            </Typography>
            <Pie data={kpiData} />
          </Card>
        </Grid>

        {/* Activity Bar Chart */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: "12px", boxShadow: 3, p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#1976d2" }}>
              Activity Overview
            </Typography>
            <Bar data={activityData} />
          </Card>
        </Grid>

        {/* Sales Line Chart */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: "12px", boxShadow: 3, p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#1976d2" }}>
              Monthly Leads
            </Typography>
            <Line data={lineData} />
          </Card>
        </Grid>

        {/* Sales Report Table */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: "12px", boxShadow: 3, p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#1976d2" }}>
              Sales Reports
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Revenue</TableCell>
                    <TableCell>Opportunities</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { id: 1, date: "2025-01-01", revenue: "$10,000", opportunities: 20 },
                    { id: 2, date: "2025-01-02", revenue: "$8,500", opportunities: 15 },
                  ].map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>{report.revenue}</TableCell>
                      <TableCell>{report.opportunities}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportingAndAnalytics;

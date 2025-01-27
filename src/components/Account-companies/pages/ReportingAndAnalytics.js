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
  IconButton,
  Divider,
  MenuItem,
  Select,
  Stack,
  LinearProgress,
  Chip, // Add this line
} from "@mui/material";
import { Bar, Line, Pie, Doughnut, Radar } from "react-chartjs-2";
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
  RadialLinearScale,
} from "chart.js";
import { FilterList, ArrowDropDown, Info } from "@mui/icons-material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale
);

const ReportingAndAnalytics = () => {
  // Chart configuration
  const colors = {
    primary: "#1976d2",
    secondary: "#4caf50",
    error: "#d32f2f",
    warning: "#ed6c02",
    info: "#0288d1",
  };

  // Utility functions
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const createGradient = (ctx, color) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, `${color}80`);
    gradient.addColorStop(1, `${color}20`);
    return gradient;
  };

  // Chart Data
  // Updated Sales Performance Chart Data
  const salesPerformanceData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Actual Revenue",
        data: [45000, 52000, 48000, 61000],
        backgroundColor: "#1976d280", // Semi-transparent primary color
        borderColor: "#1976d2",
        borderWidth: 2,
        borderRadius: 8,
        type: "bar",
      },
      {
        label: "Projected Revenue",
        data: [50000, 55000, 60000, 65000],
        borderColor: "#4caf50",
        borderWidth: 2,
        fill: false,
        type: "line",
        tension: 0.4,
      },
    ],
  };

  // In your JSX, keep the Bar component as:
  <Bar
    data={salesPerformanceData}
    options={{
      responsive: true,
      plugins: {
        legend: { position: "top" },
        tooltip: {
          callbacks: {
            label: (context) =>
              `${context.dataset.label}: ${currencyFormatter.format(context.raw)}`,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => currencyFormatter.format(value),
          },
        },
      },
    }}
  />;

  const leadSourcesData = {
    labels: ["Organic", "Paid Ads", "Referrals", "Social Media"],
    datasets: [
      {
        data: [35, 25, 20, 20],
        backgroundColor: ["#4caf50", "#2196f3", "#ff9800", "#e91e63"],
        borderWidth: 0,
      },
    ],
  };

  const activityRadarData = {
    labels: ["Calls", "Emails", "Meetings", "Proposals", "Follow-ups"],
    datasets: [
      {
        label: "Activity Distribution",
        data: [65, 59, 90, 81, 56],
        backgroundColor: `${colors.primary}20`,
        borderColor: colors.primary,
        pointBackgroundColor: colors.primary,
        pointBorderColor: "#fff",
      },
    ],
  };

  const kpiProgressData = [
    { label: "Conversion Rate", value: 65, color: colors.primary },
    { label: "Win Rate", value: 42, color: colors.secondary },
    { label: "Lead Response", value: 78, color: colors.warning },
  ];

  return (
    <Box sx={{ p: 3, marginLeft: { xs: 0, md: "280px" }, backgroundColor: "#f8faff" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a237e" }}>
          Performance Analytics
        </Typography>
        <Select
          value="2024"
          IconComponent={ArrowDropDown}
          sx={{ minWidth: 120, backgroundColor: "white" }}
        >
          <MenuItem value="2024">2024</MenuItem>
          <MenuItem value="2023">2023</MenuItem>
          <MenuItem value="2022">2022</MenuItem>
        </Select>
      </Stack>

      <Grid container spacing={3}>
        {/* KPI Progress Cards */}
        {kpiProgressData.map((kpi, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" color="textSecondary">
                  {kpi.label}
                </Typography>
                <Info sx={{ color: kpi.color }} />
              </Stack>
              <Typography variant="h4" sx={{ my: 1, fontWeight: 700, color: kpi.color }}>
                {kpi.value}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={kpi.value}
                sx={{ height: 8, borderRadius: 4, backgroundColor: `${kpi.color}20` }}
                color="inherit"
              />
            </Card>
          </Grid>
        ))}

        {/* Sales Performance Mixed Chart */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 2, borderRadius: 3, boxShadow: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Revenue Performance
              </Typography>
              <IconButton>
                <FilterList />
              </IconButton>
            </Stack>
            <Bar
              data={salesPerformanceData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  tooltip: {
                    callbacks: {
                      label: (context) =>
                        `${context.dataset.label}: ${currencyFormatter.format(context.raw)}`,
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => currencyFormatter.format(value),
                    },
                  },
                },
              }}
            />
          </Card>
        </Grid>

        {/* Lead Sources Donut Chart */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, borderRadius: 3, boxShadow: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Lead Sources
            </Typography>
            <Doughnut
              data={leadSourcesData}
              options={{
                cutout: "70%",
                plugins: {
                  legend: { position: "bottom" },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.label}: ${context.raw}%`,
                    },
                  },
                },
              }}
            />
          </Card>
        </Grid>

        {/* Activity Radar Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, borderRadius: 3, boxShadow: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Activity Distribution
            </Typography>
            <Radar
              data={activityRadarData}
              options={{
                responsive: true,
                scales: {
                  r: {
                    beginAtZero: true,
                    grid: { color: "#e0e0e0" },
                    pointLabels: { color: "#616161" },
                  },
                },
              }}
            />
          </Card>
        </Grid>

        {/* Sales Report Table */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, borderRadius: 3, boxShadow: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Recent Transactions
              </Typography>
              <Select value="month" size="small" sx={{ minWidth: 120 }}>
                <MenuItem value="week">Last Week</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
                <MenuItem value="year">This Year</MenuItem>
              </Select>
            </Stack>
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
              <Table>
                <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Client</TableCell>
                    <TableCell sx={{ fontWeight: 600 }} align="right">
                      Amount
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    {
                      id: 1,
                      date: "2024-03-15",
                      client: "Acme Corp",
                      amount: 15000,
                      status: "Completed",
                    },
                    {
                      id: 2,
                      date: "2024-03-14",
                      client: "Global Tech",
                      amount: 24500,
                      status: "Pending",
                    },
                    {
                      id: 3,
                      date: "2024-03-13",
                      client: "Innovate LLC",
                      amount: 18000,
                      status: "In Progress",
                    },
                  ].map((row) => (
                    <TableRow key={row.id} hover sx={{ "&:last-child td": { border: 0 } }}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.client}</TableCell>
                      <TableCell align="right">{currencyFormatter.format(row.amount)}</TableCell>
                      <TableCell>
                        <Chip
                          label={row.status}
                          size="small"
                          sx={{
                            backgroundColor:
                              row.status === "Completed"
                                ? `${colors.secondary}20`
                                : row.status === "Pending"
                                ? `${colors.warning}20`
                                : `${colors.primary}20`,
                            color:
                              row.status === "Completed"
                                ? colors.secondary
                                : row.status === "Pending"
                                ? colors.warning
                                : colors.primary,
                          }}
                        />
                      </TableCell>
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

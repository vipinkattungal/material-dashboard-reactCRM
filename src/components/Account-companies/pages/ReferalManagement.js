import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  Button,
  Grid,
  TextField,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";
import {
  BarChart,
  PieChart,
  Bar,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import ReferralPopup from "./ReferralPopup";

const ReferralManagement = () => {
  const [referrals, setReferrals] = useState([
    { referrer: "John Doe", referred: "Jane Smith", status: "Successful", reward: "10% Discount" },
    { referrer: "Anna Brown", referred: "Mike Lee", status: "Pending", reward: "N/A" },
  ]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const referralStats = [
    { name: "Successful", value: 20 },
    { name: "Pending", value: 8 },
    { name: "Failed", value: 5 },
  ];

  const rewardDistribution = [
    { name: "Discounts", value: 60 },
    { name: "Points", value: 30 },
    { name: "Vouchers", value: 10 },
  ];

  return (
    <Box sx={{ p: 3, marginLeft: "280px" }}>
      <Typography variant="h4" sx={{ fontWeight: "600", color: "#333", mb: 4 }}>
        Referral Management System
      </Typography>

      {/* Referral Tracking Section */}
      <Card sx={{ p: 3, borderRadius: 2, boxShadow: 2, mb: 4 }}>
        <Typography variant="h6" sx={{ color: "#1976d2", mb: 2 }}>
          Referral Tracking
        </Typography>
        <ReferralPopup />
        <List>
          {referrals.map((referral, index) => (
            <ListItem key={index} sx={{ borderBottom: "1px solid #ddd", mb: 1 }}>
              <ListItemText
                primary={`Referrer: ${referral.referrer}`}
                secondary={`Referred: ${referral.referred} | Status: ${referral.status} | Reward: ${referral.reward}`}
              />
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#28a745",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#218838",
            },
          }}
        >
          Add New Referral
        </Button>
      </Card>

      {/* Automated Rewards System Section */}
      <Card sx={{ p: 3, borderRadius: 2, boxShadow: 2, mb: 4 }}>
        <Typography variant="h6" sx={{ color: "#1976d2", mb: 2 }}>
          Automated Rewards System
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Automatically calculate and distribute rewards based on the pharmacy’s incentive program.
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1">Set Reward Criteria:</Typography>
            <TextField
              label="Reward Type"
              select
              fullWidth
              SelectProps={{ native: true }}
              sx={{ mt: 2, mb: 2 }}
            >
              <option value="Discounts">Discounts</option>
              <option value="Points">Points</option>
              <option value="Vouchers">Vouchers</option>
            </TextField>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#1976d2",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              Save Reward Settings
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Referral Dashboard Section */}
      <Card sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h6" sx={{ color: "#1976d2", mb: 3 }}>
          Referral Dashboard
        </Typography>
        <Grid container spacing={3}>
          {/* Pie Chart */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Referral Status Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={referralStats}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {referralStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Bar Chart */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Reward Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={rewardDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default ReferralManagement;

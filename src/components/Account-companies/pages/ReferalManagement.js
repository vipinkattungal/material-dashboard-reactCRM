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
  Avatar,
  IconButton,
  InputAdornment,
  LinearProgress,
  Badge,
  MenuItem,
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
import {
  AddCircle,
  PersonAdd,
  CheckCircle,
  PendingActions,
  Discount,
  Loyalty,
  CardGiftcard,
  Search,
  FilterList,
  MoreVert,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import ReferralPopup from "./ReferralPopup";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "16px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const StatusChip = styled(Chip)(({ status }) => ({
  fontWeight: 600,
  backgroundColor:
    status === "Successful" ? "#e8f5e9" : status === "Pending" ? "#fff3e0" : "#ffebee",
  color: status === "Successful" ? "#2e7d32" : status === "Pending" ? "#ef6c00" : "#c62828",
}));

const ReferralManagement = () => {
  const [referrals, setReferrals] = useState([
    {
      referrer: "John Doe",
      referred: "Jane Smith",
      status: "Successful",
      reward: "10% Discount",
      date: "2024-03-15",
    },
    {
      referrer: "Anna Brown",
      referred: "Mike Lee",
      status: "Pending",
      reward: "N/A",
      date: "2024-03-14",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const COLORS = ["#4CAF50", "#FFA726", "#EF5350"];
  const REWARD_COLORS = ["#2196F3", "#9C27B0", "#FF9800"];

  const referralStats = [
    { name: "Successful", value: 20, icon: <CheckCircle /> },
    { name: "Pending", value: 8, icon: <PendingActions /> },
    { name: "Failed", value: 5, icon: <PendingActions /> },
  ];

  const rewardDistribution = [
    { name: "Discounts", value: 60, icon: <Discount /> },
    { name: "Points", value: 30, icon: <Loyalty /> },
    { name: "Vouchers", value: 10, icon: <CardGiftcard /> },
  ];

  const statusCounts = {
    Successful: referrals.filter((r) => r.status === "Successful").length,
    Pending: referrals.filter((r) => r.status === "Pending").length,
    Failed: referrals.filter((r) => r.status === "Failed").length,
  };

  return (
    <Box sx={{ p: 4, marginLeft: { xs: 0, md: "280px" }, background: "#f8fafc" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: 800, color: "#1a237e", display: "flex", alignItems: "center" }}
        >
          <PersonAdd sx={{ fontSize: 48, mr: 2, color: "#4A90E2" }} />
          Referral Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddCircle />}
          sx={{
            background: "linear-gradient(45deg, #4F46E5 0%, #8B5CF6 100%)",
            color: "white",
            py: 1.5,
            px: 4,
            borderRadius: "12px",
            "&:hover": { transform: "translateY(-2px)" },
            transition: "all 0.3s ease",
          }}
        >
          New Referral
        </Button>
      </Box>

      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {Object.entries(statusCounts).map(([status, count], index) => (
          <Grid item xs={12} md={4} key={status}>
            <StyledCard sx={{ p: 3, background: COLORS[index] + "20" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <Typography variant="h6" sx={{ color: "#616161", mb: 1 }}>
                    {status} Referrals
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: COLORS[index] }}>
                    {count}
                  </Typography>
                </div>
                <Avatar sx={{ bgcolor: COLORS[index], width: 56, height: 56 }}>
                  {status === "Successful" ? (
                    <CheckCircle />
                  ) : status === "Pending" ? (
                    <PendingActions />
                  ) : (
                    <PendingActions />
                  )}
                </Avatar>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(count / referrals.length) * 100}
                sx={{ mt: 2, height: 8, borderRadius: 4, bgcolor: COLORS[index] + "30" }}
              />
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {/* Referral Tracking Section */}
      <StyledCard sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, display: "flex", alignItems: "center" }}>
            <PersonAdd sx={{ mr: 1, color: "#4A90E2" }} />
            Active Referrals
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Search referrals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              endAdornment: (
                <IconButton>
                  <FilterList />
                </IconButton>
              ),
            }}
            sx={{ width: 300 }}
          />
        </Box>

        <List sx={{ maxHeight: 400, overflow: "auto" }}>
          {referrals.map((referral, index) => (
            <Paper key={index} sx={{ mb: 2, borderRadius: 3, boxShadow: 1 }}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end">
                    <MoreVert />
                  </IconButton>
                }
                sx={{ py: 2 }}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mr: 2 }}>
                        {referral.referrer}
                      </Typography>
                      <StatusChip
                        label={referral.status}
                        status={referral.status}
                        size="small"
                        icon={
                          referral.status === "Successful" ? <CheckCircle /> : <PendingActions />
                        }
                      />
                    </Box>
                  }
                  secondary={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="body2" sx={{ color: "#616161", mr: 2 }}>
                        Referred: {referral.referred}
                      </Typography>
                      <Chip
                        label={referral.reward}
                        size="small"
                        sx={{
                          backgroundColor: "#e3f2fd",
                          color: "#1976d2",
                          fontWeight: 500,
                        }}
                      />
                      <Typography variant="caption" sx={{ color: "#9e9e9e", ml: 2 }}>
                        {referral.date}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            </Paper>
          ))}
        </List>
      </StyledCard>

      {/* Dashboard Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <StyledCard sx={{ p: 3, height: "100%" }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
              Referral Performance
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, borderRadius: 3 }}>
                  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                    Status Distribution
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={referralStats}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                      >
                        {referralStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          borderRadius: 8,
                          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Legend
                        iconType="circle"
                        layout="vertical"
                        verticalAlign="middle"
                        align="right"
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, borderRadius: 3 }}>
                  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                    Reward Distribution
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={rewardDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          borderRadius: 8,
                          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]} animationBegin={200}>
                        {rewardDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={REWARD_COLORS[index]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
            </Grid>
          </StyledCard>
        </Grid>

        {/* Reward Settings Section */}
        <Grid item xs={12} md={4}>
          <StyledCard sx={{ p: 3, height: "100%" }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
              Reward Settings
            </Typography>

            <TextField
              select
              fullWidth
              label="Reward Type"
              variant="outlined"
              defaultValue="Discounts"
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Discount />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="Discounts">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Discount sx={{ mr: 1, color: REWARD_COLORS[0] }} />
                  Discounts
                </Box>
              </MenuItem>
              <MenuItem value="Points">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Loyalty sx={{ mr: 1, color: REWARD_COLORS[1] }} />
                  Points
                </Box>
              </MenuItem>
              <MenuItem value="Vouchers">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CardGiftcard sx={{ mr: 1, color: REWARD_COLORS[2] }} />
                  Vouchers
                </Box>
              </MenuItem>
            </TextField>

            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{
                background: "linear-gradient(45deg, #00C853 0%, #64DD17 100%)",
                color: "white",
                py: 1.5,
                borderRadius: "12px",
                "&:hover": { transform: "translateY(-2px)" },
                transition: "all 0.3s ease",
              }}
            >
              Save Settings
            </Button>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Recent Rewards
            </Typography>
            <List>
              {referrals
                .filter((r) => r.status === "Successful")
                .map((referral, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemText
                      primary={referral.referrer}
                      secondary={`Awarded ${referral.reward}`}
                    />
                    <Chip
                      label={referral.date}
                      size="small"
                      sx={{ backgroundColor: "#e8f5e9", color: "#2e7d32" }}
                    />
                  </ListItem>
                ))}
            </List>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReferralManagement;

import React from "react";
import { Card, Typography, Grid } from "@mui/material";

const OverviewCard = ({ title, amount, color }) => (
  <Card
    sx={{
      backgroundColor: color,
      color: "#fff",
      padding: "16px",
      borderRadius: "8px",
      textAlign: "center",
    }}
  >
    <Typography variant="h6">{title}</Typography>
    <Typography variant="h4" sx={{ mt: 2 }}>
      {amount}
    </Typography>
  </Card>
);

const AccountsOverview = () => {
  const data = [
    { title: "Total Income", amount: "₹1,20,000", color: "#4caf50" },
    { title: "Total Expenses", amount: "₹80,000", color: "#f44336" },
    { title: "Outstanding", amount: "₹40,000", color: "#ff9800" },
  ];

  return (
    <Grid container spacing={3}>
      {data.map((item, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <OverviewCard {...item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default AccountsOverview;

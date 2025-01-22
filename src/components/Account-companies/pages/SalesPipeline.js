import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const SalesPipelineModule = () => {
  const [salesOpportunities, setSalesOpportunities] = useState([
    { id: 1, name: "Opportunity 1", stage: "Lead", amount: 5000 },
    { id: 2, name: "Opportunity 2", stage: "Prospect", amount: 3000 },
    { id: 3, name: "Opportunity 3", stage: "Qualified", amount: 7000 },
    { id: 4, name: "Opportunity 4", stage: "Closed", amount: 10000 },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [newOpportunity, setNewOpportunity] = useState({ name: "", stage: "Lead", amount: "" });

  const handleAddOpportunity = () => {
    setSalesOpportunities([
      ...salesOpportunities,
      { id: salesOpportunities.length + 1, ...newOpportunity },
    ]);
    setNewOpportunity({ name: "", stage: "Lead", amount: "" });
    setOpenDialog(false);
  };

  const salesStages = ["Lead", "Prospect", "Qualified", "Closed"];

  const stageConversionRate = salesStages.map((stage) => {
    const stageOpportunities = salesOpportunities.filter(
      (opportunity) => opportunity.stage === stage
    );
    const conversionRate = (stageOpportunities.length / salesOpportunities.length) * 100;
    return { stage, conversionRate };
  });

  const opportunityColumns = [
    { field: "name", headerName: "Opportunity", width: 200 },
    { field: "stage", headerName: "Stage", width: 150 },
    { field: "amount", headerName: "Amount ($)", width: 150 },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => (
        <Box>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              mb: 2,
              backgroundColor: "#28a745",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#218838",
              },
            }}
            onClick={() => handleEditOpportunity(params.id)}
          >
            Edit
          </Button>
        </Box>
      ),
      width: 180,
    },
  ];

  const handleEditOpportunity = (id) => {
    const opportunity = salesOpportunities.find((opportunity) => opportunity.id === id);
    setNewOpportunity(opportunity);
    setOpenDialog(true);
  };

  return (
    <Box sx={{ p: 3, marginLeft: "280px" }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Sales Pipeline & Funnel
          </Typography>
          <Button
            variant="contained"
            onClick={() => setOpenDialog(true)}
            sx={{
              mb: 2,
              backgroundColor: "#28a745",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#218838",
              },
            }}
          >
            Add Opportunity
          </Button>
          <DataGrid
            rows={salesOpportunities}
            columns={opportunityColumns}
            autoHeight
            disableSelectionOnClick
          />
        </CardContent>
      </Card>

      {/* Funnel Progress Visualization */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Sales Funnel Progress
          </Typography>
          <Grid container spacing={2}>
            {salesStages.map((stage, index) => {
              const stageOpportunities = salesOpportunities.filter(
                (opportunity) => opportunity.stage === stage
              );
              const totalAmount = stageOpportunities.reduce(
                (sum, opportunity) => sum + opportunity.amount,
                0
              );

              return (
                <Grid item xs={3} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="body2">{stage}</Typography>
                      <LinearProgress
                        variant="determinate"
                        value={(stageOpportunities.length / salesOpportunities.length) * 100}
                        sx={{ mb: 2 }}
                      />
                      <Typography variant="body2">Amount: ${totalAmount}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </Card>

      {/* Conversion Rate Analysis */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Conversion Rate Analysis
          </Typography>
          <Grid container spacing={2}>
            {stageConversionRate.map((rate, index) => (
              <Grid item xs={3} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="body2">{rate.stage} - Conversion Rate</Typography>
                    <LinearProgress
                      variant="determinate"
                      value={rate.conversionRate}
                      sx={{ mb: 2 }}
                    />
                    <Typography variant="body2">{rate.conversionRate.toFixed(2)}%</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Add/Edit Opportunity Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{newOpportunity.id ? "Edit Opportunity" : "Add New Opportunity"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Opportunity Name"
            value={newOpportunity.name}
            onChange={(e) => setNewOpportunity({ ...newOpportunity, name: e.target.value })}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Stage</InputLabel>
            <Select
              value={newOpportunity.stage}
              onChange={(e) => setNewOpportunity({ ...newOpportunity, stage: e.target.value })}
            >
              {salesStages.map((stage, index) => (
                <MenuItem key={index} value={stage}>
                  {stage}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Amount"
            type="number"
            value={newOpportunity.amount}
            onChange={(e) => setNewOpportunity({ ...newOpportunity, amount: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddOpportunity}
            sx={{
              mb: 2,
              backgroundColor: "#28a745",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#218838",
              },
            }}
          >
            {newOpportunity.id ? "Update Opportunity" : "Add Opportunity"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SalesPipelineModule;

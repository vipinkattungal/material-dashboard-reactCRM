import React, { useState, useEffect } from "react";
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
  IconButton,
  Chip,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ShowChart as ChartIcon,
} from "@mui/icons-material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const SalesPipelineModule = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [salesOpportunities, setSalesOpportunities] = useState(
    JSON.parse(localStorage.getItem("salesOpportunities")) || [
      { id: 1, name: "Opportunity 1", stage: "Lead", amount: 5000, closeReason: "" },
      { id: 2, name: "Opportunity 2", stage: "Prospect", amount: 3000, closeReason: "" },
      { id: 3, name: "Opportunity 3", stage: "Qualified", amount: 7000, closeReason: "" },
      { id: 4, name: "Opportunity 4", stage: "Closed", amount: 10000, closeReason: "Won" },
    ]
  );

  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newOpportunity, setNewOpportunity] = useState({
    name: "",
    stage: "Lead",
    amount: "",
    closeReason: "",
  });

  const salesStages = [
    { name: "Lead", color: theme.palette.primary.main },
    { name: "Prospect", color: theme.palette.secondary.main },
    { name: "Qualified", color: theme.palette.warning.main },
    { name: "Closed", color: theme.palette.success.main },
  ];

  useEffect(() => {
    localStorage.setItem("salesOpportunities", JSON.stringify(salesOpportunities));
  }, [salesOpportunities]);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredOpportunities = salesOpportunities.filter((opp) =>
    opp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddOpportunity = () => {
    if (editingId) {
      setSalesOpportunities(
        salesOpportunities.map((opp) =>
          opp.id === editingId ? { ...newOpportunity, id: editingId } : opp
        )
      );
    } else {
      setSalesOpportunities([
        ...salesOpportunities,
        {
          id: salesOpportunities.length + 1,
          ...newOpportunity,
        },
      ]);
    }
    setOpenDialog(false);
    setNewOpportunity({ name: "", stage: "Lead", amount: "", closeReason: "" });
    setEditingId(null);
  };

  const handleDeleteOpportunity = (id) => {
    setSalesOpportunities(salesOpportunities.filter((opp) => opp.id !== id));
  };

  const handleEditOpportunity = (id) => {
    const opportunity = salesOpportunities.find((opp) => opp.id === id);
    setNewOpportunity(opportunity);
    setEditingId(id);
    setOpenDialog(true);
  };

  const stageData = salesStages.map((stage) => {
    const opportunities = salesOpportunities.filter((opp) => opp.stage === stage.name);
    return {
      stage: stage.name,
      count: opportunities.length,
      amount: opportunities.reduce((sum, opp) => sum + opp.amount, 0),
      color: stage.color,
    };
  });

  const totalAmount = salesOpportunities.reduce((sum, opp) => sum + opp.amount, 0);
  const averageDealSize = totalAmount / salesOpportunities.length || 0;

  const opportunityColumns = [
    { field: "name", headerName: "Opportunity", flex: 1 },
    {
      field: "stage",
      headerName: "Stage",
      renderCell: (params) => (
        <Chip
          label={params.value}
          sx={{
            backgroundColor: salesStages.find((s) => s.name === params.value)?.color + "20",
            color: salesStages.find((s) => s.name === params.value)?.color,
          }}
        />
      ),
      flex: 1,
    },
    { field: "amount", headerName: "Amount ($)", flex: 1 },
    {
      field: "action",
      headerName: "Actions",
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleEditOpportunity(params.id)}>
            <EditIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => handleDeleteOpportunity(params.id)}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      ),
      flex: 1,
    },
  ];

  return (
    <Box sx={{ p: 3, marginLeft: { xs: 0, sm: "280px" }, transition: "margin 0.3s" }}>
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)" }}>
            <CardContent>
              <Typography color="white" variant="h6">
                Total Opportunities
              </Typography>
              <Typography color="white" variant="h4">
                {salesOpportunities.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: "linear-gradient(45deg, #4CAF50 30%, #81C784 90%)" }}>
            <CardContent>
              <Typography color="white" variant="h6">
                Total Amount
              </Typography>
              <Typography color="white" variant="h4">
                ${totalAmount.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: "linear-gradient(45deg, #FF9800 30%, #FFB74D 90%)" }}>
            <CardContent>
              <Typography color="white" variant="h6">
                Avg. Deal Size
              </Typography>
              <Typography color="white" variant="h4">
                ${averageDealSize.toLocaleString(0, { maximumFractionDigits: 0 })}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: "linear-gradient(45deg, #9C27B0 30%, #BA68C8 90%)" }}>
            <CardContent>
              <Typography color="white" variant="h6">
                Closed/Won
              </Typography>
              <Typography color="white" variant="h4">
                {
                  salesOpportunities.filter(
                    (opp) => opp.stage === "Closed" && opp.closeReason === "Won"
                  ).length
                }
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Add Button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <TextField
          variant="outlined"
          placeholder="Search opportunities..."
          InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1 }} /> }}
          sx={{ width: 300 }}
          onChange={handleSearch}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{
            background: theme.palette.success.main,
            "&:hover": { background: theme.palette.success.dark },
          }}
        >
          Add Opportunity
        </Button>
      </Box>

      {/* Data Grid */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <DataGrid
            rows={filteredOpportunities}
            columns={opportunityColumns}
            autoHeight
            disableSelectionOnClick
            components={{
              NoRowsOverlay: () => (
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography>No opportunities found</Typography>
                </Box>
              ),
            }}
            sx={{
              "& .MuiDataGrid-columnHeaders": { backgroundColor: theme.palette.grey[100] },
              "& .MuiDataGrid-row:hover": { backgroundColor: theme.palette.action.hover },
            }}
          />
        </CardContent>
      </Card>

      {/* Funnel Visualization */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Sales Funnel
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stageData}>
              <XAxis dataKey="stage" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill={theme.palette.primary.main} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Stage Progress Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {stageData.map((stage, index) => (
          <Grid item xs={12} md={3} key={index}>
            <Card sx={{ borderLeft: `4px solid ${stage.color}` }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  {stage.stage}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(stage.count / salesOpportunities.length) * 100}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    mb: 2,
                    backgroundColor: stage.color + "20",
                    "& .MuiLinearProgress-bar": { backgroundColor: stage.color },
                  }}
                />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2">{stage.count} Opportunities</Typography>
                  <Typography variant="body2">${stage.amount.toLocaleString()}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setEditingId(null);
        }}
      >
        <DialogTitle>{editingId ? "Edit Opportunity" : "Create New Opportunity"}</DialogTitle>
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
                <MenuItem key={index} value={stage.name} sx={{ color: stage.color }}>
                  {stage.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {newOpportunity.stage === "Closed" && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Close Reason</InputLabel>
              <Select
                value={newOpportunity.closeReason}
                onChange={(e) =>
                  setNewOpportunity({ ...newOpportunity, closeReason: e.target.value })
                }
              >
                <MenuItem value="Won">Won</MenuItem>
                <MenuItem value="Lost">Lost</MenuItem>
              </Select>
            </FormControl>
          )}
          <TextField
            fullWidth
            margin="normal"
            label="Amount"
            type="number"
            value={newOpportunity.amount}
            onChange={(e) => setNewOpportunity({ ...newOpportunity, amount: e.target.value })}
            inputProps={{ min: 0 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false);
              setEditingId(null);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddOpportunity}
            disabled={!newOpportunity.name || !newOpportunity.amount}
            sx={{
              background: theme.palette.success.main,
              "&:hover": { background: theme.palette.success.dark },
            }}
          >
            {editingId ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SalesPipelineModule;

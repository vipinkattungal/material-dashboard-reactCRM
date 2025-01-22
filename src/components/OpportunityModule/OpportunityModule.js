import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  IconButton,
  Chip,
  Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlus,
  faFileAlt,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const OpportunityModule = () => {
  // Dummy data
  const initialOpportunities = [
    {
      id: 1,
      name: "Opportunity A",
      stage: "Proposal",
      value: 10000,
      closeDate: "2025-02-10",
      notes: [],
      files: [],
    },
    {
      id: 2,
      name: "Opportunity B",
      stage: "Negotiation",
      value: 5000,
      closeDate: "2025-03-15",
      notes: [],
      files: [],
    },
    {
      id: 3,
      name: "Opportunity C",
      stage: "Closed-Won",
      value: 8000,
      closeDate: "2025-01-30",
      notes: [],
      files: [],
    },
  ];

  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentOpportunity, setCurrentOpportunity] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    stage: "",
    value: "",
    closeDate: "",
    linkedModule: "",
  });
  const [note, setNote] = useState("");
  const [file, setFile] = useState(null);

  const stages = ["Qualification", "Proposal", "Negotiation", "Closed-Won", "Closed-Lost"];
  const modules = ["Leads", "Contacts", "Accounts"];

  // Handlers
  const handleDialogOpen = (opportunity = null) => {
    setCurrentOpportunity(opportunity);
    setFormData(opportunity || { name: "", stage: "", value: "", closeDate: "", linkedModule: "" });
    setOpenDialog(true);
  };

  const handleDialogClose = () => setOpenDialog(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (currentOpportunity) {
      setOpportunities(
        opportunities.map((op) =>
          op.id === currentOpportunity.id ? { ...currentOpportunity, ...formData } : op
        )
      );
    } else {
      setOpportunities([
        ...opportunities,
        { id: opportunities.length + 1, ...formData, notes: [], files: [] },
      ]);
    }
    handleDialogClose();
  };

  const handleDelete = (id) => {
    setOpportunities(opportunities.filter((op) => op.id !== id));
  };

  const handleAddNote = (id) => {
    if (note.trim()) {
      setOpportunities(
        opportunities.map((op) => (op.id === id ? { ...op, notes: [...op.notes, note] } : op))
      );
      setNote("");
    }
  };

  const handleAddFile = (id) => {
    if (file) {
      setOpportunities(
        opportunities.map((op) => (op.id === id ? { ...op, files: [...op.files, file.name] } : op))
      );
      setFile(null);
    }
  };

  // Data for Chart
  const chartData = {
    labels: opportunities.map((op) => op.name),
    datasets: [
      {
        label: "Opportunity Value",
        data: opportunities.map((op) => op.value),
        backgroundColor: ["#4caf50", "#2196f3", "#ff9800"],
      },
    ],
  };

  const columns = [
    { field: "name", headerName: "Opportunity Name", flex: 1 },
    { field: "stage", headerName: "Stage", flex: 1 },
    { field: "value", headerName: "Value", flex: 1 },
    { field: "closeDate", headerName: "Close Date", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit Opportunity">
            <IconButton onClick={() => handleDialogOpen(params.row)} color="primary">
              <FontAwesomeIcon icon={faEdit} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Opportunity">
            <IconButton onClick={() => handleDelete(params.row.id)} color="error">
              <FontAwesomeIcon icon={faTrash} />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", minHeight: "100vh", marginLeft: "280px" }}>
      {/* Header */}
      <Typography variant="h4" sx={{ mb: 3, color: "#1976d2" }}>
        Opportunity Module
      </Typography>

      {/* Action Buttons */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            startIcon={<FontAwesomeIcon icon={faPlus} />}
            onClick={() => handleDialogOpen()}
            sx={{ backgroundColor: "#28a745", color: "#fff" }}
          >
            Add Opportunity
          </Button>
        </Grid>
      </Grid>

      {/* Opportunity List */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, color: "#6c757d" }}>
            Opportunity List
          </Typography>
          <Box style={{ height: 400 }}>
            <DataGrid
              rows={opportunities}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
            />
          </Box>
        </CardContent>
      </Card>

      {/* Reports and Analytics */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, color: "#6c757d" }}>
            Reports and Analytics
          </Typography>
          <Bar data={chartData} />
        </CardContent>
      </Card>

      {/* Dialog for Add/Edit */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{currentOpportunity ? "Edit Opportunity" : "Add Opportunity"}</DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            margin="dense"
            value={formData.name}
            onChange={handleFormChange}
          />
          <TextField
            name="stage"
            label="Stage"
            variant="outlined"
            fullWidth
            margin="dense"
            select
            value={formData.stage}
            onChange={handleFormChange}
          >
            {stages.map((stage) => (
              <MenuItem key={stage} value={stage}>
                {stage}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="value"
            label="Value"
            variant="outlined"
            fullWidth
            margin="dense"
            type="number"
            value={formData.value}
            onChange={handleFormChange}
          />
          <TextField
            name="closeDate"
            label="Close Date"
            variant="outlined"
            fullWidth
            margin="dense"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.closeDate}
            onChange={handleFormChange}
          />
          <TextField
            name="linkedModule"
            label="Linked Module"
            variant="outlined"
            fullWidth
            margin="dense"
            select
            value={formData.linkedModule}
            onChange={handleFormChange}
          >
            {modules.map((module) => (
              <MenuItem key={module} value={module}>
                {module}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OpportunityModule;

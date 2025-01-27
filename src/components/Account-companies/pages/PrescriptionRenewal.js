import React, { useState } from "react";
import { useTheme, styled, alpha } from "@mui/material/styles";
import {
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  InputAdornment,
  Grid,
  Chip,
  Avatar,
  LinearProgress,
  Tooltip,
  Divider,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import {
  Edit,
  Delete,
  Notifications,
  Search,
  AddCircle,
  LocalPharmacy,
  Person,
  Event,
  Autorenew,
  Refresh,
  NotificationsActive,
  MedicalServices,
  FilterList,
} from "@mui/icons-material";
import { motion } from "framer-motion";

// Initial Data
const initialData = [
  {
    prescriptionName: "Amlodipine 5mg",
    patientName: "John Doe",
    prescriptionNumber: "RX123456",
    expiryDate: "2025-01-30",
    lastRefillDate: "2024-12-01",
    autoRefillStatus: "Enabled",
    refillReminderDate: "2025-01-15",
    remainingRefills: 2,
    reminderStatus: "Reminder Sent",
    doctorName: "Dr. Smith",
  },
  {
    prescriptionName: "Paracetamol 500mg",
    patientName: "Jane Smith",
    prescriptionNumber: "RX987654",
    expiryDate: "2025-02-15",
    lastRefillDate: "2024-11-15",
    autoRefillStatus: "Disabled",
    refillReminderDate: "2025-01-20",
    remainingRefills: 1,
    reminderStatus: "Pending",
    doctorName: "Dr. Johnson",
  },
  {
    prescriptionName: "Ibuprofen 200mg",
    patientName: "Mark Lee",
    prescriptionNumber: "RX741258",
    expiryDate: "2025-01-20",
    lastRefillDate: "2024-12-05",
    autoRefillStatus: "Enabled",
    refillReminderDate: "2025-01-10",
    remainingRefills: 3,
    reminderStatus: "Reminder Sent",
    doctorName: "Dr. Carter",
  },
  {
    prescriptionName: "Asthma Inhaler",
    patientName: "Sarah Green",
    prescriptionNumber: "RX369258",
    expiryDate: "2025-03-01",
    lastRefillDate: "2024-11-20",
    autoRefillStatus: "Disabled",
    refillReminderDate: "2025-02-10",
    remainingRefills: 0,
    reminderStatus: "Pending",
    doctorName: "Dr. Brown",
  },
];

// Color Theme
const themeColors = {
  primary: "#4A90E2", // Soft Blue
  secondary: "#6C5CE7", // Purple
  success: "#00B894", // Mint Green
  warning: "#FDCB6E", // Gold
  error: "#FF7675", // Coral
  background: "#F8F9FA", // Light Gray
};

// Styled Components
const PrimaryButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${themeColors.primary} 0%, ${themeColors.secondary} 100%)`,
  color: "white",
  borderRadius: "12px",
  padding: "12px 24px",
  fontWeight: 600,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: `0 5px 15px ${alpha(themeColors.primary, 0.4)}`,
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  border: `2px solid ${themeColors.primary}`,
  color: themeColors.primary,
  borderRadius: "12px",
  padding: "12px 24px",
  fontWeight: 600,
  "&:hover": {
    backgroundColor: alpha(themeColors.primary, 0.1),
  },
}));

const StatusChip = styled(Chip)(({ status }) => ({
  fontWeight: 600,
  borderRadius: "8px",
  ...(status === "Enabled" && {
    backgroundColor: alpha(themeColors.success, 0.2),
    color: themeColors.success,
  }),
  ...(status === "Disabled" && {
    backgroundColor: alpha(themeColors.error, 0.2),
    color: themeColors.error,
  }),
  ...(status === "Reminder Sent" && {
    backgroundColor: alpha(themeColors.warning, 0.2),
    color: themeColors.warning,
  }),
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: alpha(themeColors.primary, 0.03),
  },
  "&:hover": {
    backgroundColor: alpha(themeColors.primary, 0.08),
  },
}));

const PrescriptionManagement = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [newPrescription, setNewPrescription] = useState({
    prescriptionName: "",
    patientName: "",
    prescriptionNumber: "",
    expiryDate: "",
    lastRefillDate: "",
    autoRefillStatus: "",
    refillReminderDate: "",
    remainingRefills: "",
    reminderStatus: "",
    doctorName: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  // Handle search filter
  const filteredData = data.filter(
    (item) =>
      item.prescriptionName.toLowerCase().includes(search.toLowerCase()) ||
      item.patientName.toLowerCase().includes(search.toLowerCase()) ||
      item.prescriptionNumber.toLowerCase().includes(search.toLowerCase())
  );

  // Handle adding new prescription
  const handleAddPrescription = () => {
    setData([...data, newPrescription]);
    setOpenPopup(false);
    setNewPrescription({
      prescriptionName: "",
      patientName: "",
      prescriptionNumber: "",
      expiryDate: "",
      lastRefillDate: "",
      autoRefillStatus: "",
      refillReminderDate: "",
      remainingRefills: "",
      reminderStatus: "",
      doctorName: "",
    });
  };

  // Handle editing prescription
  const handleEditPrescription = (index) => {
    const prescriptionToEdit = data[index];
    setNewPrescription(prescriptionToEdit);
    setEditingIndex(index);
    setOpenPopup(true);
  };

  // Handle delete prescription
  const handleDeletePrescription = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  // Handle updating existing prescription (edit action)
  const handleUpdatePrescription = () => {
    const updatedData = [...data];
    updatedData[editingIndex] = newPrescription;
    setData(updatedData);
    setOpenPopup(false);
    setEditingIndex(null);
    setNewPrescription({
      prescriptionName: "",
      patientName: "",
      prescriptionNumber: "",
      expiryDate: "",
      lastRefillDate: "",
      autoRefillStatus: "",
      refillReminderDate: "",
      remainingRefills: "",
      reminderStatus: "",
      doctorName: "",
    });
  };

  // Statistics
  const prescriptionStats = {
    total: data.length,
    expiringSoon: data.filter(
      (d) => new Date(d.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    ).length,
    needsRefill: data.filter((d) => d.remainingRefills < 2).length,
    autoRefillEnabled: data.filter((d) => d.autoRefillStatus === "Enabled").length,
  };

  return (
    <Box sx={{ p: 4, ml: { xs: 0, md: "280px" }, backgroundColor: themeColors.background }}>
      {/* Header Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: themeColors.primary,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <MedicalServices sx={{ fontSize: 48 }} />
          Prescription Management
        </Typography>
        <PrimaryButton startIcon={<AddCircle />} onClick={() => setOpenPopup(true)}>
          New Prescription
        </PrimaryButton>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {Object.entries(prescriptionStats).map(([key, value], index) => (
          <Grid item xs={12} sm={6} md={3} key={key}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                background: `linear-gradient(135deg, ${alpha(themeColors.primary, 0.1)} 0%, ${alpha(
                  themeColors.secondary,
                  0.1
                )} 100%)`,
                border: `1px solid ${alpha(themeColors.primary, 0.2)}`,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: alpha(themeColors.primary, 0.1),
                    color: themeColors.primary,
                  }}
                >
                  {index === 0 && <LocalPharmacy />}
                  {index === 1 && <Event />}
                  {index === 2 && <Autorenew />}
                  {index === 3 && <NotificationsActive />}
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 800, color: themeColors.primary }}>
                  {value}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: themeColors.primary }}>
                {key.replace(/([A-Z])/g, " $1").toUpperCase()}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Search and Filters */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search prescriptions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: alpha(themeColors.primary, 0.6) }} />
              </InputAdornment>
            ),
            sx: {
              borderRadius: "12px",
              backgroundColor: "white",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: alpha(themeColors.primary, 0.2),
              },
            },
          }}
          sx={{ width: isMobile ? "100%" : 400 }}
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <SecondaryButton startIcon={<FilterList />}>Filters</SecondaryButton>
          <SecondaryButton startIcon={<Refresh />}>Refresh</SecondaryButton>
        </Box>
      </Box>

      {/* Prescriptions Table */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          border: `1px solid ${alpha(themeColors.primary, 0.1)}`,
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead
            sx={{
              backgroundColor: alpha(themeColors.primary, 0.05),
              borderBottom: `2px solid ${alpha(themeColors.primary, 0.1)}`,
            }}
          >
            <TableRow>
              {[
                "Prescription",
                "Patient",
                "Rx Number",
                "Expiry",
                "Status",
                "Refills",
                "Reminders",
                "Doctor",
                "Actions",
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    fontWeight: 700,
                    color: themeColors.primary,
                    py: 2,
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item, index) => (
              <StyledTableRow key={index} hover>
                {/* Table Cells with Enhanced Styling */}
                <TableCell sx={{ fontWeight: 600 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <LocalPharmacy sx={{ color: alpha(themeColors.primary, 0.8) }} />
                    {item.prescriptionName}
                  </Box>
                </TableCell>
                {/* ... other table cells */}
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Tooltip title="Edit">
                      <IconButton
                        sx={{
                          color: themeColors.primary,
                          "&:hover": { backgroundColor: alpha(themeColors.primary, 0.1) },
                        }}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        sx={{
                          color: themeColors.error,
                          "&:hover": { backgroundColor: alpha(themeColors.error, 0.1) },
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        fullWidth
        maxWidth="md"
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle
          sx={{
            backgroundColor: themeColors.primary,
            color: "white",
            fontWeight: 700,
          }}
        >
          {editingIndex !== null ? "Edit Prescription" : "New Prescription"}
        </DialogTitle>
        <DialogContent sx={{ py: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Prescription Name"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalPharmacy sx={{ color: themeColors.primary }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
            </Grid>
            {/* ... other form fields */}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <SecondaryButton onClick={() => setOpenPopup(false)}>Cancel</SecondaryButton>
          <PrimaryButton
            onClick={editingIndex !== null ? handleUpdatePrescription : handleAddPrescription}
          >
            {editingIndex !== null ? "Update" : "Create"} Prescription
          </PrimaryButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PrescriptionManagement;

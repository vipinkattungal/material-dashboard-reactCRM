import React, { useState } from "react";
import {
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import SearchIcon from "@mui/icons-material/Search";

// Dummy Data
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

const PrescriptionManagement = () => {
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

  return (
    <div style={{ padding: "20px", marginLeft: "280px" }}>
      <TextField
        label="Search Prescriptions"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        style={{ marginBottom: "20px", width: "300px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenPopup(true)}
        style={{
          marginBottom: "20px",
          backgroundColor: "#4caf50", // Light Green color
          color: "#fff",
          "&:hover": {
            backgroundColor: "#45a049", // Darker Green on hover
          },
        }}
      >
        Add New Prescription
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold", padding: "12px" }}>
                Prescription Name
              </TableCell>
              <TableCell style={{ fontWeight: "bold", padding: "12px" }}>Patient Name</TableCell>
              <TableCell style={{ fontWeight: "bold", padding: "12px" }}>
                Prescription Number
              </TableCell>
              <TableCell style={{ fontWeight: "bold", padding: "12px" }}>Expiry Date</TableCell>
              <TableCell style={{ fontWeight: "bold", padding: "12px" }}>
                Auto-Refill Status
              </TableCell>
              <TableCell style={{ fontWeight: "bold", padding: "12px" }}>
                Remaining Refills
              </TableCell>
              <TableCell style={{ fontWeight: "bold", padding: "12px" }}>Reminder Status</TableCell>
              <TableCell style={{ fontWeight: "bold", padding: "12px" }}>
                Doctor&apos;s Name
              </TableCell>
              <TableCell style={{ fontWeight: "bold", padding: "12px" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item, index) => (
              <TableRow key={index}>
                <TableCell style={{ padding: "12px" }}>{item.prescriptionName}</TableCell>
                <TableCell style={{ padding: "12px" }}>{item.patientName}</TableCell>
                <TableCell style={{ padding: "12px" }}>{item.prescriptionNumber}</TableCell>
                <TableCell style={{ padding: "12px" }}>{item.expiryDate}</TableCell>
                <TableCell style={{ padding: "12px" }}>{item.autoRefillStatus}</TableCell>
                <TableCell style={{ padding: "12px" }}>{item.remainingRefills}</TableCell>
                <TableCell style={{ padding: "12px" }}>{item.reminderStatus}</TableCell>
                <TableCell style={{ padding: "12px" }}>{item.doctorName}</TableCell>
                <TableCell style={{ padding: "12px" }}>
                  <IconButton
                    onClick={() => handleEditPrescription(index)}
                    style={{ marginRight: "10px", backgroundColor: "#64b5f6", color: "#fff" }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeletePrescription(index)}
                    style={{ marginRight: "10px", backgroundColor: "#e57373", color: "#fff" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => alert("Reminder Sent!")}
                    style={{ backgroundColor: "#81c784", color: "#fff" }}
                  >
                    <NotificationImportantIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
        <DialogTitle>
          {editingIndex !== null ? "Edit Prescription" : "Add New Prescription"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Prescription Name"
            variant="outlined"
            fullWidth
            value={newPrescription.prescriptionName}
            onChange={(e) =>
              setNewPrescription({ ...newPrescription, prescriptionName: e.target.value })
            }
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Patient Name"
            variant="outlined"
            fullWidth
            value={newPrescription.patientName}
            onChange={(e) =>
              setNewPrescription({ ...newPrescription, patientName: e.target.value })
            }
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Prescription Number"
            variant="outlined"
            fullWidth
            value={newPrescription.prescriptionNumber}
            onChange={(e) =>
              setNewPrescription({ ...newPrescription, prescriptionNumber: e.target.value })
            }
            style={{ marginBottom: "10px" }}
          />
          {/* Add more fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={editingIndex !== null ? handleUpdatePrescription : handleAddPrescription}
            variant="contained"
            color="success"
          >
            {editingIndex !== null ? "Update Prescription" : "Add Prescription"}
          </Button>
          <Button onClick={() => setOpenPopup(false)} variant="outlined" color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PrescriptionManagement;

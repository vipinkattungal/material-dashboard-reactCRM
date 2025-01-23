import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ReferralManagement = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [openNewReferralPopup, setOpenNewReferralPopup] = useState(false);
  const [manualReferral, setManualReferral] = useState("");
  const [generatedReferralLink, setGeneratedReferralLink] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedPerson, setSelectedPerson] = useState("");
  const [leads, setLeads] = useState([
    { id: 1, name: "John Doe", status: "Active" },
    { id: 2, name: "Jane Smith", status: "Pending" },
    { id: 3, name: "Alex Johnson", status: "Converted" },
  ]);

  const [newReferral, setNewReferral] = useState({
    name: "",
    email: "",
    referralType: "",
    details: "",
  });

  const people = ["Alice Johnson", "Bob Williams", "Catherine Brown", "David Thompson"];

  const handleGenerateLink = () => {
    if (!selectedPerson) {
      alert("Please select a person before generating the referral link.");
      return;
    }

    const newLink = `https://example.com/referral/${Math.random().toString(36).substring(7)}`;
    setGeneratedReferralLink(newLink);
    alert(`Referral link generated for ${selectedPerson}`);
  };

  const filteredLeads =
    filterStatus === "All" ? leads : leads.filter((lead) => lead.status === filterStatus);

  const handleNewReferralSubmit = () => {
    if (!newReferral.name || !newReferral.email || !newReferral.referralType) {
      alert("Please fill in all required fields.");
      return;
    }
    alert(`New referral created for ${newReferral.name}`);
    setNewReferral({ name: "", email: "", referralType: "", details: "" });
    setOpenNewReferralPopup(false);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Referral Management System
      </Typography>
      <Box mb={2}>
        <Button
          variant="contained"
          sx={{
            mr: 2,
            backgroundColor: "#007bff",
            color: "#fff",
            "&:hover": { backgroundColor: "#0056b3" },
          }}
          startIcon={<SettingsIcon />}
          onClick={() => setOpenPopup(true)}
        >
          Open Referral Management
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#28a745",
            color: "#fff",
            "&:hover": { backgroundColor: "#218838" },
          }}
          onClick={() => setOpenNewReferralPopup(true)}
        >
          Add New Referral
        </Button>
      </Box>

      {/* New Referral Popup */}
      <Dialog
        open={openNewReferralPopup}
        onClose={() => setOpenNewReferralPopup(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Create New Referral</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            value={newReferral.name}
            onChange={(e) => setNewReferral({ ...newReferral, name: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            value={newReferral.email}
            onChange={(e) => setNewReferral({ ...newReferral, email: e.target.value })}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Referral Type</InputLabel>
            <Select
              value={newReferral.referralType}
              onChange={(e) => setNewReferral({ ...newReferral, referralType: e.target.value })}
            >
              <MenuItem value="Discount">Discount</MenuItem>
              <MenuItem value="Points">Points</MenuItem>
              <MenuItem value="Voucher">Voucher</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Details (Optional)"
            multiline
            rows={4}
            value={newReferral.details}
            onChange={(e) => setNewReferral({ ...newReferral, details: e.target.value })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewReferralPopup(false)} sx={{ color: "#555" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#28a745",
              color: "#fff",
              "&:hover": { backgroundColor: "#218838" },
            }}
            onClick={handleNewReferralSubmit}
          >
            Create Referral
          </Button>
        </DialogActions>
      </Dialog>

      {/* Referral Management Popup */}
      <Dialog open={openPopup} onClose={() => setOpenPopup(false)} fullWidth maxWidth="md">
        <DialogTitle>Referral Management</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Add Manual Referral
          </Typography>
          <TextField
            fullWidth
            label="Manual Referral"
            value={manualReferral}
            onChange={(e) => setManualReferral(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#28a745",
              color: "#fff",
              "&:hover": { backgroundColor: "#218838" },
              mb: 2,
            }}
            onClick={() => {
              if (manualReferral) {
                alert(`Manual Referral Added: ${manualReferral}`);
                setManualReferral("");
              }
            }}
          >
            Add Referral
          </Button>

          <Typography variant="h6" gutterBottom>
            Generate Referral Link
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Select a Person</InputLabel>
            <Select value={selectedPerson} onChange={(e) => setSelectedPerson(e.target.value)}>
              {people.map((person, index) => (
                <MenuItem key={index} value={person}>
                  {person}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#007bff",
              color: "#fff",
              "&:hover": { backgroundColor: "#0056b3" },
              mb: 2,
            }}
            onClick={handleGenerateLink}
          >
            Generate Link
          </Button>
          {generatedReferralLink && (
            <Typography gutterBottom>
              Referral Link:{" "}
              <CopyToClipboard text={generatedReferralLink}>
                <Button variant="text" sx={{ color: "#007bff", textTransform: "none" }}>
                  {generatedReferralLink} (Copy)
                </Button>
              </CopyToClipboard>
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPopup(false)} sx={{ color: "#555" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

ReferralManagement.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default ReferralManagement;

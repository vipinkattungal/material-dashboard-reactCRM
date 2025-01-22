import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { AddCircle, MailOutline } from "@mui/icons-material";

// Dummy client data for demonstration
const clients = [
  { id: 1, name: "John Doe", email: "johndoe@example.com" },
  { id: 2, name: "Jane Smith", email: "janesmith@example.com" },
  { id: 3, name: "Michael Johnson", email: "michaelj@example.com" },
];

// Dummy email templates and follow-ups for demonstration
const initialFollowUps = [
  {
    id: 1,
    client: "John Doe",
    subject: "Follow-Up on Your Inquiry",
    body: "This is a follow-up email to check in on your inquiry.",
  },
  {
    id: 2,
    client: "Jane Smith",
    subject: "Reminder: Your Consultation Appointment",
    body: "Just a friendly reminder about your upcoming consultation.",
  },
  {
    id: 3,
    client: "Michael Johnson",
    subject: "Your Requested Information",
    body: "Here is the information you requested about our services.",
  },
];

const EmailAndCommunicationModule = () => {
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openTemplateDialog, setOpenTemplateDialog] = useState(false);
  const [openFollowUpDialog, setOpenFollowUpDialog] = useState(false);
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [emailFollowUps, setEmailFollowUps] = useState(initialFollowUps);
  const [filter, setFilter] = useState("");
  const [viewEmail, setViewEmail] = useState(null);

  // Function to handle sending email (Dummy implementation)
  const handleSendEmail = () => {
    alert(`Email sent to: ${clientEmail}`);
    setOpenDialog(false);
  };

  // Function to handle adding or editing an email template
  const handleSaveTemplate = () => {
    const newTemplate = {
      id: emailTemplates.length + 1,
      name: emailSubject,
      subject: emailSubject,
      body: emailBody,
    };
    setEmailTemplates([...emailTemplates, newTemplate]);
    setOpenTemplateDialog(false);
  };

  // Function to handle adding a follow-up email
  const handleAddFollowUp = () => {
    const newFollowUp = {
      id: emailFollowUps.length + 1,
      client: selectedClient,
      subject: emailSubject,
      body: emailBody,
    };
    setEmailFollowUps([...emailFollowUps, newFollowUp]);
    setOpenFollowUpDialog(false);
  };

  // Handle view email content
  const handleViewEmail = (email) => {
    setViewEmail(email);
  };

  // Filtered email follow-ups based on the search term
  const filteredFollowUps = emailFollowUps.filter(
    (email) =>
      email.client.toLowerCase().includes(filter.toLowerCase()) ||
      email.subject.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box sx={{ p: 3, marginLeft: "280px" }}>
      {/* Header Section */}
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333", mb: 3 }}>
        Email & Communication Tools
      </Typography>

      {/* Email Campaigns Section */}
      <Card sx={{ mb: 3, borderRadius: "12px", boxShadow: 3, p: 2 }}>
        <Typography variant="h5" sx={{ mb: 2, color: "#1976d2", fontWeight: "bold" }}>
          Create New Email Campaign
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddCircle />}
          onClick={() => setOpenDialog(true)}
          sx={{
            backgroundColor: "#28a745",
            color: "#fff",
            "&:hover": { backgroundColor: "#218838" },
            borderRadius: "8px",
            padding: "8px 16px",
            fontSize: "16px",
          }}
        >
          New Campaign
        </Button>
      </Card>

      {/* Templates and Automated Follow-Ups Section */}
      <Card sx={{ mb: 3, borderRadius: "12px", boxShadow: 3, p: 2 }}>
        <Typography variant="h5" sx={{ mb: 2, color: "#1976d2", fontWeight: "bold" }}>
          Follow-Ups and Templates
        </Typography>

        {/* Follow-Up Table */}
        <TextField
          label="Search Follow-Ups"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          InputProps={{
            sx: { borderRadius: "8px" },
          }}
        />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="follow-up table">
            <TableHead>
              <TableRow>
                <TableCell>Client</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredFollowUps.map((email) => (
                <TableRow key={email.id}>
                  <TableCell>{email.client}</TableCell>
                  <TableCell>{email.subject}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleViewEmail(email)}
                      sx={{ color: "#1976d2", borderColor: "#1976d2" }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* View Follow-Up Email Content */}
      {viewEmail && (
        <Card sx={{ mb: 3, borderRadius: "12px", boxShadow: 3, p: 2 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
            View Email: {viewEmail.subject}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Client:</strong> {viewEmail.client}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Content:</strong> {viewEmail.body}
          </Typography>
        </Card>
      )}

      {/* Email Creation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle sx={{ fontWeight: "bold", color: "#1976d2" }}>
          Create New Email Campaign
        </DialogTitle>
        <DialogContent>
          {/* Client Selection */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Select Client</InputLabel>
            <Select
              value={selectedClient}
              onChange={(e) => {
                const client = clients.find((c) => c.id === e.target.value);
                setSelectedClient(client.id);
                setClientEmail(client.email); // Set the client email
              }}
              label="Select Client"
              sx={{
                borderRadius: "8px",
                boxShadow: "none",
                "&:focus": {
                  borderColor: "#1976d2",
                },
              }}
            >
              {clients.map((client) => (
                <MenuItem key={client.id} value={client.id}>
                  {client.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Email Subject */}
          <TextField
            fullWidth
            label="Email Subject"
            variant="outlined"
            sx={{ mb: 2 }}
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
            InputProps={{
              sx: { borderRadius: "8px" },
            }}
          />

          {/* Email Body */}
          <TextField
            fullWidth
            label="Email Body"
            variant="outlined"
            multiline
            rows={4}
            sx={{ mb: 2 }}
            value={emailBody}
            onChange={(e) => setEmailBody(e.target.value)}
            InputProps={{
              sx: { borderRadius: "8px" },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            color="secondary"
            sx={{ borderRadius: "8px" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSendEmail}
            sx={{ backgroundColor: "#28a745", color: "#fff", borderRadius: "8px" }}
          >
            Send Email
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmailAndCommunicationModule;

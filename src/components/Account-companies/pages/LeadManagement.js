import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { FaEdit, FaTrash, FaPaperPlane, FaLink } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LeadManagement = () => {
  const [leads, setLeads] = useState([]);
  const [openLeadDialog, setOpenLeadDialog] = useState(false);
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
    status: "New",
  });

  const [leadSources, setLeadSources] = useState({ Website: 0, Referral: 0, "Social Media": 0 });
  const [emailCampaignOpen, setEmailCampaignOpen] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");

  const [websiteConnectOpen, setWebsiteConnectOpen] = useState(false);
  const [socialMediaConnectOpen, setSocialMediaConnectOpen] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [socialMediaPlatform, setSocialMediaPlatform] = useState("");

  const handleAddLead = () => {
    const updatedLeads = [...leads, { id: leads.length + 1, ...newLead }];
    setLeads(updatedLeads);
    setLeadSources({
      ...leadSources,
      [newLead.source]: leadSources[newLead.source] + 1,
    });
    setNewLead({ name: "", email: "", phone: "", source: "", status: "New" });
    setOpenLeadDialog(false);
  };

  const handleEditLead = (id) => {
    const leadToEdit = leads.find((lead) => lead.id === id);
    setNewLead(leadToEdit);
    setOpenLeadDialog(true);
  };

  const handleDeleteLead = (id) => {
    const updatedLeads = leads.filter((lead) => lead.id !== id);
    setLeads(updatedLeads);
  };

  const handleSendEmailCampaign = () => {
    // Simulate email sending
    console.log(`Sending email to all leads with message: ${emailMessage}`);
    setEmailCampaignOpen(false);
    setEmailMessage("");
  };

  const handleConnectWebsite = () => {
    // Simulate connecting website
    console.log(`Connecting with Website: ${websiteUrl}`);
    setWebsiteConnectOpen(false);
    setWebsiteUrl("");
  };

  const handleConnectSocialMedia = () => {
    // Simulate connecting with social media
    console.log(`Connecting with Social Media: ${socialMediaPlatform}`);
    setSocialMediaConnectOpen(false);
    setSocialMediaPlatform("");
  };

  const leadColumns = [
    { field: "name", headerName: "Lead Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "source", headerName: "Lead Source", width: 150 },
    { field: "status", headerName: "Status", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box>
          <Button
            onClick={() => handleEditLead(params.row.id)}
            startIcon={<FaEdit />}
            sx={{ marginRight: 1 }}
          >
            Edit
          </Button>
          <br />
          <Button
            onClick={() => handleDeleteLead(params.row.id)}
            startIcon={<FaTrash />}
            color="error"
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  // Analytics Data
  const analyticsData = {
    labels: Object.keys(leadSources),
    datasets: [
      {
        label: "Leads by Source",
        data: Object.values(leadSources),
        borderColor: "#28a745",
        backgroundColor: "rgba(40, 167, 69, 0.2)",
        fill: true,
      },
    ],
  };

  // Report Analytics (e.g., qualified leads and conversion rate)
  const totalLeads = leads.length;
  const qualifiedLeads = leads.filter((lead) => lead.status === "Qualified").length;
  const conversionRate = totalLeads > 0 ? (qualifiedLeads / totalLeads) * 100 : 0;

  return (
    <Box sx={{ p: 3, marginLeft: "280px" }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Lead Management
          </Typography>
          <Button
            variant="contained"
            onClick={() => setOpenLeadDialog(true)}
            sx={{
              mb: 2,
              backgroundColor: "#28a745",
              color: "#fff",
              "&:hover": { backgroundColor: "#218838" },
              marginRight: 2, // Add gap to the right of the button
            }}
          >
            Add Lead
          </Button>

          <Button
            variant="contained"
            onClick={() => setWebsiteConnectOpen(true)}
            startIcon={<FaLink />}
            sx={{
              mb: 2,
              backgroundColor: "#007bff",
              color: "#fff",
              "&:hover": { backgroundColor: "#0056b3" },
              marginRight: 2, // Add gap to the right of the button
            }}
          >
            Connect with Website
          </Button>

          <Button
            variant="contained"
            onClick={() => setSocialMediaConnectOpen(true)}
            startIcon={<FaLink />}
            sx={{
              mb: 2,
              backgroundColor: "#17a2b8",
              color: "#fff",
              "&:hover": { backgroundColor: "#117a8b" },
            }}
          >
            Connect with Social Media
          </Button>

          {/* DataGrid for Lead List */}
          <DataGrid
            rows={leads}
            columns={leadColumns}
            autoHeight
            pageSize={5}
            disableSelectionOnClick
          />
        </CardContent>
      </Card>

      {/* Analytics Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Lead Source Analytics
          </Typography>
          <Line
            data={analyticsData}
            options={{
              responsive: true,
              plugins: { title: { display: true, text: "Leads by Source" } },
            }}
          />
        </CardContent>
      </Card>

      {/* Reports Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Reports & Analytics
          </Typography>
          <Typography variant="h6">Total Leads: {totalLeads}</Typography>
          <Typography variant="h6">Qualified Leads: {qualifiedLeads}</Typography>
          <Typography variant="h6">Conversion Rate: {conversionRate.toFixed(2)}%</Typography>
        </CardContent>
      </Card>

      {/* Email Campaign Dialog */}
      <Dialog open={emailCampaignOpen} onClose={() => setEmailCampaignOpen(false)}>
        <DialogTitle>Email Campaign</DialogTitle>
        <DialogContent>
          <TextField
            label="Email Message"
            multiline
            rows={4}
            fullWidth
            value={emailMessage}
            onChange={(e) => setEmailMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEmailCampaignOpen(false)}>Cancel</Button>
          <Button
            onClick={handleSendEmailCampaign}
            variant="contained"
            sx={{
              backgroundColor: "#28a745",
              color: "#fff",
              "&:hover": { backgroundColor: "#218838" },
            }}
            startIcon={<FaPaperPlane />}
          >
            Send Campaign
          </Button>
        </DialogActions>
      </Dialog>

      {/* Website Connect Dialog */}
      <Dialog open={websiteConnectOpen} onClose={() => setWebsiteConnectOpen(false)}>
        <DialogTitle>Connect with Website</DialogTitle>
        <DialogContent>
          <TextField
            label="Website URL"
            fullWidth
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setWebsiteConnectOpen(false)}>Cancel</Button>
          <Button
            onClick={handleConnectWebsite}
            variant="contained"
            sx={{
              backgroundColor: "#007bff",
              color: "#fff",
              "&:hover": { backgroundColor: "#0056b3" },
            }}
          >
            Connect
          </Button>
        </DialogActions>
      </Dialog>

      {/* Social Media Connect Dialog */}
      <Dialog open={socialMediaConnectOpen} onClose={() => setSocialMediaConnectOpen(false)}>
        <DialogTitle>Connect with Social Media</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Platform</InputLabel>
            <Select
              value={socialMediaPlatform}
              onChange={(e) => setSocialMediaPlatform(e.target.value)}
            >
              <MenuItem value="Facebook">Facebook</MenuItem>
              <MenuItem value="Instagram">Instagram</MenuItem>
              <MenuItem value="Twitter">Twitter</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSocialMediaConnectOpen(false)}>Cancel</Button>
          <Button
            onClick={handleConnectSocialMedia}
            variant="contained"
            sx={{
              backgroundColor: "#17a2b8",
              color: "#fff",
              "&:hover": { backgroundColor: "#117a8b" },
            }}
          >
            Connect
          </Button>
        </DialogActions>
      </Dialog>

      {/* Lead Dialog for Adding/Editing Leads */}
      <Dialog open={openLeadDialog} onClose={() => setOpenLeadDialog(false)}>
        <DialogTitle>{newLead.id ? "Edit Lead" : "Add New Lead"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={newLead.name}
            onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Email"
            fullWidth
            value={newLead.email}
            onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Phone"
            fullWidth
            value={newLead.phone}
            onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Lead Source</InputLabel>
            <Select
              value={newLead.source}
              onChange={(e) => setNewLead({ ...newLead, source: e.target.value })}
            >
              <MenuItem value="Website">Website</MenuItem>
              <MenuItem value="Referral">Referral</MenuItem>
              <MenuItem value="Social Media">Social Media</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={newLead.status}
              onChange={(e) => setNewLead({ ...newLead, status: e.target.value })}
            >
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Qualified">Qualified</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLeadDialog(false)}>Cancel</Button>
          <Button onClick={handleAddLead} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LeadManagement;

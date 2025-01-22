import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing FontAwesome Icons

const SalesCRMPage = () => {
  // Account Module States
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: "ABC Corp.",
      contactPerson: "John Doe",
      email: "johndoe@abccorp.com",
      phone: "123-456-7890",
      industry: "Technology",
      status: "Active",
    },
  ]);
  const [newAccount, setNewAccount] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    industry: "",
    status: "Active",
  });
  const [openAccountDialog, setOpenAccountDialog] = useState(false);

  // Company Module States
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "Tech Innovations Ltd.",
      contactPerson: "Alice Johnson",
      email: "alice@techinnovations.com",
      phone: "555-123-4567",
      industry: "Technology",
      status: "Active",
    },
  ]);
  const [newCompany, setNewCompany] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    industry: "",
    status: "Active",
  });
  const [openCompanyDialog, setOpenCompanyDialog] = useState(false);

  // Handle Account Add
  const handleAddAccount = () => {
    setAccounts([...accounts, { id: accounts.length + 1, ...newAccount }]);
    setNewAccount({
      name: "",
      contactPerson: "",
      email: "",
      phone: "",
      industry: "",
      status: "Active",
    });
    setOpenAccountDialog(false);
  };

  // Handle Company Add
  const handleAddCompany = () => {
    setCompanies([...companies, { id: companies.length + 1, ...newCompany }]);
    setNewCompany({
      name: "",
      contactPerson: "",
      email: "",
      phone: "",
      industry: "",
      status: "Active",
    });
    setOpenCompanyDialog(false);
  };

  // Handle Edit and Delete
  const handleEdit = (id, type) => {
    console.log(`Edit ${type} with ID: ${id}`);
  };

  const handleDelete = (id, type) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      if (type === "Account") {
        setAccounts(accounts.filter((account) => account.id !== id));
      } else {
        setCompanies(companies.filter((company) => company.id !== id));
      }
    }
  };

  return (
    <Box sx={{ p: 3, marginLeft: "280px" }}>
      {/* Account Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Accounts
          </Typography>
          <Button
            variant="contained"
            onClick={() => setOpenAccountDialog(true)}
            sx={{
              mb: 2,
              backgroundColor: "#28a745",
              color: "#fff", // Ensure the text color is white
              "&:hover": {
                backgroundColor: "#218838",
              },
            }}
          >
            Add Account
          </Button>

          <Grid container spacing={2}>
            {accounts.map((account) => (
              <Grid item xs={12} sm={6} md={4} key={account.id}>
                <Card sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {account.name}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Contact Person:{" "}
                    <span style={{ fontWeight: "normal" }}>{account.contactPerson}</span>
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Email: <span style={{ fontWeight: "normal" }}>{account.email}</span>
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Phone: <span style={{ fontWeight: "normal" }}>{account.phone}</span>
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Industry: <span style={{ fontWeight: "normal" }}>{account.industry}</span>
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Status: <span style={{ fontWeight: "normal" }}>{account.status}</span>
                  </Typography>

                  <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                    <IconButton
                      onClick={() => handleEdit(account.id, "Account")}
                      sx={{ color: "#28a745" }}
                    >
                      <FaEdit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(account.id, "Account")}
                      sx={{ color: "#d9534f" }}
                    >
                      <FaTrash />
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Company Section */}
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Companies
          </Typography>
          <Button
            variant="contained"
            onClick={() => setOpenCompanyDialog(true)}
            sx={{
              mb: 2,
              backgroundColor: "#28a745",
              color: "#fff", // Ensure the text color is white
              "&:hover": {
                backgroundColor: "#218838",
              },
            }}
          >
            Add Company
          </Button>

          <Grid container spacing={2}>
            {companies.map((company) => (
              <Grid item xs={12} sm={6} md={4} key={company.id}>
                <Card sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {company.name}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Contact Person:{" "}
                    <span style={{ fontWeight: "normal" }}>{company.contactPerson}</span>
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Email: <span style={{ fontWeight: "normal" }}>{company.email}</span>
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Phone: <span style={{ fontWeight: "normal" }}>{company.phone}</span>
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Industry: <span style={{ fontWeight: "normal" }}>{company.industry}</span>
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Status: <span style={{ fontWeight: "normal" }}>{company.status}</span>
                  </Typography>

                  <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                    <IconButton
                      onClick={() => handleEdit(company.id, "Company")}
                      sx={{ color: "#28a745" }}
                    >
                      <FaEdit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(company.id, "Company")}
                      sx={{ color: "#d9534f" }}
                    >
                      <FaTrash />
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Add Account Dialog */}
      <Dialog open={openAccountDialog} onClose={() => setOpenAccountDialog(false)}>
        <DialogTitle>Add New Account</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Account Name"
            value={newAccount.name}
            onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Contact Person"
            value={newAccount.contactPerson}
            onChange={(e) => setNewAccount({ ...newAccount, contactPerson: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            value={newAccount.email}
            onChange={(e) => setNewAccount({ ...newAccount, email: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone"
            value={newAccount.phone}
            onChange={(e) => setNewAccount({ ...newAccount, phone: e.target.value })}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Industry</InputLabel>
            <Select
              value={newAccount.industry}
              onChange={(e) => setNewAccount({ ...newAccount, industry: e.target.value })}
            >
              <MenuItem value="Technology">Technology</MenuItem>
              <MenuItem value="Healthcare">Healthcare</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
              <MenuItem value="Education">Education</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={newAccount.status}
              onChange={(e) => setNewAccount({ ...newAccount, status: e.target.value })}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAccountDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddAccount}
            sx={{
              backgroundColor: "#28a745",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#218838",
              },
            }}
          >
            Add Account
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Company Dialog */}
      <Dialog open={openCompanyDialog} onClose={() => setOpenCompanyDialog(false)}>
        <DialogTitle>Add New Company</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Company Name"
            value={newCompany.name}
            onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Contact Person"
            value={newCompany.contactPerson}
            onChange={(e) => setNewCompany({ ...newCompany, contactPerson: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            value={newCompany.email}
            onChange={(e) => setNewCompany({ ...newCompany, email: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone"
            value={newCompany.phone}
            onChange={(e) => setNewCompany({ ...newCompany, phone: e.target.value })}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Industry</InputLabel>
            <Select
              value={newCompany.industry}
              onChange={(e) => setNewCompany({ ...newCompany, industry: e.target.value })}
            >
              <MenuItem value="Technology">Technology</MenuItem>
              <MenuItem value="Healthcare">Healthcare</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
              <MenuItem value="Education">Education</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={newCompany.status}
              onChange={(e) => setNewCompany({ ...newCompany, status: e.target.value })}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCompanyDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddCompany}
            sx={{
              backgroundColor: "#28a745",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#218838",
              },
            }}
          >
            Add Company
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SalesCRMPage;

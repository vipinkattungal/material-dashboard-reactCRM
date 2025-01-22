import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Chip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const AccountManagementModule = () => {
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: "Acme Corp",
      industry: "Software",
      size: "Large",
      status: "Active",
      activity: "High",
    },
    {
      id: 2,
      name: "Beta Ltd",
      industry: "Healthcare",
      size: "Medium",
      status: "Inactive",
      activity: "Low",
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [newAccount, setNewAccount] = useState({
    name: "",
    industry: "",
    size: "",
    status: "Active",
    activity: "High",
  });

  const handleAddAccount = () => {
    setAccounts([...accounts, { id: accounts.length + 1, ...newAccount }]);
    setNewAccount({
      name: "",
      industry: "",
      size: "",
      status: "Active",
      activity: "High",
    });
    setOpenDialog(false);
  };

  const accountColumns = [
    { field: "name", headerName: "Account Name", width: 200 },
    { field: "industry", headerName: "Industry", width: 150 },
    { field: "size", headerName: "Size", width: 120 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "activity", headerName: "Activity", width: 150 },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => (
        <Box>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              mr: 1,
              backgroundColor: "#28a745",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#218838",
              },
            }}
            onClick={() => handleEditAccount(params.id)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleDeleteAccount(params.id)}
            sx={{
              mr: 1,
              backgroundColor: "#28a745",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#218838",
              },
            }}
          >
            Delete
          </Button>
        </Box>
      ),
      width: 180,
    },
  ];

  const handleEditAccount = (id) => {
    const account = accounts.find((account) => account.id === id);
    setNewAccount(account);
    setOpenDialog(true);
  };

  const handleDeleteAccount = (id) => {
    setAccounts(accounts.filter((account) => account.id !== id));
  };

  return (
    <Box sx={{ p: 3, marginLeft: "280px" }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Account Management
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
            Add Account
          </Button>
          <DataGrid rows={accounts} columns={accountColumns} autoHeight disableSelectionOnClick />
        </CardContent>
      </Card>

      {/* Add/Edit Account Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{newAccount.id ? "Edit Account" : "Add New Account"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Account Name"
            value={newAccount.name}
            onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Industry</InputLabel>
            <Select
              value={newAccount.industry}
              onChange={(e) => setNewAccount({ ...newAccount, industry: e.target.value })}
            >
              <MenuItem value="Software">Software</MenuItem>
              <MenuItem value="Healthcare">Healthcare</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
              <MenuItem value="Retail">Retail</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Size</InputLabel>
            <Select
              value={newAccount.size}
              onChange={(e) => setNewAccount({ ...newAccount, size: e.target.value })}
            >
              <MenuItem value="Small">Small</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Large">Large</MenuItem>
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
          <FormControl fullWidth margin="normal">
            <InputLabel>Activity Level</InputLabel>
            <Select
              value={newAccount.activity}
              onChange={(e) => setNewAccount({ ...newAccount, activity: e.target.value })}
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddAccount}
            sx={{
              mb: 2,
              backgroundColor: "#28a745",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#218838",
              },
            }}
          >
            {newAccount.id ? "Update Account" : "Add Account"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AccountManagementModule;

import React, { useState, useEffect } from "react";
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
  Grid,
  Avatar,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AddCircleOutline, Edit, Delete, CheckCircle, Cancel, Search } from "@mui/icons-material";
import PropTypes from "prop-types";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

// StatusChip Component
const StatusChip = ({ status }) => (
  <Chip
    label={status}
    size="small"
    color={status === "Active" ? "success" : "error"}
    variant="outlined"
    avatar={
      <Avatar>
        {status === "Active" ? <CheckCircle fontSize="small" /> : <Cancel fontSize="small" />}
      </Avatar>
    }
  />
);

StatusChip.propTypes = {
  status: PropTypes.oneOf(["Active", "Inactive"]).isRequired,
};

// ActivityBadge Component
const ActivityBadge = ({ activity }) => {
  const colorMap = {
    High: "error",
    Medium: "warning",
    Low: "success",
  };
  return <Chip label={activity} color={colorMap[activity]} variant="filled" size="small" />;
};

ActivityBadge.propTypes = {
  activity: PropTypes.oneOf(["High", "Medium", "Low"]).isRequired,
};

// Main Component
const AccountManagementModule = () => {
  const [accounts, setAccounts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newAccount, setNewAccount] = useState({
    name: "",
    industry: "",
    size: "",
    status: "Active",
    activity: "High",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Fetch accounts on component mount and search term change
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_BASE}/api/accounts?search=${encodeURIComponent(searchTerm)}`
        );
        const data = await response.json();
        setAccounts(data);
      } catch (err) {
        console.error("Error fetching accounts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [searchTerm]);

  const handleAddAccount = async () => {
    try {
      const method = editMode ? "PUT" : "POST";
      const url = editMode
        ? `${API_BASE}/api/accounts/${newAccount.id}`
        : `${API_BASE}/api/accounts`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAccount),
      });

      if (!response.ok) throw new Error("Failed to save account");

      setOpenDialog(false);
      setEditMode(false);
      setNewAccount({
        name: "",
        industry: "",
        size: "",
        status: "Active",
        activity: "High",
      });

      // Refresh the list
      const refreshResponse = await fetch(`${API_BASE}/api/accounts?search=${searchTerm}`);
      const refreshedData = await refreshResponse.json();
      setAccounts(refreshedData);
    } catch (err) {
      console.error("Error saving account:", err);
    }
  };

  const handleEditAccount = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/api/accounts/${id}`);
      if (!response.ok) throw new Error("Failed to fetch account");

      const account = await response.json();
      setNewAccount(account);
      setEditMode(true);
      setOpenDialog(true);
    } catch (err) {
      console.error("Error fetching account for edit:", err);
    }
  };

  const handleDeleteAccount = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/api/accounts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete account");

      // Optimistic update
      setAccounts((prev) => prev.filter((account) => account.id !== id));
    } catch (err) {
      console.error("Error deleting account:", err);
    }
  };

  return (
    <Box
      sx={{ p: 3, marginLeft: { xs: 0, sm: "280px" }, transition: "margin 0.3s", bgcolor: "white" }}
    >
      <Card sx={{ mb: 3, boxShadow: theme.shadows[2], bgcolor: "white" }}>
        <Toolbar sx={{ p: 2, bgcolor: "primary.main", color: "white" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Account Management
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search accounts..."
            InputProps={{
              startAdornment: <Search sx={{ color: "white", mr: 1 }} />,
              sx: { color: "white", "& fieldset": { borderColor: "rgba(255,255,255,0.2)" } },
            }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Toolbar>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<AddCircleOutline />}
              onClick={() => setOpenDialog(true)}
              sx={{
                bgcolor: "primary.main",
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              Add Account
            </Button>
          </Box>
          <DataGrid
            rows={accounts}
            loading={loading}
            columns={[
              { field: "name", headerName: "Account Name", flex: 1, minWidth: 200 },
              { field: "industry", headerName: "Industry", flex: 1, minWidth: 150 },
              { field: "size", headerName: "Size", flex: 1, minWidth: 120 },
              {
                field: "status",
                headerName: "Status",
                flex: 1,
                minWidth: 120,
                renderCell: (params) => <StatusChip status={params.value} />,
              },
              {
                field: "activity",
                headerName: "Activity",
                flex: 1,
                minWidth: 150,
                renderCell: (params) => <ActivityBadge activity={params.value} />,
              },
              {
                field: "action",
                headerName: "Actions",
                width: 150,
                renderCell: (params) => (
                  <Box>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditAccount(params.id)}
                      aria-label="Edit"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteAccount(params.id)}
                      aria-label="Delete"
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                ),
              },
            ]}
            autoHeight
            disableSelectionOnClick
            density="comfortable"
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                bgcolor: "white",
                borderBottom: `1px solid ${theme.palette.divider}`,
              },
              "& .MuiDataGrid-row": {
                bgcolor: "white",
                "&:hover": {
                  bgcolor: theme.palette.action.hover,
                },
              },
            }}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
          />
        </CardContent>
      </Card>

      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setEditMode(false);
          setNewAccount({ name: "", industry: "", size: "", status: "Active", activity: "High" });
        }}
        fullScreen={fullScreen}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: "primary.main", color: "white" }}>
          {editMode ? "Edit Account" : "Create New Account"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                margin="normal"
                label="Account Name"
                value={newAccount.name}
                onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                error={!newAccount.name}
                helperText={!newAccount.name && "Required field"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Industry</InputLabel>
                <Select
                  value={newAccount.industry}
                  onChange={(e) => setNewAccount({ ...newAccount, industry: e.target.value })}
                  error={!newAccount.industry}
                >
                  <MenuItem value="Software">Software</MenuItem>
                  <MenuItem value="Healthcare">Healthcare</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                  <MenuItem value="Retail">Retail</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Size</InputLabel>
                <Select
                  value={newAccount.size}
                  onChange={(e) => setNewAccount({ ...newAccount, size: e.target.value })}
                  error={!newAccount.size}
                >
                  <MenuItem value="Small">Small</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Large">Large</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
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
            </Grid>
            <Grid item xs={12} sm={6}>
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
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => {
              setOpenDialog(false);
              setEditMode(false);
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddAccount}
            disabled={!newAccount.name || !newAccount.industry || !newAccount.size}
            sx={{
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.dark" },
              "&:disabled": { bgcolor: theme.palette.action.disabled },
            }}
          >
            {editMode ? "Update Account" : "Create Account"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AccountManagementModule;

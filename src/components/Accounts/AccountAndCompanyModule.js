import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  IconButton,
  useMediaQuery,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Chip } from "@mui/material";
import PropTypes from "prop-types"; // 👈 Import PropTypes

import {
  fetchAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
  fetchCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} from "../Account-companies/pages/services/api";

const SalesCRMPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // State management
  const [accounts, setAccounts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentEntity, setCurrentEntity] = useState(0);
  const [dialogType, setDialogType] = useState("");

  // Fetch initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const accountsResponse = await fetchAccounts();
        const companiesResponse = await fetchCompanies();
        setAccounts(accountsResponse.data.data.accounts);
        setCompanies(companiesResponse.data.data.companies);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadData();
  }, []);

  // Handle CRUD operations
  const handleEdit = (entity, type) => {
    setCurrentEntity(entity);
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleDelete = async (id, type) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      try {
        if (type === "Account") {
          await deleteAccount(id);
          setAccounts(accounts.filter((account) => account.id !== id));
        } else {
          await deleteCompany(id);
          setCompanies(companies.filter((company) => company.id !== id));
        }
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  const handleSave = async () => {
    try {
      if (!currentEntity) {
        console.error("No entity data to save");
        return;
      }

      let response;
      if (dialogType === "Account") {
        if (currentEntity.id) {
          response = await updateAccount(currentEntity.id, currentEntity);
        } else {
          response = await createAccount(currentEntity);
          // Generate temporary ID if missing
          if (!response.data?.id && !response.data?.account?.id) {
            response.data = {
              account: {
                ...currentEntity,
                id: `temp-${Date.now()}`,
              },
            };
            console.warn("Using temporary ID for account");
          }
        }
        const newAccount = response.data.account || response.data;
        setAccounts((prev) =>
          currentEntity.id
            ? prev.map((a) => (a.id === newAccount.id ? newAccount : a))
            : [...prev, newAccount]
        );
      } else {
        if (currentEntity.id) {
          response = await updateCompany(currentEntity.id, currentEntity);
        } else {
          response = await createCompany(currentEntity);
          // Generate temporary ID if missing
          if (!response.data?.id && !response.data?.company?.id) {
            response.data = {
              company: {
                ...currentEntity,
                id: `temp-${Date.now()}`,
              },
            };
            console.warn("Using temporary ID for company");
          }
        }
        const newCompany = response.data.company || response.data;
        setCompanies((prev) =>
          currentEntity.id
            ? prev.map((c) => (c.id === newCompany.id ? newCompany : c))
            : [...prev, newCompany]
        );
      }

      setOpenDialog(false);
    } catch (error) {
      console.error("Save error details:", {
        error,
        responseData: error.response?.data,
        currentEntity,
      });
      alert(`Save failed: ${error.message}`);
    }
  };

  // Table columns configuration
  const accountColumns = [
    { field: "name", headerName: "Account Name", flex: 1 },
    { field: "contactPerson", headerName: "Contact Person", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    {
      field: "industry",
      headerName: "Industry",
      flex: 1,
      renderCell: (params) => <Chip label={params.value} color="primary" variant="outlined" />,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            color:
              params.value === "Active" ? theme.palette.success.main : theme.palette.error.main,
            fontWeight: "bold",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleEdit(params.row, "Account")} color="primary">
            <FaEdit />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id, "Account")} color="error">
            <FaTrash />
          </IconButton>
        </Box>
      ),
    },
  ];

  const companyColumns = [
    { field: "name", headerName: "Company Name", flex: 1 },
    { field: "contactPerson", headerName: "Contact Person", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    {
      field: "industry",
      headerName: "Industry",
      flex: 1,
      renderCell: (params) => <Chip label={params.value} color="secondary" variant="outlined" />,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            color:
              params.value === "Active" ? theme.palette.success.main : theme.palette.error.main,
            fontWeight: "bold",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleEdit(params.row, "Company")} color="primary">
            <FaEdit />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id, "Company")} color="error">
            <FaTrash />
          </IconButton>
        </Box>
      ),
    },
  ];

  // Custom toolbar component

  const CustomToolbar = ({ onAddClick }) => (
    <GridToolbarContainer>
      <Button
        startIcon={<FaPlus />}
        onClick={onAddClick}
        sx={{ color: theme.palette.primary.main }}
      >
        Add New
      </Button>
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );

  // Prop type validation 👇
  CustomToolbar.propTypes = {
    onAddClick: PropTypes.func.isRequired,
  };
  return (
    <Box sx={{ p: isMobile ? 1 : 3, marginLeft: { xs: 0, md: "280px" } }}>
      {/* Accounts Table */}
      <Card sx={{ mb: 3, boxShadow: theme.shadows[3] }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Accounts Management
          </Typography>
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={accounts}
              columns={accountColumns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 25]}
              components={{
                Toolbar: () => (
                  <CustomToolbar
                    onAddClick={() => {
                      setDialogType("Account");
                      setCurrentEntity({
                        name: "",
                        contactPerson: "",
                        email: "",
                        phone: "",
                        industry: "",
                        status: "Active",
                      });
                      setOpenDialog(true);
                    }}
                  />
                ),
              }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Companies Table */}
      <Card sx={{ boxShadow: theme.shadows[3] }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Companies Management
          </Typography>
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              getRowId={(row) => row.id} // 👈 Add this line
              rows={companies}
              columns={companyColumns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 25]}
              components={{
                Toolbar: () => (
                  <CustomToolbar
                    onAddClick={() => {
                      setDialogType("Company");
                      setCurrentEntity({
                        name: "",
                        contactPerson: "",
                        email: "",
                        phone: "",
                        industry: "",
                        status: "Active",
                      });
                      setOpenDialog(true);
                    }}
                  />
                ),
              }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Universal Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullScreen={isMobile}>
        <DialogTitle>
          {currentEntity?.id ? `Edit ${dialogType}` : `Add New ${dialogType}`}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label={`${dialogType} Name`}
            value={currentEntity?.name || ""}
            onChange={(e) => setCurrentEntity({ ...currentEntity, name: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Contact Person"
            value={currentEntity?.contactPerson || ""}
            onChange={(e) => setCurrentEntity({ ...currentEntity, contactPerson: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            value={currentEntity?.email || ""}
            onChange={(e) => setCurrentEntity({ ...currentEntity, email: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone"
            value={currentEntity?.phone || ""}
            onChange={(e) => setCurrentEntity({ ...currentEntity, phone: e.target.value })}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Industry</InputLabel>
            <Select
              value={currentEntity?.industry || ""}
              onChange={(e) => setCurrentEntity({ ...currentEntity, industry: e.target.value })}
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
              value={currentEntity?.status || "Active"}
              onChange={(e) => setCurrentEntity({ ...currentEntity, status: e.target.value })}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {currentEntity?.id ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SalesCRMPage;

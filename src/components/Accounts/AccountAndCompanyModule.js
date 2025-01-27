import React, { useState } from "react";
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
import PropTypes from "prop-types"; // Add this at the top
import { Chip } from "@mui/material";

const SalesCRMPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

  const [openDialog, setOpenDialog] = useState(false);
  const [currentEntity, setCurrentEntity] = useState({});
  const [dialogType, setDialogType] = useState("");

  // Table Columns Configuration
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

  // Custom Toolbar
  function CustomToolbar({ onAddClick }) {
    return (
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
  }
  CustomToolbar.propTypes = {
    onAddClick: PropTypes.func.isRequired,
  };

  // Handlers
  const handleEdit = (entity, type) => {
    setCurrentEntity(entity);
    setDialogType(type);
    setOpenDialog(true);
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

  const handleSave = () => {
    if (dialogType === "Account") {
      setAccounts(accounts.map((acc) => (acc.id === currentEntity.id ? currentEntity : acc)));
    } else {
      setCompanies(companies.map((comp) => (comp.id === currentEntity.id ? currentEntity : comp)));
    }
    setOpenDialog(false);
  };

  return (
    <Box
      sx={{
        p: isMobile ? 1 : 3,
        marginLeft: { xs: 0, md: "280px" },
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
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
                        id: accounts.length + 1,
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
              sx={{
                border: "none",
                "& .MuiDataGrid-cell:hover": {
                  color: theme.palette.primary.main,
                },
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
                        id: companies.length + 1,
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
              sx={{
                border: "none",
                "& .MuiDataGrid-cell:hover": {
                  color: theme.palette.primary.main,
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Universal Edit/Add Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullScreen={isMobile}>
        <DialogTitle>
          {currentEntity.id ? `Edit ${dialogType}` : `Add New ${dialogType}`}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label={`${dialogType} Name`}
            value={currentEntity.name || ""}
            onChange={(e) => setCurrentEntity({ ...currentEntity, name: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Contact Person"
            value={currentEntity.contactPerson || ""}
            onChange={(e) => setCurrentEntity({ ...currentEntity, contactPerson: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            value={currentEntity.email || ""}
            onChange={(e) => setCurrentEntity({ ...currentEntity, email: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone"
            value={currentEntity.phone || ""}
            onChange={(e) => setCurrentEntity({ ...currentEntity, phone: e.target.value })}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Industry</InputLabel>
            <Select
              value={currentEntity.industry || ""}
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
              value={currentEntity.status || "Active"}
              onChange={(e) => setCurrentEntity({ ...currentEntity, status: e.target.value })}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.common.white,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            {currentEntity.id ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SalesCRMPage;

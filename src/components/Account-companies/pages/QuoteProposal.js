import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  Typography,
  Grid,
  TextField,
  Button,
  ButtonGroup,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Container,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  Snackbar,
  Divider,
  Avatar,
  Alert,
} from "@mui/material";
import {
  Search,
  Add,
  Edit,
  Delete,
  Visibility,
  ContentCopy,
  BarChart,
  MonetizationOn,
  Assignment,
  Business,
  Description,
} from "@mui/icons-material";
import { CSVLink } from "react-csv";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { format } from "date-fns";

const theme = createTheme({
  palette: {
    primary: { main: "#2B2D42" },
    secondary: { main: "#EF233C" },
    success: { main: "#4CAF50" },
    warning: { main: "#FFC107" },
    error: { main: "#D32F2F" },
    background: { default: "#F8F9FA" },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h4: { fontWeight: 700, letterSpacing: -0.5 },
    h6: { fontWeight: 600 },
  },
  components: {
    MuiCard: {
      styleOverrides: { root: { borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" } },
    },
  },
});

const QuoteProposalManagement = () => {
  const [state, setState] = useState({
    searchQuery: "",
    statusFilter: "all",
    page: 1,
    rowsPerPage: 5,
    openCreateDialog: false,
    openPreviewDialog: false,
    selectedQuote: null,
    snackbar: { open: false, message: "", severity: "success" },
  });

  const [quotes, setQuotes] = useState([
    {
      id: 1,
      client: { name: "Tech Corp", email: "tech@corp.com", phone: "+1 555 123 4567" },
      project: "Enterprise SaaS Platform",
      amount: 125000,
      status: "approved",
      created: "2024-03-15",
      expiry: "2024-04-15",
      items: [
        { description: "Frontend Development", quantity: 1, price: 75000 },
        { description: "Backend Development", quantity: 1, price: 50000 },
      ],
    },
    {
      id: 2,
      client: { name: "Design Studio", email: "hello@design.studio", phone: "+1 555 987 6543" },
      project: "E-commerce Website Redesign",
      amount: 45000,
      status: "pending",
      created: "2024-03-20",
      expiry: "2024-04-20",
      items: [
        { description: "UI/UX Design", quantity: 1, price: 25000 },
        { description: "Frontend Implementation", quantity: 1, price: 20000 },
      ],
    },
  ]);

  const [templates] = useState([
    {
      id: 1,
      name: "Software Development Proposal",
      content: "Custom software development services including...",
      category: "IT Services",
    },
    {
      id: 2,
      name: "Marketing Package Proposal",
      content: "Comprehensive digital marketing package including...",
      category: "Marketing",
    },
  ]);

  const stats = [
    { title: "Total Quotes", value: "24", icon: <Assignment />, color: "#2B2D42" },
    { title: "Revenue Potential", value: "$542K", icon: <MonetizationOn />, color: "#4CAF50" },
    { title: "Pending Approval", value: "5", icon: <BarChart />, color: "#FFC107" },
    { title: "Conversion Rate", value: "68%", icon: <Business />, color: "#EF233C" },
  ];

  const handleCreateQuote = (newQuote) => {
    setQuotes([...quotes, newQuote]);
    showSnackbar("Quote created successfully!", "success");
  };

  const showSnackbar = (message, severity) => {
    setState((prev) => ({
      ...prev,
      snackbar: { open: true, message, severity },
      openCreateDialog: false,
    }));
  };

  const filteredQuotes = quotes.filter(
    (quote) =>
      quote.client.name.toLowerCase().includes(state.searchQuery.toLowerCase()) &&
      (state.statusFilter === "all" || quote.status === state.statusFilter)
  );

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ py: 4 }}>
        {" "}
        {/* Set maxWidth to false */}
        {/* Dashboard Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ color: "primary.main" }}>
              Quote Management
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {format(new Date(), "MMMM d, yyyy")}
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setState((prev) => ({ ...prev, openCreateDialog: true }))}
          >
            New Quote
          </Button>
        </Box>
        {/* Stats Overview */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ p: 3, bgcolor: `${stat.color}10`, width: "100%" }}>
                {" "}
                {/* Ensure full width */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar sx={{ bgcolor: `${stat.color}20`, mr: 2, color: stat.color }}>
                    {stat.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      {stat.title}
                    </Typography>
                    <Typography variant="h5" fontWeight={700}>
                      {stat.value}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* Action Bar */}
        <Card sx={{ p: 3, mb: 4, width: "100%" }}>
          {" "}
          {/* Ensure full width */}
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search quotes..."
                InputProps={{ startAdornment: <Search /> }}
                onChange={(e) => setState((prev) => ({ ...prev, searchQuery: e.target.value }))}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={state.statusFilter}
                  onChange={(e) => setState((prev) => ({ ...prev, statusFilter: e.target.value }))}
                  label="Status"
                >
                  <MenuItem value="all">All Statuses</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2}>
              <CSVLink data={quotes} filename="quotes-export.csv">
                <Button fullWidth variant="outlined" startIcon={<Description />}>
                  Export CSV
                </Button>
              </CSVLink>
            </Grid>
          </Grid>
        </Card>
        {/* Quotes Table */}
        <Card sx={{ width: "100%" }}>
          {" "}
          {/* Ensure full width */}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Client</TableCell>
                <TableCell>Project</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Expiry</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredQuotes.map((quote) => (
                <TableRow key={quote.id} hover>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                        {quote.client.name[0]}
                      </Avatar>
                      <Box>
                        <Typography fontWeight={600}>{quote.client.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {quote.client.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{quote.project}</TableCell>
                  <TableCell align="right">${quote.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip
                      label={quote.status}
                      color={
                        quote.status === "approved"
                          ? "success"
                          : quote.status === "pending"
                          ? "warning"
                          : "error"
                      }
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{format(new Date(quote.created), "MMM dd, yyyy")}</TableCell>
                  <TableCell>{format(new Date(quote.expiry), "MMM dd, yyyy")}</TableCell>
                  <TableCell align="center">
                    <ButtonGroup variant="outlined">
                      <Tooltip title="Preview">
                        <IconButton>
                          <Visibility fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Duplicate">
                        <IconButton>
                          <ContentCopy fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton color="primary">
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton color="error">
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        {/* Create Quote Dialog */}
        <Dialog
          fullWidth
          maxWidth="md"
          open={state.openCreateDialog}
          onClose={() => setState((prev) => ({ ...prev, openCreateDialog: false }))}
        >
          <DialogTitle sx={{ borderBottom: "1px solid #eee", py: 3 }}>
            <Typography variant="h6">Create New Quote</Typography>
          </DialogTitle>
          <DialogContent sx={{ py: 4 }}>
            <QuoteCreationForm
              templates={templates}
              onCreate={handleCreateQuote}
              onCancel={() => setState((prev) => ({ ...prev, openCreateDialog: false }))}
            />
          </DialogContent>
        </Dialog>
        {/* Snackbar */}
        <Snackbar
          open={state.snackbar.open}
          autoHideDuration={6000}
          onClose={() =>
            setState((prev) => ({ ...prev, snackbar: { ...prev.snackbar, open: false } }))
          }
        >
          <Alert
            severity={state.snackbar.severity}
            sx={{ width: "100%" }}
            elevation={6}
            variant="filled"
          >
            {state.snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

// ... Rest of the code (QuoteCreationForm component and propTypes) remains the same ...

// ... Rest of the code (QuoteCreationForm component and propTypes) remains the same ...

const QuoteCreationForm = ({ onCreate, onCancel, templates }) => {
  const [formState, setFormState] = useState({
    client: { name: "", email: "", phone: "" },
    project: "",
    selectedTemplate: "",
    items: [],
    terms: "",
  });

  const handleSubmit = () => {
    if (!formState.client.name || !formState.project) {
      return;
    }
    onCreate({
      ...formState,
      id: Date.now(),
      status: "pending",
      created: new Date().toISOString(),
      expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    });
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
          Client Information
        </Typography>
        <TextField
          fullWidth
          label="Client Name"
          margin="normal"
          required
          value={formState.client.name}
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              client: { ...prev.client, name: e.target.value },
            }))
          }
        />
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          type="email"
          value={formState.client.email}
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              client: { ...prev.client, email: e.target.value },
            }))
          }
        />
        <TextField
          fullWidth
          label="Phone"
          margin="normal"
          value={formState.client.phone}
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              client: { ...prev.client, phone: e.target.value },
            }))
          }
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
          Proposal Details
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>Select Template</InputLabel>
          <Select
            value={formState.selectedTemplate}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, selectedTemplate: e.target.value }))
            }
            label="Select Template"
          >
            {templates.map((template) => (
              <MenuItem key={template.id} value={template.id}>
                {template.name} ({template.category})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Project Title"
          margin="normal"
          required
          value={formState.project}
          onChange={(e) => setFormState((prev) => ({ ...prev, project: e.target.value }))}
        />
        <TextField
          fullWidth
          label="Terms & Conditions"
          margin="normal"
          multiline
          rows={4}
          value={formState.terms}
          onChange={(e) => setFormState((prev) => ({ ...prev, terms: e.target.value }))}
        />
      </Grid>

      <Grid item xs={12}>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Create Quote
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

QuoteCreationForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  templates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default QuoteProposalManagement;

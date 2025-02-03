import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  CircularProgress,
} from "@mui/material";
import {
  Sync,
  SyncDisabled,
  CheckCircle,
  CalendarToday,
  Email,
  Settings,
  Build,
  Assignment,
} from "@mui/icons-material";

const Integrations = () => {
  const [selectedIntegration, setSelectedIntegration] = useState("");
  const [integrationStatus, setIntegrationStatus] = useState({
    email: false,
    calendar: false,
    thirdParty: false,
    erp: false,
    jotform: false,
  });
  const [jotformModalOpen, setJotformModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);

  const handleIntegrationChange = (integration) => {
    setIntegrationStatus((prev) => ({
      ...prev,
      [integration]: !prev[integration],
    }));
    alert(
      `${integration.charAt(0).toUpperCase() + integration.slice(1)} ${
        integrationStatus[integration] ? "disconnected" : "connected"
      } successfully!`
    );
  };

  const handleJotFormConnection = () => {
    if (integrationStatus.jotform) {
      setIntegrationStatus((prev) => ({ ...prev, jotform: false }));
      alert("JotForm disconnected successfully!");
    } else {
      setJotformModalOpen(true);
    }
  };

  const handleConnectJotForm = () => {
    if (!apiKey.trim()) {
      alert("Please enter your API key");
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIntegrationStatus((prev) => ({ ...prev, jotform: true }));
      setJotformModalOpen(false);
      setApiKey("");
      alert("JotForm connected successfully!");
    }, 2000);
  };

  return (
    <Box sx={{ p: 3, marginLeft: { xs: 0, sm: "280px" }, transition: "margin 0.3s" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333", mb: 3 }}>
        Integrations Management
      </Typography>

      <Grid container spacing={3}>
        {/* Integration Status */}
        <Grid item xs={12}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3, background: "#f9fafb" }}>
            <Typography variant="h6" sx={{ color: "#1976d2", mb: 2, fontWeight: 600 }}>
              Active Integrations
            </Typography>
            <Grid container spacing={2}>
              {/* Email Integration */}
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={integrationStatus.email}
                      onChange={() => handleIntegrationChange("email")}
                      color="success"
                    />
                  }
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Email sx={{ color: "#ea4335", mr: 1 }} />
                      <Typography variant="body1" fontWeight="500">
                        Email
                      </Typography>
                    </Box>
                  }
                />
              </Grid>

              {/* Calendar Integration */}
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={integrationStatus.calendar}
                      onChange={() => handleIntegrationChange("calendar")}
                      color="success"
                    />
                  }
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CalendarToday sx={{ color: "#4285f4", mr: 1 }} />
                      <Typography variant="body1" fontWeight="500">
                        Calendar
                      </Typography>
                    </Box>
                  }
                />
              </Grid>

              {/* Third-Party Tools */}
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={integrationStatus.thirdParty}
                      onChange={() => handleIntegrationChange("thirdParty")}
                      color="success"
                    />
                  }
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Settings sx={{ color: "#fbbc05", mr: 1 }} />
                      <Typography variant="body1" fontWeight="500">
                        Third-Party
                      </Typography>
                    </Box>
                  }
                />
              </Grid>

              {/* ERP Integration */}
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={integrationStatus.erp}
                      onChange={() => handleIntegrationChange("erp")}
                      color="success"
                    />
                  }
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Build sx={{ color: "#34a853", mr: 1 }} />
                      <Typography variant="body1" fontWeight="500">
                        ERP System
                      </Typography>
                    </Box>
                  }
                />
              </Grid>

              {/* JotForm Integration */}
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: integrationStatus.jotform ? "#e8f5e9" : "#f5f5f5",
                    transition: "all 0.3s",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Assignment
                      sx={{
                        color: integrationStatus.jotform ? "#4caf50" : "#757575",
                        mr: 1.5,
                      }}
                    />
                    <Typography variant="body1" fontWeight="500">
                      JotForm
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleJotFormConnection}
                    startIcon={
                      integrationStatus.jotform ? (
                        <CheckCircle fontSize="small" />
                      ) : (
                        <Sync fontSize="small" />
                      )
                    }
                    sx={{
                      textTransform: "none",
                      backgroundColor: integrationStatus.jotform ? "#4caf50" : "#1976d2",
                      "&:hover": {
                        backgroundColor: integrationStatus.jotform ? "#43a047" : "#1565c0",
                      },
                    }}
                  >
                    {integrationStatus.jotform ? "Connected" : "Connect"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        {/* JotForm Connection Dialog */}
        <Dialog
          open={jotformModalOpen}
          onClose={() => setJotformModalOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ bgcolor: "#1976d2", color: "#fff" }}>
            Connect JotForm Account
          </DialogTitle>
          <DialogContent sx={{ py: 4 }}>
            <Box textAlign="center" mb={3}>
              <img
                src="https://www.jotform.com/resources/assets/logo/jotform-logo-dark-800x200.png"
                alt="JotForm"
                style={{ height: 40 }}
              />
            </Box>
            <TextField
              fullWidth
              label="API Key"
              variant="outlined"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              sx={{ mb: 2 }}
              helperText="Find your API key in JotForm Account Settings"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleConnectJotForm}
              disabled={loading}
              sx={{ py: 1.5 }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
              ) : (
                "Authenticate & Connect"
              )}
            </Button>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
            <Button
              onClick={() => setJotformModalOpen(false)}
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              Cancel Setup
            </Button>
          </DialogActions>
        </Dialog>

        {/* Other Integration Configuration (Remaining code remains same) */}
        {/* ... */}
      </Grid>
    </Box>
  );
};

export default Integrations;

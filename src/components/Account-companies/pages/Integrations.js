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
} from "@mui/material";
import { Sync, CalendarToday, Email, Settings, Build } from "@mui/icons-material";

const Integrations = () => {
  const [selectedIntegration, setSelectedIntegration] = useState("");
  const [integrationStatus, setIntegrationStatus] = useState({
    email: false,
    calendar: false,
    thirdParty: false,
    erp: false,
  });

  const handleIntegrationChange = (integration) => {
    setIntegrationStatus((prevStatus) => ({
      ...prevStatus,
      [integration]: !prevStatus[integration],
    }));
    alert(
      `${integration.charAt(0).toUpperCase() + integration.slice(1)} ${
        integrationStatus[integration] ? "disconnected" : "connected"
      } successfully!`
    );
  };

  const handleIntegrationSetup = () => {
    if (selectedIntegration) {
      alert(`${selectedIntegration} integration setup initiated.`);
    } else {
      alert("Please select an integration to configure.");
    }
  };

  return (
    <Box sx={{ p: 3, marginLeft: "280px" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333", mb: 3 }}>
        Integrations Management
      </Typography>

      <Grid container spacing={3}>
        {/* Integration Status */}
        <Grid item xs={12}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ color: "#1976d2", mb: 2 }}>
              Current Integration Status
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={integrationStatus.email}
                      onChange={() => handleIntegrationChange("email")}
                      color="success"
                    />
                  }
                  label="Email Integration"
                  sx={{ "& .MuiFormControlLabel-label": { fontWeight: "bold" } }}
                />
                <Tooltip title="Sync with Gmail, Outlook, etc.">
                  <Email sx={{ color: "#28a745", fontSize: 30 }} />
                </Tooltip>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={integrationStatus.calendar}
                      onChange={() => handleIntegrationChange("calendar")}
                      color="success"
                    />
                  }
                  label="Calendar Integration"
                  sx={{ "& .MuiFormControlLabel-label": { fontWeight: "bold" } }}
                />
                <Tooltip title="Sync with Google Calendar, Outlook, etc.">
                  <CalendarToday sx={{ color: "#007bff", fontSize: 30 }} />
                </Tooltip>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={integrationStatus.thirdParty}
                      onChange={() => handleIntegrationChange("thirdParty")}
                      color="success"
                    />
                  }
                  label="Third-Party Tools"
                  sx={{ "& .MuiFormControlLabel-label": { fontWeight: "bold" } }}
                />
                <Tooltip title="Integrate with HubSpot, Mailchimp, etc.">
                  <Settings sx={{ color: "#ffc107", fontSize: 30 }} />
                </Tooltip>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={integrationStatus.erp}
                      onChange={() => handleIntegrationChange("erp")}
                      color="success"
                    />
                  }
                  label="ERP Integration"
                  sx={{ "& .MuiFormControlLabel-label": { fontWeight: "bold" } }}
                />
                <Tooltip title="Sync with ERP or accounting software.">
                  <Build sx={{ color: "#dc3545", fontSize: 30 }} />
                </Tooltip>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        {/* Integration Configuration */}
        <Grid item xs={12}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ color: "#1976d2", mb: 2 }}>
              Configure Integrations
            </Typography>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Select Integration</InputLabel>
              <Select
                value={selectedIntegration}
                onChange={(e) => setSelectedIntegration(e.target.value)}
              >
                <MenuItem value="Email">Email Integration</MenuItem>
                <MenuItem value="Calendar">Calendar Integration</MenuItem>
                <MenuItem value="Third-Party Tools">Third-Party Tools Integration</MenuItem>
                <MenuItem value="ERP">ERP Integration</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              startIcon={<Sync />}
              fullWidth
              sx={{
                backgroundColor: "#007bff",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#0056b3",
                },
              }}
              onClick={handleIntegrationSetup}
            >
              Configure Integration
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Integrations;

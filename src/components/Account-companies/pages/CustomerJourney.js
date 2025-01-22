import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  Button,
  TextField,
  Divider,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import { Call, Email, Event, PersonAdd } from "@mui/icons-material";

const CustomerJourneyMapping = () => {
  const [customerName, setCustomerName] = useState("");
  const [interaction, setInteraction] = useState("");
  const [journeyData, setJourneyData] = useState([]);
  const [personalizedMessage, setPersonalizedMessage] = useState("");

  const interactions = ["Call", "Email", "Meeting", "Follow-up"];

  const handleAddInteraction = () => {
    if (interaction && customerName) {
      setJourneyData([
        ...journeyData,
        {
          name: customerName,
          interaction,
          date: new Date().toLocaleDateString(),
        },
      ]);
      setInteraction("");
    }
  };

  const handleCreatePersonalizedMessage = () => {
    if (customerName) {
      setPersonalizedMessage(
        `Hello ${customerName}, based on your recent interactions with us, we are offering personalized solutions to enhance your experience.`
      );
    }
  };

  return (
    <Box sx={{ p: 3, marginLeft: "280px" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333", mb: 3 }}>
        Customer Journey Mapping
      </Typography>

      {/* Customer Interaction Form */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ color: "#1976d2", mb: 2 }}>
              Add Customer Interaction
            </Typography>

            <TextField
              label="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              label="Select Interaction"
              value={interaction}
              onChange={(e) => setInteraction(e.target.value)}
              select
              fullWidth
              SelectProps={{
                native: true,
              }}
              sx={{ mb: 3 }}
            >
              {interactions.map((interactionType) => (
                <option key={interactionType} value={interactionType}>
                  {interactionType}
                </option>
              ))}
            </TextField>

            <Button
              variant="contained"
              onClick={handleAddInteraction}
              sx={{
                mb: 3,
                backgroundColor: "#007bff",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#0056b3",
                },
              }}
            >
              Add Interaction
            </Button>
          </Card>
        </Grid>
      </Grid>

      {/* Journey Data & Personalized Experiences */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ color: "#1976d2", mb: 2 }}>
              Customer Interaction History
            </Typography>
            <List sx={{ maxHeight: 400, overflow: "auto" }}>
              {journeyData.map((entry, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar>
                      {entry.interaction === "Call" && <Call />}
                      {entry.interaction === "Email" && <Email />}
                      {entry.interaction === "Meeting" && <Event />}
                      {entry.interaction === "Follow-up" && <PersonAdd />}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${entry.interaction} with ${entry.name}`}
                    secondary={`Date: ${entry.date}`}
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ color: "#1976d2", mb: 2 }}>
              Personalized Experience
            </Typography>
            <Typography variant="body1">
              {personalizedMessage || "Create a personalized message for your customer."}
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#28a745",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#218838",
                },
              }}
              onClick={handleCreatePersonalizedMessage}
            >
              Generate Personalized Message
            </Button>
          </Card>
        </Grid>
      </Grid>

      {/* Journey Mapping Chip */}
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ color: "#1976d2", mb: 2 }}>
              Customer Journey Mapping
            </Typography>
            <Grid container spacing={2}>
              {journeyData.map((entry, index) => (
                <Grid item key={index}>
                  <Chip
                    label={entry.name}
                    color={entry.interaction === "Call" ? "primary" : "secondary"}
                    sx={{ fontSize: 16 }}
                  />
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerJourneyMapping;

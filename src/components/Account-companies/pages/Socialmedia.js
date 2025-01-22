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
  Paper,
} from "@mui/material";
import { LinkedIn, Facebook, Twitter, Instagram } from "@mui/icons-material";

const SocialMediaIntegration = () => {
  const [leadSource, setLeadSource] = useState("");
  const [engagementMessage, setEngagementMessage] = useState("");
  const [socialMentions, setSocialMentions] = useState([
    { platform: "LinkedIn", message: "Customer inquiry regarding our new product" },
    { platform: "Facebook", message: "Positive feedback about our service" },
  ]);

  const platforms = ["LinkedIn", "Facebook", "Twitter", "Instagram"];

  const handleCaptureLead = () => {
    if (leadSource) {
      setSocialMentions([
        ...socialMentions,
        {
          platform: leadSource,
          message: `${leadSource} lead captured.`,
        },
      ]);
      setLeadSource("");
    }
  };

  const handleEngagementTracking = () => {
    setEngagementMessage("Tracking engagement from various social platforms...");
  };

  return (
    <Box sx={{ p: 3, marginLeft: "280px" }}>
      <Typography variant="h4" sx={{ fontWeight: "600", color: "#333", mb: 4 }}>
        Social Media Integration
      </Typography>

      {/* Lead Capture Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h6" sx={{ color: "#1976d2", mb: 2 }}>
              Capture Lead from Social Media
            </Typography>

            <TextField
              label="Select Platform"
              value={leadSource}
              onChange={(e) => setLeadSource(e.target.value)}
              select
              fullWidth
              SelectProps={{
                native: true,
              }}
              sx={{ mb: 2 }}
            >
              {platforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </TextField>

            <Button
              variant="contained"
              onClick={handleCaptureLead}
              sx={{
                width: "100%",
                backgroundColor: "#28a745",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#218838",
                },
              }}
            >
              Capture Lead
            </Button>
          </Card>
        </Grid>

        {/* Social Mentions */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, borderRadius: 2, boxShadow: 2, mb: 3 }}>
            <Typography variant="h6" sx={{ color: "#1976d2", mb: 2 }}>
              Social Media Mentions
            </Typography>
            <List sx={{ maxHeight: 400, overflow: "auto" }}>
              {socialMentions.map((mention, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar>
                      {mention.platform === "LinkedIn" && <LinkedIn />}
                      {mention.platform === "Facebook" && <Facebook />}
                      {mention.platform === "Twitter" && <Twitter />}
                      {mention.platform === "Instagram" && <Instagram />}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${mention.platform}: ${mention.message}`}
                    secondary={`Date: ${new Date().toLocaleDateString()}`}
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>

      {/* Engagement Tracking Section */}
      <Grid container spacing={3} sx={{ mt: 5 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, borderRadius: 2, boxShadow: 2, mb: 3 }}>
            <Typography variant="h6" sx={{ color: "#1976d2", mb: 2 }}>
              Social Media Engagement Tracking
            </Typography>
            <Paper
              sx={{
                p: 3,
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                boxShadow: 1,
                textAlign: "center",
              }}
            >
              <Typography variant="body1" sx={{ mb: 2 }}>
                {engagementMessage || "Track interactions and engagement from various platforms."}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                }}
                onClick={handleEngagementTracking}
              >
                Start Tracking
              </Button>
            </Paper>
          </Card>
        </Grid>
      </Grid>

      {/* Social Media Engagement Stats */}
      <Grid container spacing={3} sx={{ mt: 5 }}>
        <Grid item xs={12}>
          <Card sx={{ p: 3, borderRadius: 2, boxShadow: 2, mb: 3 }}>
            <Typography variant="h6" sx={{ color: "#1976d2", mb: 2 }}>
              Social Media Engagement Stats
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {socialMentions.map((mention, index) => (
                <Chip
                  key={index}
                  label={`${mention.platform} - ${mention.message}`}
                  color={mention.platform === "LinkedIn" ? "primary" : "secondary"}
                  icon={
                    <Avatar>{mention.platform === "LinkedIn" ? <LinkedIn /> : <Facebook />}</Avatar>
                  }
                  sx={{ fontSize: 14, borderRadius: 4 }}
                />
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SocialMediaIntegration;

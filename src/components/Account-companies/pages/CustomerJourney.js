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
  LinearProgress,
  Fade,
  Zoom,
  InputAdornment,
  MenuItem,
  TextareaAutosize,
  Badge,
} from "@mui/material";
import {
  Call,
  Email,
  Event,
  PersonAdd,
  Timeline,
  AccountCircle,
  Comment,
  InsertEmoticon,
  Assessment,
  Schedule,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "16px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const TimelineConnector = styled("div")(({ theme }) => ({
  width: "40px",
  height: "2px",
  backgroundColor: theme.palette.primary.main,
  margin: "0 8px",
}));

const CustomerJourneyMapping = () => {
  const [customerName, setCustomerName] = useState("");
  const [interaction, setInteraction] = useState("");
  const [journeyData, setJourneyData] = useState([]);
  const [personalizedMessage, setPersonalizedMessage] = useState("");

  const interactions = [
    { type: "Call", icon: <Call />, color: "#4CAF50" },
    { type: "Email", icon: <Email />, color: "#2196F3" },
    { type: "Meeting", icon: <Event />, color: "#9C27B0" },
    { type: "Follow-up", icon: <PersonAdd />, color: "#FF9800" },
  ];

  const handleAddInteraction = () => {
    if (interaction && customerName) {
      setJourneyData([
        ...journeyData,
        {
          name: customerName,
          interaction,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
        },
      ]);
      setInteraction("");
    }
  };

  const handleCreatePersonalizedMessage = () => {
    if (customerName) {
      setPersonalizedMessage(
        `Hello ${customerName}, based on your recent interactions with us, we're excited to offer personalized solutions tailored to your needs. Let's discuss how we can enhance your experience!`
      );
    }
  };

  const getInteractionColor = (type) => {
    return interactions.find((i) => i.type === type)?.color || "#666";
  };

  return (
    <Box sx={{ p: 4, marginLeft: { xs: 0, md: "280px" }, background: "#f9fafc" }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: 800, color: "#2d3748", display: "flex", alignItems: "center" }}
        >
          <Timeline sx={{ fontSize: 48, mr: 2, color: "#4A90E2" }} />
          Customer Journey Mapping
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={3}>
            <StyledCard
              sx={{ p: 2, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
            >
              <Typography variant="h6" sx={{ color: "white" }}>
                Total Interactions
              </Typography>
              <Typography variant="h2" sx={{ color: "white", fontWeight: 800 }}>
                {journeyData.length}
              </Typography>
              <Assessment sx={{ fontSize: 48, color: "rgba(255,255,255,0.2)", float: "right" }} />
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={3}>
            <StyledCard sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ color: "#718096" }}>
                Last Interaction
              </Typography>
              <Typography variant="h4" sx={{ color: "#2d3748", fontWeight: 700 }}>
                {journeyData.length > 0
                  ? `${journeyData[journeyData.length - 1].interaction}`
                  : "N/A"}
              </Typography>
              <Schedule sx={{ fontSize: 48, color: "#CBD5E0", float: "right" }} />
            </StyledCard>
          </Grid>
        </Grid>
      </Box>

      {/* Customer Interaction Form */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <StyledCard sx={{ p: 3 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mb: 3, display: "flex", alignItems: "center" }}
            >
              <AccountCircle sx={{ mr: 1, fontSize: 32, color: "#4A90E2" }} />
              Add New Interaction
            </Typography>

            <TextField
              fullWidth
              label="Customer Name"
              variant="outlined"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              select
              fullWidth
              label="Select Interaction Type"
              value={interaction}
              onChange={(e) => setInteraction(e.target.value)}
              sx={{ mb: 3 }}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Comment />
                  </InputAdornment>
                ),
              }}
            >
              {interactions.map((option) => (
                <MenuItem key={option.type} value={option.type}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        background: option.color,
                        borderRadius: "4px",
                        mr: 2,
                      }}
                    />
                    {option.type}
                  </Box>
                </MenuItem>
              ))}
            </TextField>

            <Button
              fullWidth
              variant="contained"
              onClick={handleAddInteraction}
              disabled={!customerName || !interaction}
              sx={{
                py: 2,
                fontSize: 16,
                background: "linear-gradient(45deg, #4F46E5 0%, #8B5CF6 100%)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 5px 15px rgba(79,70,229,0.3)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Add Interaction
            </Button>
          </StyledCard>
        </Grid>

        {/* Customer Journey Timeline */}
        <Grid item xs={12} sx={{ mt: 4 }}>
          <StyledCard sx={{ p: 3 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mb: 3, display: "flex", alignItems: "center" }}
            >
              <Timeline sx={{ mr: 1, fontSize: 32, color: "#4A90E2" }} />
              Interaction Timeline
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", overflowX: "auto", py: 2 }}>
              {journeyData.map((entry, index) => (
                <Fade in key={index}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ textAlign: "center" }}>
                      <Avatar
                        sx={{
                          bgcolor: getInteractionColor(entry.interaction),
                          width: 56,
                          height: 56,
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                      >
                        {interactions.find((i) => i.type === entry.interaction)?.icon}
                      </Avatar>
                      <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
                        {entry.interaction}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#718096" }}>
                        {entry.date}
                      </Typography>
                    </Box>
                    {index < journeyData.length - 1 && <TimelineConnector />}
                  </Box>
                </Fade>
              ))}
              {journeyData.length === 0 && (
                <Box sx={{ width: "100%", textAlign: "center", py: 4 }}>
                  <Typography variant="h6" sx={{ color: "#CBD5E0" }}>
                    No interactions recorded yet
                  </Typography>
                </Box>
              )}
            </Box>
          </StyledCard>
        </Grid>

        {/* Personalized Experience Section */}
        <Grid item xs={12} md={4}>
          <StyledCard sx={{ p: 3, height: "100%" }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mb: 3, display: "flex", alignItems: "center" }}
            >
              <InsertEmoticon sx={{ mr: 1, fontSize: 32, color: "#4A90E2" }} />
              Personalized Engagement
            </Typography>

            <TextareaAutosize
              minRows={4}
              value={personalizedMessage}
              onChange={(e) => setPersonalizedMessage(e.target.value)}
              placeholder="Create personalized message..."
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "8px",
                border: "2px solid #E2E8F0",
                fontFamily: "inherit",
                fontSize: "16px",
                marginBottom: "16px",
                resize: "vertical",
              }}
            />

            <Button
              fullWidth
              variant="outlined"
              onClick={handleCreatePersonalizedMessage}
              sx={{
                py: 1.5,
                borderColor: "#E2E8F0",
                color: "#4A90E2",
                "&:hover": {
                  borderColor: "#4A90E2",
                  backgroundColor: "rgba(74,144,226,0.05)",
                },
              }}
            >
              Generate Message
            </Button>

            <Typography variant="body2" sx={{ mt: 2, color: "#718096" }}>
              Quick suggestions:
              <Box sx={{ mt: 1 }}>
                <Chip
                  label="Follow-up request"
                  onClick={() =>
                    setPersonalizedMessage(
                      `Hi ${customerName}, just wanted to follow up on our recent conversation...`
                    )
                  }
                  sx={{ mr: 1, cursor: "pointer" }}
                />
                <Chip
                  label="Special offer"
                  onClick={() =>
                    setPersonalizedMessage(
                      `Dear ${customerName}, we've prepared an exclusive offer based on your interactions...`
                    )
                  }
                  sx={{ cursor: "pointer" }}
                />
              </Box>
            </Typography>
          </StyledCard>
        </Grid>

        {/* Interaction History */}
        <Grid item xs={12} md={8}>
          <StyledCard sx={{ p: 3 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mb: 3, display: "flex", alignItems: "center" }}
            >
              <Assessment sx={{ mr: 1, fontSize: 32, color: "#4A90E2" }} />
              Interaction History
            </Typography>

            <List sx={{ maxHeight: 400, overflow: "auto" }}>
              {journeyData.map((entry, index) => (
                <Zoom in key={index}>
                  <ListItem
                    sx={{
                      mb: 1,
                      borderRadius: "8px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#F8FAFC",
                        transform: "translateX(5px)",
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        badgeContent={
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              background: getInteractionColor(entry.interaction),
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                            }}
                          >
                            {index + 1}
                          </Box>
                        }
                      >
                        <Avatar sx={{ bgcolor: getInteractionColor(entry.interaction) }}>
                          {interactions.find((i) => i.type === entry.interaction)?.icon}
                        </Avatar>
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {entry.interaction} with {entry.name}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" sx={{ color: "#718096" }}>
                          {entry.date} at {entry.time}
                        </Typography>
                      }
                    />
                  </ListItem>
                </Zoom>
              ))}
              {journeyData.length === 0 && (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <Typography variant="body1" sx={{ color: "#CBD5E0" }}>
                    No interactions recorded yet
                  </Typography>
                </Box>
              )}
            </List>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerJourneyMapping;

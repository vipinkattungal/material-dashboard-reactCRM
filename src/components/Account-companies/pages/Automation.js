import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Settings, PlayArrow, TaskAlt } from "@mui/icons-material";

const AutomationWorkflows = () => {
  const [workflowName, setWorkflowName] = useState("");
  const [triggerEvent, setTriggerEvent] = useState("");
  const [actions, setActions] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const availableActions = ["Send Email", "Assign Task", "Update Record", "Send Notification"];

  const handleAddAction = () => {
    if (triggerEvent && actions.length < 3) {
      setActions([...actions, triggerEvent]);
      setTriggerEvent("");
    }
  };

  const handleCreateWorkflow = () => {
    if (workflowName && actions.length) {
      alert(`Workflow "${workflowName}" created successfully!`);
      setWorkflowName("");
      setActions([]);
    } else {
      alert("Please fill in all fields to create a workflow.");
    }
  };

  return (
    <Box sx={{ p: 3, marginLeft: "280px" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333", mb: 3 }}>
        Automation & Workflows
      </Typography>

      <Grid container spacing={3}>
        {/* Workflow List */}
        <Grid item xs={12}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ color: "#1976d2", mb: 2 }}>
              Existing Workflows
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    p: 2,
                    textAlign: "center",
                    backgroundColor: "#f8f9fa",
                    borderRadius: 2,
                    boxShadow: 1,
                  }}
                >
                  <PlayArrow sx={{ fontSize: 40, color: "#28a745" }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
                    Lead Follow-Up Workflow
                  </Typography>
                  <Typography variant="body2">
                    Triggers an email and assigns a task for follow-ups.
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    p: 2,
                    textAlign: "center",
                    backgroundColor: "#f8f9fa",
                    borderRadius: 2,
                    boxShadow: 1,
                  }}
                >
                  <TaskAlt sx={{ fontSize: 40, color: "#ffc107" }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
                    Task Assignment Workflow
                  </Typography>
                  <Typography variant="body2">
                    Assigns tasks automatically based on team availability.
                  </Typography>
                </Card>
              </Grid>
              {/* Add more workflows as needed */}
            </Grid>
          </Card>
        </Grid>

        {/* Workflow Configuration */}
        <Grid item xs={12}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ color: "#1976d2", mb: 2 }}>
              Create New Workflow
            </Typography>

            <TextField
              fullWidth
              label="Workflow Name"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              sx={{ mb: 3 }}
            />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Trigger Event</InputLabel>
                  <Select value={triggerEvent} onChange={(e) => setTriggerEvent(e.target.value)}>
                    <MenuItem value="Lead Created">Lead Created</MenuItem>
                    <MenuItem value="Email Opened">Email Opened</MenuItem>
                    <MenuItem value="Task Completed">Task Completed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  onClick={handleAddAction}
                  sx={{
                    height: "56px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#0056b3",
                    },
                  }}
                >
                  Add Action
                </Button>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Selected Actions:
              </Typography>
              {actions.length ? (
                actions.map((action, index) => (
                  <Typography key={index} variant="body2" sx={{ ml: 2 }}>
                    - {action}
                  </Typography>
                ))
              ) : (
                <Typography variant="body2" sx={{ ml: 2 }}>
                  No actions added yet.
                </Typography>
              )}
            </Box>

            <Button
              variant="contained"
              fullWidth
              onClick={handleCreateWorkflow}
              sx={{
                mt: 3,
                backgroundColor: "#28a745",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#218838",
                },
              }}
            >
              Create Workflow
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AutomationWorkflows;

import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Bar } from "react-chartjs-2";
import { Timeline, TimelineItem } from "@mui/lab";
import { AccessTime, Assignment, CheckCircle, Event, NoteAdd } from "@mui/icons-material";

const TaskActivityModule = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Follow up with client",
      dueDate: "2025-01-25",
      priority: "High",
      status: "Pending",
      assignedTo: "John Doe",
    },
    {
      id: 2,
      name: "Prepare sales report",
      dueDate: "2025-01-22",
      priority: "Medium",
      status: "Completed",
      assignedTo: "Jane Smith",
    },
  ]);

  const [activities, setActivities] = useState([
    {
      id: 1,
      type: "Meeting",
      title: "Project Kickoff",
      date: "2025-01-22",
      description: "Discuss project goals with the client.",
    },
    {
      id: 2,
      type: "Call",
      title: "Follow-up Call",
      date: "2025-01-23",
      description: "Follow up with the prospect for feedback.",
    },
  ]);

  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [newTask, setNewTask] = useState({
    name: "",
    dueDate: "",
    priority: "",
    assignedTo: "",
    status: "Pending",
  });

  const handleAddTask = () => {
    setTasks([...tasks, { id: tasks.length + 1, ...newTask }]);
    setNewTask({ name: "", dueDate: "", priority: "", assignedTo: "", status: "Pending" });
    setOpenTaskDialog(false);
  };

  const taskColumns = [
    { field: "name", headerName: "Task Name", width: 200 },
    { field: "dueDate", headerName: "Due Date", width: 150 },
    { field: "priority", headerName: "Priority", width: 120 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "assignedTo", headerName: "Assigned To", width: 150 },
  ];

  return (
    <Box sx={{ p: 3, marginLeft: "280px", display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Task Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Tasks
          </Typography>
          <Button
            variant="contained"
            startIcon={<NoteAdd />}
            onClick={() => setOpenTaskDialog(true)}
            sx={{
              mb: 2,
              backgroundColor: "#28a745",
              color: "#fff", // Ensure the text color is white
              "&:hover": {
                backgroundColor: "#218838",
              },
            }}
          >
            Add Task
          </Button>
          <DataGrid rows={tasks} columns={taskColumns} autoHeight disableSelectionOnClick />
        </CardContent>
      </Card>

      {/* Activity Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Activities
          </Typography>
          <Timeline position="alternate">
            {activities.map((activity) => (
              <TimelineItem key={activity.id}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {activity.type === "Meeting" && <Event sx={{ color: "#2196f3", fontSize: 30 }} />}
                  {activity.type === "Call" && (
                    <AccessTime sx={{ color: "#4caf50", fontSize: 30 }} />
                  )}
                  <Typography sx={{ ml: 2, fontWeight: "bold", fontSize: 16 }}>
                    {activity.title}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ ml: 5, color: "gray", fontSize: 14 }}>
                  {activity.date} - {activity.description}
                </Typography>
              </TimelineItem>
            ))}
          </Timeline>
        </CardContent>
      </Card>

      {/* Analytics Section */}
      {/* <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Reports & Analytics
          </Typography>
          <Bar
            data={{
              labels: ["Pending", "Completed"],
              datasets: [
                {
                  label: "Tasks Status",
                  data: [
                    tasks.filter((task) => task.status === "Pending").length,
                    tasks.filter((task) => task.status === "Completed").length,
                  ],
                  backgroundColor: ["#f44336", "#4caf50"],
                  borderColor: ["#f44336", "#4caf50"],
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "top",
                },
                tooltip: {
                  enabled: true,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1,
                  },
                },
              },
            }}
            height={200}
          />
        </CardContent>
      </Card> */}

      {/* Add Task Dialog */}
      <Dialog open={openTaskDialog} onClose={() => setOpenTaskDialog(false)}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Task Name"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            type="date"
            label="Due Date"
            InputLabelProps={{ shrink: true }}
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Priority</InputLabel>
            <Select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Assigned To"
            value={newTask.assignedTo}
            onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTaskDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddTask}
            sx={{
              mb: 2,
              backgroundColor: "#28a745",
              color: "#fff", // Ensure the text color is white
              "&:hover": {
                backgroundColor: "#218838",
              },
            }}
          >
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskActivityModule;

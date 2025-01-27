import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  Tabs,
  Tab,
  useTheme,
} from "@mui/material";
import {
  AddCircle,
  Close,
  Search,
  InsertDriveFile,
  Schedule,
  Email, // Replaced Template with Email
  Delete,
  ContentCopy,
  TextFields,
} from "@mui/icons-material";
import { Editor } from "@tinymce/tinymce-react";

const EmailAndCommunicationModule = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [openTemplateDialog, setOpenTemplateDialog] = useState(false);
  const [emailTemplates, setEmailTemplates] = useState([
    {
      id: 1,
      name: "Welcome Email",
      subject: "Welcome to Our Service!",
      body: "<p>Dear {name},</p><p>Welcome to our platform!</p>",
      category: "Onboarding",
      variables: ["name", "email"],
      lastUsed: "2023-10-15",
    },
  ]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    subject: "",
    body: "",
    category: "",
    variables: [],
  });

  const editorConfig = {
    height: 300,
    menubar: false,
    plugins: [
      "advlist autolink lists link image charmap print preview anchor",
      "searchreplace visualblocks code fullscreen",
      "insertdatetime media table paste code help wordcount",
    ],
    toolbar:
      "undo redo | formatselect | bold italic | \
      alignleft aligncenter alignright | \
      bullist numlist outdent indent | help",
    apiKey: "your-tinymce-api-key", // Replace with your TinyMCE API key
  };

  const templateCategories = [
    { name: "Onboarding", color: theme.palette.primary.main },
    { name: "Follow-Up", color: theme.palette.success.main },
    { name: "Promotional", color: theme.palette.warning.main },
    { name: "Transactional", color: theme.palette.error.main },
  ];

  const TemplateGallery = () => (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {emailTemplates.map((template) => (
        <Grid item xs={12} md={4} key={template.id}>
          <Card
            sx={{
              borderLeft: `4px solid ${
                templateCategories.find((c) => c.name === template.category)?.color
              }`,
              cursor: "pointer",
              "&:hover": { boxShadow: theme.shadows[3] },
            }}
            onClick={() => setSelectedTemplate(template)}
          >
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="subtitle1">{template.name}</Typography>
                <Chip
                  label={template.category}
                  size="small"
                  sx={{
                    backgroundColor:
                      templateCategories.find((c) => c.name === template.category)?.color + "20",
                    color: templateCategories.find((c) => c.name === template.category)?.color,
                  }}
                />
              </Box>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                {template.subject}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Chip
                  icon={<TextFields />}
                  label={`${template.variables.length} Variables`}
                  size="small"
                />
                <Typography variant="caption" color="textSecondary">
                  Last used: {template.lastUsed}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const TemplatePreview = () => (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6">{selectedTemplate.name}</Typography>
          <Box>
            <IconButton onClick={() => navigator.clipboard.writeText(selectedTemplate.body)}>
              <ContentCopy />
            </IconButton>
            <IconButton
              onClick={() =>
                setEmailTemplates(emailTemplates.filter((t) => t.id !== selectedTemplate.id))
              }
            >
              <Delete color="error" />
            </IconButton>
          </Box>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Subject:
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {selectedTemplate.subject}
        </Typography>

        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Variables:
        </Typography>
        <Box sx={{ mb: 2 }}>
          {selectedTemplate.variables.map((variable, index) => (
            <Chip
              key={index}
              label={`{${variable}}`}
              size="small"
              sx={{ mr: 1, backgroundColor: theme.palette.info.light }}
            />
          ))}
        </Box>

        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Preview:
        </Typography>
        <div dangerouslySetInnerHTML={{ __html: selectedTemplate.body }} />
      </CardContent>
    </Card>
  );

  const handleCreateTemplate = () => {
    const template = {
      id: emailTemplates.length + 1,
      ...newTemplate,
      lastUsed: new Date().toISOString().split("T")[0],
    };
    setEmailTemplates([...emailTemplates, template]);
    setOpenTemplateDialog(false);
    setNewTemplate({
      name: "",
      subject: "",
      body: "",
      category: "",
      variables: [],
    });
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#f8f9fa", marginLeft: "280px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Email Communications
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddCircle />}
          onClick={() => setOpenDialog(true)}
          sx={{ backgroundColor: theme.palette.success.main }}
        >
          New Campaign
        </Button>
      </Box>

      <Tabs value={selectedTab} onChange={(e, newVal) => setSelectedTab(newVal)} sx={{ mb: 3 }}>
        <Tab label="Email Templates" icon={<Email />} /> {/* Replaced Template with Email */}
        <Tab label="Scheduled Emails" icon={<Schedule />} />
        <Tab label="Email Analytics" icon={<InsertDriveFile />} />
      </Tabs>

      {selectedTab === 0 && (
        <Card sx={{ p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h5">Email Templates</Typography>
            <Button
              variant="outlined"
              startIcon={<AddCircle />}
              onClick={() => setOpenTemplateDialog(true)}
            >
              New Template
            </Button>
          </Box>

          {selectedTemplate ? (
            <TemplatePreview />
          ) : (
            <>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search templates..."
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1 }} />,
                }}
              />
              <TemplateGallery />
            </>
          )}
        </Card>
      )}

      <Dialog
        open={openTemplateDialog}
        fullWidth
        maxWidth="md"
        onClose={() => setOpenTemplateDialog(false)}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          Create New Email Template
          <IconButton onClick={() => setOpenTemplateDialog(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  value={newTemplate.category}
                  onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
                >
                  {templateCategories.map((category) => (
                    <MenuItem key={category.name} value={category.name}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Template Name"
                sx={{ mb: 2 }}
                value={newTemplate.name}
                onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
              />
              <TextField
                fullWidth
                label="Email Subject"
                sx={{ mb: 2 }}
                value={newTemplate.subject}
                onChange={(e) => setNewTemplate({ ...newTemplate, subject: e.target.value })}
              />
              <TextField
                fullWidth
                label="Variables (comma separated)"
                placeholder="name,email,company"
                sx={{ mb: 2 }}
                value={newTemplate.variables.join(",")}
                onChange={(e) =>
                  setNewTemplate({
                    ...newTemplate,
                    variables: e.target.value.split(",").map((v) => v.trim()),
                  })
                }
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Email Body:
              </Typography>
              <Editor
                init={editorConfig}
                value={newTemplate.body}
                onEditorChange={(content) => setNewTemplate({ ...newTemplate, body: content })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleCreateTemplate}>
            Save Template
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialog} fullWidth maxWidth="md" onClose={() => setOpenDialog(false)}>
        <DialogTitle>Compose New Email</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <List>
                <ListItem button>
                  <ListItemText primary="Select Template" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Add Variables" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Attachments" />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={9}>
              <TextField fullWidth label="Subject" sx={{ mb: 2 }} />
              <Editor init={editorConfig} initialValue="<p>Compose your email here...</p>" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined">Schedule</Button>
          <Button variant="contained" color="primary">
            Send Now
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmailAndCommunicationModule;

import React, { useState } from "react";
import {
  Button,
  Modal,
  TextField,
  Box,
  Typography,
  IconButton,
  Grid,
  Card,
  CardContent,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Slider,
  Tabs,
  Tab,
  Switch,
} from "@mui/material";
import {
  Add,
  Delete,
  Edit,
  Close,
  Settings,
  Image,
  Link,
  Star,
  CloudUpload,
  Category,
  Description,
  AttachMoney,
  Inventory,
  Title,
  Contacts,
  CorporateFare,
  TextFields,
  PhotoLibrary,
  Visibility,
  Public,
} from "@mui/icons-material";

const WebsiteManagementModule = () => {
  const [openModal, setOpenModal] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [websiteData, setWebsiteData] = useState({
    logo: "current-logo.jpg",
    title: "My Business",
    contactInfo: {
      address: "123 Main St, City",
      phone: "+1 234 567 890",
      email: "info@business.com",
    },
    missionVision: {
      mission: "Our mission statement...",
      vision: "Our vision statement...",
    },
    banners: [{ id: 1, title: "Summer Sale", image: "banner1.jpg", link: "/sales" }],
    reviews: [{ id: 1, author: "Customer 1", rating: 5, text: "Great service!" }],
    socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
    },
  });

  const handleTabChange = (event, newValue) => setTabValue(newValue);

  const handleOpenModal = (modalType) => setOpenModal(modalType);
  const handleCloseModal = () => setOpenModal(null);

  const renderModalContent = () => {
    switch (openModal) {
      case "logo":
        return (
          <>
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Avatar
                src={websiteData.logo}
                sx={{ width: 150, height: 150, mx: "auto" }}
                variant="square"
              />
              <Typography variant="caption">Current Logo</Typography>
            </Box>
            <Button variant="contained" component="label" startIcon={<CloudUpload />} fullWidth>
              Upload New Logo
              <input type="file" hidden />
            </Button>
            <FormControlLabel control={<Switch />} label="Enable Transparent Logo" sx={{ mt: 2 }} />
          </>
        );

      case "title":
        return (
          <TextField
            fullWidth
            label="Website Title"
            value={websiteData.title}
            onChange={(e) => setWebsiteData({ ...websiteData, title: e.target.value })}
          />
        );

      case "contactInfo":
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Address"
                value={websiteData.contactInfo.address}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={websiteData.contactInfo.phone}
                type="tel"
              />
              <TextField
                fullWidth
                label="Email"
                value={websiteData.contactInfo.email}
                type="email"
                sx={{ mt: 2 }}
              />
            </Grid>
          </Grid>
        );

      case "missionVision":
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Mission Statement"
                value={websiteData.missionVision.mission}
                multiline
                rows={6}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Vision Statement"
                value={websiteData.missionVision.vision}
                multiline
                rows={6}
              />
            </Grid>
          </Grid>
        );

      case "banner":
        return (
          <>
            <TextField fullWidth label="Banner Title" sx={{ mb: 2 }} />
            <TextField fullWidth label="Banner Subtitle" sx={{ mb: 2 }} />
            <TextField fullWidth label="Link URL" sx={{ mb: 2 }} />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Position</InputLabel>
              <Select label="Position">
                <MenuItem value="homepage-top">Homepage Top</MenuItem>
                <MenuItem value="product-page">Product Page</MenuItem>
                <MenuItem value="category-page">Category Page</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUpload />}
              sx={{ mb: 2 }}
            >
              Upload Banner Image
              <input type="file" hidden />
            </Button>
          </>
        );

      case "socialMedia":
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Facebook URL"
                value={websiteData.socialLinks.facebook}
                InputProps={{ startAdornment: <Public sx={{ mr: 1 }} /> }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Twitter URL"
                value={websiteData.socialLinks.twitter}
                InputProps={{ startAdornment: <Public sx={{ mr: 1 }} /> }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Instagram URL"
                value={websiteData.socialLinks.instagram}
                InputProps={{ startAdornment: <Public sx={{ mr: 1 }} /> }}
              />
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Box p={4} sx={{ marginLeft: { xs: 0, md: "280px" }, transition: "margin 0.3s" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#1a237e" }}>
        Website Management Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Logo & Title Management */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                <Image sx={{ mr: 1 }} /> Brand Identity
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Image />}
                    onClick={() => handleOpenModal("logo")}
                  >
                    Update Logo
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Title />}
                    onClick={() => handleOpenModal("title")}
                  >
                    Update Title
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                <Contacts sx={{ mr: 1 }} /> Contact Information
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Address" secondary={websiteData.contactInfo.address} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Phone" secondary={websiteData.contactInfo.phone} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Email" secondary={websiteData.contactInfo.email} />
                </ListItem>
              </List>
              <Button
                fullWidth
                variant="contained"
                startIcon={<Edit />}
                onClick={() => handleOpenModal("contactInfo")}
              >
                Edit Contact Info
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Mission & Vision */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                <Visibility sx={{ mr: 1 }} /> Mission & Vision
              </Typography>
              <Typography variant="body2" paragraph>
                {websiteData.missionVision.mission}
              </Typography>
              <Typography variant="body2">{websiteData.missionVision.vision}</Typography>
              <Button
                fullWidth
                variant="contained"
                startIcon={<Edit />}
                onClick={() => handleOpenModal("missionVision")}
                sx={{ mt: 2 }}
              >
                Edit Mission & Vision
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Banners Management */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                <PhotoLibrary sx={{ mr: 1 }} /> Banners
              </Typography>
              <Grid container spacing={2}>
                {websiteData.banners.map((banner) => (
                  <Grid item xs={12} key={banner.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box display="flex" alignItems="center">
                          <Avatar
                            src={banner.image}
                            variant="square"
                            sx={{ width: 80, height: 40, mr: 2 }}
                          />
                          <Box>
                            <Typography variant="subtitle1">{banner.title}</Typography>
                            <Typography variant="caption">{banner.link}</Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Button
                fullWidth
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleOpenModal("banner")}
                sx={{ mt: 2 }}
              >
                Add New Banner
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Social Media Links */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                <Public sx={{ mr: 1 }} /> Social Media
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Facebook"
                    secondary={websiteData.socialLinks.facebook || "Not configured"}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Twitter"
                    secondary={websiteData.socialLinks.twitter || "Not configured"}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Instagram"
                    secondary={websiteData.socialLinks.instagram || "Not configured"}
                  />
                </ListItem>
              </List>
              <Button
                fullWidth
                variant="contained"
                startIcon={<Edit />}
                onClick={() => handleOpenModal("socialMedia")}
              >
                Configure Social Links
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Additional Sections Can Be Added Here */}
      </Grid>

      {/* Modal */}
      <Modal open={!!openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            backgroundColor: "#fff",
            maxWidth: "800px",
            margin: "50px auto",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5">
              {openModal === "logo" && "Logo Management"}
              {openModal === "title" && "Website Title"}
              {openModal === "contactInfo" && "Contact Information"}
              {openModal === "missionVision" && "Mission & Vision"}
              {openModal === "banner" && "Banner Management"}
              {openModal === "socialMedia" && "Social Media Links"}
            </Typography>
            <IconButton onClick={handleCloseModal} size="large">
              <Close />
            </IconButton>
          </Box>

          {renderModalContent()}

          <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="contained" color="primary">
              Save Changes
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default WebsiteManagementModule;

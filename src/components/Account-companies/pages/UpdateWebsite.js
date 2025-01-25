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
} from "@mui/material";
import { Add, Delete, Edit, Close, Settings } from "@mui/icons-material";

const WebsiteManagementModule = () => {
  const [openModal, setOpenModal] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  const handleOpenModal = (modalType) => setOpenModal(modalType);
  const handleCloseModal = () => {
    setOpenModal(null);
    setSelectedOption("");
  };
  const handleOptionChange = (event) => setSelectedOption(event.target.value);

  return (
    <Box p={4} sx={{ marginLeft: "280px" }}>
      <Typography variant="h4" gutterBottom>
        Website Management
      </Typography>
      <Grid container spacing={2}>
        {/* Section for Banner Management */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Banner Management</Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleOpenModal("banner")}
                sx={{
                  mt: 2,
                  backgroundColor: "#1e90ff",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#0056b3" },
                }}
              >
                Add Banner
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Section for Reviews Management */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Reviews Management</Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleOpenModal("addReview")}
                sx={{
                  mt: 2,
                  backgroundColor: "#1e90ff",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#0056b3" },
                }}
              >
                Add Review
              </Button>
              <Button
                variant="contained"
                startIcon={<Delete />}
                onClick={() => handleOpenModal("removeReview")}
                sx={{
                  mt: 2,
                  ml: 2,
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#a71d2a" },
                }}
              >
                Remove Review
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Section for Contact Information Management */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Contact Information</Typography>
              <Button
                variant="contained"
                startIcon={<Edit />}
                onClick={() => handleOpenModal("contactInfo")}
                sx={{
                  mt: 2,
                  backgroundColor: "#1e90ff",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#0056b3" },
                }}
              >
                Update Contact Info
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Section for Footer & Header Management */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Footer & Header Management</Typography>
              <Button
                variant="contained"
                startIcon={<Settings />}
                onClick={() => handleOpenModal("footerHeader")}
                sx={{
                  mt: 2,
                  backgroundColor: "#1e90ff",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#0056b3" },
                }}
              >
                Update Footer & Header
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Section for Logo Management */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Logo Management</Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleOpenModal("logo")}
                sx={{
                  mt: 2,
                  backgroundColor: "#1e90ff",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#0056b3" },
                }}
              >
                Update Logo
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Section for Mission & Vision Management */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Mission & Vision</Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleOpenModal("missionVision")}
                sx={{
                  mt: 2,
                  backgroundColor: "#1e90ff",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#0056b3" },
                }}
              >
                Add Mission & Vision
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Section for Product Images & Gallery */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Product Images & Gallery</Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleOpenModal("productGallery")}
                sx={{
                  mt: 2,
                  backgroundColor: "#1e90ff",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#0056b3" },
                }}
              >
                Add Images to Gallery
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Modals for Each Section */}
      {openModal && (
        <Modal open={true} onClose={handleCloseModal}>
          <Box
            p={4}
            sx={{
              backgroundColor: "#fff",
              maxWidth: "500px",
              margin: "50px auto",
              borderRadius: "8px",
              boxShadow: 24,
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">
                {openModal === "banner" && "Add Banner"}
                {openModal === "addReview" && "Add Review"}
                {openModal === "removeReview" && "Remove Review"}
                {openModal === "contactInfo" && "Update Contact Information"}
                {openModal === "footerHeader" && "Update Footer & Header"}
                {openModal === "logo" && "Update Logo"}
                {openModal === "missionVision" && "Add Mission & Vision"}
                {openModal === "productGallery" && "Add Images to Gallery"}
              </Typography>
              <IconButton onClick={handleCloseModal}>
                <Close />
              </IconButton>
            </Box>

            {/* Form Fields */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="select-label">Select Option</InputLabel>
              <Select labelId="select-label" value={selectedOption} onChange={handleOptionChange}>
                <MenuItem value="option1">Option 1</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
                <MenuItem value="option3">Option 3</MenuItem>
              </Select>
            </FormControl>

            <TextField fullWidth label="Enter Details" variant="outlined" sx={{ mb: 2 }} />
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#28a745",
                color: "#fff",
                "&:hover": { backgroundColor: "#218838" },
              }}
            >
              Submit
            </Button>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default WebsiteManagementModule;

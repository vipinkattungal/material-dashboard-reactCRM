import React from "react";
import { Box, TextField, Button } from "@mui/material";

const AddCompanyForm = () => {
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        margin: "0 auto",
      }}
    >
      <TextField label="Company Name" />
      <TextField label="Industry" />
      <TextField label="Address" />
      <Button variant="contained" color="primary">
        Add Company
      </Button>
    </Box>
  );
};

export default AddCompanyForm;
import React from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";

const AddTransactionForm = () => {
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
      <TextField label="Date" type="date" InputLabelProps={{ shrink: true }} />
      <TextField label="Description" />
      <TextField label="Amount" type="number" />
      <TextField label="Type" select>
        <MenuItem value="Income">Income</MenuItem>
        <MenuItem value="Expense">Expense</MenuItem>
      </TextField>
      <Button variant="contained" color="primary">
        Add Transaction
      </Button>
    </Box>
  );
};

export default AddTransactionForm;
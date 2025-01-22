import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const QuoteProposalManagement = () => {
  const [quoteDetails, setQuoteDetails] = useState({
    customerName: "",
    email: "",
    requirements: "",
    price: "",
  });

  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [dummyQuotes, setDummyQuotes] = useState([
    {
      id: 1,
      customerName: "John Doe",
      email: "john@example.com",
      requirements: "Website Development",
      price: "$5000",
      status: "Approved",
    },
    {
      id: 2,
      customerName: "Jane Smith",
      email: "jane@example.com",
      requirements: "Mobile App Design",
      price: "$3000",
      status: "Pending",
    },
    {
      id: 3,
      customerName: "Robert Brown",
      email: "robert@example.com",
      requirements: "SEO Optimization",
      price: "$1200",
      status: "Rejected",
    },
  ]);

  const proposalTemplates = [
    {
      id: 1,
      name: "Basic Proposal Template",
      content: "This is a basic proposal template content.",
    },
    {
      id: 2,
      name: "Premium Proposal Template",
      content: "This template includes advanced features and premium services.",
    },
    {
      id: 3,
      name: "Custom Proposal Template",
      content: "Custom proposal tailored to client needs.",
    },
  ];

  const handleGenerateQuote = () => {
    if (quoteDetails.customerName && quoteDetails.requirements && quoteDetails.price) {
      const newQuote = {
        id: dummyQuotes.length + 1,
        ...quoteDetails,
        status: "Pending",
      };
      setDummyQuotes([...dummyQuotes, newQuote]);
      setQuoteDetails({
        customerName: "",
        email: "",
        requirements: "",
        price: "",
      });
      alert("Quote generated successfully!");
    } else {
      alert("Please fill out all fields to generate a quote.");
    }
  };

  const handleTemplateChange = (event) => {
    setSelectedTemplate(event.target.value);
  };

  const handleApprove = (quoteId) => {
    setDummyQuotes(
      dummyQuotes.map((quote) => (quote.id === quoteId ? { ...quote, status: "Approved" } : quote))
    );
  };

  const handleReject = (quoteId) => {
    setDummyQuotes(
      dummyQuotes.map((quote) => (quote.id === quoteId ? { ...quote, status: "Rejected" } : quote))
    );
  };

  return (
    <Box sx={{ p: 3, marginLeft: "280px" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333", mb: 3 }}>
        Quote & Proposal Management
      </Typography>

      <Grid container spacing={3}>
        {/* Quote Generation */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: "#1976d2" }}>
              Quote Generation
            </Typography>
            <TextField
              fullWidth
              label="Customer Name"
              variant="outlined"
              sx={{ mb: 2 }}
              value={quoteDetails.customerName}
              onChange={(e) => setQuoteDetails({ ...quoteDetails, customerName: e.target.value })}
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              sx={{ mb: 2 }}
              value={quoteDetails.email}
              onChange={(e) => setQuoteDetails({ ...quoteDetails, email: e.target.value })}
            />
            <TextField
              fullWidth
              label="Requirements"
              variant="outlined"
              sx={{ mb: 2 }}
              value={quoteDetails.requirements}
              onChange={(e) => setQuoteDetails({ ...quoteDetails, requirements: e.target.value })}
            />
            <TextField
              fullWidth
              label="Price"
              variant="outlined"
              sx={{ mb: 2 }}
              value={quoteDetails.price}
              onChange={(e) => setQuoteDetails({ ...quoteDetails, price: e.target.value })}
            />
            <Button
              variant="contained"
              fullWidth
              sx={{
                mb: 2,
                backgroundColor: "#28a745",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#218838",
                },
              }}
              onClick={handleGenerateQuote}
            >
              Generate Quote
            </Button>
          </Card>
        </Grid>

        {/* Proposal Templates */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: "#1976d2" }}>
              Proposal Templates
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Select Template</InputLabel>
              <Select
                value={selectedTemplate}
                onChange={handleTemplateChange}
                label="Select Template"
              >
                {proposalTemplates.map((template) => (
                  <MenuItem key={template.id} value={template.content}>
                    {template.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography variant="body1" sx={{ mt: 2, color: "#555" }}>
              {selectedTemplate || "Select a template to preview content here."}
            </Typography>
          </Card>
        </Grid>

        {/* Existing Quotes */}
        <Grid item xs={12}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: "#1976d2" }}>
              Existing Quotes
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Requirements</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dummyQuotes.map((quote) => (
                  <TableRow key={quote.id}>
                    <TableCell>{quote.customerName}</TableCell>
                    <TableCell>{quote.email}</TableCell>
                    <TableCell>{quote.requirements}</TableCell>
                    <TableCell>{quote.price}</TableCell>
                    <TableCell>{quote.status}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        sx={{
                          mb: 2,
                          backgroundColor: "#28a745",
                          color: "#fff",
                          "&:hover": {
                            backgroundColor: "#218838",
                          },
                        }}
                        size="small"
                        disabled={quote.status !== "Pending"}
                        onClick={() => handleApprove(quote.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          mb: 2,
                          backgroundColor: "#dc3545",
                          color: "#fff",
                          "&:hover": {
                            backgroundColor: "#c82333",
                          },
                        }}
                        size="small"
                        disabled={quote.status !== "Pending"}
                        onClick={() => handleReject(quote.id)}
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QuoteProposalManagement;

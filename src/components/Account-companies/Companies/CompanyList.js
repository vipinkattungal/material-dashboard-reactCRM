import React from "react";
import { Grid, Card, Typography, Button } from "@mui/material";

const companies = [
  { id: 1, name: "TechCorp", industry: "IT", address: "123 Street, City" },
  { id: 2, name: "MediCare", industry: "Healthcare", address: "456 Avenue, City" },
];

const CompanyCard = ({ company }) => (
  <Card sx={{ padding: "16px", borderRadius: "8px" }}>
    <Typography variant="h6">{company.name}</Typography>
    <Typography variant="body2">{company.industry}</Typography>
    <Typography variant="body2">{company.address}</Typography>
    <Button variant="outlined" size="small" sx={{ mt: 2 }}>
      View Details
    </Button>
  </Card>
);

const CompanyList = () => (
  <Grid container spacing={3}>
    {companies.map((company) => (
      <Grid item xs={12} sm={6} md={4} key={company.id}>
        <CompanyCard company={company} />
      </Grid>
    ))}
  </Grid>
);

export default CompanyList;
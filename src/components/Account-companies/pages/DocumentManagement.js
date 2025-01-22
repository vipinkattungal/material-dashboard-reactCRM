import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
} from "@mui/material";
import { CloudUpload, Share, Edit, History } from "@mui/icons-material";

const DocumentManagement = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Sales Contract.pdf",
      uploadedBy: "John Doe",
      version: 2,
      lastUpdated: "2025-01-20",
    },
    {
      id: 2,
      name: "Proposal_Template.docx",
      uploadedBy: "Jane Smith",
      version: 1,
      lastUpdated: "2025-01-18",
    },
  ]);

  const [newDocument, setNewDocument] = useState("");
  const [shareRecipient, setShareRecipient] = useState("");

  const handleUpload = () => {
    if (newDocument) {
      const newDoc = {
        id: documents.length + 1,
        name: newDocument,
        uploadedBy: "Admin",
        version: 1,
        lastUpdated: new Date().toISOString().split("T")[0],
      };
      setDocuments([...documents, newDoc]);
      setNewDocument("");
      alert("Document uploaded successfully!");
    } else {
      alert("Please enter a document name.");
    }
  };

  const handleShare = (docName) => {
    if (shareRecipient) {
      alert(`Document "${docName}" shared with ${shareRecipient}`);
      setShareRecipient("");
    } else {
      alert("Please enter a recipient to share the document.");
    }
  };

  const handleVersionUpdate = (docId) => {
    setDocuments(
      documents.map((doc) =>
        doc.id === docId
          ? {
              ...doc,
              version: doc.version + 1,
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : doc
      )
    );
    alert("Document version updated!");
  };

  return (
    <Box sx={{ p: 3, marginLeft: "280px" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333", mb: 3 }}>
        Document Management
      </Typography>

      <Grid container spacing={3}>
        {/* Document Upload */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: "#1976d2" }}>
              Upload Document
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              label="Document Name"
              value={newDocument}
              onChange={(e) => setNewDocument(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              startIcon={<CloudUpload />}
              fullWidth
              sx={{
                backgroundColor: "#28a745",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#218838",
                },
              }}
              onClick={handleUpload}
            >
              Upload
            </Button>
          </Card>
        </Grid>

        {/* Document Sharing */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: "#1976d2" }}>
              Share Document
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              label="Recipient Email"
              value={shareRecipient}
              onChange={(e) => setShareRecipient(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              startIcon={<Share />}
              fullWidth
              sx={{
                backgroundColor: "#007bff",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#0056b3",
                },
              }}
              onClick={() => handleShare("Selected Document")}
            >
              Share
            </Button>
          </Card>
        </Grid>

        {/* Document Table */}
        <Grid item xs={12}>
          <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: "#1976d2" }}>
              Stored Documents
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Document Name</TableCell>
                  <TableCell>Uploaded By</TableCell>
                  <TableCell>Version</TableCell>
                  <TableCell>Last Updated</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>{doc.name}</TableCell>
                    <TableCell>{doc.uploadedBy}</TableCell>
                    <TableCell>{doc.version}</TableCell>
                    <TableCell>{doc.lastUpdated}</TableCell>
                    <TableCell>
                      <Tooltip title="Update Version">
                        <IconButton color="primary" onClick={() => handleVersionUpdate(doc.id)}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="View History">
                        <IconButton color="secondary">
                          <History />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Share">
                        <IconButton
                          sx={{
                            color: "#007bff",
                            "&:hover": { color: "#0056b3" },
                          }}
                          onClick={() => handleShare(doc.name)}
                        >
                          <Share />
                        </IconButton>
                      </Tooltip>
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

export default DocumentManagement;

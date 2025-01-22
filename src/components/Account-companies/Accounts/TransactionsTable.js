import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "date", headerName: "Date", width: 150 },
  { field: "description", headerName: "Description", width: 300 },
  { field: "amount", headerName: "Amount", width: 150 },
  { field: "type", headerName: "Type", width: 150 },
];

const rows = [
  { id: 1, date: "2025-01-01", description: "Salary", amount: "₹50,000", type: "Income" },
  { id: 2, date: "2025-01-02", description: "Rent", amount: "₹10,000", type: "Expense" },
];

const TransactionsTable = () => (
  <div style={{ height: 400, width: "100%" }}>
    <DataGrid rows={rows} columns={columns} pageSize={5} />
  </div>
);

export default TransactionsTable;
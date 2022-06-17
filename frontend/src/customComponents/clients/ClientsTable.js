import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { InputAdornment } from "@mui/material";
import { TextField } from "@mui/material";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
export default function ClientsTable(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const { clients } = props;
  searchQuery ? clients.filter((client) => searchQuery === client) : clients;
  const columns = [
    { field: "id", headerName: "ID", width: 20 },
    { field: "clientName", headerName: "NAME", width: 150 },
    { field: "clientType", headerName: "TYPE", width: 100 },
    { field: "email", headerName: "EMAIL", width: 250 },
    {
      field: "orders",
      headerName: "ORDERS",
      type: "number",
      width: 100,
    },
    {
      field: "lastOrder",
      headerName: "LAST ORDER",
      sortable: TrustedScriptURL,
      width: 150,
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      width: 90,
      renderCell: (params) => {
        return (
          <>
            {" "}
            <EditTwoToneIcon index={params.row.id} color="primary" />
            <DeleteTwoToneIcon index={params.row.id} color="error" />
          </>
        );
      },
    },
  ];
  console.log(clients);
  const rows = clients.map((client) => ({
    id: client.id,
    clientName: client.clientName,
    clientType: client.clientType,
    email: client.email,
    orders: client.orders ? client.orders.length : 0,
    lastOrder: client.orders ? client.orders[3] : "never",
  }));
  return (
    <div className="dataGridContainer" style={{ height: 400, width: "100%" }}>
      <TextField
        sx={{
          m: 2,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchTwoToneIcon color="primary" />
            </InputAdornment>
          ),
        }}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search users..."
        size="small"
        margin="normal"
        variant="outlined"
      />
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        sx={{}}
      />
    </div>
  );
}

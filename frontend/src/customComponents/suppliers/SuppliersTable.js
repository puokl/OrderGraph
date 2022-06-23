import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { InputAdornment } from "@mui/material";
import { TextField } from "@mui/material";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
export default function SuppliersTable(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const { suppliers, loaded } = props;
  searchQuery
    ? suppliers.filter((supplier) => searchQuery === supplier)
    : suppliers;
  const columns = [

    { field: "Name", headerName: "NAME", width: 450 },
    { field: "email", headerName: "EMAIL", width: 450 },
    {
      field: "actions",
      headerName: "ACTIONS",
      width: 90,
      renderCell: (params) => {
        return (
          <>
            {" "}
            <EditTwoToneIcon
              index={params.row.id}
              color="primary"
              onClick={editClient}
              style={{ cursor: "pointer" }}
            />
            <DeleteTwoToneIcon
              index={params.row.id}
              color="error"
              onClick={removeClient}
              style={{ cursor: "pointer" }}
            />
          </>
        );
      },
    },
  ];
  const removeClient = () => {
    console.log(`${suppliers.clientName} with the ID ${suppliers._id} removed`);
  };
  const editClient = () => {
    console.log(`${suppliers.clientName} with the ID ${suppliers._id} edited`);
  };
  let rows = [
    {
      id: "id",
      clientName: "not loaded",
      email: "not loaded",
    },
  ];
  if (loaded) {
    rows = suppliers.map((supplier) => ({
      id: supplier._id,
      clientName: supplier.name,
      email: supplier.email,
    }));
  }
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

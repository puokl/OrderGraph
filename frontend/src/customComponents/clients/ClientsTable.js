import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { InputAdornment } from "@mui/material";
import { TextField } from "@mui/material";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
export default function ClientsTable(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);
  const { clients, loaded } = props;
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
      width: 200,
    },
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
    console.log(`${client.clientName} with the ID ${client._id} removed`);
  };
  const editClient = () => {
    console.log(`${client.clientName} with the ID ${client._id} edited`);
  };
  let rows = [
    {
      id: "id",
      clientName: "not loaded",
      clientType: "not loaded",
      email: "not loaded",
      orders: "not loaded",
      lastOrder: "not loaded",
    },
  ];
  if (loaded) {
    rows = clients.map((client) => ({
      id: client._id,
      clientName: client.clientName,
      clientType: client.clientType,
      email: client.clientEMail,
      orders: client.orders ? client.orders.length : 0,
      lastOrder: client.orders.length != 0 ? client.orders[0] : "never",
    }));
  }

  const handlePageChange = (newPage) => {
    // We have the cursor, we can allow the page transition.
    if (newPage === 0 || mapPageToNextCursor.current[newPage - 1]) {
      setPage(newPage);
    }
  };
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
        pageSize={pageSize}

        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20, 50]}
        pagination
        paginationMode="server"
        onPageChange={handlePageChange}
        page={page}
        loading={!loaded}
        checkboxSelection
        sx={{}}
      />
    </div>
  );
}

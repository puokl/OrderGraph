import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { InputAdornment } from "@mui/material";
import { TextField } from "@mui/material";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import LinearProgress from "@mui/material/LinearProgress";

export default function OrderTable(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);
  const { orders, clients, loaded } = props;
  searchQuery ? orders.filter((order) => searchQuery === order) : orders;
  const columns = [
    { field: "clientName", headerName: "CLIENT", width: 200 },
    { field: "status", headerName: "STATUS", width: 200 },
    { field: "timeLeft", headerName: "TIME LEFT", width: 200 },

    {
      field: "progress",
      headerName: "PROGRESS",
      width: 250,
      renderCell: (params) => (
        <>
          <LinearProgress
            sx={{ width: 250 }}
            variant="determinate"
            value={
              params.row.status === "finished"
                ? 100
                : params.row.status === "in_progress"
                ? 20
                : params.row.status === "upcoming"
                ? 75
                : params.row.status === "draft"
                ? 0
                : null
            }
          />
        </>
      ),
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      width: 150,
      renderCell: (params) => {
        const removeClient = () => {
          console.log(`Order with the ID ${params._id} removed`);
        };
        const editClient = () => {
          console.log(`Order with the ID ${params._id} edited`);
        };
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
  let rows = [
    {
      id: "id",
      clientName: "not loaded",
      status: "not loaded",
      timeLeft: "not loaded",
      progress: 0,
    },
  ];
  if (loaded) {
    rows = orders.map((order) => ({
      id: order._id,
      clientName: clients.filter((client, order) =>
        client._id === order.createdByUser ? client.clientName : null
      ),
      status: order.status,
      timeLeft: order.createdAt ? order.createdAt : null,
      progress: order.status,
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
      {loaded ? console.log("rows ", rows) : null}
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

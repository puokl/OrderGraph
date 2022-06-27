import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { InputAdornment } from "@mui/material";
import { TextField } from "@mui/material";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { id } from "date-fns/locale";
export default function OrderTable(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);

  const { orders, loaded } = props;
  console.log(orders);
  searchQuery ? orders.filter((order) => searchQuery === order) : orders;
  const columns = [
    { field: "clientName", headerName: "CLIENT", width: 200 },
    { field: "status", headerName: "STATUS", width: 200 },
    { field: "timeLeft", headerName: "TIME LEFT", width: 200 },

    {
      field: "progress",
      headerName: "PROGRESS",
      type: "number",
      width: 250,
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      width: 150,
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
    console.log(`${order} with the ID ${order._id} removed`);
  };
  const editClient = () => {
    console.log(`${order} with the ID ${order._id} edited`);
  };
  let rows = [
    {
      id: "id",
      clientName: "not loaded",
      status: "not loaded",
      timeLeft: "not loaded",
      progress: "not loaded",
    },
  ];
  if (loaded) {
    rows = orders.map((order) => ({
      id: order._id,
      clientName: order.client,
      status: order.status,
      timeLeft: order.createdAt ? order.createdAt : "null",
      progress: order.createdAt ? `${order.createdAt} % ` : "null",
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

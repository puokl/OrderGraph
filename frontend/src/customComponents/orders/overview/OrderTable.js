import React, { useState, forwardRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import {
  InputAdornment,
  Typography,
  Link,
  Dialog,
  Zoom,
  styled,
} from "@mui/material";
import { TextField } from "@mui/material";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { useTranslation } from "react-i18next";
import LinearProgress from "@mui/material/LinearProgress";
import { useSnackbar } from "notistack";
// import axios from "axios";
import axios from "src/utils/axios2";

export default function OrderTable(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);
  const { t } = useTranslation();
  const { orders, clients, loaded, rowLength, setRowLength } = props;
  searchQuery ? orders.filter((order) => searchQuery === order) : orders;
  orders ? setRowLength(orders.length) : setRowLength(0);
  const { enqueueSnackbar } = useSnackbar();

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });
  const DialogWrapper = styled(Dialog)(
    () => `
      .MuiDialog-paper {
        overflow: visible;
      }
`
  );
  const removeClient = async (id) => {
    console.log(`hi ${id} u gone bye bye`);

    try {
      const response = await axios.delete(`/api/v1/order/${id}`);
      console.log(response);

      if (response.data.success === true) {
        enqueueSnackbar(t("Successfully deleted."), {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          TransitionComponent: Zoom,
        });
      } else {
        enqueueSnackbar(t("An error occured, please try deleting again."), {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          TransitionComponent: Zoom,
        });
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar(t("yada yada"), {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        TransitionComponent: Zoom,
      });
    }
  };

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
        return (
          <>
            <EditTwoToneIcon
              index={params.row.id}
              color="primary"
              style={{ cursor: "pointer" }}
              onClick={() =>
                (window.location.href = `/orders/edit/${params.row.id}`)
              }
            />
            <DeleteTwoToneIcon
              index={params.row.id}
              color="error"
              // onClick={removeClient(params.row.id)}
              onClick={() => {
                removeClient(params.row.id);
              }}
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
      actions: null,
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
      actions: order._id,
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
        rowLength={rowLength}
        checkboxSelection
        sx={{}}
      />
    </div>
  );
}

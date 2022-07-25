import React, { useState, forwardRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import {
  Dialog,
  Zoom,
  styled,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import LinearProgress from "@mui/material/LinearProgress";
import { useSnackbar } from "notistack";
import axios from "src/utils/axios2";

export default function OrderTable(props) {
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);
  const { t } = useTranslation();
  const { orders, clients, loaded, rowLength, setRowLength, getOrders } = props;
  orders ? setRowLength(orders.length) : setRowLength(0);
  const { enqueueSnackbar } = useSnackbar();
  const data = getOrders
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
        getOrders()
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

  
  return (
    <div className="dataGridContainer" style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        page={page}
        pageSize={pageSize}
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newPage) => setPageSize(newPage)}
        rowsPerPageOptions={[5, 10, 20, 50]}
        loading={!loaded}
        rowLength={rowLength}
        checkboxSelection
        {...data}
        sx={{}}
      />
    </div>
  );
}

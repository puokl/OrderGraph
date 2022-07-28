import React, { useState, forwardRef } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { Dialog, Zoom, styled, Chip } from "@mui/material";
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
  const data = getOrders;
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
  const removeOrder = async (id) => {
    try {
      const response = await axios.delete(`/api/v1/order/${id}`);

      if (response.data.success === true) {
        enqueueSnackbar(t("Successfully deleted."), {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          TransitionComponent: Zoom,
        });
        getOrders();
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
    {
      field: "status",
      headerName: "STATUS",
      width: 200,
      renderCell: (params) => (
        <Chip
          sx={{ width: 200 }}
          label={params.row.status}
          color={
            params.row.status === "upcoming"
              ? "warning"
              : params.row.status === "active"
              ? "primary"
              : "success"
          }
        />
      ),
    },
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
                : params.row.status === "active"
                ? 50
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
              onClick={() => {
                removeOrder(params.row.id);
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
      timeLeft:
        order.status != "finished"
          ? order.status === "active"
            ? "2 weeks left"
            : order.status === "upcoming"
            ? "1 week left"
            : "finished"
          : "finished",
      progress: order.status,
      actions: order._id,
    }));
  }
  // useEffect(() => {
  //   loaded ?
  //   orders.forEach((order) =>
  //     order.status != "finished"
  //       ? order.items.forEach((item) => {
  //           console.log("1");
  //           if (item.tasks.every((task) => task.finished === false)) {
  //             item.tasks.forEach((task) => {
  //               console.log("2");
  //               return task.subTasks
  //                 .filter((subTask) => subTask?.finished === false)
  //                 .reduce(
  //                   (prev, curr) =>
  //                     Number(prev.tineEstimate) + Number(curr.tineEstimate),
  //                   0
  //                 );
  //             });
  //           } else {
  //             return "finished";
  //           }
  //         })
  //       : "tbd"
  //       )
  //       : console.log("no items");
  // }, [loaded]);

  return (
    <div className="dataGridContainer" style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        page={page}
        pageSize={pageSize}
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newPage) => setPageSize(newPage)}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        loading={!loaded}
        rowLength={rowLength}
        checkboxSelection
        {...data}
        sx={{}}
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
}

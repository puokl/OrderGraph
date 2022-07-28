import React, { useState, forwardRef } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { Dialog, Zoom, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import axios from "src/utils/axios2";

export default function ClientsTable(props) {
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);
  const { clients, loaded, rowLength, setRowLength, getClients } = props;
  const data = getClients;
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
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
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `/clients/edit/${params.row.id}`;
              }}
              style={{ cursor: "pointer" }}
            />
            <DeleteTwoToneIcon
              index={params.row.id}
              color="error"
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
  const removeClient = async (id) => {
    try {
      const response = await axios.delete(`/api/v1/client/${id}`);

      if (response.data.success === true) {
        enqueueSnackbar(t("Successfully deleted."), {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          TransitionComponent: Zoom,
        });
        getClients();
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
      orders: client.orders ? client.orders.createdAt : 0,
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

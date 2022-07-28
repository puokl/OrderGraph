import React, { useState, forwardRef } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { Dialog, Zoom, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import axios from "src/utils/axios2";

export default function SuppliersTable(props) {
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);
  const { suppliers, loaded, rowLength, setRowLength, getSuppliers } = props;
  const data = getSuppliers;
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
  const removeSupplier = async (id) => {
    try {
      const response = await axios.delete(`/api/v1/supplier/${id}`);

      if (response.data.success === true) {
        enqueueSnackbar(t("Successfully deleted."), {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          TransitionComponent: Zoom,
        });
        getSuppliers();
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
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `/suppliers/edit/${params.row.id}`;
              }}
              style={{ cursor: "pointer" }}
            />
            <DeleteTwoToneIcon
              index={params.row.id}
              color="error"
              onClick={() => {
                removeSupplier(params.row.id);
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
      SupplierName: "not loaded",
      email: "not loaded",
    },
  ];
  if (loaded) {
    rows = suppliers.map((supplier) => ({
      id: supplier._id,
      SupplierName: supplier.name,
      email: supplier.email,
    }));
  }

  const handlePageChange = (newPage) => {
    // We have the cursor, we can allow the page transition.
    if (newPage === 0 || mapPageTSNextCursor.current[newPage - 1]) {
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

import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Delete, Edit} from "@mui/icons-material"
export default function ClientsTable(props) {
  const { clients } = props;
  const columns = [
    { field: "id", headerName: "ID", width: 20 },
    { field: "clientName", headerName: "NAME", width: 130 },
    { field: "clientType", headerName: "TYPE", width: 130 },
    { field: "email", headerName: "EMAIL", width: 200 },
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
      width: 120,
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      width: 90,
      renderCell: (params) => {
        return (<><Delete index={params.row.id}/> <Edit index={params.row.id}/></>)
      }
    },
  ];
  console.log(clients);
  const rows = clients.map(
    (client) => ({
      id: client.id,
      clientName: client.clientName,
      clientType: client.clientType,
      email: client.email, orders: client.orders? client.orders.length : 0, lastOrder: client.orders? client.orders[3] : "never"
    })
  );
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}


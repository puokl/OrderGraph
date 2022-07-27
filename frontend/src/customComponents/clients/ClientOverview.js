import React, { useState, useEffect } from "react";
import ClientsTable from "./ClientsTable";
import "./ClientOverview.css";
import { Grid, Card, Button, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import axios from "src/utils/axios2";
import useAuth from "src/hooks/useAuth";

const ClientOverview = () => {
  const [loaded, setLoaded] = useState(false);
  const [clients, setClients] = useState([]);
  const [rowLength, setRowLength] = useState(0);
  const [newClientsMonth, setNewClientsMonth] = useState(0);
  const { user } = useAuth();

  const getClients = async () => {
    try {
      const response = await axios.get(
        "/api/v1/client/all/" + user.organization
      );
      setClients(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getClients();
    setRowLength(clients.length);
    setLoaded(true);
  }, []);

  const totalClients = clients.length;
  const today = new Date();
  const lastMonth = Date.parse(today) - 1000 * 60 * 60 * 24 * 30;
  useEffect(() => {
    clients.forEach((c) =>
      Date.parse(c.createdAt) > lastMonth
        ? setNewClientsMonth((prev) => prev + 1)
        : 0
    );
  }, [clients]);
  const clientsWActiveOrdrs = 2;
  const clientsWORecentOrdrs = 33;

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          width: "100%",
          margin: "3rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h3" component="h3" gutterBottom>
            {"Clients Overview"}
          </Typography>
          <Typography variant="h5" component="h5" gutterBottom>
            {"Take a look at your client list"}
          </Typography>
        </div>
        <div style={{ display: "flex" }}>
          <Button
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/clients/add";
            }}
          >
            Add new client
          </Button>
        </div>
      </div>
      {/* client overview cards START */}
      <Grid container spacing={4} margin={1}>
        <Grid item xs={3}>
          <Card>
            <Grid margin={2}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item>
                    <CircleIcon style={{ color: "#15c5e8" }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" component="h5" gutterBottom>
                      Total Clients
                    </Typography>
                  </Grid>
                </Grid>
                <br />
                <Typography
                  sx={{ display: "flex", justifyContent: "center" }}
                  variant="h4"
                  component="h4"
                  gutterBottom
                >
                  {totalClients}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <Grid margin={2}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item>
                    <CircleIcon style={{ color: "green" }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" component="h5" gutterBottom>
                      New Clients last month{" "}
                    </Typography>
                  </Grid>
                </Grid>
                <br />
                <Typography
                  sx={{ display: "flex", justifyContent: "center" }}
                  variant="h4"
                  component="h4"
                  gutterBottom
                >
                  {newClientsMonth}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <Grid margin={2}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item>
                    <CircleIcon style={{ color: "#15c5e8" }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" component="h5" gutterBottom>
                      Clients with active orders
                    </Typography>
                  </Grid>
                </Grid>
                <br />
                <Typography
                  sx={{ display: "flex", justifyContent: "center" }}
                  variant="h4"
                  component="h4"
                  gutterBottom
                >
                  {clientsWActiveOrdrs}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <Grid margin={2}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item>
                    <CircleIcon style={{ color: "red" }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" component="h5" gutterBottom>
                      Clients without recent orders
                    </Typography>
                  </Grid>
                </Grid>
                <br />
                <Typography
                  sx={{ display: "flex", justifyContent: "center" }}
                  variant="h4"
                  component="h4"
                  gutterBottom
                >
                  {clientsWORecentOrdrs}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        {/* clients overview cards END */}
        <Grid item xs={12}>
          {/* client search & table START */}

          <Card margin={1}>
            <Grid container>
              <Grid item xs={12}>
                <ClientsTable
                  clients={clients}
                  loaded={loaded}
                  getClients={getClients}
                  rowLength={rowLength}
                  setRowLength={setRowLength}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        {/* client search & table END */}
      </Grid>
    </Grid>
  );
};

ClientOverview.propTypes = {};

export default ClientOverview;

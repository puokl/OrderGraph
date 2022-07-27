import React, { useState, useEffect } from "react";
import OrderTable from "./OrderTable";
import { Grid, Card, Button, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import axios from "src/utils/axios2";

const OrderOverview = () => {
  const [loaded, setLoaded] = useState(false);
  const [orders, setOrders] = useState([]);
  const [clients, setClients] = useState([]);
  const [rowLength, setRowLength] = useState(0);
  const [newOrdersMonth, setNewOrdersMonth] = useState(0);

  const getOrders = async () => {
    try {
      const response = await axios.get("/api/v1/order");
      setOrders(response.data.data);
      setLoaded(true);
    } catch (err) {
      console.error(err);
    }
  };

  const getClients = async () => {
    try {
      const response = await axios.get("/api/v1/client");
      setClients(response.data.data);
      setLoaded(true);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getOrders();
    getClients();
  }, []);

  const totalOrders = orders.length;
  const today = new Date();
  const lastMonth = Date.parse(today) - 1000 * 60 * 60 * 24 * 30;
  useEffect(() => {
    orders.forEach((o) =>
      Date.parse(o.startDate) > lastMonth
        ? setNewOrdersMonth((prev) => prev + 1)
        : 0
    );
  }, [orders]);
  const activeOrders = orders.filter((o) => o.status === "active").length;
  const RecentOrdrs = orders.filter((o) => o.status === "finished").length;

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
            {"Orders Overview"}
          </Typography>
          <Typography variant="h5" component="h5" gutterBottom>
            {"Take a look at your order list"}
          </Typography>
        </div>
        <div style={{ display: "flex" }}>
          <Button
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/orders/create";
            }}
          >
            Create new order
          </Button>
        </div>
      </div>

      {/* order overview cards START */}
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
                      Total Orders
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
                  {totalOrders}
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
                      New Orders last month{" "}
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
                  {newOrdersMonth}
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
                      Active orders
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
                  {activeOrders}
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
                      Finished orders
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
                  {RecentOrdrs}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        {/* orders overview cards END */}
        <Grid item xs={12}>
          {/* order search & table START */}

          <Card margin={1}>
            <Grid container>
              <Grid item xs={12}>
                <OrderTable
                  orders={orders}
                  clients={clients}
                  loaded={loaded}
                  rowLength={rowLength}
                  setRowLength={setRowLength}
                  getOrders={getOrders}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        {/* order search & table END */}
      </Grid>
    </Grid>
  );
};

OrderOverview.propTypes = {};

export default OrderOverview;

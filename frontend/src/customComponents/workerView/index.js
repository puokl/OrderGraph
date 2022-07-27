import {
  Box,
  Button,
  Typography,
  Card,
  CardHeader,
  Divider,
  Grid,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { useTranslation } from "react-i18next";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { Helmet } from "react-helmet-async";
import { useState, useEffect, useCallback } from "react";
import axios from "src/utils/axios2";
import useAuth from "src/hooks/useAuth";

function WorkerView() {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);

  const { user } = useAuth();

  // Fetch Data

  const getOrders = async () => {
    try {
      const response = await axios.get(
        "/api/v1/order/all/" + user.organization
      );
      console.log(response);
      setOrders([...response.data.data]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <Helmet>
        <title>Orders</title>
      </Helmet>

      <Grid
        sx={{
          px: 4,
        }}
        container
        direction="row"
        justifyContent="space-between"
      >
        {orders.map((order) => (
          <Card
            sx={{
              py: "1rem",
              my: "1rem",
              mx: 1,
              px: "1.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                marginTop: "0.5rem",
                marginBottom: "0",
              }}
            >{`Order ID: ${order._id}`}</p>
            <p>{`Status: ${order.status}`}</p>

            <Box sx={{ width: "100%" }}>
              <p
                style={{
                  marginTop: "0rem",
                  marginBottom: "0.3rem",
                }}
              >
                Progress:
              </p>
              <LinearProgress variant="determinate" value="0" />
            </Box>
          </Card>
        ))}
      </Grid>
    </>
  );
}

export default WorkerView;

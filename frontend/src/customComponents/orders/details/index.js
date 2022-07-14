import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "src/utils/axios2";
import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import { Grid, Typography } from "@mui/material";

import PageTitleWrapper from "src/components/PageTitleWrapper";
import PageHeader from "./PageHeader";
import { useParams } from "react-router-dom";

import OrderGantt from "./components/gantt";
import GoogleGantt from "./components/googleGantt";
import Items from "./components/items";
import Status from "./components/status";
import Documents from "./components/documents";

function OrderDetails() {
  const { t } = useTranslation();
  const [currentOrder, setCurrentOrder] = useState({});
  const { orderID } = useParams();

  const [orderItems, setOrderItems] = useState([]);

  const getOrder = async () => {
    try {
      const response = await axios.get("/api/v1/order/" + orderID);
      console.log(response);
      setCurrentOrder(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: "1 0 auto",
        }}
      >
        <Helmet>
          <title>Order Details</title>
        </Helmet>
        <PageTitleWrapper>
          <PageHeader orderID={orderID} />
        </PageTitleWrapper>

        <Grid
          sx={{
            px: 4,
          }}
          container
          direction="row"
          alignItems="flex-start"
          spacing={4}
        >
          <Grid item xs={12} sm={6} lg={8}>
            <Typography variant="h3" component="h3" gutterBottom>
              {t("Tasks")}
            </Typography>
            {/* Below is the add items component, currently only the button is done, not the form component to add items */}
            {Object.keys(currentOrder).length > 0 ? (
              <GoogleGantt currentOrder={currentOrder} />
            ) : null}
          </Grid>

          <Grid item xs={8} sm={4} lg={4}>
            <Typography variant="h3" component="h3" gutterBottom>
              {t(" ")}
            </Typography>
            {/* Below is the Status component, we need to somehow convert the date string that the date picker (which is currently in default US format) comes with to a UTC string */}
            <Status currentOrder={currentOrder} />
            <Documents />
          </Grid>

          <Grid item xs={12} sm={12} lg={12}>
            <Typography variant="h3" component="h3" gutterBottom>
              {t("Items")}
            </Typography>
            {Object.keys(currentOrder).length > 0 ? (
              <Items currentOrder={currentOrder} />
            ) : null}
          </Grid>
        </Grid>
      </div>
      <Footer
        style={{
          flexShrink: "0",
        }}
      />
    </div>
  );
}

export default OrderDetails;

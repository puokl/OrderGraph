import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "src/utils/axios2";
import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import { Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import PageHeader from "./PageHeader";

import Clients from "./components/clients";
import Items from "./components/items";
import Invoices from "./components/invoices";
import Status from "./components/status";
import Documents from "./components/documents";

function CreateOrder() {
  const { t } = useTranslation();
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [startDate, setStartDate] = useState();
  const [orderItems, setOrderItems] = useState([]);
  const { orderID } = useParams();

  const getOrder = async (orderID) => {
    try {
      const response = await axios.get("/api/v1/order/" + orderID);
      console.log(response);
      setSelectedClient(
        clients.find((client) => client._id === response.data.data.client)
      );
      setStartDate(response.data.data.startDate);
      setOrderItems(response.data.data.items);
    } catch (err) {
      console.error(err);
    }
  };

  if (orderID) {
    getOrder(orderID);
  }

  const getClients = async () => {
    try {
      const response = await axios.get("/api/v1/client");
      console.log(response);
      setClients(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getClients();
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
          <title>Create Order</title>
        </Helmet>
        <PageTitleWrapper>
          <PageHeader />
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
              {t("Calendar")}
            </Typography>
            {/* This component is empty in the figma mock up, so nothing here */}
          </Grid>
          <Grid item xs={12} sm={6} lg={8}>
            <Typography variant="h3" component="h3" gutterBottom>
              {t("Client")}
            </Typography>
            {/* Below is the Client picker dropdown component, which is almost fully functional, only the edit client button needs to become functional */}
            <Clients
              clients={clients}
              selectedClient={selectedClient}
              setSelectedClient={setSelectedClient}
            />
            <Typography variant="h3" component="h3" gutterBottom>
              {t("Items")}
            </Typography>
            {/* Below is the add items component, currently only the button is done, not the form component to add items */}
            <Items orderItems={orderItems} setOrderItems={setOrderItems} />
            <Typography variant="h3" component="h3" gutterBottom>
              {t("Invoices")}
            </Typography>
            {/* Below is the add invoices component, currently only the button is done, no functionality yet, we need to get a library for drag and drop */}
            <Invoices />
          </Grid>

          <Grid item xs={8} sm={4} lg={4}>
            <Typography variant="h3" component="h3" gutterBottom>
              {t(" ")}
            </Typography>
            {/* Below is the Status component, we need to somehow convert the date string that the date picker (which is currently in default US format) comes with to a UTC string */}
            <Status
              startDate={startDate}
              setStartDate={setStartDate}
              selectedClient={selectedClient}
              orderItems={orderItems}
            />
            <Documents />
          </Grid>

          <Grid item xs={12} sm={6} lg={8}></Grid>
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

export default CreateOrder;

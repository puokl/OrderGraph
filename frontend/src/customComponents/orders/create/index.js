import { useState, useEffect, useRef } from "react";
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
import useAuth from "src/hooks/useAuth";

function CreateOrder() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState({
    billingAddress: {},
    clientEMail: "",
    clientName: "",
    clientPhoneNumber: "",
    clientType: "",
    contact: [],
    financials: {},
    orders: [],
    shippingAddress: {},
  });
  const [urlList, setUrlList] = useState([]);
  const [invoiceUrlList, setInvoiceUrlList] = useState([]);

  const { orderID } = useParams("");
  const [currentOrder, setCurrentOrder] = useState({
    createdByOrganization: user.organization,
    createdByUser: user._id,
    client: "",
    status: "",
    draft: true,
    startDate: null,
    documents: [],
    items: [],
    invoices: [],
  });

  const getOrder = async (orderID) => {
    try {
      const response = await axios.get("/api/v1/order/" + orderID);

      setCurrentOrder({ ...response.data.data });
      setUrlList([...response.data.data.documents]);
      setInvoiceUrlList([...response.data.data.invoices]);
    } catch (err) {
      console.error(err);
    }
  };

  const getClients = async () => {
    try {
      const response = await axios.get(
        "/api/v1/client/all/" + user.organization
      );

      if (response !== undefined) {
        setClients(response.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getClients();
    if (orderID) {
      getOrder(orderID);
    }
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
          {/* <Grid item xs={12} sm={6} lg={8}>
            <Typography variant="h3" component="h3" gutterBottom>
              {t("Calendar")}
            </Typography>
             This component is empty in the figma mock up, so nothing here 
          </Grid> */}
          <Grid item xs={12} sm={6} lg={8}>
            <Typography variant="h3" component="h3" gutterBottom>
              {t("Client")}
            </Typography>
            {/* Below is the Client picker dropdown component, which is almost fully functional, only the edit client button needs to become functional */}
            <Clients
              clients={clients}
              selectedClient={selectedClient}
              setSelectedClient={setSelectedClient}
              setCurrentOrder={setCurrentOrder}
              currentOrder={currentOrder}
              orderID={orderID}
            />
            <Typography variant="h3" component="h3" gutterBottom>
              {t("Items")}
            </Typography>
            {/* Below is the add items component */}
            <Items
              currentOrder={currentOrder}
              setCurrentOrder={setCurrentOrder}
              orderID={orderID}
              user={user}
            />
            <Typography variant="h3" component="h3" gutterBottom>
              {t("Invoices")}
            </Typography>
            {/* Below is the add invoices component, currently only the button is done, no functionality yet, we need to get a library for drag and drop */}
            <Invoices
              setCurrentOrder={setCurrentOrder}
              currentOrder={currentOrder}
              orderID={orderID}
              invoiceUrlList={invoiceUrlList}
              setInvoiceUrlList={setInvoiceUrlList}
            />
          </Grid>

          <Grid item xs={8} sm={4} lg={4}>
            <Typography variant="h3" component="h3" gutterBottom>
              {t(" ")}
            </Typography>
            {/* Below is the Status component which handles saving the order */}
            <Status
              orderID={orderID}
              currentOrder={currentOrder}
              setCurrentOrder={setCurrentOrder}
            />
            <Documents
              orderID={orderID}
              currentOrder={currentOrder}
              setCurrentOrder={setCurrentOrder}
              urlList={urlList}
              setUrlList={setUrlList}
            />
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

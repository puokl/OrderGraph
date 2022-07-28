import {
  Box,
  Button,
  Typography,
  Card,
  CardHeader,
  TextField,
  Divider,
  Grid,
  Avatar,
  Chip,
} from "@mui/material";
import ShoppingBagTwoToneIcon from "@mui/icons-material/ShoppingBagTwoTone";
import { useTranslation } from "react-i18next";
import { ArrowForwardTwoTone } from "@mui/icons-material";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import PageHeaderClientDetails from "./PageHeaderClientDetails";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "src/utils/axios2";

function ClientDetails() {
  const { t } = useTranslation();
  const [clients, setClients] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const { clientId } = useParams();
  const { orderID } = useParams();
  const [name, setName] = useState("");
  const [orders, setOrders] = useState([]);
  const [activeOrders, setActiveOrders] = useState([]);
  const [upcomingOrders, setUpcomingOrders] = useState([]);
  const [finishedOrders, setFinishedOrders] = useState([]);
  let newOrders = [];

  // Fetch Data

  const getClient = async () => {
    try {
      const response = await axios.get("/api/v1/client/" + clientId);

      setClients(response.data.data);
      setDataLoaded(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getClient();
  }, []);

  const getOrder = async () => {
    try {
      const response = await axios.get("/api/v1/order/");
      const clientOrders = response.data.data.filter(
        (order) => order.client === clientId
      );
      setOrders([...clientOrders]);

      const activeClientOrders = clientOrders.filter(
        (order) => order.status === "active"
      );
      setActiveOrders(activeClientOrders);

      const upcomingClientOrders = clientOrders.filter(
        (order) => order.status === "upcoming"
      );
      setUpcomingOrders(upcomingClientOrders);

      const previousClientOrders = clientOrders.filter(
        (order) => order.status === "finished"
      );
      setfinishedOrders(previousClientOrders);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getOrder();
  }, [dataLoaded]);

  const addresses = {
    delivery: 12,
    shipping: 8,
  };

  return (
    <>
      <Helmet>
        <title>Client Details</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeaderClientDetails clients={clients} />
      </PageTitleWrapper>
      <Grid
        sx={{
          px: 4,
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
      >
        {/* Client: Person Details */}
        <Grid item xs={12} sm={6} lg={7}>
          <Card sx={{ minHeight: "450px" }}>
            <Grid
              container
              direction="row"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item xs={6} sm={6} lg={6}>
                <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                  <CardHeader title="Person" />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} lg={6} sx={{ ml: "auto" }}>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button href="#text-buttons" /* onClick={}  */>Edit</Button>
                </Box>
              </Grid>
            </Grid>
            <Divider />
            <Box p={2}>
              <Box
                sx={{
                  minHeight: { xs: 0, md: 243 },
                }}
                p={2}
              >
                {/* Client Name Start */}
                <Grid container sx={{ mb: "20px" }}>
                  <Grid item xs={2} sm={2} lg={3}>
                    <Typography
                      variant="h5"
                      fontWeight="normal"
                      textAlign="right"
                    >
                      Name:
                    </Typography>
                  </Grid>
                  <Grid item xs={8} sm={8} lg={8}>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      clients={clients}
                      sx={{ ml: "20px" }}
                    >
                      {dataLoaded ? clients.clientName : ""}
                    </Typography>
                  </Grid>
                </Grid>
                {/* Client Name End */}

                {/* Client Email Start */}
                <Grid container sx={{ mb: "20px" }}>
                  <Grid item xs={2} sm={2} lg={3}>
                    <Typography
                      variant="h5"
                      fontWeight="normal"
                      textAlign="right"
                    >
                      Email:
                    </Typography>
                  </Grid>
                  <Grid item xs={8} sm={8} lg={8}>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      clients={clients}
                      sx={{ ml: "20px" }}
                    >
                      {clients.clientEMail}
                    </Typography>
                  </Grid>
                </Grid>
                {/* Client Email End */}

                {/* Client Phone Start */}
                <Grid container sx={{ mb: "20px" }}>
                  <Grid item xs={2} sm={2} lg={3}>
                    <Typography
                      variant="h5"
                      fontWeight="normal"
                      textAlign="right"
                    >
                      Phone:
                    </Typography>
                  </Grid>
                  <Grid item xs={8} sm={8} lg={8}>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      clients={clients}
                      sx={{ ml: "20px" }}
                    >
                      {clients.clientPhoneNumber}
                    </Typography>
                  </Grid>
                </Grid>
                {/* Client Phone End */}

                {/* Client Billing Address Start */}
                <Grid container sx={{ mb: "40px" }}>
                  <Grid item xs={2} sm={2} lg={3}>
                    <Typography
                      variant="h5"
                      fontWeight="normal"
                      textAlign="right"
                    >
                      Billing Address:
                    </Typography>
                  </Grid>
                  <Grid item xs={8} sm={8} lg={8}>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      clients={clients}
                      sx={{ ml: "20px" }}
                    >
                      {dataLoaded ? clients.billingAddress.Address : ""}{" "}
                      {dataLoaded ? clients.billingAddress.Zip : ""}{" "}
                      {dataLoaded ? clients.billingAddress.City : ""}{" "}
                      {dataLoaded ? clients.billingAddress.State : ""}{" "}
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      clients={clients}
                      sx={{ ml: "20px" }}
                    >
                      {dataLoaded
                        ? clients.billingAddress.AdditionalInformation
                        : ""}
                    </Typography>
                  </Grid>
                </Grid>
                {/* Client Billing Address End */}

                {/* Client Billing Address Start */}
                <Grid container sx={{ mb: "10px" }}>
                  <Grid item xs={2} sm={2} lg={3}>
                    <Typography
                      variant="h5"
                      fontWeight="normal"
                      textAlign="right"
                    >
                      Shipping Address:
                    </Typography>
                  </Grid>
                  <Grid item xs={8} sm={8} lg={8}>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      clients={clients}
                      sx={{ ml: "20px" }}
                    >
                      {dataLoaded ? clients.shippingAddress.Address : ""}{" "}
                      {dataLoaded ? clients.shippingAddress.Zip : ""}{" "}
                      {dataLoaded ? clients.shippingAddress.City : ""}{" "}
                      {dataLoaded ? clients.shippingAddress.State : ""}{" "}
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      clients={clients}
                      sx={{ ml: "20px" }}
                    >
                      {dataLoaded
                        ? clients.shippingAddress.AdditionalInformation
                        : ""}
                    </Typography>
                  </Grid>
                </Grid>
                {/* Client Billing Address End */}
              </Box>
            </Box>
            {clients.clientType === "Company" ? (
              <>
                {/* Financials Start */}
                <Grid
                  container
                  direction="row"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item xs={6} sm={6} lg={6}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        my: "0px",
                      }}
                    >
                      <CardHeader title="Financials" />
                    </Box>
                  </Grid>
                </Grid>
                <Divider />
                <Box p={2}>
                  <Box
                    sx={{
                      minHeight: { xs: 0, md: 243 },
                    }}
                    px={2}
                  >
                    {/* Registration No  Start */}
                    <Grid container sx={{ mb: "20px" }}>
                      <Grid item xs={2} sm={2} lg={3}>
                        <Typography
                          variant="h5"
                          fontWeight="normal"
                          textAlign="right"
                        >
                          Registration No:
                        </Typography>
                      </Grid>
                      <Grid item xs={8} sm={8} lg={8}>
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          clients={clients}
                          sx={{ ml: "20px" }}
                        >
                          {dataLoaded
                            ? clients.financials.registrationNumber
                            : ""}
                        </Typography>
                      </Grid>
                    </Grid>
                    {/* Registration No End */}

                    {/* Fiscal No. Start */}
                    <Grid container sx={{ mb: "20px" }}>
                      <Grid item xs={2} sm={2} lg={3}>
                        <Typography
                          variant="h5"
                          fontWeight="normal"
                          textAlign="right"
                        >
                          Fiscal No:
                        </Typography>
                      </Grid>
                      <Grid item xs={8} sm={8} lg={8}>
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          clients={clients}
                          sx={{ ml: "20px" }}
                        >
                          {dataLoaded ? clients.financials.fiscalNumber : ""}
                        </Typography>
                      </Grid>
                    </Grid>
                    {/* Fiscal No. End */}

                    {/* IBAN Start */}
                    <Grid container sx={{ mb: "20px" }}>
                      <Grid item xs={2} sm={2} lg={3}>
                        <Typography
                          variant="h5"
                          fontWeight="normal"
                          textAlign="right"
                        >
                          IBAN:
                        </Typography>
                      </Grid>
                      <Grid item xs={8} sm={8} lg={8}>
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          clients={clients}
                          sx={{ ml: "20px" }}
                        >
                          {dataLoaded ? clients.financials.IBAN : ""}
                        </Typography>
                      </Grid>
                    </Grid>
                    {/* IBAN End */}

                    {/* Bank Name Start */}
                    <Grid container sx={{ mb: "40px" }}>
                      <Grid item xs={2} sm={2} lg={3}>
                        <Typography
                          variant="h5"
                          fontWeight="normal"
                          textAlign="right"
                        >
                          Bank:
                        </Typography>
                      </Grid>
                      <Grid item xs={8} sm={8} lg={8}>
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          clients={clients}
                          sx={{ ml: "20px" }}
                        >
                          {dataLoaded ? clients.financials.bankName : ""}
                        </Typography>
                      </Grid>
                    </Grid>
                    {/* Bank Name End */}
                    {/* Financials End */}
                  </Box>
                </Box>

                {/* Contact Start */}
                <Grid
                  container
                  direction="row"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item xs={6} sm={6} lg={6}>
                    <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                      <CardHeader title="Contact Persons" />
                    </Box>
                  </Grid>
                </Grid>

                <Divider />
                <Grid
                  container
                  direction="row"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item lg={6}>
                    <Box p={0}>
                      <Box
                        sx={{
                          minHeight: { xs: 0, md: 243 },
                        }}
                        p={2}
                      >
                        <Card sx={{ height: "200px" }}>
                          <Chip
                            color="success"
                            label={
                              dataLoaded ? clients.contact[0].contactRole : ""
                            }
                            style={{ borderRadius: "0 0 16px 0" }}
                          />
                          <Grid
                            container
                            direction="row"
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Grid item lg={1} sx={{ mx: "10px" }}>
                              <Avatar sx={{ width: 48, height: 48 }} />
                            </Grid>
                            <Grid item lg={8}>
                              <Typography
                                variant="h5"
                                fontWeight="bold"
                                clients={clients}
                                sx={{ lineHeight: "27px", mt: "10px" }}
                              >
                                {dataLoaded
                                  ? clients.contact[0].contactName
                                  : ""}
                              </Typography>
                              <Typography
                                variant="h6"
                                fontWeight="normal"
                                clients={clients}
                                sx={{ lineHeight: "27px" }}
                              >
                                {dataLoaded
                                  ? clients.contact[0].contactEMail
                                  : ""}
                              </Typography>
                              <Typography
                                variant="h6"
                                fontWeight="normal"
                                clients={clients}
                                sx={{ lineHeight: "27px" }}
                              >
                                {dataLoaded
                                  ? clients.contact[0].contactPhoneNumber
                                  : ""}
                              </Typography>
                              <Typography
                                variant="h6"
                                fontWeight="normal"
                                clients={clients}
                                sx={{ lineHeight: "27px" }}
                              >
                                {dataLoaded
                                  ? clients.contact[0].contactDepartment
                                  : ""}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Card>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item lg={6}>
                    <Box p={0}>
                      <Box
                        sx={{
                          minHeight: { xs: 0, md: 243 },
                        }}
                        p={2}
                      >
                        <Card sx={{ height: "200px" }}>
                          <Grid
                            container
                            display="flex"
                            alignItems="center"
                            justifyContent="space-around"
                          >
                            <Grid item lg={6}>
                              <Chip
                                color="success"
                                label={
                                  dataLoaded
                                    ? clients.contact[0].contactRole
                                    : ""
                                }
                                style={{ borderRadius: "0 0 16px 0" }}
                              />
                            </Grid>
                            <Grid item lg={6}>
                              <Avatar
                                sx={{
                                  width: 48,
                                  height: 48,
                                  ml: "auto",
                                }}
                              />
                            </Grid>
                          </Grid>
                          {/*  <Box sx={{ ml: "10px" }}>
                            <Typography
                              variant="h5"
                              fontWeight="bold"
                              clients={clients}
                              sx={{ lineHeight: "27px", mt: "10px" }}
                            >
                              {dataLoaded ? clients.contact[1].contactName : ""}
                            </Typography>
                            <Typography
                              variant="h6"
                              fontWeight="normal"
                              clients={clients}
                              sx={{ lineHeight: "27px" }}
                            >
                              {dataLoaded
                                ? clients.contact[1].contactEMail
                                : ""}
                            </Typography>
                            <Typography
                              variant="h6"
                              fontWeight="normal"
                              clients={clients}
                              sx={{ lineHeight: "27px" }}
                            >
                              {dataLoaded
                                ? clients.contact[1].contactPhoneNumber
                                : ""}
                            </Typography>
                            <Typography
                              variant="h6"
                              fontWeight="normal"
                              clients={clients}
                              sx={{ lineHeight: "27px" }}
                            >
                              {dataLoaded
                                ? clients.contact[1].contactDepartment
                                : ""}
                            </Typography>
                          </Box> */}
                        </Card>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                {/* Contact End */}
              </>
            ) : null}
          </Card>
        </Grid>

        {/* Recent Activity */}

        <Grid item xs={12} sm={6} lg={4}>
          <Card sx={{ minHeight: "450px" }}>
            <CardHeader title="Recent Activity" />
            <Divider />
            <Box p={2}>
              <Box
                sx={{
                  minHeight: { xs: 0, md: 243 },
                }}
                p={2}
              >
                {/* Orders Start*/}
                <Grid container>
                  <Grid container>
                    <Grid item lg={2}>
                      <ShoppingBagTwoToneIcon
                        sx={{
                          backgroundColor: "#E8F1FF",
                          fontSize: "64px",
                          borderRadius: "50%",
                          py: "20px",
                          px: "20px",
                        }}
                        color="primary"
                      />
                    </Grid>
                    <Grid item lg={10}>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{ ml: "30px" }}
                      >
                        Orders
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item lg={2}></Grid>
                    <Grid item lg={2} sx={{ mt: "-30px" }}>
                      <Typography fontWeight="Light" sx={{ ml: "30px" }}>
                        Total
                      </Typography>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{ fontSize: 20, ml: "30px" }}
                      >
                        {orders.length}
                      </Typography>
                    </Grid>
                    <Grid item lg={2} sx={{ mt: "-30px" }}>
                      <Typography fontWeight="Light" sx={{ ml: "30px" }}>
                        Activ
                      </Typography>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{ fontSize: 20, ml: "30px" }}
                      >
                        {activeOrders.length}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Orders End */}
                <Divider variant="middle" sx={{ my: "20px" }} />
                {/* Previous Orders Start*/}
                <Grid container>
                  <Grid container>
                    <Grid item lg={2}>
                      <ShoppingBagTwoToneIcon
                        sx={{
                          backgroundColor: "#E8F1FF",
                          fontSize: "64px",
                          borderRadius: "50%",
                          py: "20px",
                          px: "20px",
                        }}
                        color="primary"
                      />
                    </Grid>
                    <Grid item lg={10}>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{ ml: "30px" }}
                      >
                        Previous Orders
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item lg={2}></Grid>
                    <Grid item lg={2} sx={{ mt: "-30px" }}>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{ fontSize: 20, ml: "30px" }}
                      >
                        {finishedOrders.length}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Previous Orders End */}
                <Divider variant="middle" sx={{ my: "20px" }} />
                {/* Upcoming Orders Start */}
                <Grid container>
                  <Grid container>
                    <Grid item lg={2}>
                      <ShoppingBagTwoToneIcon
                        sx={{
                          backgroundColor: "#E8F1FF",
                          fontSize: "64px",
                          borderRadius: "50%",
                          py: "20px",
                          px: "20px",
                        }}
                        color="primary"
                      />
                    </Grid>
                    <Grid item lg={10}>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{ ml: "30px" }}
                      >
                        Upcoming Orders
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item lg={2}></Grid>
                    <Grid item lg={2} sx={{ mt: "-30px" }}>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{ fontSize: 20, ml: "30px" }}
                      >
                        {upcomingOrders.lenght}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Upcoming Orders End */}
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default ClientDetails;

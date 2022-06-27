import {
  Box,
  Button,
  Typography,
  Card,
  CardHeader,
  Divider,
  Grid,
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

function ClientPersonDetails() {
  const { t } = useTranslation();
  const [clients, setClients] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const { clientID } = useParams();

  // Fetch Data

  const getClient = async () => {
    try {
      const response = await axios.get("/api/v1/client/", {
        params: {
          clientID,
        },
      });
      console.log("res: ", response);

      setClients(response.data.data[14]);
      setDataLoaded(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getClient();
  }, []);

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
                  <Button href="#text-buttons">Edit</Button>
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
                  <Grid item xs={2} sm={2} lg={2}>
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
                      {clients.clientName}
                    </Typography>
                  </Grid>
                </Grid>
                {/* Client Name End */}

                {/* Client Email Start */}
                <Grid container sx={{ mb: "20px" }}>
                  <Grid item xs={2} sm={2} lg={2}>
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
                  <Grid item xs={2} sm={2} lg={2}>
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
                  <Grid item xs={2} sm={2} lg={2}>
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
                  <Grid item xs={2} sm={2} lg={2}>
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
                        sx={{ ml: "10px" }}
                      >
                        Orders
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item lg={2}></Grid>
                    <Grid item lg={2} sx={{ mt: "-30px" }}>
                      <Typography fontWeight="Light" sx={{ ml: "10px" }}>
                        Total
                      </Typography>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{ fontSize: 20, ml: "10px" }}
                      >
                        12
                      </Typography>
                    </Grid>
                    <Grid item lg={2} sx={{ mt: "-30px" }}>
                      <Typography fontWeight="Light" sx={{ ml: "10px" }}>
                        Activ
                      </Typography>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{ fontSize: 20, ml: "10px" }}
                      >
                        12
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
                        sx={{ ml: "10px" }}
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
                        sx={{ fontSize: 20, ml: "10px" }}
                      >
                        435
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
                        sx={{ ml: "10px" }}
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
                        sx={{ fontSize: 20, ml: "10px" }}
                      >
                        1
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

export default ClientPersonDetails;

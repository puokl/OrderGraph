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
import axios from "src/utils/axios";

function ClientDetails() {
  const { t } = useTranslation();
  const [clients, setClients] = useState([]);
  const { clientID } = useParams();

  // Fetch Data

  const getClient = async () => {
    try {
      const response = await axios.get("/api/client", {
        params: {
          clientID,
        },
      });
      console.log(response);

      setClients(response.data.client);
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
        <Grid item xs={12} sm={6} lg={8}>
          <Card>
            <Button href="#text-buttons" sx={{ ml: 70 }}>
              Edit
            </Button>
            <CardHeader title="Person" />
            <Divider />
            <Box p={2}>
              <Typography variant="caption" fontWeight="normal">
                "{t("Favourite")}"
              </Typography>
              <Box
                sx={{
                  minHeight: { xs: 0, md: 243 },
                }}
                p={2}
              >
                <Typography variant="h5" fontWeight="normal" clients={clients}>
                  Name : {clients.clientName}
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    py: 1,
                  }}
                  fontWeight="normal"
                >
                  Phone Number: {clients.phone}
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    py: 1,
                  }}
                  fontWeight="normal"
                >
                  EMail: {clients.email}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    py: 1,
                  }}
                  fontWeight="normal"
                >
                  Billing Adress: <br></br>
                  {/*                   city: {clients.billingAddress.city} <br></br>
                  country: {clients.billingAddress.country} <br></br>
                  Zip: {clients.billingAddress.postCode} <br></br>
                  Street: {clients.billingAddress.street} */}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    py: 1,
                  }}
                  fontWeight="normal"
                >
                  {/*                   Shipping Adress: <br></br>
                  Street: {clients.shippingAddress.street} <br></br>
                  Zip: {clients.shippingAddress.postCode} <br></br>
                  City: {clients.shippingAddress.city} <br></br> */}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    py: 1,
                  }}
                  fontWeight="normal"
                >
                  Additional Information: Blah to the Blabla
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Recent Activity */}

        <Grid item xs={12} sm={6} lg={4}>
          <Card>
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
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="stretch"
                  spacing={4}
                >
                  <Grid item sx={{ mt: "-15px" }}>
                    <ShoppingBagTwoToneIcon
                      sx={{
                        backgroundColor: "#E8F1FF",
                        fontSize: "64px",
                        borderRadius: "50%",
                        py: "20px",
                        px: "20px",
                        mr: "-17px",
                      }}
                      color="primary"
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" fontWeight="bold">
                      Orders
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="stretch"
                  spacing={4}
                >
                  <Grid item sx={{ mt: "-25px" }}>
                    Total <br />
                    12
                  </Grid>
                  <Grid item sx={{ mt: "-25px" }}>
                    <Typography variant="h5" fontWeight="bold">
                      Activ <br />
                      12
                    </Typography>
                  </Grid>
                </Grid>
                {/* Orders End */}
                <Divider variant="middle" sx={{ my: "20px" }} />
                {/* Previous Orders Start*/}
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="stretch"
                  spacing={4}
                >
                  <Grid item>
                    <ShoppingBagTwoToneIcon
                      sx={{
                        backgroundColor: "#E8F1FF",
                        fontSize: "64px",
                        borderRadius: "50%",
                        py: "20px",
                        px: "20px",
                        mr: "-17px",
                      }}
                      color="primary"
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" fontWeight="bold">
                      Previous Orders <br />
                      435
                    </Typography>
                  </Grid>
                </Grid>
                {/* Previous Orders End */}
                <Divider variant="middle" sx={{ my: "20px" }} />
                {/* Upcoming Orders Start*/}
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="stretch"
                  spacing={4}
                >
                  <Grid item>
                    <ShoppingBagTwoToneIcon
                      sx={{
                        backgroundColor: "#E8F1FF",
                        fontSize: "64px",
                        borderRadius: "50%",
                        py: "20px",
                        px: "20px",
                        mr: "-17px",
                      }}
                      color="primary"
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" fontWeight="bold">
                      Upcoming Orders <br />1
                    </Typography>
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

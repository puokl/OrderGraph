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
import PageHeader from "./PageHeader";
import { Helmet } from "react-helmet-async";
import { useState, useEffect, useCallback } from "react";
import axios from "src/utils/axios2";
import useAuth from "src/hooks/useAuth";

function Organization() {
  const { t } = useTranslation();
  const [org, setOrg] = useState([]);

  const { user } = useAuth();

  // Fetch Data

  const getOrg = async () => {
    try {
      const response = await axios.get(
        "/api/v1/organization/" + user.organization
      );
      console.log(response);

      setOrg(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getOrg();
  }, []);

  return (
    <>
      <Helmet>
        <title>Organization</title>
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
            <CardHeader
              title="Organization"
              subheader="Manage informations related to your organization"
            />
            <Divider />
            <Box p={2}>
              <Box
                sx={{
                  minHeight: { xs: 0, md: 243 },
                }}
                p={2}
              >
                <Typography variant="h5" fontWeight="normal">
                  Name : {org.orgName}
                </Typography>
                <Typography variant="h5" fontWeight="normal">
                  Size : {org.orgSize}
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    py: 1,
                  }}
                  fontWeight="normal"
                >
                  Phone Number: {org.phone}
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    py: 1,
                  }}
                  fontWeight="normal"
                >
                  Email: {org.email}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    py: 1,
                  }}
                  fontWeight="normal"
                >
                  Website: {org.website}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    py: 1,
                  }}
                  fontWeight="normal"
                >
                  Billing Adress: <br></br>
                  {/* Street: {org.address.streetAddress}
                  City: {org.address.city} <br></br>
                  Country: {org.address.country} <br></br>
                  Zip: {org.address.zip} <br></br> */}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    py: 1,
                  }}
                  fontWeight="normal"
                >
                  Shipping Adress: <br></br>
                  {/* Street: {org.workPlaceAddress.streetAddress} <br></br>
                  City: {org.workplaceAddress.city} <br></br>
                  Country: {org.workplaceAddress.country} <br></br>
                  Zip: {org.workplaceAddress.zip} <br></br> */}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    py: 1,
                  }}
                  fontWeight="normal"
                >
                  More
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Organization;

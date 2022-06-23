import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "src/utils/axios2";
import { styled } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import {
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Box,
  Card,
  CardHeader,
  Divider,
  Chip,
  Button,
  Fab,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PageTitleWrapper from "src/components/PageTitleWrapper";

import PageHeader from "./PageHeader";

const BoxActions = styled(Box)(
  ({ theme }) => `
      background: white;
      padding-top: 2rem;
      padding-bottom: 2rem;
    //   border-radius: 25%;
    //   box-shadow: ${theme.colors.shadows.primary};
  `
);

function CreateOrder() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");

  const handleCreateUserOpen = (user) => {
    setOpen(true);
  };

  const handleClientSelect = (index) => {
    setSelectedClient(clients[index]);
    console.log(selectedClient);
  };

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
          // justifyContent="center"
          alignItems="flex-start"
          spacing={4}
        >
          <Grid item xs={12} sm={6} lg={8}>
            <Typography variant="h3" component="h3" gutterBottom>
              {t("Calendar")}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} lg={8}>
            <Typography variant="h3" component="h3" gutterBottom>
              {t("Client")}
            </Typography>
            <Card sx={{ p: "1.5rem" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  {t("Select client...")}
                </InputLabel>
                <Select
                  label={t("Select client...")}
                  value={selectedClient ? selectedClient.clientName : ""}
                  // onChange={(e) => {
                  //   handleClientSelect(e);
                  // }}
                >
                  {clients.map((client, index) => (
                    <MenuItem
                      key={client._id}
                      value={client.clientName}
                      onClick={(e) => {
                        handleClientSelect(index);
                      }}
                    >
                      {client.clientName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {selectedClient ? (
                <Card sx={{ mt: "1rem" }}>
                  <Chip
                    color="success"
                    label={selectedClient.clientType}
                    style={{ borderRadius: "0 0 16px 0" }}
                  />
                  <Button
                    color="primary"
                    variant="contained"
                    style={{
                      marginLeft: "auto",
                      padding: ".2rem 1rem .2rem 1rem",
                    }}
                  >
                    {t("Edit client")}
                  </Button>
                  <Button aria-label="Delete" size="small" color="primary">
                    <CloseIcon color="primary" />
                  </Button>
                  <Divider />
                  <Box
                    p={2}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Box
                      sx={{
                        minHeight: { xs: 0, md: 243 },
                      }}
                      p={2}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          py: 1,
                        }}
                        fontWeight="normal"
                      >
                        Phone Number:
                      </Typography>

                      <Typography
                        variant="h5"
                        sx={{
                          py: 1,
                        }}
                        fontWeight="normal"
                      >
                        Email:
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          py: 1,
                        }}
                        fontWeight="normal"
                      >
                        Billing Adress: <br></br>
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          py: 1,
                        }}
                        fontWeight="normal"
                      >
                        Shipping Adress: <br></br>
                      </Typography>
                    </Box>
                    <Divider orientation="vertical" />
                  </Box>
                </Card>
              ) : null}
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={8}>
            <Typography variant="h3" component="h3" gutterBottom>
              {t("Items")}
            </Typography>
            <Card sx={{ p: "1.5rem" }}></Card>
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

export default CreateOrder;

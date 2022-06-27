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
  CardActionArea,
  CardContent,
  Tooltip,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
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

const AvatarAddWrapper = styled(Avatar)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        color: ${theme.colors.primary.main};
        // width: ${theme.spacing(8)};
        // height: ${theme.spacing(8)};
`
);

const CardAddAction = styled(Card)(
  ({ theme }) => `
        border: ${theme.colors.primary.main} dashed 1px;
        flex: 1;
        color: ${theme.colors.primary.main};
        
        .MuiCardActionArea-root {
          height: 100%;
          justify-content: center;
          align-items: center;
          display: flex;
        }
        
        .MuiTouchRipple-root {
          opacity: .2;
        }
        
        &:hover {
          border-color: ${theme.colors.alpha.black[100]};
        }
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
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-end",
                      marginTop: "-2rem",
                    }}
                  >
                    <Button
                      color="primary"
                      variant="contained"
                      style={{
                        marginLeft: "auto",
                        padding: ".2rem 1rem .2rem 1rem",
                        marginRight: "1rem",
                      }}
                    >
                      {t("Edit client")}
                    </Button>
                    <Button
                      aria-label="Delete"
                      size="small"
                      color="primary"
                      style={{
                        backgroundColor: "rgba(85, 105, 255, 0.1)",
                        minWidth: "0",
                        padding: ".3rem ",
                        marginRight: "1rem",
                      }}
                    >
                      <CloseIcon
                        color="primary"
                        onClick={() => setSelectedClient("")}
                      />
                    </Button>
                  </Box>
                  <Typography
                    variant="h3"
                    sx={{
                      px: "1.2rem",
                      py: ".2rem",
                    }}
                    fontWeight="bold"
                  >
                    {selectedClient.clientName}
                  </Typography>
                  <Box
                    p={2}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "0.2rem 1.2rem 0.2rem 1.2rem",
                    }}
                  >
                    <Box
                      sx={{
                        minWidth: { xs: 0, md: 160 },
                        color: "rgba(0, 0, 0, 0.5)",
                      }}
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
                        Billing Address: <br></br>
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          py: 1,
                        }}
                        fontWeight="normal"
                      >
                        Shipping Address: <br></br>
                      </Typography>
                    </Box>
                    <Divider orientation="vertical" />
                    <Box
                      sx={{
                        minWidth: { xs: 0, md: 160 },
                        px: "1.5rem",
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          py: 1,
                        }}
                        fontWeight="normal"
                      >
                        {selectedClient.clientPhoneNumber}
                      </Typography>

                      <Typography
                        variant="h5"
                        sx={{
                          py: 1,
                        }}
                        fontWeight="normal"
                      >
                        {selectedClient.clientEMail}
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          py: 1,
                        }}
                        fontWeight="normal"
                      >
                        {selectedClient.billingAddress.Address +
                          ", " +
                          selectedClient.billingAddress.City +
                          ", " +
                          selectedClient.billingAddress.Zip}
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          py: 1,
                        }}
                        fontWeight="normal"
                      >
                        {selectedClient.shippingAddress.Address +
                          ", " +
                          selectedClient.shippingAddress.City +
                          ", " +
                          selectedClient.shippingAddress.Zip}
                      </Typography>
                    </Box>
                  </Box>
                  {selectedClient.clientType === "Company" ? (
                    <>
                      <Divider />
                      <Typography
                        variant="h3"
                        sx={{
                          px: "1.2rem",
                          py: ".2rem",
                        }}
                        fontWeight="bold"
                      >
                        {t("Contact Person")}
                      </Typography>
                      <Box
                        p={2}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          padding: "0.2rem 1.2rem 0.2rem 1.2rem",
                        }}
                      >
                        <Box
                          sx={{
                            minWidth: { xs: 0, md: 160 },
                            color: "rgba(0, 0, 0, 0.5)",
                          }}
                        >
                          <Typography
                            variant="h5"
                            sx={{
                              py: 1,
                            }}
                            fontWeight="normal"
                          >
                            Name:
                          </Typography>
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
                            Role
                          </Typography>
                        </Box>
                        <Divider orientation="vertical" />
                        <Box
                          sx={{
                            minWidth: { xs: 0, md: 160 },
                            px: "1.5rem",
                          }}
                        >
                          <Typography
                            variant="h5"
                            sx={{
                              py: 1,
                            }}
                            fontWeight="normal"
                          >
                            {selectedClient.contact[0].contactName}
                          </Typography>

                          <Typography
                            variant="h5"
                            sx={{
                              py: 1,
                            }}
                            fontWeight="normal"
                          >
                            {selectedClient.contact[0].contactPhoneNumber}
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{
                              py: 1,
                            }}
                            fontWeight="normal"
                          >
                            {selectedClient.contact[0].contactEMail}
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{
                              py: 1,
                            }}
                            fontWeight="normal"
                          >
                            {selectedClient.contact[0].contactRole}
                          </Typography>
                        </Box>
                      </Box>
                    </>
                  ) : null}
                </Card>
              ) : null}
            </Card>
          </Grid>
          <Grid item xs={8} sm={4} lg={4}>
            <Typography variant="h3" component="h3" gutterBottom>
              {t(" ")}
            </Typography>

            <Card sx={{ p: "1.5rem" }}>
              <Typography
                variant="h4"
                component="h4"
                gutterBottom
                sx={{
                  py: 1,
                }}
              >
                {t("Order")}
              </Typography>
              <Typography
                variant="h5"
                gutterBottom
                fontWeight="normal"
                sx={{
                  py: 1,
                }}
              >
                {t("Status")}
              </Typography>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Button variant="outlined" color="secondary" sx={{ mb: 1 }}>
                  Save draft
                </Button>
                <Button variant="contained" color="primary">
                  Activate
                </Button>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} lg={8}>
            <Typography variant="h3" component="h3" gutterBottom>
              {t("Items")}
            </Typography>

            <Grid
              item
              xs={12}
              sm={6}
              lg={8}
              sx={{
                minWidth: "100%",
              }}
            >
              <Tooltip arrow title={t("Click to add a new item")}>
                <CardAddAction>
                  <CardActionArea
                    sx={{
                      px: 1,
                    }}
                    onClick={(e) => {
                      console.log("hi");
                    }}
                  >
                    <CardContent xs={12} sm={6} lg={8}>
                      <AvatarAddWrapper>
                        <AddTwoToneIcon fontSize="medium" />
                      </AvatarAddWrapper>
                    </CardContent>
                  </CardActionArea>
                </CardAddAction>
              </Tooltip>
            </Grid>
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

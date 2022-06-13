import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  styled,
  Tooltip,
} from "@mui/material";

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import BillingAdress from "./formComponents/BillingAdress";
import ClientDetails from "./formComponents/ClientDetails";
import ContactPerson from "./formComponents/ContactPerson";
import Financials from "./formComponents/Financials";
import ShippingAdress from "./formComponents/ShippingAdress";
import PageHeader from "./PageHeader";

function AddClient() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [showContact, setShowContact] = useState(false);
  const [showShipping, setShowShipping] = useState(true);
  const [contactPersonNo, setContactPersonNo] = useState(1);
  const [formData, setFormData] = useState("");
  const updateFields = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);
    setFormData({ ...formData, fieldValue });
  };
  const navigate = useNavigate();
  const navigateToClientOverview = () => {
    navigate("/clients/overview");
  };

  const handleShowShipping = (e) => {
    setShowShipping(!showShipping);
  };

  const handleShowContact = (value) => {
    console.log(value);
    setShowContact(value);
  };

  const handleAddContact = () => {
    console.log("twest:", contactPersonNo);
    setContactPersonNo(contactPersonNo + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (clientName) {
      console.log(clientName);
    }
  };

  const roleTags = [
    { title: "CEO" },
    { title: "Management" },
    { title: "Worker" },
  ];

  const statusOptions = [
    {
      id: "all",
      name: "All",
    },
    {
      id: "not_started",
      name: t("Not started"),
    },
    {
      id: "completed",
      name: t("Completed"),
    },
    {
      id: "in_progress",
      name: t("In Progress"),
    },
  ];

  const CardAddAction = styled(Card)(
    ({ theme }) => `
          border: ${theme.colors.primary.main} dashed 2px;
          height: 80%;
          color: ${theme.colors.primary.main};
          transition: ${theme.transitions.create(["all"])};
  
  
  
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
            border-color: ${theme.colors.alpha.black[70]};
          }
  `
  );

  const AvatarAddWrapper = styled(Avatar)(
    ({ theme }) => `
          background: ${theme.colors.alpha.black[5]};
          color: ${theme.colors.primary.main};
          width: ${theme.spacing(5)};
          height: ${theme.spacing(5)};
  `
  );
  /*   const getClient = useCallback(async () => {
    try {
      const response = await axios.get("/api/clients");
      console.log(response);
      setClients(response.data.clients);
    } catch (err) {
      console.error(err);
    }
  });

  getClient(); */

  /* CREATE NEW FIELDS FOR EACH CONTACT PERSON */
  let ContactPersonList = [];
  for (let i = 0; i < contactPersonNo; i++) {
    ContactPersonList.push(
      <ContactPerson updateFields={updateFields} id={i} />
    );
  }
  return (
    <>
      <Helmet>
        <title>Add new Client</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
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
          <Grid item xs={12}>
            <Card
              sx={{
                p: 1,
                mb: 3,
              }}
            >
              <ClientDetails
                handleShowContact={handleShowContact}
                updateFields={updateFields}
              />
              <BillingAdress updateFields={updateFields} />

              <ShippingAdress updateFields={updateFields} />

              {showContact ? (
                <>
                  <Financials updateFields={updateFields} />
                  {ContactPersonList}
                  {/* Add Contact Person Start */}
                  <Grid
                    container
                    direction="row"
                    spacing={1}
                    sx={{ justifyContent: "flex-start" }}
                  >
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={6}
                      sx={{ py: 2, px: 2, mt: 2, ml: 1 }}
                    >
                      <Tooltip
                        arrow
                        title={t("Click to add a new Contact Person")}
                      >
                        <CardAddAction>
                          <CardActionArea
                            sx={{
                              px: 1,
                            }}
                            onClick={handleAddContact}
                          >
                            <CardContent>
                              <AvatarAddWrapper>
                                <AddTwoToneIcon fontSize="medium" />
                              </AvatarAddWrapper>
                            </CardContent>
                          </CardActionArea>
                        </CardAddAction>
                      </Tooltip>
                    </Grid>
                  </Grid>
                  ;{/* Add Contact Person End */}
                </>
              ) : null}

              <Button
                sx={{
                  mt: { lg: 2, md: 0 },
                  ml: { lg: 2 },
                  mb: { lg: 2 },
                }}
                variant="outlined"
                color="primary"
                onClick={navigateToClientOverview}
              >
                Cancel
              </Button>

              <Button
                sx={{
                  mt: { lg: 2, md: 0 },
                  ml: { lg: 110 },
                  mb: { lg: 2 },
                  px: { lg: 4 },
                }}
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </Card>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default AddClient;

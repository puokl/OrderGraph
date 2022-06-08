import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  Dialog,
  CardHeader,
  Grid,
  IconButton,
  lighten,
  Slide,
  styled,
  TextField,
  Divider,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import React, { forwardRef, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import PageHeader from "./PageHeader";
import axios from "src/utils/axios";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ClientDetails from "./formComponents/ClientDetails";
import BillingAdress from "./formComponents/BillingAdress";
import ShippingAdress from "./formComponents/ShippingAdress";
import Financials from "./formComponents/Financials";
import ContactPerson from "./formComponents/ContactPerson";

const handleQueryChange = (event) => {
  event.persist();
  setQuery(event.target.value);
};

const DialogWrapper = styled(Dialog)(
  () => `
        .MuiDialog-paper {
          overflow: visible;
        }
  `
);

const AvatarError = styled(Avatar)(
  ({ theme }) => `
        background-color: ${theme.colors.error.lighter};
        color: ${theme.colors.error.main};
        width: ${theme.spacing(12)};
        height: ${theme.spacing(12)};
  
        .MuiSvgIcon-root {
          font-size: ${theme.typography.pxToRem(45)};
        }
  `
);

const CardWrapper = styled(Card)(
  ({ theme }) => `
  
    position: relative;
    overflow: visible;
  
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      border-radius: inherit;
      z-index: 1;
      transition: ${theme.transitions.create(["box-shadow"])};
    }
        
      &.Mui-selected::after {
        box-shadow: 0 0 0 3px ${theme.colors.primary.main};
      }
    `
);

const ButtonError = styled(Button)(
  ({ theme }) => `
       background: ${theme.colors.error.main};
       color: ${theme.palette.error.contrastText};
  
       &:hover {
          background: ${theme.colors.error.dark};
       }
      `
);

const IconButtonError = styled(IconButton)(
  ({ theme }) => `
       background: ${theme.colors.error.lighter};
       color: ${theme.colors.error.main};
       padding: ${theme.spacing(0.75)};
  
       &:hover {
        background: ${lighten(theme.colors.error.lighter, 0.4)};
       }
  `
);

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const getProjectStatusLabel = (projectStatus) => {
  const map = {
    not_started: {
      text: "Not started",
      color: "error",
    },
    in_progress: {
      text: "In progress",
      color: "info",
    },
    completed: {
      text: "Completed",
      color: "success",
    },
  };

  const { text, color } = map[projectStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (projects, query, filters) => {
  return projects.filter((project) => {
    let matches = true;

    if (query) {
      const properties = ["name"];
      let containsQuery = false;

      properties.forEach((property) => {
        if (project[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (filters.status && project.status !== filters.status) {
        matches = false;
      }

      if (!containsQuery) {
        matches = false;
      }
    }

    Object.keys(filters).forEach((key) => {
      const value = filters[key];

      if (value && project[key] !== value) {
        matches = false;
      }
    });

    return matches;
  });
};

const applyPagination = (projects, page, limit) => {
  return projects.slice(page * limit, page * limit + limit);
};

const handleStatusChange = (e) => {
  let value = null;

  if (e.target.value !== "all") {
    value = e.target.value;
  }

  setFilters((prevFilters) => ({
    ...prevFilters,
    status: value,
  }));
};

const handleSelectAllProjects = (event) => {
  setSelectedProjects(
    event.target.checked ? projects.map((project) => project.id) : []
  );
};

const handleSelectOneProject = (_event, projectId) => {
  if (!selectedItems.includes(projectId)) {
    setSelectedProjects((prevSelected) => [...prevSelected, projectId]);
  } else {
    setSelectedProjects((prevSelected) =>
      prevSelected.filter((id) => id !== projectId)
    );
  }
};

const handlePageChange = (_event, newPage) => {
  setPage(newPage);
};

const handleLimitChange = (event) => {
  setLimit(parseInt(event.target.value));
};

function AddNewClient() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [showContact, setShowContact] = useState(false);
  const [showShipping, setShowShipping] = useState(true);
  const navigate = useNavigate();
  const navigateToClientOverview = () => {
    navigate("/clients/overview");
  };

  const handleShowShipping = (e) => {
    setShowShipping(!showShipping);
    console.log(e.target.checked);
  };

  const handleShowContact = (e) => {
    setShowContact(!showContact);
    console.log(e.target.checked);
  };

  const projectTags = [{ title: "Person" }, { title: "Company" }];
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

  const getClient = useCallback(async () => {
    try {
      const response = await axios.get("/api/clients");
      console.log(response);
      setClients(response.data.clients);
    } catch (err) {
      console.error(err);
    }
  });

  getClient();

  // define states and styles
  return (
    <>
      <Helmet>
        <title>Add new Client</title>
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
        <Grid item xs={12}>
          <Card
            sx={{
              p: 1,
              mb: 3,
            }}
          >
            <CardHeader title="Client Details" />
            <Grid container spacing={1}>
              {/* Client Type */}
              <Grid item xs={12} sm={6} md={6}>
                <Box p={1}>
                  <Autocomplete
                    /* multiple */
                    sx={{
                      m: 0,
                    }}
                    limitTags={2}
                    onInputChange={(e) => handleShowContact(e)}
                    options={projectTags}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        variant="outlined"
                        label={t("Client type")}
                        placeholder={t("Select client type...")}
                      />
                    )}
                  />
                </Box>
              </Grid>
              {/* Client Name */}
              <Grid item xs={12} sm={6} md={6}>
                <Box p={1}>
                  <TextField
                    sx={{
                      m: 0,
                    }}
                    placeholder={t("Client Name...")}
                    fullWidth
                    variant="outlined"
                    label="Client Name"
                    id="clientName"
                  />
                </Box>
              </Grid>
              {/* E-Mail */}
              <Grid item xs={12} sm={6} md={6}>
                <Box p={1}>
                  <TextField
                    sx={{
                      m: 0,
                    }}
                    placeholder={t("E-Mail...")}
                    fullWidth
                    variant="outlined"
                    label="E-Mail"
                    id="E-Mail"
                  />
                </Box>
              </Grid>
              {/* Phone  Number */}
              <Grid item xs={12} sm={6} md={6}>
                <Box p={1}>
                  <TextField
                    sx={{
                      m: 0,
                    }}
                    placeholder={t("Phone Number...")}
                    fullWidth
                    variant="outlined"
                    label="Phone Number"
                    id="PhoneNumber"
                  />
                </Box>
              </Grid>
              <CardHeader title="Billing Adress" sx={{ pl: 3 }} />
              <Grid container spacing={1} sx={{ px: 1 }}>
                {/* Billing Adress */}
                {/* Adresse */}

                <Grid item xs={12} sm={6} md={6}>
                  <Box p={1}>
                    <TextField
                      sx={{
                        m: 0,
                      }}
                      placeholder={t("Adresse ...")}
                      fullWidth
                      variant="outlined"
                      label="Adresse"
                      id="Adresse"
                    />
                  </Box>
                </Grid>

                {/* ZIP */}

                <Grid item xs={12} sm={6} md={6}>
                  <Box p={1}>
                    <TextField
                      sx={{
                        m: 0,
                      }}
                      placeholder={t("Zip...")}
                      fullWidth
                      variant="outlined"
                      label="Zip"
                      id="Zip"
                    />
                  </Box>
                </Grid>

                {/* City */}

                <Grid item xs={12} sm={6} md={6}>
                  <Box p={1}>
                    <TextField
                      sx={{
                        m: 0,
                      }}
                      placeholder={t("City...")}
                      fullWidth
                      variant="outlined"
                      label="City"
                      id="City"
                    />
                  </Box>
                </Grid>

                {/* State */}

                <Grid item xs={12} sm={6} md={6}>
                  <Box p={1}>
                    <TextField
                      sx={{
                        m: 0,
                      }}
                      placeholder={t("State...")}
                      fullWidth
                      variant="outlined"
                      label="State"
                      id="State"
                    />
                  </Box>
                </Grid>

                {/* Additional Information */}

                <Grid item xs={12}>
                  <Box p={1}>
                    <TextField
                      sx={{
                        m: 0,
                      }}
                      placeholder={t("Additional Information...")}
                      fullWidth
                      variant="outlined"
                      label="Additional Information"
                      id="AdditionalInformation"
                      multiline={true}
                      rows={3}
                    />
                  </Box>
                </Grid>
              </Grid>

              {/* Shipping Adresse */}

              <CardHeader title="Shipping Adresse" sx={{ pl: 3 }} />
              <Grid container spacing={1} sx={{ px: 1 }}>
                <Grid item xs={12} sm={12} md={12}>
                  <Box>
                    <FormControlLabel
                      control={
                        <Checkbox onChange={(e) => handleShowShipping(e)} />
                      }
                      label="Same as headquarter"
                      sx={{ pl: 2 }}
                    />
                  </Box>
                </Grid>

                {showShipping ? (
                  <>
                    {/* Adresse */}
                    <Grid item xs={12} sm={6} md={6}>
                      <Box p={1}>
                        <TextField
                          sx={{
                            m: 0,
                          }}
                          placeholder={t("Adresse ...")}
                          fullWidth
                          variant="outlined"
                          label="Adresse"
                          id="Adresse"
                        />
                      </Box>
                    </Grid>

                    {/* ZIP */}

                    <Grid item xs={12} sm={6} md={6}>
                      <Box p={1}>
                        <TextField
                          sx={{
                            m: 0,
                          }}
                          placeholder={t("Zip...")}
                          fullWidth
                          variant="outlined"
                          label="Zip"
                          id="Zip"
                        />
                      </Box>
                    </Grid>

                    {/* City */}

                    <Grid item xs={12} sm={6} md={6}>
                      <Box p={1}>
                        <TextField
                          sx={{
                            m: 0,
                          }}
                          placeholder={t("City...")}
                          fullWidth
                          variant="outlined"
                          label="City"
                          id="City"
                        />
                      </Box>
                    </Grid>

                    {/* State */}

                    <Grid item xs={12} sm={6} md={6}>
                      <Box p={1}>
                        <TextField
                          sx={{
                            m: 0,
                          }}
                          placeholder={t("State...")}
                          fullWidth
                          variant="outlined"
                          label="State"
                          id="State"
                        />
                      </Box>
                    </Grid>

                    {/* Additional Information */}

                    <Grid item xs={12}>
                      <Box p={1}>
                        <TextField
                          sx={{
                            m: 0,
                          }}
                          placeholder={t("Additional Information...")}
                          fullWidth
                          variant="outlined"
                          label="Additional Information"
                          id="AdditionalInformation"
                          multiline={true}
                          rows={3}
                        />
                      </Box>
                    </Grid>
                  </>
                ) : null}
              </Grid>

              {/*               <Divider variant="middle" sx={{ mt: 2 }} /> */}
              {/* Divider, New Grid, Card, only shows visible if Project Tags = Company  */}

              {showContact ? (
                <>
                  {/* Financials */}

                  <CardHeader title="Financials" sx={{ pl: 3 }} />
                  <Grid
                    sx={{
                      px: 1,
                    }}
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={1}
                  >
                    {/* Registration Number */}
                    <Grid item xs={12} sm={6} md={6}>
                      <Box p={1}>
                        <TextField
                          sx={{
                            m: 0,
                          }}
                          placeholder="Registration Number ..."
                          fullWidth
                          variant="outlined"
                          label="Registration Number"
                        />
                      </Box>
                    </Grid>
                    {/* Fiscal Number */}
                    <Grid item xs={12} sm={6} md={6}>
                      <Box p={1}>
                        <TextField
                          fullWidth
                          variant="outlined"
                          label="Fiscal Number"
                          placeholder="Fiscal Number ..."
                        />
                      </Box>
                    </Grid>
                    {/* IBAN */}
                    <Grid item xs={12} sm={6} md={6}>
                      <Box p={1}>
                        <TextField
                          sx={{
                            m: 0,
                          }}
                          placeholder="IBAN ..."
                          fullWidth
                          variant="outlined"
                          label="IBAN"
                          id="IBAN"
                        />
                      </Box>
                    </Grid>
                    {/* Bank Name */}
                    <Grid item xs={12} sm={6} md={6}>
                      <Box p={1}>
                        <TextField
                          sx={{
                            m: 0,
                          }}
                          placeholder="Bank Name ..."
                          fullWidth
                          variant="outlined"
                          label="Bank Name"
                          id="BankName"
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  {/* Contact Person */}
                  <CardHeader title="Contact Person" sx={{ pl: 3 }} />
                  <Grid
                    sx={{
                      px: 1,
                    }}
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={1}
                  >
                    {/* Company Name Contact Person */}
                    <Grid item xs={12} sm={12} md={12}>
                      <Box p={1}>
                        <TextField
                          sx={{
                            m: 0,
                          }}
                          placeholder={t("Name...")}
                          fullWidth
                          variant="outlined"
                          label="Name"
                        />
                      </Box>
                    </Grid>
                    {/* Role */}
                    <Grid item xs={12} sm={6} md={6}>
                      <Box p={1}>
                        <Autocomplete
                          multiple
                          sx={{
                            m: 0,
                          }}
                          limitTags={2}
                          options={roleTags}
                          getOptionLabel={(option) => option.title}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              variant="outlined"
                              label={t("Role")}
                              placeholder={t("Role...")}
                            />
                          )}
                        />
                      </Box>
                    </Grid>
                    {/* Department */}
                    <Grid item xs={12} sm={6} md={6}>
                      <Box p={1}>
                        <TextField
                          sx={{
                            m: 0,
                          }}
                          placeholder="Department ..."
                          fullWidth
                          variant="outlined"
                          label="Department"
                          id="Department"
                        />
                      </Box>
                    </Grid>

                    {/* Phone  Number */}
                    <Grid item xs={12} sm={6} md={6}>
                      <Box p={1}>
                        <TextField
                          sx={{
                            m: 0,
                          }}
                          placeholder="Phone Number ..."
                          fullWidth
                          variant="outlined"
                          label="Phone Number"
                          id="PhoneNumber"
                        />
                      </Box>
                    </Grid>
                    {/* E-Mail */}
                    <Grid item xs={12} sm={6} md={6}>
                      <Box p={1}>
                        <TextField
                          sx={{
                            m: 0,
                          }}
                          placeholder="E-Mail ..."
                          fullWidth
                          variant="outlined"
                          label="E-Mail"
                          id="E-Mail"
                        />
                      </Box>
                    </Grid>
                    {/* ADD ANOTHER CONTACT PERSON */}

                    <Grid item xs={12} sm={12} md={12}>
                      <Box p={1} sx={{}}>
                        <Button
                          sx={{
                            border: "2px dashed",
                            color: "primary",
                            width: "585px",
                            height: "54px",
                          }}
                        >
                          <IconButton aria-label="add">
                            <AddOutlinedIcon color="primary" />
                          </IconButton>
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </>
              ) : null}
              <Button
                sx={{
                  mt: { lg: 2, md: 0 },
                  ml: { lg: 2 },
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
                  ml: { lg: 94 },
                  px: { lg: 4 },
                }}
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default AddNewClient;

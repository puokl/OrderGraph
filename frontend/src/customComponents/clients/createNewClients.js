import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  Dialog,
  CardHeader,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  lighten,
  MenuItem,
  Select,
  Slide,
  styled,
  TextField,
  Divider,
} from "@mui/material";
import { forwardRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import PageHeader from "./PageHeader";

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

function AddClient() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [showContact, setShowContact] = useState(false);
  const navigate = useNavigate();
  const navigateToClientOverview = () => {
    navigate("/clients/overview");
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
              <Grid item xs={12}>
                <Box p={1}>
                  <Autocomplete
                    /* multiple */
                    sx={{
                      m: 0,
                    }}
                    limitTags={2}
                    onInputChange={() => setShowContact(!showContact)}
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
                    /*                     InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchTwoToneIcon />
                        </InputAdornment>
                      ),
                    }} */
                    /*                     onChange={handleQueryChange} */
                    placeholder={t("Client Name...")}
                    /*                     value={query} */
                    fullWidth
                    variant="outlined"
                    lable="Client Name"
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
                    /*                     InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchTwoToneIcon />
                        </InputAdornment>
                      ),
                    }} */
                    /*                     onChange={handleQueryChange} */
                    placeholder={t("E-Mail...")}
                    /*                     value={query} */
                    fullWidth
                    variant="outlined"
                    lable="E-Mail"
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
                    /*                     InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchTwoToneIcon />
                        </InputAdornment>
                      ),
                    }} */
                    /*                     onChange={handleQueryChange} */
                    placeholder={t("Phone Number...")}
                    /*                     value={query} */
                    fullWidth
                    variant="outlined"
                    lable="Phone Number"
                    id="PhoneNumber"
                  />
                </Box>
              </Grid>
              {/* Vat ID */}
              <Grid item xs={12} sm={6} md={6}>
                <Box p={1}>
                  <TextField
                    sx={{
                      m: 0,
                    }}
                    placeholder={t("Vat ID...")}
                    fullWidth
                    variant="outlined"
                    lable="Vat ID"
                    id="VatID"
                  />
                </Box>
              </Grid>
              {/* Billing Adress */}
              <Grid item xs={12}>
                <Box p={1}>
                  <TextField
                    sx={{
                      m: 0,
                    }}
                    placeholder={t("Billing Adress...")}
                    fullWidth
                    variant="outlined"
                    lable="Billing Adress"
                    id="BillingAdress"
                  />
                </Box>
              </Grid>
              {/* Shipping Adress */}
              <Grid item xs={12}>
                <Box p={1}>
                  <TextField
                    sx={{
                      m: 0,
                    }}
                    placeholder={t("Shipping Adress...")}
                    fullWidth
                    variant="outlined"
                    lable="Shipping Adress"
                    id="ShippingAdress"
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
                    lable="Additional Information"
                    id="AdditionalInformation"
                    multiline={true}
                    rows={3}
                  />
                </Box>
                <Divider variant="middle" sx={{ mt: 2 }} />
              </Grid>
              {/* Divider, New Grid, Card, only shows visible if Project Tags = Company  */}

              {showContact ? (
                <>
                  <CardHeader title="Contact Person" />
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
                    <Grid item xs={12} sm={6} md={6}>
                      <Box p={1}>
                        <TextField
                          sx={{
                            m: 0,
                          }}
                          /*                     InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchTwoToneIcon />
                        </InputAdornment>
                      ),
                    }} */
                          /*                     onChange={handleQueryChange} */
                          placeholder={t("Name...")}
                          /*                     value={query} */
                          fullWidth
                          variant="outlined"
                          lable="Name"
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
                    {/* Phone  Number */}
                    <Grid item xs={12} sm={6} md={6}>
                      <Box p={1}>
                        <TextField
                          sx={{
                            m: 0,
                          }}
                          /*                     InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchTwoToneIcon />
                        </InputAdornment>
                      ),
                    }} */
                          /*                     onChange={handleQueryChange} */
                          placeholder={t("Phone Number...")}
                          /*                     value={query} */
                          fullWidth
                          variant="outlined"
                          lable="Phone Number"
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
                          placeholder={t("E-Mail...")}
                          fullWidth
                          variant="outlined"
                          lable="E-Mail"
                          id="E-Mail"
                        />
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
                /*           onClick={handleCreateEvent} */
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
                /*           onClick={handleCreateEvent} */
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

    /*     <div>
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
          <Card>
            <CardHeader title="Client Details" />
            <CardContent>
              <Grid item xs={12} sm={12}>
                <TextField fullWidth label="Client type" id="clientType" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="clientName"
                  label="Client Name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={6}>
                <TextField
                  fullWidth
                  id="E-Mail"
                  label="E-Mail"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={6}>
                <TextField
                  id="phoneNumber"
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={6}>
                <TextField
                  fullWidth
                  id="vatId"
                  label="Vat Id"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12} lg={12}>
                <TextField
                  fullWidth
                  label="Shipping Adress"
                  id="billingAdress"
                />
              </Grid>
              <Grid item xs={12} sm={12} lg={12}>
                <TextField
                  fullWidth
                  label="Additional Information"
                  id="shippingAdress"
                />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div> */
  );
}

export default AddClient;

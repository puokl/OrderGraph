import { Typography, Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PageHeader = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const navigateToClientOverview = () => {
    navigate("/clients/overview");
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Add New Clients
        </Typography>
        <Typography variant="subtitle2">
          Fill in the fields below to add a new client
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{
            mt: { xs: 2, md: 0 },
          }}
          onClick={navigateToClientOverview}
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIcon fontSize="small" />}
        >
          Back to Clients Overview
        </Button>
      </Grid>
    </Grid>
  );
};

PageHeader.propTypes = {
  handleCreateEvent: PropTypes.func,
};

PageHeader.defaultProps = {
  handleCreateEvent: () => {},
};

export default PageHeader;

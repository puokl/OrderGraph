import { Typography, Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PageHeaderClientDetails = ({ clients }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const navigateToClientOverview = () => {
    navigate("/clients/overview");
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {clients.clientName}
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

PageHeaderClientDetails.propTypes = {
  handleCreateEvent: PropTypes.func,
};

PageHeaderClientDetails.defaultProps = {
  handleCreateEvent: () => {},
};

export default PageHeaderClientDetails;

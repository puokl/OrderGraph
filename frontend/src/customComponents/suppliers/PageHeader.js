import { Typography, Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PageHeader = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const navigateToSupplierOverview = () => {
    navigate("/suppliers/overview");
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Add New Suppliers
        </Typography>
        <Typography variant="subtitle2">
          Fill in the fields below to add a new supplier
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{
            mt: { xs: 2, md: 0 },
          }}
          onClick={navigateToSupplierOverview}
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIcon fontSize="small" />}
        >
          Back to Suppliers Overview
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

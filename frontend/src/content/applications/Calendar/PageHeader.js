import { Typography, Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import EventTwoToneIcon from "@mui/icons-material/EventTwoTone";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const PageHeader = ({ handleCreateEvent }) => {
  const { t } = useTranslation();

  let navigate = useNavigate();
  const navigateToCreatOrder = () => {
    let path = `/orders/create`;
    navigate(path);
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {t("Let's get things done!")}
        </Typography>
        <Typography variant="subtitle2">
          {t("Get an overview of your production line.")}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{
            mt: { xs: 2, md: 0 },
          }}
          onClick={navigateToCreatOrder}
          variant="contained"
          color="primary"
          startIcon={<EventTwoToneIcon fontSize="small" />}
        >
          {t("Create Order")}
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

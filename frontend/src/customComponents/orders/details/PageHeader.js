import { useTranslation } from "react-i18next";

import { Grid, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function PageHeader({ orderID }) {
  const { t } = useTranslation();

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {t(`Order #${orderID}`)}
          </Typography>
          <Typography variant="subtitle2">{t("Overview")}</Typography>
        </Grid>
        <Grid item>
          <Button color="primary" variant="contained">
            <Link
              to={`/orders/edit/${orderID}`}
              style={{
                textDecoration: "none",
                fontWeight: "bold",
                color: "white",
              }}
            >
              {t("Edit Order")}
            </Link>
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default PageHeader;

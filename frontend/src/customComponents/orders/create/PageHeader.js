import { useTranslation } from "react-i18next";

import { Grid, Typography } from "@mui/material";

function PageHeader({ orderID }) {
  const { t } = useTranslation();

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {orderID ? t("Edit your order") : t("Create a new order")}
          </Typography>
          <Typography variant="subtitle2">
            {orderID
              ? t("Edit any fields to edit your order")
              : t("Fill in the fields below to create a new order")}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default PageHeader;

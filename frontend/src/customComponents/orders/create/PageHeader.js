import { useTranslation } from "react-i18next";

import { Grid, Typography } from "@mui/material";

function PageHeader() {
  const { t } = useTranslation();

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {t("Create Order")}
          </Typography>
          <Typography variant="subtitle2">
            {t("Fill in the fields below to create a new order")}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default PageHeader;

import {
  Grid,
  TextField,
  Card,
  CardHeader,
  /*   Button, */
  CardContent,
} from "@mui/material";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import PageHeader from "./PageHeader";
import { Helmet } from "react-helmet-async";

function AddClient() {
  // define states and styles
  return (
    <div>
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
              <Grid item xs={12}>
                <TextField fullWidth label="Client type" id="clientType" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="clientName"
                  label="Client Name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="E-Mail"
                  label="E-Mail"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={4.7}>
                <TextField
                  id="phoneNumber"
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4.7}>
                <TextField
                  fullWidth
                  id="vatId"
                  label="Vat Id"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="fullWidth" id="billingAdress" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="fullWidth" id="shippingAdress" />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default AddClient;

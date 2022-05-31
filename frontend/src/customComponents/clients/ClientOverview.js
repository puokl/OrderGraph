import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  TextField,
  Card,
  CardHeader,
  Button,
  CardContent,
  Typography,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import PageHeader from "./PageHeader";

const ClientOverview = () => {
  const totalClients = 42;
  const newClientsMonth = 4;
  const clientsWActiveOrdrs = 2;
  const clientsWRecentOrdrs = 33;
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <PageTitleWrapper>
        <Typography variant="h3" component="h3" gutterBottom>
          {"Clients Overview"}
        </Typography>
        <Typography variant="h5" component="h5" gutterBottom>
          {"Take a look at your client list"}
        </Typography>
      </PageTitleWrapper>

      <Grid container spacing={4} margin={0}>
        <Grid item xs={3}>
          <Card>
            <Grid margin={2}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item>
                    <CircleIcon style={{ color: "#15c5e8" }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" component="h5" gutterBottom>
                      Total Clients
                    </Typography>
                  </Grid>
                </Grid>
                <br />
                <Typography sx={{display: 'flex', justifyContent: 'center'}} variant="h4" component="h4" gutterBottom>
                  {totalClients}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <Grid margin={2}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item>
                    <CircleIcon style={{ color: "green" }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" component="h5" gutterBottom>
                    New Clients last month                    </Typography>
                  </Grid>
                </Grid>
                <br />
                <Typography sx={{display: 'flex', justifyContent: 'center'}} variant="h4" component="h4" gutterBottom>
                  {newClientsMonth}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <Grid margin={2}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item>
                    <CircleIcon style={{ color: "#15c5e8" }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" component="h5" gutterBottom>
                    Clients with active orders
                    </Typography>
                  </Grid>
                </Grid>
                <br />
                <Typography sx={{display: 'flex', justifyContent: 'center'}} variant="h4" component="h4" gutterBottom>
                  {clientsWActiveOrdrs}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <Grid margin={2}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item>
                    <CircleIcon style={{ color: "red" }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" component="h5" gutterBottom>
                    Clients with recent orders
                    </Typography>
                  </Grid>
                </Grid>
                <br />
                <Typography sx={{display: 'flex', justifyContent: 'center'}} variant="h4" component="h4" gutterBottom>
                  {clientsWRecentOrdrs}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        {/* <Grid item xs={3}>
          <Card>
            <Grid>
              <Grid item xs={12}>
                <CircleIcon style={{ color: "green" }} />
                <Typography variant="h5" component="h5" gutterBottom>
                  New Clients in the last month
                </Typography>
                <br />
                <Typography variant="h4" component="h4" gutterBottom>
                  {newClientsMonth}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <Grid>
              <Grid item xs={12}>
                <CircleIcon style={{ color: "#15c5e8" }} />
                <Typography variant="h5" component="h5" gutterBottom>
                  Clients with active orders
                </Typography>
                <br />
                <Typography variant="h4" component="h4" gutterBottom>
                  {clientsWActiveOrdrs}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <Grid>
              <Grid item xs={12}>
                <CircleIcon style={{ color: "red" }} />
                <Typography variant="h5" component="h5" gutterBottom>
                  Clients with recent orders
                </Typography>
                <br />
                <Typography variant="h4" component="h4" gutterBottom>
                  {clientsWRecentOrdrs}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid> */}
      </Grid>
    </Grid>
  );
};

ClientOverview.propTypes = {};

export default ClientOverview;

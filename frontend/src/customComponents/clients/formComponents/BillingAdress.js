import { Box, CardHeader, Grid, TextField } from "@mui/material";
import React, { forwardRef, useState, useCallback } from "react";

function BillingAdress() {
  return (
    <div>
      <CardHeader title="Billing Adress" sx={{ pl: 3 }} />
      <Grid container spacing={1}>
        {/* Billing Adress */}
        {/* Adresse */}

        <Grid item xs={12} sm={6} md={6}>
          <Box p={1}>
            <TextField
              sx={{
                m: 0,
              }}
              placeholder="Adress ..."
              fullWidth
              variant="outlined"
              label="Adress"
              id="BaAdress"
            />
          </Box>
        </Grid>

        {/* ZIP */}

        <Grid item xs={12} sm={6} md={6}>
          <Box p={1}>
            <TextField
              sx={{
                m: 0,
              }}
              placeholder="Zip..."
              fullWidth
              variant="outlined"
              label="Zip"
              id="BaZip"
            />
          </Box>
        </Grid>

        {/* City */}

        <Grid item xs={12} sm={6} md={6}>
          <Box p={1}>
            <TextField
              sx={{
                m: 0,
              }}
              placeholder="City..."
              fullWidth
              variant="outlined"
              label="City"
              id="BaCity"
            />
          </Box>
        </Grid>

        {/* State */}

        <Grid item xs={12} sm={6} md={6}>
          <Box p={1}>
            <TextField
              sx={{
                m: 0,
              }}
              placeholder="State..."
              fullWidth
              variant="outlined"
              label="State"
              id="BaState"
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
              placeholder="Additional Information..."
              fullWidth
              variant="outlined"
              label="Additional Information"
              id="BaAdditionalInformation"
              multiline={true}
              rows={3}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default BillingAdress;

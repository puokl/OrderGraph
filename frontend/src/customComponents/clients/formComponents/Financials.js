import { Box, CardHeader, Grid, TextField } from "@mui/material";
import React, { forwardRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

function Financials() {
  const [showContact, setShowContact] = useState(false);
  return (
    <div>
      {/* Financials */}

      <CardHeader title="Financials" sx={{ pl: 3 }} />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={1}
      >
        {/* Registration Number */}
        <Grid item xs={12} sm={6} md={6}>
          <Box p={1}>
            <TextField
              sx={{
                m: 0,
              }}
              placeholder="Registration Number ..."
              fullWidth
              variant="outlined"
              label="Registration Number"
              id="registrationNumber"
            />
          </Box>
        </Grid>
        {/* Fiscal Number */}
        <Grid item xs={12} sm={6} md={6}>
          <Box p={1}>
            <TextField
              fullWidth
              variant="outlined"
              label="Fiscal Number"
              placeholder="Fiscal Number ..."
              id="fiscalNumber"
            />
          </Box>
        </Grid>
        {/* IBAN */}
        <Grid item xs={12} sm={6} md={6}>
          <Box p={1}>
            <TextField
              sx={{
                m: 0,
              }}
              placeholder="IBAN ..."
              fullWidth
              variant="outlined"
              label="IBAN"
              id="IBAN"
            />
          </Box>
        </Grid>
        {/* Bank Name */}
        <Grid item xs={12} sm={6} md={6}>
          <Box p={1}>
            <TextField
              sx={{
                m: 0,
              }}
              placeholder="Bank Name ..."
              fullWidth
              variant="outlined"
              label="Bank Name"
              id="bankName"
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Financials;

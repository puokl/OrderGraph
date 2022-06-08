import { Autocomplete, Box, CardHeader, Grid, TextField } from "@mui/material";
import React, { forwardRef, useState, useCallback } from "react";

function ClientDetails() {
  return (
    <div>
      <CardHeader title="Client Details" />
      <Grid container spacing={1}>
        {/* Client Type */}
        <Grid item xs={12} sm={6} md={6}>
          <Box p={1}>
            <Autocomplete
              /* multiple */
              sx={{
                m: 0,
              }}
              limitTags={2}
              onInputChange={(e) => handleShowContact(e)}
              options={projectTags}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  variant="outlined"
                  label={t("Client type")}
                  placeholder={t("Select client type...")}
                  id="clientType"
                />
              )}
            />
          </Box>
        </Grid>
        {/* Client Name */}
        <Grid item xs={12} sm={6} md={6}>
          <Box p={1}>
            <TextField
              sx={{
                m: 0,
              }}
              placeholder={t("Client Name...")}
              fullWidth
              variant="outlined"
              label="Client Name"
              id="clientName"
            />
          </Box>
        </Grid>
        {/* E-Mail */}
        <Grid item xs={12} sm={6} md={6}>
          <Box p={1}>
            <TextField
              sx={{
                m: 0,
              }}
              placeholder={t("E-Mail...")}
              fullWidth
              variant="outlined"
              label="E-Mail"
              id="clientE-Mail"
            />
          </Box>
        </Grid>
        {/* Phone  Number */}
        <Grid item xs={12} sm={6} md={6}>
          <Box p={1}>
            <TextField
              sx={{
                m: 0,
              }}
              placeholder={t("Phone Number...")}
              fullWidth
              variant="outlined"
              label="Phone Number"
              id="clientPhoneNumber"
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default ClientDetails;

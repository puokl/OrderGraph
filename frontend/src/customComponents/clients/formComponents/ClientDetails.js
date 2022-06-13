import { Autocomplete, Box, CardHeader, Grid, TextField } from "@mui/material";
import React, { forwardRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

function ClientDetails({ handleShowContact, updateFields }) {
  const { t } = useTranslation();
  const projectTags = [{ title: "Person" }, { title: "Company" }];

  return (
    <div>
      <CardHeader title="Client Details" />
      <Grid container spacing={1}>
        {/* Client Type */}
        <Grid item xs={12} sm={6} md={6}>
          <Box p={1}>
            <Autocomplete
              sx={{
                m: 0,
              }}
              limitTags={2}
              onChange={(event, value) => {
                console.log(value.title);
                if (value.title === "Company") handleShowContact(true);
                else if (value.title === "Person") handleShowContact(false);
                else handleShowContact(null);
              }}
              options={projectTags}
              getOptionLabel={(option) => option.title}
              isOptionEqualToValue={(option, value) =>
                option.title === value.title
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  variant="outlined"
                  label={t("Client type")}
                  placeholder={t("Select client type...")}
                  id="clientType"
                  /*onChange={(e) => updateFields(e.target.id, e.target.value)} 
                    LINE ABOVE COMMENTED OUT: ANOTHER ONCHANGE IS DEFINED IN AUTOCOMPLETE */
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
              onChange={(e) => updateFields(e.target.id, e.target.value)}
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
              onChange={(e) => updateFields(e.target.id, e.target.value)}
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
              onChange={(e) => updateFields(e.target.id, e.target.value)}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default ClientDetails;

import { Autocomplete, Box, CardHeader, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function ContactPerson({ updateFields }) {
  const { t } = useTranslation();
  const [showContact, setShowContact] = useState(false);
  const [contactPerson, setContactPerson] = useState([]);

  const projectTags = [{ title: "Person" }, { title: "Company" }];
  const roleTags = [
    { title: "CEO" },
    { title: "Management" },
    { title: "Worker" },
  ];

  return (
    <div>
      <CardHeader title="Contact Person" sx={{ pl: 3 }} />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={1}
      >
        {/* Company Name Contact Person */}
        <Grid item xs={12} sm={12} md={12}>
          <Box p={1}>
            <TextField
              sx={{
                m: 0,
              }}
              placeholder="Name..."
              fullWidth
              variant="outlined"
              label="Name"
              id="contactName"
              onChange={(e) => updateFields(e.target.id, e.target.value)}
            />
          </Box>
        </Grid>
        {/* Role */}
        <Grid item xs={12} sm={6} md={6}>
          <Box p={1}>
            <Autocomplete
              multiple
              sx={{
                m: 0,
              }}
              limitTags={2}
              options={roleTags}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  variant="outlined"
                  label="Role"
                  placeholder="Role..."
                  id="contactRole"
                  onChange={(e) => updateFields(e.target.id, e.target.value)}
                />
              )}
            />
          </Box>
        </Grid>
        {/* Department */}
        <Grid item xs={12} sm={6} md={6}>
          <Box p={1}>
            <TextField
              sx={{
                m: 0,
              }}
              placeholder="Department ..."
              fullWidth
              variant="outlined"
              label="Department"
              id="contactDepartment"
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
              placeholder="Phone Number ..."
              fullWidth
              variant="outlined"
              label="Phone Number"
              id="contactPhoneNumber"
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
              placeholder="E-Mail ..."
              fullWidth
              variant="outlined"
              label="E-Mail"
              id="contactE-Mail"
              onChange={(e) => updateFields(e.target.id, e.target.value)}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default ContactPerson;

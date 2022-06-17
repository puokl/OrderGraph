import { Autocomplete, Box, CardHeader, Grid, TextField } from "@mui/material";
import React, { forwardRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { Formik, useField } from "formik";

function ClientDetails({
  handleShowContact,
  updateFields,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
  values,
  errors,
  name,
}) {
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
                  /*                   {...configTextfield} */
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
              error={Boolean(touched.clientName && errors.clientName)}
              helperText={touched.clientName && errors.clientName}
              onBlur={handleBlur}
              placeholder={t("Client Name...")}
              fullWidth
              value={values.clientName}
              variant="outlined"
              label="Client Name"
              id="clientName"
              onChange={(e) => {
                setFieldValue("clientName", e.target.value);
                console.log("Client Name :", values.clientName);
              }}
              /*               {...configTextfield} */
              /*               onChange={(e) => updateFields(e.target.id, e.target.value)} */
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
              error={Boolean(touched.clientEMail && errors.clientEMail)}
              helperText={touched.clientEMail && errors.clientEMail}
              onBlur={handleBlur}
              value={values.clientEMail}
              placeholder={t("E-Mail...")}
              fullWidth
              variant="outlined"
              label="E-Mail"
              id="clientEMail"
              onChange={(e) => {
                setFieldValue("clientEMail", e.target.value);
                console.log("Email :", values.clientEMail);
              }}
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
              error={Boolean(
                touched.clientPhoneNumber && errors.clientPhoneNumber
              )}
              helperText={touched.clientPhoneNumber && errors.clientPhoneNumber}
              onBlur={handleBlur}
              value={values.clientPhoneNumber}
              placeholder={t("Phone Number...")}
              fullWidth
              variant="outlined"
              label="Phone Number"
              id="clientPhoneNumber"
              onChange={(e) => {
                setFieldValue("clientPhoneNumber", e.target.value);
                console.log("Phone :", values.clientPhoneNumber);
              }}
              /*               {...configTextfield} */
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default ClientDetails;

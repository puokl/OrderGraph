import { Box, CardHeader, Grid, TextField } from "@mui/material";
import React, { forwardRef, useState, useCallback } from "react";

function BillingAdress({
  handleShowContact,
  updateFields,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
  values,
  errors,
  name,
  getIn,
}) {
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
              name="billingAddress.Address"
              error={Boolean(
                getIn(touched, "billingAddress.Address") &&
                  getIn(errors, "billingAddress.Address")

                /* touched.hasOwnProperty("billingAddress")
                  ? touched.billingAddress.Address &&
                      errors.billingAddress.Address
                  : null */
              )}
              helperText={
                getIn(touched, "billingAddress.Address") &&
                getIn(errors, "billingAddress.Address")
              }
              onBlur={handleBlur}
              value={values.billingAddress.Address}
              onChange={(e) => {
                console.log(touched);
                setFieldValue("billingAddress.Address", e.target.value);
                console.log("BA Address :", values.billingAddress.Address);
              }}
              placeholder="Adress ..."
              fullWidth
              variant="outlined"
              label="Adress"
              id="Address"
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
              error={Boolean(
                getIn(touched, "billingAddress.Zip") &&
                  getIn(errors, "billingAddress.Zip")
              )}
              helperText={
                getIn(touched, "billingAddress.Zip") &&
                getIn(errors, "billingAddress.Zip")
              }
              name="billingAddress.Zip"
              onBlur={handleBlur}
              value={values.billingAddress.Zip}
              onChange={(e) => {
                setFieldValue("billingAddress.Zip", e.target.value);
                console.log("BA Zip :", values.billingAddress.Zip);
              }}
              placeholder="Zip..."
              fullWidth
              variant="outlined"
              label="Zip"
              id="Zip"
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
              error={Boolean(
                getIn(touched, "billingAddress.City") &&
                  getIn(errors, "billingAddress.City")
              )}
              helperText={
                getIn(touched, "billingAddress.City") &&
                getIn(errors, "billingAddress.City")
              }
              name="billingAddress.City"
              onBlur={handleBlur}
              value={values.billingAddress.City}
              onChange={(e) => {
                setFieldValue("billingAddress.City", e.target.value);
                console.log("BA City :", values.billingAddress.City);
              }}
              placeholder="City..."
              fullWidth
              variant="outlined"
              label="City"
              id="City"
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
              error={Boolean(
                getIn(touched, "billingAddress.State") &&
                  getIn(errors, "billingAddress.State")
              )}
              helperText={
                getIn(touched, "billingAddress.State") &&
                getIn(errors, "billingAddress.State")
              }
              name="billingAddress.State"
              onBlur={handleBlur}
              value={values.billingAddress.State}
              onChange={(e) => {
                setFieldValue("billingAddress.State", e.target.value);
                console.log("BA State :", values.billingAddress.State);
              }}
              placeholder="State..."
              fullWidth
              variant="outlined"
              label="State"
              id="State"
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
              error={Boolean(
                getIn(touched, "billingAddress.AdditionalInformation") &&
                  getIn(errors, "billingAddress.AdditionalInformation")
              )}
              helperText={
                getIn(touched, "billingAddress.AdditionalInformation") &&
                getIn(errors, "billingAddress.AdditionalInformation")
              }
              name="billingAddress.AdditionalInformation"
              onBlur={handleBlur}
              value={values.billingAddress.AdditionalInformation}
              onChange={(e) => {
                setFieldValue(
                  "billingAddress.AdditionalInformation",
                  e.target.value
                );
                console.log(
                  "BA Additional Information :",
                  values.billingAddress.AdditionalInformation
                );
              }}
              placeholder="Additional Information..."
              fullWidth
              variant="outlined"
              label="Additional Information"
              id="AdditionalInformation"
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

import { Box, CardHeader, Grid, TextField } from "@mui/material";
import React, { forwardRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

function Financials({
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
  console.log(touched);
  touched = { financials: {} };
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
              error={Boolean(
                getIn(touched, "financials.registrationNumber") &&
                  getIn(errors, "financials.registrationNumber")
              )}
              helperText={
                getIn(touched, "financials.registrationNumber") &&
                getIn(errors, "financials.registrationNumber")
              }
              name="financials.registrationNumber"
              onBlur={handleBlur}
              value={values.financials.registrationNumber}
              onChange={(e) => {
                setFieldValue("financials.registrationNumber", e.target.value);
                console.log(
                  "Registration Number :",
                  values.financials.registrationNumber
                );
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
              error={Boolean(
                getIn(touched, "financials.fiscalNumber") &&
                  getIn(errors, "financials.fiscalNumber")
              )}
              helperText={
                getIn(touched, "financials.fiscalNumber") &&
                getIn(errors, "financials.fiscalNumber")
              }
              name="financials.fiscalNumber"
              onBlur={handleBlur}
              value={values.financials.fiscalNumber}
              onChange={(e) => {
                setFieldValue("financials.fiscalNumber", e.target.value);
                console.log("Fiscal Number :", values.financials.fiscalNumber);
              }}
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
              error={Boolean(
                getIn(touched, "financials.IBAN") &&
                  getIn(errors, "financials.IBAN")
              )}
              helperText={
                getIn(touched, "financials.IBAN") &&
                getIn(errors, "financials.IBAN")
              }
              name="financials.IBAN"
              onBlur={handleBlur}
              value={values.financials.IBAN}
              onChange={(e) => {
                setFieldValue("financials.IBAN", e.target.value);
                console.log("IBAN :", values.financials.IBAN);
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
              error={Boolean(
                getIn(touched, "financials.bankName") &&
                  getIn(errors, "financials.bankName")
              )}
              helperText={
                getIn(touched, "financials.bankName") &&
                getIn(errors, "financials.bankName")
              }
              name="financials.bankName"
              onBlur={handleBlur}
              value={values.financials.bankName}
              onChange={(e) => {
                setFieldValue("financials.bankName", e.target.value);
                console.log("Bank Name :", values.financials.bankName);
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

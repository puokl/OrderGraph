import {
  Autocomplete,
  Box,
  CardHeader,
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import React, { forwardRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { Formik, useField, Field } from "formik";

function SupplierDetails({
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

  /* Autocomplete Start */

  const CustomSelect = ({
    field,
    form: { touched, errors, setFieldValue },
    ...props
  }) => (
    <>
      <Select
        {...field}
        {...props}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={t("supplierType")}
        value={field.value}
        onChange={(e) => {
          /*           handleRoleSelect(e); */
          setFieldValue("supplierType", e.target.value);
          if (e.target.value === "Company") handleShowContact(true);
          else if (e.target.value === "Person") handleShowContact(false);
          else handleShowContact(null);
        }}
      >
        {projectTags.map((item) => (
          <MenuItem key={item.title} value={item.title}>
            {item.title}
          </MenuItem>
        ))}
      </Select>
      {touched[field.name] && errors[field.name] && (
        <div style={{ color: "#FF1943", fontWeight: "bold" }}>
          {errors[field.name]}
        </div>
      )}
    </>
  );

  /* Autocomplete End */

  return (
    <div>
      <CardHeader title="Supplier Details" />
      <Grid container spacing={1}>
        {/* supplier Type */}
        <Grid item xs={12} sm={6} md={6}>
          <Box p={1}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Supplier Type
              </InputLabel>
              <Field name="supplierType" component={CustomSelect} />
            </FormControl>

            {/*             <Autocomplete
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
                    label={t("supplier type")}
                    placeholder={t("Select supplier type...")}
                    id="supplierType"
                  />
                )}
              /> */}
          </Box>
        </Grid>
        {/* supplier Name */}
        <Grid item xs={12} sm={6} md={6}>
          <Box p={1}>
            <TextField
              sx={{
                m: 0,
              }}
              error={Boolean(touched.supplierName && errors.supplierName)}
              helperText={touched.supplierName && errors.supplierName}
              onBlur={handleBlur}
              placeholder={t("Supplier Name...")}
              fullWidth
              value={values.supplierName}
              variant="outlined"
              label="Supplier Name"
              id="supplierName"
              onChange={(e) => {
                setFieldValue("supplierName", e.target.value);
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
              error={Boolean(touched.supplierEMail && errors.supplierEMail)}
              helperText={touched.supplierEMail && errors.supplierEMail}
              onBlur={handleBlur}
              value={values.supplierEMail}
              placeholder={t("E-Mail...")}
              fullWidth
              variant="outlined"
              label="E-Mail"
              id="supplierEMail"
              onChange={(e) => {
                setFieldValue("supplierEMail", e.target.value);
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
                touched.supplierPhoneNumber && errors.supplierPhoneNumber
              )}
              helperText={
                touched.supplierPhoneNumber && errors.supplierPhoneNumber
              }
              onBlur={handleBlur}
              value={values.supplierPhoneNumber}
              placeholder={t("Phone Number...")}
              fullWidth
              variant="outlined"
              label="Phone Number"
              id="supplierPhoneNumber"
              onChange={(e) => {
                setFieldValue("supplierPhoneNumber", e.target.value);
              }}
              /*               {...configTextfield} */
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default SupplierDetails;

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
import React, { forwardRef, useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { Formik, useField, Field } from "formik";

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
  clientToEdit,
  setValues,
  setShowContact,
}) {
  const { t } = useTranslation();
  const projectTags = [{ title: "Person" }, { title: "Company" }];

  

  /* Use Effect to force Rerender of Comoonent after setShowContact is set to true. Get data as default Value on edit route */
  useEffect(() => {
    console.log("hi");
    setValues({ ...clientToEdit });
    if (clientToEdit.clientType === "Company") {
      setShowContact(true);
    }
  }, [clientToEdit]);

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
        label={t("clientType")}
        value={field.value}
        onChange={(e) => {
          /*           handleRoleSelect(e); */
          setFieldValue("clientType", e.target.value);
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
      <CardHeader title="Client Details" />
      <Grid container spacing={1}>
        {/* Client Type */}
        <Grid item xs={12} sm={6} md={6}>
          <Box p={1}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Client Type</InputLabel>
              <Field name="clientType" component={CustomSelect} />
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
                  label={t("Client type")}
                  placeholder={t("Select client type...")}
                  id="clientType"
                />
              )}
            /> */}
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

import { Autocomplete, Box, CardHeader, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Field } from "formik";

function ContactPerson({
  handleShowContact,
  updateFields,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
  values,
  errors,
  name,
  params,
}) {
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
              error={Boolean(touched.contactName && errors.contactName)}
              helperText={touched.contactName && errors.contactName}
              onBlur={handleBlur}
              value={values.contactName}
              onChange={(e) => {
                setFieldValue("contactName", e.target.value);
                console.log("Contact Person Name :", values.contactName);
              }}
              placeholder="Name..."
              fullWidth
              variant="outlined"
              label="Name"
              id="contactName"
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
                  error={Boolean(touched.contactRole && errors.contactRole)}
                  helperText={touched.contactRole && errors.contactRole}
                  onBlur={handleBlur}
                  value={values.contactRole}
                  onChange={(e) => {
                    setFieldValue("contactRole", e.target.value);
                    console.log("Contact Person Role :", values.contactRole);
                  }}
                  fullWidth
                  variant="outlined"
                  label="Role"
                  placeholder="Role..."
                  id="contactRole"
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
              {...params}
              error={Boolean(
                touched.contactDepartment && errors.contactDepartment
              )}
              helperText={touched.contactDepartment && errors.contactDepartment}
              onBlur={handleBlur}
              value={values.contactDepartment}
              onChange={(e) => {
                setFieldValue("contactDepartment", e.target.value);
                console.log(
                  "Contact Person Department :",
                  values.contactDepartment
                );
              }}
              placeholder="Department ..."
              fullWidth
              variant="outlined"
              label="Department"
              id="contactDepartment"
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
                touched.contactPhoneNumber && errors.contactPhoneNumber
              )}
              helperText={
                touched.contactPhoneNumber && errors.contactPhoneNumber
              }
              onBlur={handleBlur}
              value={values.contactPhoneNumber}
              onChange={(e) => {
                setFieldValue("contactPhoneNumber", e.target.value);
                console.log(
                  "Contact Person Phone :",
                  values.contactPhoneNumber
                );
              }}
              placeholder="Phone Number ..."
              fullWidth
              variant="outlined"
              label="Phone Number"
              id="contactPhoneNumber"
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
              error={Boolean(touched.contactEMail && errors.contactEMail)}
              helperText={touched.contactEMail && errors.contactEMail}
              onBlur={handleBlur}
              value={values.contactEMail}
              onChange={(e) => {
                setFieldValue("contactEMail", e.target.value);
                console.log("Contact Person Email :", values.contactEMail);
              }}
              placeholder="E-Mail ..."
              fullWidth
              variant="outlined"
              label="E-Mail"
              id="contactEMail"
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default ContactPerson;

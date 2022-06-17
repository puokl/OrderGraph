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
  getIn,
}) {
  const { t } = useTranslation();
  const [showContact, setShowContact] = useState(false);
  const [contactPerson, setContactPerson] = useState([]);
  const [selectedRole, setSelectedRole] = useState();

  const projectTags = [{ title: "Person" }, { title: "Company" }];
  const roleTags = [
    { title: "CEO" },
    { title: "Management" },
    { title: "Worker" },
  ];
  /*  const roleTags = ["CEO", "Management", "Worker"]; */

  const handleRoleSelect = (e) => {
    setSelectedRole(e.target.value);
  };

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
        label={t("Role")}
        value={field.value}
        onChange={(e) => {
          handleRoleSelect(e);
          setFieldValue("contact.contactRole", e.target.value);
          console.log(field.value);
        }}
      >
        {roleTags.map((item) => (
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
              error={Boolean(
                getIn(touched, "contact.contactName") &&
                  getIn(errors, "contact.contactName")
              )}
              helperText={
                getIn(touched, "contact.contactName") &&
                getIn(errors, "contact.contactName")
              }
              name="contact.contactName"
              onBlur={handleBlur}
              value={values.contact.contactName}
              onChange={(e) => {
                setFieldValue("contact.contactName", e.target.value);
                console.log(
                  "Contact Person Name :",
                  values.contact.contactName
                );
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
            {/*             <Autocomplete
              multiple
              sx={{
                m: 0,
              }}
              limitTags={2}
              options={roleTags}
              getOptionLabel={(option) => option}
              getOptionSelected={(item, current) => item === current}
              onChange={(e, value) => {
                setFieldValue("contact.contactRole", value.value);
                console.log(
                  "Contact Person Role :",
                  values.contact.contactRole
                );
              }}
              name="contact.contactRole"
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={Boolean(
                    getIn(touched, "contact.contactRole") &&
                      getIn(errors, "contact.contactRole")
                  )}
                  helperText={
                    getIn(touched, "contact.contactRole") &&
                    getIn(errors, "contact.contactRole")
                  }
                  onBlur={handleBlur}
                  value={values.contact.contactRole}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  label="Role"
                  placeholder="Role..."
                  id="contactRole"
                />
              )}
            /> */}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Field name="contact.contactRole" component={CustomSelect} />
            </FormControl>
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
                getIn(touched, "contact.contactDepartment") &&
                  getIn(errors, "contact.contactDepartment")
              )}
              helperText={
                getIn(touched, "contact.contactDepartment") &&
                getIn(errors, "contact.ccontactDepartment")
              }
              name="contact.contactDepartment"
              onBlur={handleBlur}
              value={values.contact.contactDepartment}
              onChange={(e) => {
                setFieldValue("contact.contactDepartment", e.target.value);
                console.log(
                  "Contact Person Department :",
                  values.contact.contactDepartment
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
                getIn(touched, "contact.contactPhoneNumber") &&
                  getIn(errors, "contact.contactPhoneNumber")
              )}
              helperText={
                getIn(touched, "contact.contactPhoneNumber") &&
                getIn(errors, "contact.contactPhoneNumber")
              }
              name="contact.contactPhoneNumber"
              onBlur={handleBlur}
              value={values.contact.contactPhoneNumber}
              onChange={(e) => {
                setFieldValue("contact.contactPhoneNumber", e.target.value);
                console.log(
                  "Contact Person Phone :",
                  values.contact.contactPhoneNumber
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
              error={Boolean(
                getIn(touched, "contact.contactEMail") &&
                  getIn(errors, "contact.contactEMail")
              )}
              helperText={
                getIn(touched, "contact.contactEMail") &&
                getIn(errors, "contact.contactEMail")
              }
              name="contact.contactEMail"
              onBlur={handleBlur}
              value={values.contact.contactEMail}
              onChange={(e) => {
                setFieldValue("contact.contactEMail", e.target.value);
                console.log(
                  "Contact Person Email :",
                  values.contact.contactEMail
                );
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

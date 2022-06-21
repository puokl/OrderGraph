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
  contactPersonNo,
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
          console.log(field.name);
          handleRoleSelect(e);
          setFieldValue(
            `contact[${contactPersonNo}].contactRole`,
            e.target.value
          );
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
                getIn(touched, `contact[${contactPersonNo}].contactName`) &&
                  getIn(errors, `contact[${contactPersonNo}].contactName`)
              )}
              helperText={
                getIn(touched, `contact[${contactPersonNo}].contactName`) &&
                getIn(errors, `contact[${contactPersonNo}].contactName`)
              }
              name={`contact[${contactPersonNo}].contactName`}
              onBlur={handleBlur}
              value={values.contact[contactPersonNo].contactName}
              onChange={(e) => {
                setFieldValue(
                  `contact[${contactPersonNo}].contactName`,
                  e.target.value
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
                setFieldValue("contact[0].contactRole", value.value);
                console.log(
                  "Contact Person Role :",
                  values.contact[0].contactRole
                );
              }}
              name="contact[0].contactRole"
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={Boolean(
                    getIn(touched, "contact[0].contactRole") &&
                      getIn(errors, "contact[0].contactRole")
                  )}
                  helperText={
                    getIn(touched, "contact[0].contactRole") &&
                    getIn(errors, "contact[0].contactRole")
                  }
                  onBlur={handleBlur}
                  value={values.contact[0].contactRole}
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
              <Field
                name={`contact[${contactPersonNo}].contactRole`}
                component={CustomSelect}
              />
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
                getIn(
                  touched,
                  `contact[${contactPersonNo}].contactDepartment`
                ) &&
                  getIn(errors, `contact[${contactPersonNo}].contactDepartment`)
              )}
              helperText={
                getIn(
                  touched,
                  `contact[${contactPersonNo}].contactDepartment`
                ) &&
                getIn(errors, `contact[${contactPersonNo}].contactDepartment`)
              }
              name={`contact[${contactPersonNo}].contactDepartment`}
              onBlur={handleBlur}
              value={values.contact[contactPersonNo].contactDepartment}
              onChange={(e) => {
                setFieldValue(
                  `contact[${contactPersonNo}].contactDepartment`,
                  e.target.value
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
                getIn(
                  touched,
                  `contact[${contactPersonNo}].contactPhoneNumber`
                ) &&
                  getIn(
                    errors,
                    `contact[${contactPersonNo}].contactPhoneNumber`
                  )
              )}
              helperText={
                getIn(
                  touched,
                  `contact[${contactPersonNo}].contactPhoneNumber`
                ) &&
                getIn(errors, `contact[${contactPersonNo}].contactPhoneNumber`)
              }
              name={`contact[${contactPersonNo}].contactPhoneNumber`}
              onBlur={handleBlur}
              value={values.contact[contactPersonNo].contactPhoneNumber}
              onChange={(e) => {
                setFieldValue(
                  `contact[${contactPersonNo}].contactPhoneNumber`,
                  e.target.value
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
                getIn(touched, `contact[${contactPersonNo}].contactEMail`) &&
                  getIn(errors, `contact[${contactPersonNo}].contactEMail`)
              )}
              helperText={
                getIn(touched, `contact[${contactPersonNo}].contactEMail`) &&
                getIn(errors, `contact[${contactPersonNo}].contactEMail`)
              }
              name={`contact[${contactPersonNo}].contactEMail`}
              onBlur={handleBlur}
              value={values.contact[contactPersonNo].contactEMail}
              onChange={(e) => {
                setFieldValue(
                  `contact[${contactPersonNo}].contactEMail`,
                  e.target.value
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

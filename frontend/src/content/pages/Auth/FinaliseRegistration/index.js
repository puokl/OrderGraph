import { useState, Children, useEffect } from "react";
import {
  Typography,
  Container,
  Button,
  Card,
  CircularProgress,
  Grid,
  Box,
  Step,
  StepLabel,
  Stepper,
  Link,
  Collapse,
  Alert,
  Avatar,
  IconButton,
  Autocomplete,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  selectClasses,
  Divider,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { CheckboxWithLabel, TextField } from "formik-mui";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import CheckTwoToneIcon from "@mui/icons-material/CheckTwoTone";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";

import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import Logo from "src/components/LogoSign";

import useAuth from "src/hooks/useAuth";
import { useNavigate } from "react-router-dom";

import axios from "src/utils/axios2";

const MainContent = styled(Box)(
  () => `
    height: 100%;
    overflow: auto;
    flex: 1;
`
);

const BoxActions = styled(Box)(
  ({ theme }) => `
    background: ${theme.colors.alpha.black[5]}
`
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(12)};
      height: ${theme.spacing(12)};
      box-shadow: ${theme.colors.shadows.success};
      margin-left: auto;
      margin-right: auto;

      .MuiSvgIcon-root {
        font-size: ${theme.typography.pxToRem(45)};
      }
`
);

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

const sizes = [
  { label: "1-5", value: "1-5" },
  { label: "6-10", value: "6-10" },
  { label: "11-20", value: "11-20" },
  { label: "21-50", value: "21-50" },
  { label: "50+", value: "50+" },
];

function FinaliseRegisterWizard(props) {
  const { t } = useTranslation();
  const [openAlert, setOpenAlert] = useState(true);
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState("");
  const { user, logout } = useAuth();
  const [sameAddress, setSameAddress] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSizeSelect = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleAddressCheck = (e) => {
    setSameAddress(!sameAddress);
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
        label={t("Organization Size")}
        value={field.value}
        onChange={(e) => {
          handleSizeSelect(e);
          setFieldValue("orgSize", e.target.value.toLowerCase());
          console.log(field.value);
          console.log(touched[field.name]);
        }}
      >
        {sizes.map((item) => (
          <MenuItem key={item.label} value={item.value}>
            {item.label}
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
    <>
      <Helmet>
        <title>Register - Wizard</title>
      </Helmet>
      <MainContent>
        <Container sx={{ my: 4 }} maxWidth="md">
          <Logo />
          <Box m={1}>
            <Button color="primary" fullWidth onClick={handleLogout}>
              <LockOpenTwoToneIcon
                sx={{
                  mr: 1,
                }}
              />
              {t("Sign out")}
            </Button>
          </Box>
          <Card sx={{ mt: 3, pt: 4 }}>
            <Box px={4}>
              <Typography variant="h2" sx={{ mb: 1 }}>
                {t("Finish Registration")}
              </Typography>
              <Typography
                variant="h4"
                color="text.secondary"
                fontWeight="normal"
                sx={{ mb: 3 }}
              >
                {t(
                  "Fill in these details about the organization and yourself."
                )}
              </Typography>
            </Box>

            <FormikStepper
              // enableReinitialize={true}
              initialValues={{
                orgName: "",
                website: "",
                phone: "",
                email: "",
                orgSize: selectedSize,
                address: {
                  streetAddress: "",
                  zip: "",
                  city: "",
                  country: "",
                  additional: "",
                },
                workplaceAddress: {
                  streetAddress: "",
                  zip: "",
                  city: "",
                  country: "",
                  additional: "",
                },
                sameAddress: false,
                firstname: "",
                lastname: "",
                rep_email: user.email,
                rep_phone: "",
              }}
              onSubmit={async (values) => {
                values.orgSize = selectedSize;
                console.log("values", values);
              }}
              selectedSize={selectedSize}
              sameAddress={sameAddress}
            >
              <FormikStep
                validationSchema={Yup.object().shape({
                  orgName: Yup.string()
                    .max(255)
                    .required(t("The Organization name field is required")),
                  website: Yup.string()
                    .max(255)
                    .required(t("The website field is required")),
                  phone: Yup.string()
                    .max(255)
                    .required(t("The phone field is required")),
                  email: Yup.string()
                    .email(
                      t("The email provided should be a valid email address")
                    )
                    .max(255)
                    .required(t("The email field is required")),
                  orgSize: Yup.mixed()
                    .oneOf(["1-5", "6-10", "11-20", "21-50", "50+"])
                    .required(t("The size field is required")),
                })}
                label={t("Organization Details")}
              >
                <Box p={4}>
                  <Typography variant="h4" sx={{ mb: 3 }}>
                    {t("Organization Details")}
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={24} md={12}>
                      <Field
                        fullWidth
                        name="orgName"
                        component={TextField}
                        label={t("Organization name")}
                        placeholder={t("Name...")}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="website"
                        component={TextField}
                        label={t("Website")}
                        placeholder={t("Website...")}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="phone"
                        component={TextField}
                        label={t("Phone number")}
                        placeholder={t("Phone...")}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="email"
                        component={TextField}
                        label={t("Email")}
                        placeholder={t("Email...")}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Organization Size
                        </InputLabel>
                        <Field name="orgSize" component={CustomSelect} />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              </FormikStep>
              <FormikStep
                validationSchema={Yup.object().shape({
                  address: Yup.object({
                    streetAddress: Yup.string()
                      .max(55)
                      .required(t("The address field is required")),
                    zip: Yup.string()
                      .max(255)
                      .required(t("The zip code field is required")),
                    city: Yup.string()
                      .max(255)
                      .required(t("The city field is required")),
                    country: Yup.string()
                      .max(255)
                      .required(t("The country field is required")),
                    additional: Yup.string().max(255),
                  }),
                  worplaceAddress: Yup.object({
                    streetAddress: Yup.string().max(55),
                    zip: Yup.string().max(255),
                    city: Yup.string().max(255),
                    country: Yup.string().max(255),
                    additional: Yup.string().max(255),
                  }),
                  sameAddress: Yup.bool().oneOf([true, false]),
                })}
                label={t("Addresses")}
              >
                <Box p={4}>
                  <Typography variant="h4" sx={{ mb: 3 }}>
                    {t("Headquarters address")}
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="address.streetAddress"
                        component={TextField}
                        label={t("Address")}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="address.zip"
                        component={TextField}
                        label={t("Zip Code")}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="address.city"
                        component={TextField}
                        label={t("City")}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="address.country"
                        component={TextField}
                        label={t("Country")}
                      />
                    </Grid>
                    <Grid item xs={24} md={12}>
                      <Field
                        fullWidth
                        name="additional"
                        component={TextField}
                        label={t("Additional Details")}
                      />
                    </Grid>
                  </Grid>
                  <Divider
                    sx={{
                      mt: 3,
                      mb: 3,
                    }}
                  />
                  <Typography variant="h4" sx={{ mb: 3 }}>
                    {t("Workplace address")}
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={24} md={12}>
                      <Field
                        type="checkbox"
                        component={CheckboxWithLabel}
                        name="sameAddress"
                        // value={sameAddress}
                        Label={{ label: t("Same as headquarters") }}
                        onClick={(e) => {
                          handleAddressCheck(e);
                        }}
                      />
                    </Grid>
                    {!sameAddress ? (
                      <>
                        <Grid item xs={12} md={6}>
                          <Field
                            fullWidth
                            name="workplaceAddress.streetAddress"
                            component={TextField}
                            label={t("Address")}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Field
                            fullWidth
                            name="workplaceAddress.zip"
                            component={TextField}
                            label={t("Zip Code")}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Field
                            fullWidth
                            name="workplaceAddress.city"
                            component={TextField}
                            label={t("City")}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Field
                            fullWidth
                            name="workplaceAddress.country"
                            component={TextField}
                            label={t("Country")}
                          />
                        </Grid>
                        <Grid item xs={24} md={12}>
                          <Field
                            fullWidth
                            name="workplaceAddress.additional"
                            component={TextField}
                            label={t("Additional Details")}
                          />
                        </Grid>
                      </>
                    ) : null}
                  </Grid>
                </Box>
              </FormikStep>
              <FormikStep
                validationSchema={Yup.object().shape({
                  firstname: Yup.string()
                    .max(55)
                    .required(t("The first name field is required")),
                  lastname: Yup.string()
                    .max(255)
                    .required(t("The last name field is required")),
                  rep_email: Yup.string()
                    .email(t("Must be a valid email"))
                    .max(255),
                  rep_phone: Yup.string()
                    .max(255)
                    .required(t("The phone field is required")),
                })}
                label={t("Representative")}
              >
                <Box p={4}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="firstname"
                        component={TextField}
                        label={t("First Name")}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="lastname"
                        component={TextField}
                        label={t("Last Name")}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="rep_email"
                        component={TextField}
                        label={t("Email")}
                        value={user.email}
                        disabled={true}
                        sx={{ color: "black" }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="rep_phone"
                        component={TextField}
                        label={t("Phone")}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </FormikStep>
              <FormikStep label={t("Complete Registration")}>
                <Box px={4} py={8}>
                  <Container maxWidth="sm">
                    <AvatarSuccess>
                      <CheckTwoToneIcon />
                    </AvatarSuccess>
                    <Collapse in={openAlert}>
                      <Alert
                        sx={{ mt: 5 }}
                        action={
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                              setOpenAlert(false);
                            }}
                          >
                            <CloseIcon fontSize="inherit" />
                          </IconButton>
                        }
                        severity="info"
                      >
                        {t(
                          "A confirmation has been sent to your email address"
                        )}
                      </Alert>
                    </Collapse>

                    <Typography
                      align="center"
                      sx={{ pt: 5, pb: 4, lineHeight: 1.5, px: 10 }}
                      variant="h2"
                    >
                      {t(
                        "Check your email to confirm your email and start using your account"
                      )}
                    </Typography>

                    <Button fullWidth variant="contained" href="/dashboard">
                      Continue to dashboard
                    </Button>
                  </Container>
                </Box>
              </FormikStep>
            </FormikStepper>
          </Card>
        </Container>
      </MainContent>
    </>
  );
}

export function FormikStep({ children }) {
  return <>{children}</>;
}

export function FormikStepper({
  children,
  selectedSize,
  sameAddress,
  ...props
}) {
  const childrenArray = Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);
  const { t } = useTranslation();
  const { user } = useAuth();

  function isLastStep() {
    return step === childrenArray.length - 2;
  }

  // function handleSubmit() {
  //   return true;
  // }

  const onSubmit = async (values, helpers) => {
    if (sameAddress) {
      values.workplaceAddress = values.address;
    }
    console.log(values);
    if (isLastStep()) {
      await props.onSubmit(values, helpers);
      const response = await axios.post(
        "api/v1/organization/neworganization/" + user._id,
        values
      );
      // console.log(response);
      if (response.data.success) {
        const res2 = await axios.put("/api/v1/auth/update/" + user._id, {
          organization: response.data.data._id,
          firstname: values.firstname,
          lastname: values.lastname,
          phone: values.rep_phone,
        });
        if (res2.data.success) {
          setCompleted(true);
          setStep((s) => s + 1);
        }
      }

      // Formik.setSubmitting(false); //// Important
    } else {
      setStep((s) => s + 1);
      // helpers.setTouched(false);
    }
  };

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={onSubmit}
    >
      {(props) => (
        <Form autoComplete="off ">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step
                key={child.props.label}
                completed={step > index || completed}
              >
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {currentChild}
          {!completed ? (
            <BoxActions
              p={4}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              {step > 0 ? (
                <Button
                  disabled={props.isSubmitting || step === 0}
                  variant="outlined"
                  color="primary"
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                >
                  {t("Previous")}
                </Button>
              ) : null}

              <Button
                startIcon={
                  props.isSubmitting ? <CircularProgress size="1rem" /> : null
                }
                disabled={props.isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
                sx={{ ml: "auto" }}
                // onClick={() => setStep((s) => s + 1)}
              >
                {props.isSubmitting
                  ? t("Submitting")
                  : isLastStep()
                  ? t("Complete registration")
                  : t("Next step")}
              </Button>
            </BoxActions>
          ) : null}
        </Form>
      )}
    </Formik>
  );
}

export default FinaliseRegisterWizard;

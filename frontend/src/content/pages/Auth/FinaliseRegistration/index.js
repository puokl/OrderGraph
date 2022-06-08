import { useState, Children } from "react";
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

function FinaliseRegisterWizard() {
  const { t } = useTranslation();
  const [openAlert, setOpenAlert] = useState(true);
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

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
              initialValues={{
                organization_name: "",
                website: "",
                phone: "",
                email: "",
                company_size: "",
                address: "",
                zip_code: "",
                city: "",
                country: "",
                additional: "",
              }}
              onSubmit={async () => {
                await sleep(3000);
              }}
            >
              <FormikStep
                validationSchema={Yup.object().shape({
                  organization_name: Yup.string()
                    .max(255)
                    .required(t("The Organization name field is required")),
                  website: Yup.string()
                    .url(t("The website provided should be a valid url"))
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
                  organization_size: Yup.array()
                    .oneOf(["1-5", "6-10", "11-20", "21-50", "50+"])
                    .required(t("The organization size field is required")),
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
                        name="organization_name"
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
                      <Autocomplete
                        disablePortal
                        options={sizes}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => (
                          <Field
                            name="rganization_size"
                            component={TextField}
                            fullWidth
                            {...params}
                            label={t("Organization size")}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </FormikStep>
              <FormikStep
                validationSchema={Yup.object().shape({
                  address: Yup.string()
                    .max(55)
                    .required(t("The address field is required")),
                  zip_code: Yup.string()
                    .max(255)
                    .required(t("The zip code field is required")),
                  city: Yup.string()
                    .max(255)
                    .required(t("The city field is required")),
                  country: Yup.string()
                    .max(255)
                    .required(t("The country field is required")),
                  additional: Yup.string()
                    .max(255)
                    .required(t("The country field is required")),
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
                        name="address"
                        component={TextField}
                        label={t("Address")}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="zip_code"
                        component={TextField}
                        label={t("Zip Code")}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="city"
                        component={TextField}
                        label={t("City")}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="country"
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
                </Box>
              </FormikStep>
              <FormikStep
                validationSchema={Yup.object().shape({
                  company_size: Yup.string()
                    .max(55)
                    .required(t("The first name field is required")),
                  company_name: Yup.string()
                    .max(255)
                    .required(t("The first name field is required")),
                  company_role: Yup.string()
                    .max(255)
                    .required(t("The first name field is required")),
                })}
                label={t("Representative")}
              >
                <Box p={4}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="company_name"
                        component={TextField}
                        label={t("Company name")}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="company_size"
                        type="number"
                        component={TextField}
                        label={t("Company size")}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="company_role"
                        component={TextField}
                        label={t("Company role")}
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

                    <Button
                      fullWidth
                      variant="contained"
                      href="/account/login-basic"
                    >
                      Continue to sign in
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

export function FormikStepper({ children, ...props }) {
  const childrenArray = Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);
  const { t } = useTranslation();

  function isLastStep() {
    return step === childrenArray.length - 2;
  }

  return (
    <>
      <Formik
        {...props}
        validationSchema={currentChild.props.validationSchema}
        onSubmit={async (values, helpers) => {
          if (isLastStep()) {
            await props.onSubmit(values, helpers);
            setCompleted(true);
            setStep((s) => s + 1);
          } else {
            setStep((s) => s + 1);
            helpers.setTouched({});
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form autoComplete="off">
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
                <Button
                  disabled={isSubmitting || step === 0}
                  variant="outlined"
                  color="primary"
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                >
                  {t("Previous")}
                </Button>

                <Button
                  startIcon={
                    isSubmitting ? <CircularProgress size="1rem" /> : null
                  }
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={() => setStep((s) => s + 1)}
                >
                  {isSubmitting
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
    </>
  );
}

export default FinaliseRegisterWizard;

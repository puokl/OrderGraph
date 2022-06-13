import * as Yup from "yup";
import { useRef } from "react";
import { Formik } from "formik";
import { Link as RouterLink } from "react-router-dom";

import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Checkbox,
  Typography,
  Link,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import useAuth from "src/hooks/useAuth";
import useRefMounted from "src/hooks/useRefMounted";
import { useTranslation } from "react-i18next";

const LoginJWT = () => {
  const { login } = useAuth();
  const isMountedRef = useRefMounted();
  const { t } = useTranslation();
  const inputEmail = useRef();
  const inputPassword = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(
        inputEmail.current.value,
        inputPassword.current.value
      );
      console.log(response);
      if (response.status === 200) {
        if (isMountedRef.current) {
          setStatus({ success: true });
          setSubmitting(false);
        }
      }
    } catch (err) {
      console.error(err);
      if (isMountedRef.current) {
        setStatus({ success: false });
        setErrors({ submit: err.message });
        setSubmitting(false);
      }
    }
  };

  return (
    <Formik
      initialValues={{
        email: "demo@example.com",
        password: "TokyoPass1@",
        terms: true,
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email(t("The email provided should be a valid email address"))
          .max(255)
          .required(t("The email field is required")),
        password: Yup.string()
          .max(255)
          .required(t("The password field is required")),
      })}
      onSubmit={handleLogin}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleLogin}>
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            margin="normal"
            autoFocus
            helperText={touched.email && errors.email}
            label={t("Email address")}
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
            inputRef={inputEmail}
            sx={{width: 'fitContent'}}
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            margin="normal"
            helperText={touched.password && errors.password}
            label={t("Password")}
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
            inputRef={inputPassword}
          />
          <Box
            alignItems="center"
            display="flex"
            justifyContent="space-between"
          >
            <Link component={RouterLink} to="/account/recover-password">
              <b>{t("Lost password?")}</b>
            </Link>
          </Box>

          {Boolean(touched.terms && errors.terms) && (
            <FormHelperText error>{errors.terms}</FormHelperText>
          )}

          <Button
            sx={{
              mt: 3,
            }}
            color="primary"
            startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
            disabled={isSubmitting}
            type="submit"
            fullWidth
            size="large"
            variant="contained"
          >
            {t("Sign in now")}
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default LoginJWT;

import { useState, useRef } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
// import wait from "src/utils/wait";
import useAuth from "src/hooks/useAuth";
import axios from "src/utils/axios2";

import {
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Box,
  Zoom,
  Typography,
  Divider,
  TextField,
  CircularProgress,
  Switch,
  Avatar,
  Autocomplete,
  IconButton,
  Button,
} from "@mui/material";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import { useSnackbar } from "notistack";
import CloudUploadTwoToneIcon from "@mui/icons-material/CloudUploadTwoTone";

const Input = styled("input")({
  display: "none",
});

const AvatarWrapper = styled(Box)(
  ({ theme }) => `

    position: relative;

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(6)};
    height: ${theme.spacing(6)};
    bottom: -${theme.spacing(2)};
    right: -${theme.spacing(2)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(6)};
      height: ${theme.spacing(6)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

const roles = [
  { label: "Admin", value: "admin" },
  { label: "Worker", value: "worker" },
];

function PageHeader(props) {
  const { getUsers } = props;
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const inputFirstName = useRef();
  const inputLastName = useRef();
  const inputEmail = useRef();
  const inputPassword = useRef();
  const inputRole = useRef();

  const [publicProfile, setPublicProfile] = useState({
    public: true,
  });

  const handlePublicProfile = (event) => {
    setPublicProfile({
      ...publicProfile,
      [event.target.name]: event.target.checked,
    });
  };

  const handleCreateUserOpen = () => {
    setOpen(true);
  };

  const handleCreateUserClose = () => {
    setOpen(false);
  };

  const handleCreateUserSuccess = async (e) => {
    e.preventDefault();
    const userToCreate = {
      firstname: inputFirstName.current.value,
      lastname: inputLastName.current.value,
      email: inputEmail.current.value,
      password: inputPassword.current.value,
      role: inputRole.current.value.toLowerCase(),
      organization: user.organization,
    };
    try {
      const response = await axios.post("/api/users/register", userToCreate);
      if (response.status === 201) {
        enqueueSnackbar(t("The user account was created successfully"), {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          TransitionComponent: Zoom,
        });
        getUsers();
      } else {
        enqueueSnackbar(t("An error occured, please try again."), {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          TransitionComponent: Zoom,
        });
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar(t("An error occured, please try again."), {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        TransitionComponent: Zoom,
      });
    }

    setOpen(false);
  };

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {t("Users Management")}
          </Typography>
          <Typography variant="subtitle2">
            {t(
              "All aspects related to the app users can be managed from this page"
            )}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            sx={{
              mt: { xs: 2, sm: 0 },
            }}
            onClick={handleCreateUserOpen}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            {t("Create user")}
          </Button>
        </Grid>
      </Grid>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleCreateUserClose}
      >
        <DialogTitle
          sx={{
            p: 3,
          }}
        >
          <Typography variant="h4" gutterBottom>
            {t("Add new user")}
          </Typography>
          <Typography variant="subtitle2">
            {t(
              "Fill in the fields below to create and add a new user to the site"
            )}
          </Typography>
        </DialogTitle>
        <Formik
          initialValues={{
            email: "",
            firstname: "",
            lastname: "",
            password: "",
            role: "",
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            firstname: Yup.string()
              .max(255)
              .required(t("The first name field is required")),
            lastname: Yup.string()
              .max(255)
              .required(t("The last name field is required")),
            email: Yup.string()
              .email(t("The email provided should be a valid email address"))
              .max(255)
              .required(t("The email field is required")),
            password: Yup.string()
              .max(255)
              .required(t("The password field is required")),
            role: Yup.string()
              .oneOf(["admin", "worker"])
              .required(t("The role field is required")),
          })}
          onSubmit={handleCreateUserSuccess}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            isSubmitting,
            touched,
            values,
          }) => (
            <form onSubmit={handleCreateUserSuccess}>
              <DialogContent
                dividers
                sx={{
                  p: 3,
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} lg={7}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(touched.firstname && errors.firstname)}
                          fullWidth
                          helperText={touched.firstname && errors.firstname}
                          label={t("First name")}
                          name="firstname"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.firstname}
                          variant="outlined"
                          inputRef={inputFirstName}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(touched.lastname && errors.lastname)}
                          fullWidth
                          helperText={touched.lastname && errors.lastname}
                          label={t("Last name")}
                          name="lastname"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.lastname}
                          variant="outlined"
                          inputRef={inputLastName}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          error={Boolean(touched.email && errors.email)}
                          fullWidth
                          helperText={touched.email && errors.email}
                          label={t("Email address")}
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="email"
                          value={values.email}
                          variant="outlined"
                          inputRef={inputEmail}
                        />
                      </Grid>
                      <Grid item xs={12}>
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
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Autocomplete
                          disablePortal
                          options={roles}
                          getOptionLabel={(option) => option.label}
                          renderInput={(params) => (
                            <TextField
                              error={Boolean(touched.role && errors.role)}
                              helperText={touched.role && errors.role}
                              value={values.role}
                              name="role"
                              fullWidth
                              {...params}
                              label={t("User role")}
                              variant="outlined"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              inputRef={inputRole}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} lg={5} justifyContent="center">
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexDirection="column"
                      mt={3}
                    >
                      <AvatarWrapper>
                        <Avatar
                          variant="rounded"
                          alt={user.name}
                          src={user.avatar}
                        />
                        <ButtonUploadWrapper>
                          <Input
                            accept="image/*"
                            id="icon-button-file"
                            name="icon-button-file"
                            type="file"
                          />
                          <label htmlFor="icon-button-file">
                            <IconButton component="span" color="primary">
                              <CloudUploadTwoToneIcon />
                            </IconButton>
                          </label>
                        </ButtonUploadWrapper>
                      </AvatarWrapper>
                    </Box>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions
                sx={{
                  p: 3,
                }}
              >
                <Button color="secondary" onClick={handleCreateUserClose}>
                  {t("Cancel")}
                </Button>
                <Button
                  type="submit"
                  startIcon={
                    isSubmitting ? <CircularProgress size="1rem" /> : null
                  }
                  disabled={Boolean(errors.submit) || isSubmitting}
                  variant="contained"
                >
                  {t("Add new user")}
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}

export default PageHeader;

import { useState, useRef } from "react";
import * as Yup from "yup";
import { Formik, Field } from "formik";
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
  FormControl,
  Select,
  MenuItem,
  InputLabel,
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

function CreateUser(props) {
  const { getUsers, open, setOpen, userToEdit } = props;
  const { t } = useTranslation();

  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const [role, setRole] = useState("");

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
        label={t("User role")}
        value={field.value}
        onChange={(e) => {
          handleRoleSelect(e);
          setFieldValue("role", e.target.value.toLowerCase());
        }}
      >
        {roles.map((item) => (
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

  //   const handlePublicProfile = (event) => {
  //     setPublicProfile({
  //       ...publicProfile,
  //       [event.target.name]: event.target.checked,
  //     });
  //   };

  //   const handleCreateUserOpen = () => {
  //     setOpen(true);
  //   };

  const handleCreateUserClose = () => {
    setOpen(false);
  };

  const handleRoleSelect = (e) => {
    setRole(e.target.value.toLowerCase());
  };

  const handleCreateUserSuccess = async (values) => {
    // const userToCreate = {
    //   firstname: inputFirstName.current.value,
    //   lastname: inputLastName.current.value,
    //   email: inputEmail.current.value,
    //   ...(inputEmail.current.value !== "" && {
    //     password: inputEmail.current.value,
    //   }),
    //   role: inputRole.current.value.toLowerCase(),
    //   organization: user.organization,
    // };

    try {
      let response;
      if (userToEdit) {
        response = await axios.put("api/v1/user/" + userToEdit._id, {
          ...(userToEdit.firstname !== values.firstname
            ? { firstname: values.firstname }
            : null),
          ...(userToEdit.lastname !== values.lastname
            ? { lastname: values.lastname }
            : null),
          ...(userToEdit.role !== values.role ? { role: values.role } : null),
          ...(values.password !== "" ? { password: values.password } : null),
        });
      } else {
        response = await axios.post("/api/v1/user", {
          ...values,
          organization: user.organization,
        });
      }

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
      } else if (response.status === 200) {
        enqueueSnackbar(t("The user was updated succesfully"), {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          TransitionComponent: Zoom,
        });
        getUsers();
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
    <Dialog fullWidth maxWidth="md" open={open} onClose={handleCreateUserClose}>
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
          ...(userToEdit ? { email: userToEdit.email } : { email: "" }),
          ...(userToEdit
            ? { firstname: userToEdit.firstname }
            : { firstname: "" }),
          ...(userToEdit
            ? { lastname: userToEdit.lastname }
            : { lastname: "" }),
          ...(userToEdit ? { role: userToEdit.role } : { role: "" }),
          submit: null,
          password: "",
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
        onSubmit={async (values) => {
          await handleCreateUserSuccess(values);
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
          setFieldValue,
        }) => (
          <form>
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
                        helperText={touched.firstname && errors.firstname}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setFieldValue("firstname", e.target.value);
                        }}
                        fullWidth
                        label={t("First name")}
                        name="firstname"
                        variant="outlined"
                        value={values.firstname}
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
                        onChange={(e) => {
                          setFieldValue("lastname", e.target.value);
                        }}
                        value={values.lastname}
                        variant="outlined"
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
                        onChange={(e) => {
                          setFieldValue("email", e.target.value);
                        }}
                        type="email"
                        value={values.email}
                        variant="outlined"
                        disabled={userToEdit ? true : false}
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
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          User role
                        </InputLabel>
                        <Field name="role" component={CustomSelect} />
                      </FormControl>
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
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
              >
                {userToEdit ? t("Edit user") : t("Add new user")}
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
}

export default CreateUser;

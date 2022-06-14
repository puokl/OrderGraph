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

function PageHeader(props) {
  const { handleCreateUserOpen } = props;
  const { t } = useTranslation();

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
            onClick={() => {
              handleCreateUserOpen();
            }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            {t("Create user")}
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default PageHeader;

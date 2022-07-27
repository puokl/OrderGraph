import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "src/utils/axios2";
import {
  Button,
  Card,
  Box,
  Typography,
  TextField,
  Zoom,
  Tooltip,
} from "@mui/material";
import { useSnackbar } from "notistack";
import useAuth from "src/hooks/useAuth";

function Status({ currentOrder }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [isReady, setReady] = useState(false);
  const dateString =
    new Date(currentOrder.startDate).toDateString() +
    " " +
    new Date(currentOrder.startDate).toLocaleTimeString("it-IT");
  console.log(dateString);

  const multipleExist = (arr, values) => {
    return values.every((value) => {
      return arr.includes(value);
    });
  };

  useEffect(() => {
    console.log(isReady);
    if (currentOrder && currentOrder.status !== "active") {
      if (
        multipleExist(Object.keys(currentOrder), [
          "items",
          "client",
          "startDate",
          "tasks",
        ])
      ) {
        setReady(true);
      }
    }
  }, [currentOrder]);

  const saveDraft = async () => {
    try {
      const response = await axios.post(
        "/api/v1/order/neworder/" + user.organization,
        currentOrder
      );
      console.log(response);

      if (response.status === 200) {
        enqueueSnackbar(t("The order was created successfully"), {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          TransitionComponent: Zoom,
        });
      } else {
        enqueueSnackbar(t("other status"), {
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
    }
  };

  const activateOrder = async () => {
    currentOrder.status = "active";
    currentOrder.draft = false;

    try {
      const response = await axios.post(
        "/api/v1/order/neworder/" + user.organization,
        currentOrder
      );
      console.log(response);

      if (response.status === 200) {
        enqueueSnackbar(t("The order was activated successfully"), {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          TransitionComponent: Zoom,
        });
      } else {
        enqueueSnackbar(t("other status"), {
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
    }
  };

  return (
    <Card sx={{ p: "1.5rem", mb: "3rem" }}>
      <Typography
        variant="h4"
        component="h4"
        gutterBottom
        sx={{
          py: 0.5,
        }}
      >
        {t("Order")}
      </Typography>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            minWidth: "5.2rem",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            fontWeight="normal"
            sx={{
              py: 1,
            }}
          >
            {t("Status :")}
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            fontWeight="normal"
            sx={{
              py: 1,
            }}
          >
            {t("Start Date :")}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="h5"
            gutterBottom
            fontWeight="bold"
            sx={{
              py: 1,
            }}
          >
            {currentOrder ? t(`${currentOrder.status}`) : t("")}
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            fontWeight="bold"
            sx={{
              py: 1,
            }}
          >
            {currentOrder ? dateString : t("Not yet set")}
          </Typography>
        </Box>
      </Box>
      {/* <Box
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Button
          variant="outlined"
          color="secondary"
          sx={{ mb: 1 }}
          onClick={() => saveDraft()}
        >
          Save draft
        </Button>
        <Tooltip
          arrow
          title={
            isReady
              ? t("Activate this order")
              : t(
                  "Please complete all required part of the order to activate it"
                )
          }
        >
          <div>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              disabled={isReady ? false : true}
              onClick={() => activateOrder()}
            >
              Activate
            </Button>
          </div>
        </Tooltip>
      </Box> */}
    </Card>
  );
}

export default Status;

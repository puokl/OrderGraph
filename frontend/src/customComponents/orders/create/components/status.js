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
import { useNavigate } from "react-router-dom";
import { DateTimePicker } from "@mui/lab";

function Status({ currentOrder, setCurrentOrder, orderID }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [isReady, setReady] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (
      currentOrder.client !== "" &&
      currentOrder.items[0] &&
      currentOrder.startDate !== null
    ) {
      setReady(true);
    }
    console.log(currentOrder.items.every((item) => item.tasks[0].taskName));
  }, [currentOrder]);

  const saveDraft = async () => {
    currentOrder.items.forEach((item) => {
      item.tasks?.forEach((task) => {
        task.startDate = currentOrder.startDate;
        let duration = 0;
        task.subTasks.forEach(
          (subtask) => (duration = duration + Number(subtask.timeEstimate))
        );
        {
          duration === 0
            ? (task.duration = duration + 1)
            : (task.duration = duration);
        }
      });
    });
    currentOrder.status = "upcoming";
    currentOrder.draft = true;

    let response;

    try {
      if (currentOrder._id) {
        response = await axios.put(
          "/api/v1/order/" + currentOrder._id,
          currentOrder
        );
      } else {
        response = await axios.post(
          "/api/v1/order/neworder/" + user.organization,
          currentOrder
        );
      }

      console.log(response);

      if (response.status === 200) {
        enqueueSnackbar(t("The order was successfully saved as a draft."), {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          TransitionComponent: Zoom,
        });
      }
      navigate("/orders/edit/" + response.data.data._id, { replace: true });
    } catch (err) {
      enqueueSnackbar(t("There was an error saving the draft order"), {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        TransitionComponent: Zoom,
      });
      console.error(err);
    }
  };

  const activateOrder = async () => {
    currentOrder.status = "active";
    currentOrder.draft = false;
    currentOrder.items.forEach((item) => {
      item.tasks.forEach((task) => {
        task.startDate = currentOrder.startDate;
        let duration = 0;
        task.subTasks.forEach(
          (subtask) => (duration = duration + Number(subtask.timeEstimate))
        );
        {
          duration === 0
            ? (task.duration = duration + 1)
            : (task.duration = duration);
        }
      });
    });
    let response;

    try {
      if (currentOrder._id) {
        response = await axios.put(
          "/api/v1/order/" + currentOrder._id,
          currentOrder
        );
      } else {
        response = await axios.post(
          "/api/v1/order/neworder/" + user.organization,
          currentOrder
        );
      }
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
      }
      navigate("/orders/" + response.data.data._id, { replace: true });
    } catch (err) {
      enqueueSnackbar(
        t("There was an error activating the order, please try again"),
        {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          TransitionComponent: Zoom,
        }
      );
      console.error(err);
    }
  };

  const updateOrder = async () => {
    currentOrder.items.forEach((item) => {
      item.tasks.forEach((task) => {
        task.startDate = currentOrder.startDate;

        let duration = 0;
        task.subTasks.forEach(
          (subtask) => (duration = duration + Number(subtask.timeEstimate))
        );
        {
          duration === 0
            ? (task.duration = duration + 1)
            : (task.duration = duration);
        }
      });
    });

    try {
      const response = await axios.put(
        "/api/v1/order/" + currentOrder._id,
        currentOrder
      );
      console.log(response);
      if (response.status === 200) {
        enqueueSnackbar(t("The item was saved successfully"), {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          TransitionComponent: Zoom,
        });
      }
      navigate("/orders/" + response.data.data._id, { replace: true });
    } catch (err) {
      enqueueSnackbar(t("There was an error"), {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        TransitionComponent: Zoom,
      });
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
            {currentOrder?.status
              ? t(`${currentOrder.status}`)
              : t("Unsaved order")}
          </Typography>
          <DateTimePicker
            value={currentOrder.startDate}
            onChange={(date) => {
              setCurrentOrder({ ...currentOrder, startDate: date });
              console.log(currentOrder);
            }}
            label={t("Start date and time...")}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                variant="outlined"
                fullWidth
                color="primary"
              />
            )}
          />
        </Box>
      </Box>

      {currentOrder?.draft === false ? (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Tooltip
            arrow
            title={
              !currentOrder.items.every((item) => item.tasks[0].taskName)
                ? t("Please ensure all items in the order include tasks")
                : t("Update this order")
            }
          >
            <div>
              <Button
                fullWidth
                disabled={
                  !currentOrder.items.every((item) => item.tasks[0].taskName)
                }
                variant="outlined"
                color="secondary"
                sx={{ mb: 1 }}
                onClick={() => updateOrder()}
              >
                Update
              </Button>
            </div>
          </Tooltip>
        </Box>
      ) : (
        <Box
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
                    "Please complete all required parts of the order to activate it"
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
        </Box>
      )}
    </Card>
  );
}

export default Status;

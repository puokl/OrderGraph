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

function Status({
  startDate,
  setStartDate,
  orderItems,
  selectedClient,
  currentOrder,
  orderID,
}) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [isReady, setReady] = useState(false);
  let navigate = useNavigate();

  const multipleExist = (arr, values) => {
    return values.every((value) => {
      return arr.includes(value);
    });
  };

  const taskArray = [];

  const fullOrder = {
    ...(orderItems.length > 0 ? { items: orderItems } : null),
    ...(selectedClient ? { client: selectedClient._id } : null),
    ...(startDate ? { startDate: startDate } : null),

    status: "upcoming",
    draft: true,
    ...(orderItems[0]?.tasks?.length > 0 ? { tasks: taskArray } : null),
    createdByUser: user._id,
    createdByOrganization: user.organization,
  };

  useEffect(() => {
    console.log(isReady);
    if (
      multipleExist(Object.keys(fullOrder), [
        "items",
        "client",
        "startDate",
        "tasks",
      ])
    ) {
      setReady(true);
    }
  }, [fullOrder]);

  const saveDraft = async () => {
    fullOrder.items?.tasks?.forEach((item) => (item.startDate = startDate));
    orderItems.forEach((item) => taskArray.push(...item.tasks));

    try {
      const response = await axios.post(
        "/api/v1/order/neworder/" + user.organization,
        fullOrder
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
    fullOrder.status = "active";
    fullOrder.draft = false;
    fullOrder.items.forEach((item) => {
      console.log("hi");
      item.tasks.forEach((task) => {
        task.startDate = startDate;
        console.log("hi2");
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
    orderItems.forEach((item) => taskArray.push(...item.tasks));
    try {
      const response = await axios.post(
        "/api/v1/order/neworder/" + user.organization,
        fullOrder
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
      }
      navigate("/orders/" + response.data.data._id, { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  const updateOrder = async () => {
    fullOrder.status = "active";
    fullOrder.draft = false;
    fullOrder.items.forEach((item) => {
      console.log("hi");
      item.tasks.forEach((task) => {
        task.startDate = startDate;
        console.log("hi2");
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
    orderItems.forEach((item) => taskArray.push(...item.tasks));

    try {
      const response = await axios.put(
        "/api/v1/order/" + currentOrder._id,
        fullOrder
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
            value={startDate}
            onChange={(date) => setStartDate(date)}
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
          <Button
            variant="outlined"
            color="secondary"
            sx={{ mb: 1 }}
            onClick={() => updateOrder()}
          >
            Update
          </Button>
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
        </Box>
      )}
    </Card>
  );
}

export default Status;

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import {
  CardActionArea,
  CardContent,
  Tooltip,
  Card,
  Avatar,
  Typography,
  Divider,
  Box,
  IconButton,
  Button,
  Checkbox,
  Dialog,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import TimerTwoToneIcon from "@mui/icons-material/TimerTwoTone";
import ItemForm from "src/customComponents/orders/details/components/itemForm";

function ItemEditDialog(props) {
  const {
    onClose,
    currentOrder,
    open,
    finishedItem,
    unfinishedItem,
    orderToUpdate,
  } = props;

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="md">
      <ItemForm
        itemToEdit={finishedItem ? finishedItem : unfinishedItem}
        onClose={onClose}
        orderToUpdate={orderToUpdate}
      />
    </Dialog>
  );
}

function Items({ currentOrder, getOrder }) {
  const { t } = useTranslation();
  const finished = [];
  const unfinished = [];
  const [showFinTasks, setshowFinTasks] = useState();
  const [showUnfinTasks, setshowUnfinTasks] = useState();
  const [open, setOpen] = useState(false);

  currentOrder.items.forEach((item, index) => {
    if (item.tasks.every((task) => task.finished === true)) {
      finished.push(item);
    } else {
      unfinished.push(item);
    }
  });

  const editItem = (item, index) => {
    if (unfinished.includes(item)) {
      setOpen(true);
    } else if (finished.includes(item)) {
      setOpen(`finished ${index}`);
    }
  };

  const handleCloseEdit = () => {
    setOpen(false);
    getOrder(currentOrder._id);
  };

  const handleOpenItemDetails = (item, index) => {
    if (unfinished.includes(item)) {
      if (showUnfinTasks === index) {
        setshowUnfinTasks(null);
      } else {
        setshowUnfinTasks(index);
      }
    } else if (finished.includes(item)) {
      if (showFinTasks === index) {
        setshowFinTasks(null);
      } else {
        setshowFinTasks(index);
      }
    }
  };

  return (
    <Card sx={{ p: "1.5rem" }}>
      <Typography
        variant="h4"
        component="h4"
        gutterBottom
        sx={{
          py: 0.5,
        }}
      >
        {t("Unfinished Items")}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {unfinished.length > 0 ? (
        unfinished.map((unfinishedItem, index) => (
          <div key={`unfinished ${index}`}>
            <Box
              id="unfinished"
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#F6F8FB",
                borderLeft: "6px solid #33C2FF",
                marginBottom: "1rem",
                padding: ".5rem .5rem .5rem 1rem",
              }}
              fullwidth
              onClick={(e) => {
                handleOpenItemDetails(unfinishedItem, index);
              }}
            >
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                fullwidth
              >
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    component="p"
                    sx={{
                      py: 0.5,
                      fontWeight: "bold",
                    }}
                  >
                    {unfinishedItem.itemName}
                  </Typography>
                  <Typography
                    component="p"
                    sx={{
                      py: 0.5,
                    }}
                  >
                    {unfinishedItem.description}
                  </Typography>
                  <Typography
                    component="p"
                    sx={{
                      py: 0.5,
                    }}
                  >
                    {`${unfinishedItem.quantity} units`}
                  </Typography>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    component="p"
                    sx={{
                      py: 0.5,
                    }}
                  >
                    {t("Estimated time: ")}
                    <span
                      style={{ fontWeight: "bold" }}
                    >{`${unfinishedItem.tasks.reduce(
                      (prev, current) => prev + current.duration,
                      0
                    )} hours`}</span>
                  </Typography>
                  <Typography
                    component="p"
                    sx={{
                      py: 0.5,
                    }}
                  >
                    {t("Current: ")}
                  </Typography>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Tooltip title={t("Edit this item")} arrow>
                    <IconButton
                      onClick={() => {
                        editItem(unfinishedItem, index);
                      }}
                      color="primary"
                    >
                      <EditTwoToneIcon fontSize="small" color="disabled" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  marginTop: ".5rem",
                }}
                fullwidth
              >
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                  fullwidth
                >
                  <Typography
                    component="p"
                    sx={{
                      py: 0.5,
                    }}
                  >
                    {
                      <b>{`${
                        unfinishedItem.tasks.filter(
                          (task) => task.finished === true
                        ).length
                      }`}</b>
                    }
                    {t(" out of ")}
                    {<b>{`${unfinishedItem.tasks.length}`}</b>}
                    {t(" tasks completed")}
                  </Typography>
                  <Typography
                    component="p"
                    sx={{
                      py: 0.5,
                      fontWeight: "bold",
                    }}
                  >
                    {t(`Due in ${10} days`)}
                  </Typography>
                </Box>
                <Box sx={{ width: "100%" }}>
                  <LinearProgress
                    variant="determinate"
                    value={
                      (unfinishedItem.tasks.filter(
                        (task) => task.finished === true
                      ).length *
                        100) /
                      unfinishedItem.tasks.length
                    }
                  />
                </Box>
              </Box>
              {showUnfinTasks === index ? (
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "1rem",
                  }}
                >
                  {unfinishedItem.tasks?.map((task, index2) => (
                    <div key={`task ${index2}`}>
                      <Box
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          disabled
                          aria-label="Tasks"
                          size="small"
                          color="primary"
                          style={{
                            backgroundColor: "rgba(85, 105, 255, 0.1)",
                            width: "3rem",
                            height: "3rem",
                            borderRadius: "50%",
                            minWidth: 0,
                          }}
                        >
                          <CalendarTodayOutlinedIcon color="primary" />
                        </Button>
                        <Typography component="p" sx={{ ml: 1 }}>
                          {task.taskName}
                        </Typography>
                      </Box>
                      <Box
                        style={{
                          borderLeft: "1px solid #D9D9D9",
                          width: "100%",
                          marginLeft: "1.5rem",
                        }}
                      >
                        {task.subTasks.length > 0 ? (
                          task.subTasks.map((subtask, index3) => (
                            <Box
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",

                                width: "60%",
                              }}
                              key={`sub2 ${index3}`}
                            >
                              <Box
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",

                                  width: "50%",
                                }}
                              >
                                <Checkbox disabled />
                                <Typography component="p" sx={{ ml: 1 }}>
                                  {subtask.description}
                                </Typography>
                              </Box>
                              <Box
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <TimerTwoToneIcon color="disabled" />
                                <Typography component="p" sx={{ ml: 1 }}>
                                  {`${subtask.timeEstimate} hours`}
                                </Typography>
                              </Box>
                            </Box>
                          ))
                        ) : (
                          <Box
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography component="p" sx={{ ml: "3rem" }}>
                              {t("No subtasks")}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </div>
                  ))}
                </Box>
              ) : null}
            </Box>
            <ItemEditDialog
              open={open}
              onClose={handleCloseEdit}
              finishedItem={null}
              unfinishedItem={unfinishedItem}
              orderToUpdate={currentOrder}
            />
          </div>
        ))
      ) : (
        <Typography
          component="p"
          gutterBottom
          sx={{
            py: 0.5,
          }}
        >
          {t("No unfininshed items")}
        </Typography>
      )}
      <Divider sx={{ mb: 2 }} />
      <Typography
        variant="h4"
        component="h4"
        gutterBottom
        sx={{
          py: 0.5,
        }}
      >
        {t("Finished Items")}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {finished.length > 0 ? (
        finished.map((finishedItem, index) => (
          <Box
            id="finished"
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#F6F8FB",
              borderLeft: "6px solid #44D600",
              marginBottom: "1rem",
              padding: ".5rem .5rem .5rem 1rem",
            }}
            fullwidth
            onClick={(e) => {
              handleOpenItemDetails(finishedItem, index);
            }}
            key={`finished ${index}`}
          >
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              fullwidth
            >
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  component="p"
                  sx={{
                    py: 0.5,
                    fontWeight: "bold",
                  }}
                >
                  {finishedItem.itemName}
                </Typography>
                <Typography
                  component="p"
                  sx={{
                    py: 0.5,
                  }}
                >
                  {finishedItem.description}
                </Typography>
                <Typography
                  component="p"
                  sx={{
                    py: 0.5,
                  }}
                >
                  {`${finishedItem.quantity} units`}
                </Typography>
              </Box>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  component="p"
                  sx={{
                    py: 0.5,
                  }}
                >
                  {t("Estimated time: ")}
                  <span
                    style={{ fontWeight: "bold" }}
                  >{`${finishedItem.tasks.reduce(
                    (prev, current) => prev + current.duration,
                    0
                  )} hours`}</span>
                </Typography>
                <Typography
                  component="p"
                  sx={{
                    py: 0.5,
                  }}
                >
                  {t("Current: ")}
                </Typography>
              </Box>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              ></Box>
            </Box>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                marginTop: ".5rem",
              }}
              fullwidth
            >
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  height: "100%",
                }}
                fullwidth
              >
                <Typography
                  component="p"
                  sx={{
                    py: 0.5,
                  }}
                >
                  {
                    <b>{`${
                      finishedItem.tasks.filter(
                        (task) => task.finished === true
                      ).length
                    }`}</b>
                  }
                  {t(" out of ")}
                  {<b>{`${finishedItem.tasks.length}`}</b>}
                  {t(" tasks completed")}
                </Typography>
                <Typography
                  component="p"
                  sx={{
                    py: 0.5,
                    fontWeight: "bold",
                  }}
                >
                  {t(`Due in ${10} days`)}
                </Typography>
              </Box>
              <Box sx={{ width: "100%" }}>
                <LinearProgress
                  variant="determinate"
                  value={
                    (finishedItem.tasks.filter((task) => task.finished === true)
                      .length *
                      100) /
                    finishedItem.tasks.length
                  }
                />
              </Box>
            </Box>
            {showFinTasks === index ? (
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "1rem",
                }}
              >
                {finishedItem.tasks?.map((task, index2) => (
                  <div key={`sub ${index2}`}>
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        disabled
                        aria-label="Tasks"
                        size="small"
                        color="primary"
                        style={{
                          backgroundColor: "rgba(85, 105, 255, 0.1)",
                          width: "3rem",
                          height: "3rem",
                          borderRadius: "50%",
                          minWidth: 0,
                        }}
                      >
                        <CalendarTodayOutlinedIcon color="primary" />
                      </Button>
                      <Typography component="p" sx={{ ml: 1 }}>
                        {task.taskName}
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        borderLeft: "1px solid #D9D9D9",
                        width: "100%",
                        marginLeft: "1.5rem",
                      }}
                    >
                      {task.subTasks.length > 0 ? (
                        task.subTasks.map((subtask, index3) => (
                          <Box
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",

                              width: "60%",
                            }}
                            key={`sub ${index3}`}
                          >
                            <Box
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",

                                width: "50%",
                              }}
                            >
                              <Checkbox disabled />
                              <Typography component="p" sx={{ ml: 1 }}>
                                {subtask.description}
                              </Typography>
                            </Box>
                            <Box
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <TimerTwoToneIcon color="disabled" />
                              <Typography component="p" sx={{ ml: 1 }}>
                                {`${subtask.timeEstimate} hours`}
                              </Typography>
                            </Box>
                          </Box>
                        ))
                      ) : (
                        <Box
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography component="p" sx={{ ml: "3rem" }}>
                            {t("No subtasks")}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </div>
                ))}
              </Box>
            ) : null}
          </Box>
        ))
      ) : (
        <Typography
          component="p"
          gutterBottom
          sx={{
            py: 0.5,
          }}
        >
          {t("No fininshed items")}
        </Typography>
      )}
    </Card>
  );
}

export default Items;

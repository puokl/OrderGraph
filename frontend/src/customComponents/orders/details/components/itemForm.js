import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import axios from "src/utils/axios2";
import {
  Grid,
  CardActionArea,
  CardContent,
  Tooltip,
  Card,
  Avatar,
  Divider,
  Button,
  Box,
  Typography,
  Checkbox,
  Zoom,
} from "@mui/material";

import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import TimerTwoToneIcon from "@mui/icons-material/TimerTwoTone";
import { handleBreakpoints } from "@mui/system";

function ItemForm({ itemToEdit, onClose, orderToUpdate }) {
  const { t } = useTranslation();
  const itemCopy = { ...itemToEdit };
  const [selectedItem, setSelectedItem] = useState({ ...itemToEdit });
  console.log(selectedItem);
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveItem = async () => {
    console.log(orderToUpdate.items[orderToUpdate.items.indexOf(itemToEdit)]);
    orderToUpdate.items[orderToUpdate.items.indexOf(itemToEdit)] = selectedItem;

    orderToUpdate.items.forEach((item) => {
      item.tasks.forEach((task) => {
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
        "/api/v1/order/" + orderToUpdate._id,
        orderToUpdate
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
    onClose();
  };
  const handleItemTemplate = async () => {
    try {
      const response = await axios.post("/api/v1/item/newitem", selectedItem);
      console.log(response);
      if (response.status === 201) {
        enqueueSnackbar(t("Item template was saved successfully"), {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          TransitionComponent: Zoom,
        });
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar(
        t("There was an error saving the item template, please try again"),
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
  };

  const handleItemTemplateUpdate = async () => {
    try {
      const response = await axios.put(
        "/api/v1/item/" + selectedItem._id,
        selectedItem
      );
      console.log(response);
      if (response.status === 200) {
        enqueueSnackbar(t("Item template was updated successfully"), {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          TransitionComponent: Zoom,
        });
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar(
        t("There was an error updating the item template, please try again"),
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
  };

  return (
    <Card sx={{ m: "1rem", p: 2, mb: "1rem" }}>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        s
      >
        <TextField
          style={{ margin: ".5rem 0", width: "60%" }}
          placeholder={t("Item name...")}
          value={selectedItem.itemName}
          onChange={(e) => {
            itemCopy.itemName = e.target.value;
            setSelectedItem({ ...itemCopy });
          }}
        />
        {selectedItem._id ? (
          <Button
            aria-label="Update Template"
            size="small"
            color="primary"
            style={{
              backgroundColor: "rgba(85, 105, 255, 0.1)",
              minWidth: "2rem",
            }}
            onClick={() => handleItemTemplateUpdate()}
          >
            {t("Update item template")}
          </Button>
        ) : (
          <Button
            aria-label="Save Template"
            size="small"
            color="primary"
            style={{
              backgroundColor: "rgba(85, 105, 255, 0.1)",
              minWidth: "2rem",
            }}
            onClick={() => handleItemTemplate()}
          >
            {t("Save item as template")}
          </Button>
        )}
        <Button
          aria-label="Delete"
          color="primary"
          style={{
            backgroundColor: "rgba(85, 105, 255, 0.1)",
            width: "3rem",
            height: "3rem",
            padding: "1rem",
          }}
          onClick={() => onClose()}
        >
          <CloseIcon color="primary" />
        </Button>
      </Box>
      <Divider sx={{ mt: 1, mb: 1 }} />
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            minWidth: "6.5rem",
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            style={{
              height: "25%",
              display: "flex",
              alignItems: "center",
            }}
          >
            {t("Description :")}
          </Typography>
          <Typography
            variant="h5"
            fontWeight="bold"
            style={{
              height: "25%",
              display: "flex",
              alignItems: "center",
            }}
          >
            {t("Size :")}
          </Typography>
          <Typography
            variant="h5"
            fontWeight="bold"
            style={{
              height: "25%",
              display: "flex",
              alignItems: "center",
            }}
          >
            {t("Units :")}
          </Typography>
          <Typography
            variant="h5"
            fontWeight="bold"
            style={{
              height: "25%",
              display: "flex",
              alignItems: "center",
            }}
          >
            {t("Price / Unit :")}
          </Typography>
        </Box>
        <Box>
          <TextField
            style={{ margin: ".5rem 0" }}
            fullWidth
            placeholder={t("Item description")}
            value={selectedItem.description}
            onChange={(e) => {
              itemCopy.description = e.target.value;
              setSelectedItem({ ...itemCopy });
            }}
          />
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TextField
              style={{ margin: ".5rem .5rem .5rem 0" }}
              placeholder={t("Height")}
              value={selectedItem.height}
              onChange={(e) => {
                itemCopy.height = e.target.value;
                setSelectedItem({ ...itemCopy });
              }}
            />
            <span style={{ fontWeight: "bold", fontSize: "1.3rem" }}>x</span>
            <TextField
              style={{ margin: ".5rem 0 .5rem .5rem " }}
              placeholder={t("Width")}
              value={selectedItem.width}
              onChange={(e) => {
                itemCopy.width = e.target.value;
                setSelectedItem({ ...itemCopy });
              }}
            />
          </Box>

          <TextField
            style={{ margin: ".5rem 1.8rem .5rem 0" }}
            placeholder={t("Quantity")}
            value={selectedItem.quantity}
            onChange={(e) => {
              itemCopy.quantity = e.target.value;
              setSelectedItem({ ...itemCopy });
            }}
          />
          <TextField
            style={{ margin: ".5rem 0" }}
            placeholder={t("Measurement Units")}
            value={selectedItem.units}
            onChange={(e) => {
              itemCopy.units = e.target.value;
              setSelectedItem({ ...itemCopy });
            }}
          />
          <TextField
            style={{ margin: ".5rem 0" }}
            fullWidth
            placeholder={t("Price / Unit")}
            value={selectedItem.unitPrice}
            onChange={(e) => {
              itemCopy.unitPrice = e.target.value;
              setSelectedItem({ ...itemCopy });
            }}
          />
        </Box>
      </Box>
      <Divider sx={{ mt: 1, mb: 1 }} />
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            minWidth: "6.5rem",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            fontWeight="bold"
            sx={{
              py: 1,
            }}
          >
            {t("Tasks :")}
          </Typography>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            width: "65%",
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Button
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
              {selectedItem.tasks[0]?.taskName ? (
                <CalendarTodayOutlinedIcon
                  color="primary"
                  // onClick={}
                />
              ) : (
                <AddTwoToneIcon
                  color="primary"
                  onClick={(e) => {
                    itemCopy.tasks[0] = {
                      taskName: "New Task",
                      subTasks: [],
                    };
                    setSelectedItem({ ...itemCopy });
                  }}
                />
              )}
            </Button>
            <TextField
              variant="standard"
              placeholder="Add a task..."
              InputProps={{
                disableUnderline: true,
              }}
              sx={{ ml: 1 }}
              value={
                selectedItem.tasks[0]?.taskName
                  ? selectedItem.tasks[0]?.taskName
                  : ""
              }
              onChange={(e) => {
                itemCopy.tasks[0].taskName = e.target.value;
                setSelectedItem({ ...itemCopy });
              }}
            />
            {selectedItem.tasks[0].taskName ? (
              <Button
                aria-label="Delete"
                size="small"
                color="primary"
                style={{
                  backgroundColor: "rgba(85, 105, 255, 0.1)",
                  minWidth: 0,
                  width: "1.5rem",
                  height: "1.5rem",
                  borderRadius: "50%",
                  marginLeft: "auto",
                }}
                onClick={(e) => {
                  if (itemCopy.tasks.length > 1) {
                    itemCopy.tasks.shift();
                  } else {
                    itemCopy.tasks[0] = {
                      taskName: "New Task",
                      subTasks: [],
                    };
                  }
                  setSelectedItem({ ...itemCopy });
                }}
              >
                <CloseIcon color="primary" fontSize="small" />
              </Button>
            ) : null}
          </Box>
          {selectedItem.tasks[0].taskName
            ? selectedItem.tasks?.map((task, index2) => (
                <div key={index2}>
                  <Box
                    style={{
                      borderLeft: "1px solid #D9D9D9",
                      width: "100%",
                      marginLeft: "1.5rem",
                    }}
                  >
                    {task.subTasks?.map((subtask, index3) => (
                      <Box
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                        key={index3}
                      >
                        <Checkbox />
                        <TextField
                          variant="standard"
                          placeholder="Add a subtask..."
                          InputProps={{
                            disableUnderline: true,
                          }}
                          style={{ width: "10rem" }}
                          value={subtask.description}
                          onChange={(e) => {
                            itemCopy.tasks[index2].subTasks[
                              index3
                            ].description = e.target.value;
                            setSelectedItem({ ...itemCopy });
                          }}
                          autoFocus={subtask.description !== "" ? true : false}
                        />
                        <TimerTwoToneIcon color="disabled" />
                        <TextField
                          variant="standard"
                          placeholder="Add a time estimate..."
                          InputProps={{
                            disableUnderline: true,
                          }}
                          style={{ width: "10rem" }}
                          value={subtask.timeEstimate}
                          onChange={(e) => {
                            itemCopy.tasks[index2].subTasks[
                              index3
                            ].timeEstimate = e.target.value;
                            setSelectedItem({ ...itemCopy });
                          }}
                          autoFocus={subtask.timeEstimate !== "" ? true : false}
                        />
                        <Button
                          aria-label="Delete"
                          size="small"
                          color="primary"
                          style={{
                            backgroundColor: "rgba(85, 105, 255, 0.1)",
                            minWidth: 0,
                            width: "1.5rem",
                            height: "1.5rem",
                            borderRadius: "50%",
                          }}
                          onClick={(e) => {
                            itemCopy.tasks[index2].subTasks = itemCopy.tasks[
                              index2
                            ].subTasks.filter((item, i) => i !== index3);
                            setSelectedItem({ ...itemCopy });
                          }}
                        >
                          <CloseIcon color="primary" fontSize="small" />
                        </Button>
                      </Box>
                    ))}
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Checkbox />
                      <TextField
                        variant="standard"
                        placeholder="Add a subtask..."
                        InputProps={{
                          disableUnderline: true,
                        }}
                        style={{ width: "10rem" }}
                        value=""
                        onChange={(e) => {
                          itemCopy.tasks[index2].subTasks.push({
                            description: e.target.value,
                            timeEstimate: "",
                            finished: false,
                          });

                          setSelectedItem({ ...itemCopy });
                        }}
                      />
                      <TimerTwoToneIcon color="disabled" />
                      <TextField
                        variant="standard"
                        placeholder="Add a time estimate..."
                        InputProps={{
                          disableUnderline: true,
                        }}
                        value=""
                        style={{ width: "10rem" }}
                        onChange={(e) => {
                          itemCopy.tasks[index2].subTasks.push({
                            description: "",
                            timeEstimate: e.target.value,
                            finished: false,
                          });

                          setSelectedItem({ ...itemCopy });
                        }}
                      />
                      <Box style={{ width: "1.3rem" }}></Box>
                    </Box>
                  </Box>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Button
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
                      {selectedItem.tasks[index2 + 1]?.taskName ? (
                        <CalendarTodayOutlinedIcon
                          color="primary"
                          // onClick={}
                        />
                      ) : (
                        <AddTwoToneIcon
                          color="primary"
                          onClick={(e) => {
                            itemCopy.tasks[index2 + 1] = {
                              taskName: "New Task",
                              subTasks: [],
                            };

                            setSelectedItem({ ...itemCopy });
                          }}
                        />
                      )}
                    </Button>
                    <TextField
                      variant="standard"
                      placeholder="Add a task..."
                      InputProps={{
                        disableUnderline: true,
                      }}
                      sx={{ ml: 1 }}
                      value={
                        selectedItem.tasks[index2 + 1]?.taskName
                          ? selectedItem.tasks[index2 + 1]?.taskName
                          : ""
                      }
                      onChange={(e) => {
                        if (!selectedItem.tasks[index2 + 1]) {
                          itemCopy.tasks.push({
                            finished: false,
                            halted: false,
                            startDate: "",
                            haltReason: "",
                            taskName: e.target.value,
                            subTasks: [],
                          });
                        }
                        itemCopy.tasks[index2 + 1].taskName = e.target.value;
                        setSelectedItem({ ...itemCopy });
                      }}
                    />
                    {selectedItem.tasks[index2 + 1]?.taskName ? (
                      <Button
                        aria-label="Delete"
                        size="small"
                        color="primary"
                        style={{
                          backgroundColor: "rgba(85, 105, 255, 0.1)",
                          minWidth: 0,
                          width: "1.5rem",
                          height: "1.5rem",
                          borderRadius: "50%",
                          marginLeft: "auto",
                        }}
                        onClick={(e) => {
                          itemCopy.tasks = itemCopy.tasks.filter(
                            (item, i) => i !== index2 + 1
                          );

                          setSelectedItem({ ...itemCopy });
                        }}
                      >
                        <CloseIcon color="primary" fontSize="small" />
                      </Button>
                    ) : null}
                  </Box>
                </div>
              ))
            : null}
        </Box>
      </Box>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
        color="secondary"
        onClick={(e) => {
          handleSaveItem();
        }}
        aria-label="Save"
      >
        <Button>Save item</Button>
      </Box>
    </Card>
  );
}

export default ItemForm;

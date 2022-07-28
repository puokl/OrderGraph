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
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useSnackbar } from "notistack";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import TimerTwoToneIcon from "@mui/icons-material/TimerTwoTone";

const filter = createFilterOptions();

function ItemForm({
  index,
  items,
  setSelectedItem,
  getItems,
  currentOrder,
  setCurrentOrder,
  user,
}) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const removeItem = (index) => {
    const orderItemsMinusRemoved = currentOrder.items.filter(
      (item, i) => i !== index
    );
    setCurrentOrder({ ...currentOrder, items: orderItemsMinusRemoved });
  };

  const handleItemTemplate = async (index) => {
    currentOrder.items[index].organization = user.organization;

    try {
      const response = await axios.post(
        "/api/v1/item/newitem",
        currentOrder.items[index]
      );

      const newOrderItems = currentOrder.items.fill(
        response.data.data,
        index,
        index + 1
      );
      setCurrentOrder({ ...currentOrder, items: newOrderItems });

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
    getItems();
  };

  const handleItemTemplateUpdate = async () => {
    currentOrder.items[index].organization = user.organization;
    try {
      const response = await axios.put(
        "/api/v1/item/" + currentOrder.items[index]._id,
        currentOrder.items[index]
      );

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
    getItems();
  };

  return (
    <Card sx={{ mt: "1rem", p: 2, mb: "1rem" }}>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Autocomplete
          value={currentOrder.items[index].itemName}
          onChange={(event, newValue, reason) => {
            if (reason === "clear") {
              // setSelectedItem(newValue);
              const newOrderItems = currentOrder.items.fill(
                {
                  description: "",
                  height: "",
                  itemName: "",
                  quantity: "",
                  tasks: [{}],
                  unitPrice: "",
                  units: "",
                  width: "",
                },
                index,
                index + 1
              );
              setCurrentOrder({ ...currentOrder, items: newOrderItems });
            } else {
              // setSelectedItem(newValue);
              if (newValue.tasks.length === 0) {
                newValue.tasks.push({
                  finished: false,
                  halted: false,
                  startDate: "",
                  haltReason: "",
                  taskName: "",
                  subTasks: [],
                });
              }
              const newOrderItems = currentOrder.items.fill(
                newValue,
                index,
                index + 1
              );
              setCurrentOrder({ ...currentOrder, items: newOrderItems });
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            const { inputValue } = params;
            // Suggest the creation of a new value
            const isExisting = options.some(
              (option) => inputValue === option.itemName
            );
            if (inputValue !== "" && !isExisting) {
              filtered.push({
                itemName: inputValue,
                inputValue: `Add "${inputValue}" `,
                description: "",
                height: "",
                quantity: "",
                tasks: [{}],
                unitPrice: "",
                units: "",
                width: "",
              });
            }

            return filtered;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          options={items.length > 0 ? items : []}
          getOptionLabel={(option) => {
            // Value selected with enter, right from the input
            if (typeof option === "string") {
              return option;
            }
            // Add "xxx" option created dynamically
            if (option.inputValue) {
              return option.inputValue;
            }
            // Regular option
            return option.itemName;
          }}
          renderOption={(props, option) => {
            props.key = props.id;
            const newOrderItems = currentOrder.items.fill(
              option,
              index,
              index + 1
            );
            if (option.inputValue) {
              return <li {...props}>{option.inputValue}</li>;
            }
            // Regular option
            return (
              <li
                {...props}
                onClick={(event) => {
                  setCurrentOrder({ ...currentOrder, items: newOrderItems });
                  props.onClick(event);
                }}
              >
                {option.itemName}
              </li>
            );
          }}
          sx={{ width: "60%" }}
          freeSolo
          renderInput={(params) => (
            <TextField {...params} label="Item name..." />
          )}
        />
        {currentOrder.items[index].organization ? (
          <Button
            aria-label="Update Template"
            size="small"
            color="primary"
            style={{
              backgroundColor: "rgba(85, 105, 255, 0.1)",
              minWidth: "2rem",
            }}
            onClick={() => handleItemTemplateUpdate(index)}
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
            onClick={() => handleItemTemplate(index)}
          >
            {t("Save item as template")}
          </Button>
        )}
        <Button
          aria-label="Delete"
          size="small"
          color="primary"
          style={{
            backgroundColor: "rgba(85, 105, 255, 0.1)",
            minWidth: "2rem",
          }}
          onClick={() => removeItem(index)}
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
            value={currentOrder.items[index].description}
            onChange={(e) => {
              // setSelectedItem(e);
              const currentItem = { ...currentOrder.items[index] };
              currentItem.description = e.target.value;
              const newOrderItems = currentOrder.items.fill(
                currentItem,
                index,
                index + 1
              );
              setCurrentOrder({ ...currentOrder, items: newOrderItems });
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
              value={currentOrder.items[index].height}
              onChange={(e) => {
                // setSelectedItem(e);
                const currentItem = { ...currentOrder.items[index] };
                currentItem.height = e.target.value;
                const newOrderItems = currentOrder.items.fill(
                  currentItem,
                  index,
                  index + 1
                );
                setCurrentOrder({ ...currentOrder, items: newOrderItems });
              }}
            />
            <span style={{ fontWeight: "bold", fontSize: "1.3rem" }}>x</span>
            <TextField
              style={{ margin: ".5rem 0 .5rem .5rem " }}
              placeholder={t("Width")}
              value={currentOrder.items[index].width}
              onChange={(e) => {
                // setSelectedItem(e);
                const currentItem = { ...currentOrder.items[index] };
                currentItem.width = e.target.value;
                const newOrderItems = currentOrder.items.fill(
                  currentItem,
                  index,
                  index + 1
                );
                setCurrentOrder({ ...currentOrder, items: newOrderItems });
              }}
            />
          </Box>

          <TextField
            style={{ margin: ".5rem 1.8rem .5rem 0" }}
            placeholder={t("Quantity")}
            value={currentOrder.items[index].quantity}
            onChange={(e) => {
              // setSelectedItem(e);
              const currentItem = { ...currentOrder.items[index] };
              currentItem.quantity = e.target.value;
              const newOrderItems = currentOrder.items.fill(
                currentItem,
                index,
                index + 1
              );
              setCurrentOrder({ ...currentOrder, items: newOrderItems });
            }}
          />
          <TextField
            style={{ margin: ".5rem 0" }}
            placeholder={t("Measurement Units")}
            value={currentOrder.items[index].units}
            onChange={(e) => {
              // setSelectedItem(e);
              const currentItem = { ...currentOrder.items[index] };
              currentItem.units = e.target.value;
              const newOrderItems = currentOrder.items.fill(
                currentItem,
                index,
                index + 1
              );
              setCurrentOrder({ ...currentOrder, items: newOrderItems });
            }}
          />
          <TextField
            style={{ margin: ".5rem 0" }}
            fullWidth
            placeholder={t("Price / Unit")}
            value={currentOrder.items[index].unitPrice}
            onChange={(e) => {
              // setSelectedItem(e);
              const currentItem = { ...currentOrder.items[index] };
              currentItem.unitPrice = e.target.value;
              const newOrderItems = currentOrder.items.fill(
                currentItem,
                index,
                index + 1
              );
              setCurrentOrder({ ...currentOrder, items: newOrderItems });
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
              {currentOrder.items[index].tasks[0]?.taskName ? (
                <CalendarTodayOutlinedIcon
                  color="primary"
                  // onClick={}
                />
              ) : (
                <AddTwoToneIcon
                  color="primary"
                  onClick={(e) => {
                    // setSelectedItem(e);
                    const currentItem = { ...currentOrder.items[index] };
                    currentItem.tasks[0] = {
                      taskName: "New Task",
                      subTasks: [],
                    };
                    const newOrderItems = currentOrder.items.fill(
                      currentItem,
                      index,
                      index + 1
                    );
                    setCurrentOrder({ ...currentOrder, items: newOrderItems });
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
                currentOrder.items[index].tasks[0]?.taskName
                  ? currentOrder.items[index].tasks[0]?.taskName
                  : ""
              }
              onChange={(e) => {
                // setSelectedItem(e);
                const currentItem = { ...currentOrder.items[index] };

                currentItem.tasks[0].taskName = e.target.value;
                // if (newOption.tasks[0].subTasks.length === 0) {
                //   newOption.tasks[0].subTasks = [];
                // }
                {
                  currentItem.tasks[0].subTasks
                    ? null
                    : (currentItem.tasks[0].subTasks = []);
                }

                const newOrderItems = currentOrder.items.fill(
                  currentItem,
                  index,
                  index + 1
                );
                setCurrentOrder({ ...currentOrder, items: newOrderItems });
              }}
            />
            {currentOrder.items[index].tasks[0].taskName ? (
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
                  // setSelectedItem(e);
                  const currentItem = { ...currentOrder.items[index] };
                  if (currentItem.tasks.length > 1) {
                    currentItem.tasks.shift();
                  } else {
                    currentItem.tasks[0] = {};
                  }

                  const newOrderItems = currentOrder.items.fill(
                    currentItem,
                    index,
                    index + 1
                  );
                  setCurrentOrder({ ...currentOrder, items: newOrderItems });
                }}
              >
                <CloseIcon color="primary" fontSize="small" />
              </Button>
            ) : null}
          </Box>
          {currentOrder.items[index].tasks[0].taskName
            ? currentOrder.items[index].tasks?.map((task, index2) => (
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
                        <Checkbox disabled />
                        <TextField
                          variant="standard"
                          placeholder="Add a subtask..."
                          InputProps={{
                            disableUnderline: true,
                          }}
                          style={{ width: "10rem" }}
                          value={subtask.description}
                          onChange={(e) => {
                            // setSelectedItem(e);
                            const currentItem = {
                              ...currentOrder.items[index],
                            };
                            currentItem.tasks[index2].subTasks[
                              index3
                            ].description = e.target.value;
                            const newOrderItems = currentOrder.items.fill(
                              currentItem,
                              index,
                              index + 1
                            );
                            setCurrentOrder({
                              ...currentOrder,
                              items: newOrderItems,
                            });
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
                            // setSelectedItem(e);
                            const currentItem = {
                              ...currentOrder.items[index],
                            };
                            currentItem.tasks[index2].subTasks[
                              index3
                            ].timeEstimate = e.target.value;
                            const newOrderItems = currentOrder.items.fill(
                              currentItem,
                              index,
                              index + 1
                            );
                            setCurrentOrder({
                              ...currentOrder,
                              items: newOrderItems,
                            });
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
                            // setSelectedItem(e);
                            const currentItem = {
                              ...currentOrder.items[index],
                            };
                            currentItem.tasks[index2].subTasks =
                              currentItem.tasks[index2].subTasks.filter(
                                (item, i) => i !== index3
                              );
                            const newOrderItems = currentOrder.items.fill(
                              currentItem,
                              index,
                              index + 1
                            );
                            setCurrentOrder({
                              ...currentOrder,
                              items: newOrderItems,
                            });
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
                      <Checkbox disabled />
                      <TextField
                        variant="standard"
                        placeholder="Add a subtask..."
                        InputProps={{
                          disableUnderline: true,
                        }}
                        style={{ width: "10rem" }}
                        value=""
                        onChange={(e) => {
                          setSelectedItem(e);
                          const currentItem = { ...currentOrder.items[index] };
                          currentItem.tasks[index2].subTasks.push({
                            description: e.target.value,
                            timeEstimate: "",
                            finished: false,
                          });
                          const newOrderItems = currentOrder.items.fill(
                            currentItem,
                            index,
                            index + 1
                          );
                          setCurrentOrder({
                            ...currentOrder,
                            items: newOrderItems,
                          });
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
                          // setSelectedItem(e);
                          const currentItem = { ...currentOrder.items[index] };
                          currentItem.tasks[index2].subTasks.push({
                            description: "",
                            timeEstimate: e.target.value,
                            finished: false,
                          });
                          const newOrderItems = currentOrder.items.fill(
                            currentItem,
                            index,
                            index + 1
                          );

                          setCurrentOrder({
                            ...currentOrder,
                            items: newOrderItems,
                          });
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
                      {currentOrder.items[index].tasks[index2 + 1]?.taskName ? (
                        <CalendarTodayOutlinedIcon
                          color="primary"
                          // onClick={}
                        />
                      ) : (
                        <AddTwoToneIcon
                          color="primary"
                          onClick={(e) => {
                            // setSelectedItem(e);
                            const currentItem = {
                              ...currentOrder.items[index],
                            };
                            currentItem.tasks[index2 + 1] = {
                              taskName: "New Task",
                              subTasks: [],
                            };
                            const newOrderItems = currentOrder.items.fill(
                              currentItem,
                              index,
                              index + 1
                            );
                            setCurrentOrder({
                              ...currentOrder,
                              items: newOrderItems,
                            });
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
                        currentOrder.items[index].tasks[index2 + 1]?.taskName
                          ? currentOrder.items[index].tasks[index2 + 1]
                              ?.taskName
                          : ""
                      }
                      onChange={(e) => {
                        setSelectedItem(e);
                        const currentItem = { ...currentOrder.items[index] };
                        if (!currentOrder.items[index].tasks[index2 + 1]) {
                          currentItem.tasks.push({
                            finished: false,
                            halted: false,
                            startDate: "",
                            haltReason: "",
                            taskName: e.target.value,
                            subTasks: [],
                          });
                        }
                        currentItem.tasks[index2 + 1].taskName = e.target.value;

                        const newOrderItems = currentOrder.items.fill(
                          currentItem,
                          index,
                          index + 1
                        );
                        setCurrentOrder({
                          ...currentOrder,
                          items: newOrderItems,
                        });
                      }}
                    />
                    {currentOrder.items[index].tasks[index2 + 1]?.taskName ? (
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
                          // setSelectedItem(e);
                          const currentItem = { ...currentOrder.items[index] };
                          currentItem.tasks = currentItem.tasks.filter(
                            (item, i) => i !== index2 + 1
                          );
                          const newOrderItems = currentOrder.items.fill(
                            currentItem,
                            index,
                            index + 1
                          );
                          setCurrentOrder({
                            ...currentOrder,
                            items: newOrderItems,
                          });
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
    </Card>
  );
}

export default ItemForm;

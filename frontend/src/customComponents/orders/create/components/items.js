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
} from "@mui/material";

import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import TimerTwoToneIcon from "@mui/icons-material/TimerTwoTone";

const AvatarAddWrapper = styled(Avatar)(
  ({ theme }) => `
          background: ${theme.colors.alpha.black[5]};
          color: ${theme.colors.primary.main};
          // width: ${theme.spacing(8)};
          // height: ${theme.spacing(8)};
  `
);

const CardAddAction = styled(Card)(
  ({ theme }) => `
          border: ${theme.colors.primary.main} dashed 1px;
          flex: 1;
          color: ${theme.colors.primary.main};
          
          .MuiCardActionArea-root {
            height: 100%;
            justify-content: center;
            align-items: center;
            display: flex;
          }
          
          .MuiTouchRipple-root {
            opacity: .2;
          }
          
          &:hover {
            border-color: ${theme.colors.alpha.black[100]};
          }
  `
);

const filter = createFilterOptions();

function Items() {
  const { t } = useTranslation();

  const [items, setItems] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  const [orderItems, setOrderItems] = useState([]);

  const addItem = () => {
    setOrderItems([
      ...orderItems,
      {
        description: "",
        height: "",
        itemName: "",
        quantity: "",
        tasks: [],
        unitPrice: "",
        units: "",
        width: "",
      },
    ]);
  };
  const removeItem = (index) => {
    const orderItemsMinusRemoved = orderItems.filter((item, i) => i !== index);
    setOrderItems(orderItemsMinusRemoved);
  };

  const getItems = async () => {
    try {
      const response = await axios.get("/api/v1/item");
      console.log(response);
      setItems(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleItemSelect = (index) => {
    setSelectedItem(items[index]);
    console.log(selectedItem);
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <Grid
      item
      xs={12}
      sm={6}
      lg={8}
      sx={{
        minWidth: "100%",
        mb: "1.5rem",
      }}
    >
      {orderItems?.map((item, index) => (
        <Card sx={{ mt: "1rem", p: 2, mb: "1rem" }} key={index}>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Autocomplete
              value={orderItems[index].itemName}
              onChange={(event, newValue) => {
                setSelectedItem(newValue.itemName);
                const newOrderItems = orderItems.fill(
                  newValue,
                  index,
                  index + 1
                );
                setOrderItems(() => newOrderItems);
                console.log(orderItems);
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);
                console.log(filtered);
                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some(
                  (option) => inputValue === option.itemName
                );
                if (inputValue !== "" && !isExisting) {
                  filtered.push({
                    itemName: inputValue,
                    inputValue: `Add "${inputValue}" `,
                  });
                }

                return filtered;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              options={items}
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
                const newOrderItems = orderItems.fill(option, index, index + 1);
                if (option.inputValue) {
                  return <li {...props}>{option.inputValue}</li>;
                }
                // Regular option
                return (
                  <li
                    {...props}
                    onClick={(event) => {
                      setOrderItems(newOrderItems);
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
                value={orderItems[index].description}
                onChange={(e) => {
                  setSelectedItem(e.target.value);
                  const newOption = { ...orderItems[index] };
                  newOption.description = e.target.value;
                  const newOrderItems = orderItems.fill(
                    newOption,
                    index,
                    index + 1
                  );
                  setOrderItems(() => newOrderItems);
                  console.log(orderItems);
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
                  value={orderItems[index].height}
                  onChange={(e) => {
                    setSelectedItem(e.target.value);
                    const newOption = { ...orderItems[index] };
                    newOption.height = e.target.value;
                    const newOrderItems = orderItems.fill(
                      newOption,
                      index,
                      index + 1
                    );
                    setOrderItems(() => newOrderItems);
                    console.log(orderItems);
                  }}
                />
                <span style={{ fontWeight: "bold", fontSize: "1.3rem" }}>
                  x
                </span>
                <TextField
                  style={{ margin: ".5rem 0 .5rem .5rem " }}
                  placeholder={t("Width")}
                  value={orderItems[index].width}
                  onChange={(e) => {
                    setSelectedItem(e.target.value);
                    const newOption = { ...orderItems[index] };
                    newOption.width = e.target.value;
                    const newOrderItems = orderItems.fill(
                      newOption,
                      index,
                      index + 1
                    );
                    setOrderItems(() => newOrderItems);
                    console.log(orderItems);
                  }}
                />
              </Box>

              <TextField
                style={{ margin: ".5rem 1.8rem .5rem 0" }}
                placeholder={t("Quantity")}
                value={orderItems[index].quantity}
                onChange={(e) => {
                  setSelectedItem(e.target.value);
                  const newOption = { ...orderItems[index] };
                  newOption.quantity = e.target.value;
                  const newOrderItems = orderItems.fill(
                    newOption,
                    index,
                    index + 1
                  );
                  setOrderItems(() => newOrderItems);
                  console.log(orderItems);
                }}
              />
              <TextField
                style={{ margin: ".5rem 0" }}
                placeholder={t("Measurement Units")}
                value={orderItems[index].units}
                onChange={(e) => {
                  setSelectedItem(e.target.value);
                  const newOption = { ...orderItems[index] };
                  newOption.units = e.target.value;
                  const newOrderItems = orderItems.fill(
                    newOption,
                    index,
                    index + 1
                  );
                  setOrderItems(() => newOrderItems);
                  console.log(orderItems);
                }}
              />
              <TextField
                style={{ margin: ".5rem 0" }}
                fullWidth
                placeholder={t("Price / Unit")}
                value={orderItems[index].unitPrice}
                onChange={(e) => {
                  setSelectedItem(e.target.value);
                  const newOption = { ...orderItems[index] };
                  newOption.unitPrice = e.target.value;
                  const newOrderItems = orderItems.fill(
                    newOption,
                    index,
                    index + 1
                  );
                  setOrderItems(() => newOrderItems);
                  console.log(orderItems);
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
                  {orderItems[index].tasks.length > 0 ? (
                    <CalendarTodayOutlinedIcon
                      color="primary"
                      // onClick={}
                    />
                  ) : (
                    <AddTwoToneIcon
                      color="primary"
                      // onClick={}
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
                    orderItems[index].tasks
                      ? orderItems[index].tasks[0]?.taskName
                      : ""
                  }
                />
              </Box>
              <Box
                style={{
                  borderLeft: "1px solid #D9D9D9",
                  width: "100%",
                  marginLeft: "1.5rem",
                }}
              >
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
                  />
                  <TimerTwoToneIcon color="disabled" />
                  <TextField
                    variant="standard"
                    placeholder="Add a time estimate..."
                    InputProps={{
                      disableUnderline: true,
                    }}
                    style={{ width: "10rem" }}
                  />
                  <Button
                    aria-label="Delete"
                    size="small"
                    color="primary"
                    style={{
                      backgroundColor: "rgba(85, 105, 255, 0.1)",
                      minWidth: 0,
                      width: "1.3rem",
                      height: "1.3rem",
                      borderRadius: "50%",
                    }}
                    onClick={() => removeItem()}
                  >
                    <CloseIcon color="primary" fontSize="small" />
                  </Button>
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
                  <AddTwoToneIcon
                    color="primary"
                    // onClick={}
                  />
                </Button>
                <TextField
                  variant="standard"
                  placeholder="Add a task..."
                  InputProps={{
                    disableUnderline: true,
                  }}
                  sx={{ ml: 1 }}
                />
              </Box>
            </Box>
          </Box>
        </Card>
      ))}
      <Tooltip arrow title={t("Click to add a new item")}>
        <CardAddAction>
          <CardActionArea
            sx={{
              px: 1,
            }}
            onClick={(e) => {
              addItem();
            }}
          >
            <CardContent xs={12} sm={6} lg={8}>
              <AvatarAddWrapper>
                <AddTwoToneIcon fontSize="medium" />
              </AvatarAddWrapper>
            </CardContent>
          </CardActionArea>
        </CardAddAction>
      </Tooltip>
    </Grid>
  );
}

export default Items;

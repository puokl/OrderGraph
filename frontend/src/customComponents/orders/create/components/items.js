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

import ItemForm from "src/customComponents/orders/create/components/itemForm";

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

function Items({
  orderItems,
  setOrderItems,
  currentOrder,
  setCurrentOrder,
  user,
}) {
  const { t } = useTranslation();

  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");

  const addItem = () => {
    setCurrentOrder({
      ...currentOrder,
      items: [
        ...currentOrder.items,
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
      ],
    });
  };

  const getItems = async () => {
    try {
      const response = await axios.get("/api/v1/item/all/" + user.organization);
      console.log(response);
      setItems(response.data.data);
    } catch (err) {
      console.error(err);
    }
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
      {currentOrder.items?.map((item, index) => (
        <ItemForm
          key={index}
          items={items}
          index={index}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          orderItems={orderItems}
          setOrderItems={setOrderItems}
          getItems={getItems}
          currentOrder={currentOrder}
          setCurrentOrder={setCurrentOrder}
          user={user}
        />
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

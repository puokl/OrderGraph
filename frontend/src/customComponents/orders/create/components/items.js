import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import {
  Grid,
  CardActionArea,
  CardContent,
  Tooltip,
  Card,
  Avatar,
} from "@mui/material";

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";

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

function Items() {
  const { t } = useTranslation();

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
      <Tooltip arrow title={t("Click to add a new item")}>
        <CardAddAction>
          <CardActionArea
            sx={{
              px: 1,
            }}
            onClick={(e) => {
              console.log("hi");
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

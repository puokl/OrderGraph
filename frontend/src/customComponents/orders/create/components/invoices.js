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
  Box,
  Typography,
} from "@mui/material";

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import UploadTwoToneIcon from "@mui/icons-material/UploadTwoTone";

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

function Invoices() {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: "1.5rem", mb: "1.5rem" }}>
      <Grid
        item
        xs={12}
        sm={6}
        lg={8}
        sx={{
          minWidth: "100%",
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Tooltip arrow title={t("Click to add a new item")}>
            <CardAddAction
              sx={{
                mx: 1,
              }}
            >
              <CardActionArea
                onClick={(e) => {
                  console.log("hi");
                }}
              >
                <CardContent xs={12} sm={6} lg={3}>
                  <AvatarAddWrapper>
                    <AddTwoToneIcon fontSize="medium" />
                  </AvatarAddWrapper>
                </CardContent>
              </CardActionArea>
            </CardAddAction>
          </Tooltip>
          <Tooltip arrow title={t("Click to add a new item")}>
            <CardAddAction
              sx={{
                mx: 1,
              }}
              style={{ backgroundColor: "lightgrey" }}
            >
              <CardActionArea
                onClick={(e) => {
                  console.log("hi");
                }}
              >
                <CardContent
                  xs={12}
                  sm={6}
                  lg={3}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <AvatarAddWrapper>
                    <UploadTwoToneIcon color="primary" fontSize="medium" />
                  </AvatarAddWrapper>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{
                      py: 0.5,
                    }}
                  >
                    {t("drag & drop files here")}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </CardAddAction>
          </Tooltip>
        </Box>
      </Grid>
    </Card>
  );
}

export default Invoices;

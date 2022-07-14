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
} from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import UploadTwoToneIcon from "@mui/icons-material/UploadTwoTone";
import { borderLeft } from "@mui/system";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

function Items({ currentOrder }) {
  const { t } = useTranslation();
  const finished = [];
  const unfinished = [];

  currentOrder.items.forEach((item, index) => {
    if (item.tasks.every((task) => task.finished === true)) {
      finished.push(item);
    } else {
      unfinished.push(item);
    }
  });

  const editItem = () => {
    console.log("hi");
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
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#F6F8FB",
              borderLeft: "6px solid #33C2FF",
              marginBottom: "1rem",
              padding: ".5rem .5rem .5rem 1rem",
            }}
            fullwidth
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
                    (prev, current) => prev.duration + current.duration
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
                      editItem(unfinishedItem);
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
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              fullwidth
            >
              <LinearProgress variant="determinate" value={50} />
            </Box>
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
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "lightgray",
              borderLeft: "6px solid #33C2FF",
            }}
            fullwidth
          >
            <Typography
              component="p"
              gutterBottom
              sx={{
                py: 0.5,
              }}
            >
              {finishedItem.itemName}
            </Typography>
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

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Button, Card, Box, Typography, TextField } from "@mui/material";

import { DateTimePicker } from "@mui/lab";

function Status({ startDate, setStartDate }) {
  const { t } = useTranslation();

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
            {t("Draft / Active")}
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
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Button variant="outlined" color="secondary" sx={{ mb: 1 }}>
          Save draft
        </Button>
        <Button variant="contained" color="primary">
          Activate
        </Button>
      </Box>
    </Card>
  );
}

export default Status;

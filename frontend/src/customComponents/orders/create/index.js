import { useState, useEffect } from "react";

import axios from "src/utils/axios2";

import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import { Grid } from "@mui/material";

import PageTitleWrapper from "src/components/PageTitleWrapper";

import PageHeader from "./PageHeader";

function CreateOrder() {
  const [open, setOpen] = useState(false);

  const handleCreateUserOpen = (user) => {
    setOpen(true);
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: "1 0 auto",
        }}
      >
        <Helmet>
          <title>Create Order</title>
        </Helmet>
        <PageTitleWrapper>
          <PageHeader />
        </PageTitleWrapper>

        <Grid
          sx={{
            px: 4,
          }}
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}></Grid>
        </Grid>
      </div>
      <Footer
        style={{
          flexShrink: "0",
        }}
      />
    </div>
  );
}

export default CreateOrder;

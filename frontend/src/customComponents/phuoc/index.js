import { useState, useEffect, useCallback } from "react";
// import axios from "src/utils/axios";
import axios from "src/utils/axios2";

import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";

import { Grid } from "@mui/material";
import useRefMounted from "src/hooks/useRefMounted";

import PageTitleWrapper from "src/components/PageTitleWrapper";

import Results from "./userTable/Results";
import PageHeader from "./userTable/PageHeader";

function PhuocUsers() {
  const isMountedRef = useRefMounted();
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      console.log(response);
      setUsers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUsers();
    console.log(process.env.REACT_APP_BASE_URL);
  }, []);

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
          <title>Users - Management</title>
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
          <Grid item xs={12}>
            <Results users={users} />
          </Grid>
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

export default PhuocUsers;

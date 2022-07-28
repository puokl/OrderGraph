import { useState, useEffect } from "react";

import axios from "src/utils/axios2";

import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";

import { Grid } from "@mui/material";
import useRefMounted from "src/hooks/useRefMounted";

import PageTitleWrapper from "src/components/PageTitleWrapper";

import Results from "./userTable/Results";
import PageHeader from "./userTable/PageHeader";
import CreateUser from "./userTable/CreateUser";

function TestUsers() {
  const isMountedRef = useRefMounted();
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState();

  const handleCreateUserOpen = (user) => {
    setUserToEdit(user);
    setOpen(true);
  };

  const getUsers = async () => {
    try {
      const response = await axios.get("/api/v1/user/get/UsersInOrg");

      setUsers(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, [isMountedRef]);

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
          <PageHeader
            getUsers={getUsers}
            handleCreateUserOpen={handleCreateUserOpen}
          />
          {open ? (
            <CreateUser
              getUsers={getUsers}
              open={open}
              setOpen={setOpen}
              userToEdit={userToEdit}
            />
          ) : null}
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
            <Results
              users={users}
              getUsers={getUsers}
              handleCreateUserOpen={handleCreateUserOpen}
            />
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

export default TestUsers;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SuppliersTable from "./SuppliersTable.js";
import "./SuppliersOverview.css";
import PropTypes from "prop-types";
import {
  Grid,
  TextField,
  Card,
  CardHeader,
  Button,
  CardContent,
  Typography,
  InputBase,
  IconButton,
  Input,
} from "@mui/material";
import shadows from "@mui/system";
import CircleIcon from "@mui/icons-material/Circle";
import SearchIcon from "@mui/icons-material/Search";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import PageHeader from "./PageHeader";
import axios from "src/utils/axios2";
const SuppliersOverview = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [suppliers, setSuppliers] = useState([]);

  const getOrders = async () => {
    console.log("hi");
    try {
      const response = await axios.get("/api/v1/supplier");
      setSuppliers(response.data.data);
      setLoaded(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const totalClients = 42;
  const newClientsMonth = 4;
  const clientsWActiveOrdrs = 2;
  const clientsWORecentOrdrs = 33;

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          width: "100%",
          margin: "3rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h3" component="h3" gutterBottom>
            {"Suppliers Overview"}
          </Typography>
          <Typography variant="h5" component="h5" gutterBottom>
            {"Take a look at a list of your suppliers"}
          </Typography>
        </div>
        <div style={{ display: "flex" }}>
          <Button
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/suppliers/create";
            }}
          >
            Add new Supplier
          </Button>
        </div>
      </div>
      <Grid item xs={12}>
        {/* Supplier search & table START */}

        <Card margin={1}>
          <Grid container>
            <Grid item xs={12}>
              <SuppliersTable suppliers={suppliers} loaded={loaded} />
            </Grid>
          </Grid>
        </Card>
      </Grid>
      {/* Supplier search & table END */}
    </Grid>
  );
};

SuppliersOverview.propTypes = {};

export default SuppliersOverview;

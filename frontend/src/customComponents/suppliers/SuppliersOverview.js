import React, { useState, useEffect } from "react";
import SuppliersTable from "./SuppliersTable";
import "./SuppliersOverview.css";
import { Grid, Card, Button, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import axios from "src/utils/axios2";
const SuppliersOverview = () => {
  const [rowLength, setRowLength] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [suppliers, setSuppliers] = useState([]);

  const getSuppliers = async () => {
    console.log("hi");
    try {
      const response = await axios.get("/api/v1/supplier");
      setSuppliers(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getSuppliers();
    setRowLength(suppliers.length);
    setLoaded(true);
  }, []);

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
              <SuppliersTable
                suppliers={suppliers}
                loaded={loaded}
                getSuppliers={getSuppliers}
                rowLength={rowLength}
                setRowLength={setRowLength}
              />
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

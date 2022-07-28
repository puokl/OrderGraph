import {
  Box,
  CardHeader,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React, { forwardRef, useState, useCallback } from "react";

function SupplierShippingAdress({
  handleShowContact,
  updateFields,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
  values,
  errors,
  name,
  SaSameAsBa,
  setSaSameAsBa,
  getIn,
}) {
  const [showShipping, setShowShipping] = useState(true);
  const handleShowShipping = (e) => {
    setShowShipping(!showShipping);
    /*     console.log(e.target.checked); */
  };

  const handleSameAsBilling = () => {
    setSaSameAsBa(!SaSameAsBa);
  };

  return (
    <div>
      {/* Shipping Adresse */}

      <CardHeader title="Shipping Address" sx={{ pl: 3 }} />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={12}>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  onClick={() => {
                    handleSameAsBilling();
                    handleShowShipping();
                  }}
                />
              }
              label="Same as headquarter"
              sx={{ pl: 2 }}
            />
          </Box>
        </Grid>

        {showShipping ? (
          <>
            {/* Adresse */}
            <Grid item xs={12} sm={6} md={6}>
              <Box p={1}>
                <TextField
                  sx={{
                    m: 0,
                  }}
                  error={Boolean(
                    getIn(touched, "shippingAddress.Address") &&
                      getIn(errors, "shippingAddress.Address")
                  )}
                  helperText={
                    getIn(touched, "shippingAddress.Address") &&
                    getIn(errors, "shippingAddress.Address")
                  }
                  name="shippingAddress.Address"
                  onBlur={handleBlur}
                  value={values.shippingAddress.Address}
                  onChange={(e) => {
                    setFieldValue("shippingAddress.Address", e.target.value);
                  }}
                  placeholder="Adress ..."
                  fullWidth
                  variant="outlined"
                  label="Address"
                  id="Address"
                />
              </Box>
            </Grid>

            {/* ZIP */}

            <Grid item xs={12} sm={6} md={6}>
              <Box p={1}>
                <TextField
                  sx={{
                    m: 0,
                  }}
                  error={Boolean(
                    getIn(touched, "shippingAddress.Zip") &&
                      getIn(errors, "shippingAddress.Zip")
                  )}
                  helperText={
                    getIn(touched, "shippingAddress.Zip") &&
                    getIn(errors, "shippingAddress.Zip")
                  }
                  name="shippingAddress.Zip"
                  onBlur={handleBlur}
                  value={values.shippingAddress.Zip}
                  onChange={(e) => {
                    setFieldValue("shippingAddress.Zip", e.target.value);
                  }}
                  placeholder="Zip..."
                  fullWidth
                  variant="outlined"
                  label="Zip"
                  id="Zip"
                />
              </Box>
            </Grid>

            {/* City */}

            <Grid item xs={12} sm={6} md={6}>
              <Box p={1}>
                <TextField
                  sx={{
                    m: 0,
                  }}
                  error={Boolean(
                    getIn(touched, "shippingAddress.City") &&
                      getIn(errors, "shippingAddress.City")
                  )}
                  helperText={
                    getIn(touched, "shippingAddress.City") &&
                    getIn(errors, "shippingAddress.City")
                  }
                  name="shippingAddress.City"
                  onBlur={handleBlur}
                  value={values.shippingAddress.City}
                  onChange={(e) => {
                    setFieldValue("shippingAddress.City", e.target.value);
                  }}
                  placeholder="City..."
                  fullWidth
                  variant="outlined"
                  label="City"
                  id="City"
                />
              </Box>
            </Grid>

            {/* State */}

            <Grid item xs={12} sm={6} md={6}>
              <Box p={1}>
                <TextField
                  sx={{
                    m: 0,
                  }}
                  error={Boolean(
                    getIn(touched, "shippingAddress.State") &&
                      getIn(errors, "shippingAddress.State")
                  )}
                  helperText={
                    getIn(touched, "shippingAddress.State") &&
                    getIn(errors, "shippingAddress.State")
                  }
                  name="shippingAddress.State"
                  onBlur={handleBlur}
                  value={values.shippingAddress.State}
                  onChange={(e) => {
                    setFieldValue("shippingAddress.State", e.target.value);
                  }}
                  placeholder="State..."
                  fullWidth
                  variant="outlined"
                  label="State"
                  id="State"
                />
              </Box>
            </Grid>

            {/* Additional Information */}

            <Grid item xs={12}>
              <Box p={1}>
                <TextField
                  sx={{
                    m: 0,
                  }}
                  error={Boolean(
                    getIn(touched, "shippingAddress.AdditionalInformation") &&
                      getIn(errors, "shippingAddress.AdditionalInformation")
                  )}
                  helperText={
                    getIn(touched, "shippingAddress.AdditionalInformation") &&
                    getIn(errors, "shippingAddress.AdditionalInformation")
                  }
                  name="shippingAddress.AdditionalInformation"
                  onBlur={handleBlur}
                  value={values.shippingAddress.AdditionalInformation}
                  onChange={(e) => {
                    setFieldValue(
                      "shippingAddress.AdditionalInformation",
                      e.target.value
                    );
                  }}
                  placeholder="Additional Information..."
                  fullWidth
                  variant="outlined"
                  label="Additional Information"
                  id="AdditionalInformation"
                  multiline={true}
                  rows={3}
                />
              </Box>
            </Grid>
          </>
        ) : null}
      </Grid>
    </div>
  );
}

export default SupplierShippingAdress;

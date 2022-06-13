import {
  Box,
  CardHeader,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React, { forwardRef, useState, useCallback } from "react";

function ShippingAdress() {
  const [showShipping, setShowShipping] = useState(true);
  const handleShowShipping = (e) => {
    setShowShipping(!showShipping);
    console.log(e.target.checked);
  };

  return (
    <div>
      {/* Shipping Adresse */}

      <CardHeader title="Shipping Adresse" sx={{ pl: 3 }} />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={12}>
          <Box>
            <FormControlLabel
              control={<Checkbox onChange={(e) => handleShowShipping(e)} />}
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
                  placeholder="Adress ..."
                  fullWidth
                  variant="outlined"
                  label="Adress"
                  id="SaAdress"
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
                  placeholder="Zip..."
                  fullWidth
                  variant="outlined"
                  label="Zip"
                  id="SaZip"
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
                  placeholder="City..."
                  fullWidth
                  variant="outlined"
                  label="City"
                  id="SaCity"
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
                  placeholder="State..."
                  fullWidth
                  variant="outlined"
                  label="State"
                  id="SaState"
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
                  placeholder="Additional Information..."
                  fullWidth
                  variant="outlined"
                  label="Additional Information"
                  id="SaAdditionalInformation"
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

export default ShippingAdress;

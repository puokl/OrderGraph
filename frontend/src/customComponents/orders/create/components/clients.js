import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Box,
  Card,
  Divider,
  Chip,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function Clients({ clients, selectedClient, setSelectedClient }) {
  const { t } = useTranslation();

  const handleClientSelect = (index) => {
    setSelectedClient(clients[index]);
    console.log(selectedClient);
  };

  return (
    <Card sx={{ p: "1.5rem", mb: "1.5rem" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          {t("Select client...")}
        </InputLabel>
        <Select
          label={t("Select client...")}
          value={selectedClient ? selectedClient.clientName : ""}
          // onChange={(e) => {
          //   handleClientSelect(e);
          // }}
        >
          {clients.map((client, index) => (
            <MenuItem
              key={client._id}
              value={client.clientName}
              onClick={(e) => {
                handleClientSelect(index);
              }}
            >
              {client.clientName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedClient ? (
        <Card sx={{ mt: "1rem" }}>
          <Chip
            color="success"
            label={selectedClient.clientType}
            style={{ borderRadius: "0 0 16px 0" }}
          />
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              marginTop: "-2rem",
            }}
          >
            <Button
              color="primary"
              variant="contained"
              style={{
                marginLeft: "auto",
                padding: ".2rem 1rem .2rem 1rem",
                marginRight: "1rem",
              }}
            >
              {t("Edit client")}
            </Button>
            <Button
              aria-label="Delete"
              size="small"
              color="primary"
              style={{
                backgroundColor: "rgba(85, 105, 255, 0.1)",
                minWidth: "0",
                padding: ".3rem ",
                marginRight: "1rem",
              }}
            >
              <CloseIcon
                color="primary"
                onClick={() => setSelectedClient("")}
              />
            </Button>
          </Box>
          <Typography
            variant="h3"
            sx={{
              px: "1.2rem",
              py: ".2rem",
            }}
            fontWeight="bold"
          >
            {selectedClient.clientName}
          </Typography>
          <Box
            p={2}
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "0.2rem 1.2rem 0.2rem 1.2rem",
            }}
          >
            <Box
              sx={{
                minWidth: { xs: 0, md: 160 },
                color: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  py: 1,
                }}
                fontWeight="normal"
              >
                Phone Number:
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  py: 1,
                }}
                fontWeight="normal"
              >
                Email:
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  py: 1,
                }}
                fontWeight="normal"
              >
                Billing Address: <br></br>
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  py: 1,
                }}
                fontWeight="normal"
              >
                Shipping Address: <br></br>
              </Typography>
            </Box>
            <Divider orientation="vertical" />
            <Box
              sx={{
                minWidth: { xs: 0, md: 160 },
                px: "1.5rem",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  py: 1,
                }}
                fontWeight="normal"
              >
                {selectedClient.clientPhoneNumber}
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  py: 1,
                }}
                fontWeight="normal"
              >
                {selectedClient.clientEMail}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  py: 1,
                }}
                fontWeight="normal"
              >
                {selectedClient.billingAddress.Address +
                  ", " +
                  selectedClient.billingAddress.City +
                  ", " +
                  selectedClient.billingAddress.Zip}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  py: 1,
                }}
                fontWeight="normal"
              >
                {selectedClient.shippingAddress.Address +
                  ", " +
                  selectedClient.shippingAddress.City +
                  ", " +
                  selectedClient.shippingAddress.Zip}
              </Typography>
            </Box>
          </Box>
          {selectedClient.clientType === "Company" ? (
            <>
              <Divider />
              <Typography
                variant="h3"
                sx={{
                  px: "1.2rem",
                  py: ".2rem",
                }}
                fontWeight="bold"
              >
                {t("Contact Person")}
              </Typography>
              <Box
                p={2}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: "0.2rem 1.2rem 0.2rem 1.2rem",
                }}
              >
                <Box
                  sx={{
                    minWidth: { xs: 0, md: 160 },
                    color: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      py: 1,
                    }}
                    fontWeight="normal"
                  >
                    Name:
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      py: 1,
                    }}
                    fontWeight="normal"
                  >
                    Phone Number:
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      py: 1,
                    }}
                    fontWeight="normal"
                  >
                    Email:
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      py: 1,
                    }}
                    fontWeight="normal"
                  >
                    Role
                  </Typography>
                </Box>
                <Divider orientation="vertical" />
                <Box
                  sx={{
                    minWidth: { xs: 0, md: 160 },
                    px: "1.5rem",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      py: 1,
                    }}
                    fontWeight="normal"
                  >
                    {selectedClient.contact[0].contactName}
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      py: 1,
                    }}
                    fontWeight="normal"
                  >
                    {selectedClient.contact[0].contactPhoneNumber}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      py: 1,
                    }}
                    fontWeight="normal"
                  >
                    {selectedClient.contact[0].contactEMail}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      py: 1,
                    }}
                    fontWeight="normal"
                  >
                    {selectedClient.contact[0].contactRole}
                  </Typography>
                </Box>
              </Box>
            </>
          ) : null}
        </Card>
      ) : null}
    </Card>
  );
}

export default Clients;

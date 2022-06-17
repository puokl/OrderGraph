import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  styled,
  Tooltip,
} from "@mui/material";

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import { Form, Formik, getIn } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import * as Yup from "yup";
import BillingAdress from "./formComponents/BillingAdress";
import ClientDetails from "./formComponents/ClientDetails";
import ContactPerson from "./formComponents/ContactPerson";
import Financials from "./formComponents/Financials";
import ShippingAdress from "./formComponents/ShippingAdress";
import PageHeader from "./PageHeader";
import RemoveTwoToneIcon from "@mui/icons-material/RemoveTwoTone";

const INITIAL_FORM_STATE = {
  /* Client Details */
  clientType: "",
  clientName: "",
  clientEMail: "",
  clientPhoneNumber: "",
  /* Billing Address */
  billingAddress: {
    Address: "",
    Zip: "",
    City: "",
    State: "",
    AdditionalInformation: "",
  },
  /* Shipping Address */
  shippingAddress: {
    Address: "",
    Zip: "",
    City: "",
    State: "",
    AdditionalInformation: "",
  },
  /* Financial */
  financials: {
    registrationNumber: "",
    fiscalNumber: "",
    IBAN: "",
    bankName: "",
  },
  /* Contact Person */
  contact: {
    contactName: "",
    contactRole: "",
    contactPhoneNumber: "",
    contactEMail: "",
  },

  /* Shipping Address same Adress as Billing Adress */
  SaSameAsBa: false,
};

const FORM_VALIDATION = Yup.object().shape({
  /* Client Detail Validation */
  clientName: Yup.string().required("Required"),
  clientEMail: Yup.string().email("Invalid Email").required("Required"),
  clientPhoneNumber: Yup.number()
    .integer()
    .typeError("Please enter a valid phone number")
    .required("Required"),
  /* Billing Adress Validation */
  billingAddress: Yup.object().shape({
    Address: Yup.string().required("Required"),
    Zip: Yup.number().integer().required("Required"),
    City: Yup.string().required("Required"),
    State: Yup.string().required("Required"),
    AdditionInformation: Yup.string().max(510),
  }),
  /* Shipping Adress Validation */
  shippingAddress: Yup.object({
    Address: Yup.string().required("Required"),
    Zip: Yup.number().integer().required("Required"),
    City: Yup.string().required("Required"),
    State: Yup.string().required("Required"),
    AdditionalInformation: Yup.string().max(510),
  }),
  /* Financials Validation */
  financials: Yup.object().shape({
    registrationNumber: Yup.number()
      .integer()
      .typeError("Plaese enter a valid registration Number")
      .required("Required"),
    fiscalNumber: Yup.number
      .apply()
      .integer()
      .typeError("Plaese enter a valid Fiscal Number")
      .required("Required"),
    IBAN: Yup.number().integer().required("Required"),
    bankName: Yup.string().required("Required"),
  }),
  /* Contact Person Validation */
  /* contact: Yup.object({ */
  contactName: Yup.string().required("Required"),
  contactRole: Yup.string(),
  contactPhoneNumber: Yup.number()
    .integer()
    .typeError("Please enter a valid phone number")
    .required(),
  contactEMail: Yup.string().email("Invalid Email").required("Required"),
  /*  }), */
  /* Same Address ? */
  SaSameAsBa: Yup.bool().oneOf([true, false]),
});

function AddClient() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [showContact, setShowContact] = useState(false);
  const [showShipping, setShowShipping] = useState(true);
  const [SaSameAsBa, setSaSameAsBa] = useState(false);
  const [contactPersonNo, setContactPersonNo] = useState(1);
  const [cArray, setCArray] = useState([1]);
  const [formData, setFormData] = useState("");
  const updateFields = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);
    setFormData({ ...formData, fieldValue });
  };
  const navigate = useNavigate();
  const navigateToClientOverview = () => {
    navigate("/clients/overview");
  };

  const handleShowShipping = (e) => {
    setShowShipping(!showShipping);
  };

  const handleShowContact = (value) => {
    console.log(value);
    setShowContact(value);
  };

  const handleAddContact = () => {
    console.log("twest:", contactPersonNo);
    setContactPersonNo(contactPersonNo + 1);
    cArray.push(contactPersonNo);
  };

  const handleRemoveContact = () => {
    console.log("test 2:", contactPersonNo);
    setContactPersonNo(contactPersonNo - 1);
    cArray.pop(contactPersonNo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (clientName) {
      console.log(clientName);
    }
  };

  const roleTags = [
    { title: "CEO" },
    { title: "Management" },
    { title: "Worker" },
  ];

  const statusOptions = [
    {
      id: "all",
      name: "All",
    },
    {
      id: "not_started",
      name: t("Not started"),
    },
    {
      id: "completed",
      name: t("Completed"),
    },
    {
      id: "in_progress",
      name: t("In Progress"),
    },
  ];

  const CardAddAction = styled(Card)(
    ({ theme }) => `
          border: ${theme.colors.primary.main} dashed 2px;
          height: 80%;
          color: ${theme.colors.primary.main};
          transition: ${theme.transitions.create(["all"])};
  
  
  
          .MuiCardActionArea-root {
            height: 100%;
            justify-content: center;
            align-items: center;
            display: flex;
          }
          
          .MuiTouchRipple-root {
            opacity: .2;
          }
          
          &:hover {
            border-color: ${theme.colors.alpha.black[70]};
          }
  `
  );

  const AvatarAddWrapper = styled(Avatar)(
    ({ theme }) => `
          background: ${theme.colors.alpha.black[5]};
          color: ${theme.colors.primary.main};
          width: ${theme.spacing(5)};
          height: ${theme.spacing(5)};
  `
  );
  /*   const getClient = useCallback(async () => {
    try {
      const response = await axios.get("/api/clients");
      console.log(response);
      setClients(response.data.clients);
    } catch (err) {
      console.error(err);
    }
  });

  getClient(); */

  /* CREATE NEW FIELDS FOR EACH CONTACT PERSON */
  /*   let ContactPersonList = [];
  for (let i = 0; i < contactPersonNo; i++) {
    ContactPersonList.push(
      <ContactPerson
        /* Console says touch is undefined if I pass the props like I do with the other Components */

  /*           updateFields={updateFields} */
  /*         id={i}
      />
    );
  }  */

  const handleCreateClient = async (e) => {
    e.preventDefault();
    const clientToCreate = {};
    try {
      const response = await axios.post("/api/v1/client", userToCreate);
      if (response.status === 201) {
        enqueueSnackbar(t("The user account was created successfully"), {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          TransitionComponent: Zoom,
        });
        getUsers();
      } else {
        enqueueSnackbar(t("An error occured, please try again."), {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          TransitionComponent: Zoom,
        });
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar(t("An error occured, please try again."), {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        TransitionComponent: Zoom,
      });
    }

    setOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Add new Client</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        validationSchema={FORM_VALIDATION}
        /* Set Timeout ? */
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          setFieldValue,
          values,
        }) => (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              if (SaSameAsBa) {
                values.shippingAddress = values.billingAddress;
              }
              console.log(values);
              handleCreateClient();
            }}
          >
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
                <Card
                  sx={{
                    p: 1,
                    mb: 3,
                  }}
                >
                  <ClientDetails
                    handleShowContact={handleShowContact}
                    updateFields={updateFields}
                    touched={touched}
                    handleBlur={handleBlur}
                    values={values}
                    errors={errors}
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                  />
                  <BillingAdress
                    getIn={getIn}
                    updateFields={updateFields}
                    touched={touched}
                    handleBlur={handleBlur}
                    values={values}
                    errors={errors}
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                  />

                  <ShippingAdress
                    getIn={getIn}
                    updateFields={updateFields}
                    touched={touched}
                    handleBlur={handleBlur}
                    values={values}
                    errors={errors}
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                    setSaSameAsBa={setSaSameAsBa}
                    SaSameAsBa={SaSameAsBa}
                  />

                  {showContact ? (
                    <>
                      <Financials
                        getIn={getIn}
                        updateFields={updateFields}
                        touched={touched}
                        handleBlur={handleBlur}
                        values={values}
                        errors={errors}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                      />
                      {cArray.map((item) => (
                        <ContactPerson
                          /* Console says touch is undefined if I pass the props like I do with the other Components */

                          /*           updateFields={updateFields} */
                          touched={touched}
                          handleBlur={handleBlur}
                          values={values}
                          errors={errors}
                          setFieldValue={setFieldValue}
                          handleChange={handleChange}
                          id={item}
                        />
                      ))}
                      {/* Add Contact Person Start */}
                      <Grid
                        container
                        direction="row"
                        spacing={1}
                        sx={{ justifyContent: "flex-start" }}
                      >
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={5.9}
                          lg={5.9}
                          sx={{ py: 2, px: 2, mt: 2, ml: 1 }}
                        >
                          <Tooltip
                            arrow
                            title={t("Click to add a new Contact Person")}
                          >
                            <CardAddAction>
                              <CardActionArea
                                sx={{
                                  px: 1,
                                }}
                                onClick={handleAddContact}
                              >
                                <CardContent>
                                  <AvatarAddWrapper>
                                    <AddTwoToneIcon fontSize="medium" />
                                  </AvatarAddWrapper>
                                </CardContent>
                              </CardActionArea>
                            </CardAddAction>
                          </Tooltip>
                        </Grid>

                        {/* Add Contact Person End */}
                        {/* Remove Contact Person Start */}
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={5.9}
                          lg={5.9}
                          sx={{ py: 2, px: 2, mt: 2, ml: 1 }}
                        >
                          <Tooltip
                            arrow
                            title={t("Click to remove a Contact Person")}
                          >
                            <CardAddAction>
                              <CardActionArea
                                sx={{
                                  px: 1,
                                }}
                                onClick={handleRemoveContact}
                              >
                                <CardContent>
                                  <AvatarAddWrapper>
                                    <RemoveTwoToneIcon fontSize="medium" />
                                  </AvatarAddWrapper>
                                </CardContent>
                              </CardActionArea>
                            </CardAddAction>
                          </Tooltip>
                        </Grid>
                      </Grid>
                      {/* Remove Contact Person End */}
                    </>
                  ) : null}

                  <Button
                    sx={{
                      mt: { lg: 2, md: 0 },
                      ml: { lg: 2 },
                      mb: { lg: 2 },
                    }}
                    variant="outlined"
                    color="primary"
                    onClick={navigateToClientOverview}
                  >
                    Cancel
                  </Button>

                  <Button
                    sx={{
                      mt: { lg: 2, md: 0 },
                      ml: { lg: 110 },
                      mb: { lg: 2 },
                      px: { lg: 4 },
                    }}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Save
                  </Button>
                </Card>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AddClient;

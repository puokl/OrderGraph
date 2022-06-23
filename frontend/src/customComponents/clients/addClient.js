import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  styled,
  Tooltip,
  CircularProgress,
  Box,
} from "@mui/material";
import useAuth from "src/hooks/useAuth";
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
import axios from "src/utils/axios2";

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
  contact: [
    {
      contactName: "",
      contactRole: "",
      contactDepartment: "",
      contactPhoneNumber: "",
      contactEMail: "",
    },
  ],

  /* Shipping Address same Adress as Billing Adress */
  SaSameAsBa: false,
};

/* Person Form Validation Start */

const PERSON_FORM_VALIDATION = Yup.object().shape({
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
    registrationNumber: Yup.number().integer(),
    fiscalNumber: Yup.number.apply().integer(),
    IBAN: Yup.number().integer(),
    bankName: Yup.string(),
  }),
  /* Contact Person Validation */
  contact: Yup.array().of(
    Yup.object().shape({
      contactName: Yup.string(),
      contactRole: Yup.string(),
      contactDepartment: Yup.string(),
      contactPhoneNumber: Yup.number()
        .integer()
        .typeError("Please enter a valid phone number"),
      contactEMail: Yup.string().email("Invalid Email"),
    })
  ),
  /* Same Address ? */
  SaSameAsBa: Yup.bool().oneOf([true, false]),
});

/* Person Form Validation End */

/*  Company Form Validartion Start */

const COMPANY_FORM_VALIDATION = Yup.object().shape({
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
  contact: Yup.array().of(
    Yup.object().shape({
      contactName: Yup.string().required("Required"),
      contactRole: Yup.string(),
      contactDepartment: Yup.string().required("Required"),
      contactPhoneNumber: Yup.number()
        .integer()
        .typeError("Please enter a valid phone number")
        .required("Required"),
      contactEMail: Yup.string().email("Invalid Email").required("Required"),
    })
  ),
  /* Same Address ? */
  SaSameAsBa: Yup.bool().oneOf([true, false]),
});

/* Company Form Validation End */

function AddClient() {
  const { t } = useTranslation();
  const { user } = useAuth();
  console.log(user);
  const [showContact, setShowContact] = useState(false);
  const [showShipping, setShowShipping] = useState(true);
  const [SaSameAsBa, setSaSameAsBa] = useState(false);
  const [contactPersonNo, setContactPersonNo] = useState(1);
  const [cArray, setCArray] = useState([1]);
  const [formData, setFormData] = useState("");
  const [removeCp, setRemoveCp] = useState(false);
  const updateFields = (fieldName, fieldValue) => {
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
    setShowContact(value);
  };

  const handleAddContact = () => {
    setContactPersonNo(contactPersonNo + 1);
    cArray.push(contactPersonNo);
  };

  const handleShowRemoveCp = () => {
    if (contactPersonNo >= 1) {
      setRemoveCp(true);
    } else if (contactPersonNo < 2) {
      setRemoveCp(false);
    }
  };

  const handleRemoveContact = () => {
    setContactPersonNo(contactPersonNo - 1);
    cArray.pop(contactPersonNo);
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

  /*   const BoxActions = styled(Box)(
    ({ theme }) => `
    background: ${theme.colors.alpha.black[5]}
    `
  ); */

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

  const handleCreateClient = async (values) => {
    const dataToSend = { ...values, organization: user.organization };
    console.log("DTS:", dataToSend);
    try {
      const response = await axios.post("/api/v1/client/newclient", dataToSend);
      if (response.status === 201) {
        console.log("Backend Create client response: ", response);
        /*         navigateToClientOverview(); */
      } else {
        console.log("error");
      }
    } catch (err) {
      console.error(err);
    }
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
        validationSchema={
          showContact ? COMPANY_FORM_VALIDATION : PERSON_FORM_VALIDATION
        }
        /* Asyncronus Submission and Validation -- Check Formik Submit Documentation for more info */
        onSubmit={async (values) => {
          await handleCreateClient(values);
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
          validateForm,
        }) => (
          <Form>
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
                      {cArray.map((item, index) => (
                        <ContactPerson
                          touched={touched}
                          handleBlur={handleBlur}
                          values={values}
                          errors={errors}
                          setFieldValue={setFieldValue}
                          handleChange={handleChange}
                          id={item}
                          getIn={getIn}
                          key={item}
                          contactPersonNo={index}
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
                                onClick={(e) => {
                                  values.contact.push({
                                    contactName: "",
                                    contactRole: "",
                                    contactDepartment: "",
                                    contactPhoneNumber: "",
                                    contactEMail: "",
                                  });
                                  let newContactPersonNo = contactPersonNo + 1;
                                  setContactPersonNo(newContactPersonNo);
                                  cArray.push(newContactPersonNo);
                                  if (newContactPersonNo > 0) {
                                    setRemoveCp(true);
                                  } else if (newContactPersonNo < 1) {
                                    setRemoveCp(false);
                                  }
                                }}
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
                        {cArray.length === 1 ? null : (
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
                                  onClick={(e) => {
                                    values.contact.pop();
                                    let newContactPersonNo =
                                      contactPersonNo - 1;
                                    setContactPersonNo(newContactPersonNo);
                                    cArray.pop(newContactPersonNo);
                                  }}
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
                        )}

                        {/* Remove Contact Person End */}
                      </Grid>
                    </>
                  ) : null}

                  <Box
                    p={1}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Button
                      sx={{
                        px: { lg: 4 },
                      }}
                      variant="outlined"
                      color="primary"
                      onClick={navigateToClientOverview}
                    >
                      Cancel
                    </Button>

                    <Button
                      sx={{
                        px: { lg: 4 },
                        ml: "auto",
                      }}
                      variant="contained"
                      color="primary"
                      type="submit"
                      /* onClick Function gets launched first --> handleSubmit  looks for onSubmit function defined in the Formik Component 
                    e.preventDefault needs to be called in the onClick NOT in the onSubmit */
                      onClick={(e) => {
                        e.preventDefault();
                        /* SaSameAsBa Conditional needs to be called before handleSubmit, so that handleSubmit can accsess the values because they are set to be required in the validation */
                        if (SaSameAsBa) {
                          values.shippingAddress = values.billingAddress;
                        }
                        handleSubmit(e);
                        console.log(errors);
                      }}
                      startIcon={
                        isSubmitting ? <CircularProgress size="1rem" /> : null
                      }
                    >
                      Save
                    </Button>
                  </Box>
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

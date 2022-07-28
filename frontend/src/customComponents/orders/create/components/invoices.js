import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import {
  Grid,
  CardActionArea,
  CardContent,
  Tooltip,
  Card,
  Avatar,
  Box,
  Typography,
  Button,
} from "@mui/material";
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import UploadTwoToneIcon from "@mui/icons-material/UploadTwoTone";
import PictureAsPdfTwoToneIcon from "@mui/icons-material/PictureAsPdfTwoTone";
import CloseIcon from "@mui/icons-material/Close";
import useAuth from "src/hooks/useAuth";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  getMetadata,
  deleteObject,
} from "firebase/storage";
import { auth, db, storage } from "src/firebase";

const AvatarAddWrapper = styled(Avatar)(
  ({ theme }) => `
          background: ${theme.colors.alpha.black[5]};
          color: ${theme.colors.primary.main};
          // width: ${theme.spacing(8)};
          // height: ${theme.spacing(8)};
  `
);

const CardAddAction = styled(Card)(
  ({ theme }) => `
          border: ${theme.colors.primary.main} dashed 1px;
          flex: 1;
          color: ${theme.colors.primary.main};
          
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
            border-color: ${theme.colors.alpha.black[100]};
          }
  `
);

function Invoices({
  setCurrentOrder,
  currentOrder,
  orderID,
  invoiceUrlList,
  setInvoiceUrlList,
}) {
  const { t } = useTranslation();

  const [progresspercent, setProgresspercent] = useState(0);

  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, error] = useAuthState(auth);
  const [invoiceList, setInvoiceList] = useState([]);

  const fetchDocuments = async (listToFetch) => {
    const newDocList = listToFetch.map((url, index) => {
      const fileRef = ref(storage, url);

      return { name: fileRef.name };
    });

    setInvoiceList([...newDocList]);
  };

  const handleSubmit = (acceptedFiles) => {
    // accept multiple to implement, map over acceptedfiles
    const file = acceptedFiles[0];

    if (!file) return;

    const storageRef = ref(storage, `${user.organization}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (err) => {
        console.error(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInvoiceUrlList([...currentOrder.invoices, downloadURL]);

          setCurrentOrder({
            ...currentOrder,
            invoices: [...currentOrder.invoices, downloadURL],
          });
        });
      }
    );
  };

  const deleteFile = (index) => {
    // Delete the file
    deleteObject(ref(storage, invoiceUrlList[index]))
      .then(() => {
        // File deleted successfully
        const updatedList = invoiceUrlList.filter(
          (url) => url !== invoiceUrlList[index]
        );
        setInvoiceUrlList([...updatedList]);
        setCurrentOrder({ ...currentOrder, invoices: [...updatedList] });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.error(error);
      });
  };

  useEffect(() => {
    if (loading) return;
    fetchDocuments(invoiceUrlList);
  }, [loading, invoiceUrlList]);

  const style = {
    width: "100%",
    margin: "9px",
  };

  return (
    <Card sx={{ p: "1.5rem", mb: "1.5rem" }}>
      <Grid
        sx={{
          minWidth: "100%",
          justifyContent: "flex-start",
        }}
        container
      >
        {invoiceList.map((invoice, index) => (
          <Grid
            item
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
            }}
            xs={6}
            sm={6}
            lg={6}
          >
            <Card
              sx={{
                py: "1rem",
                my: "1rem",
                mx: 1,
                px: "1.5rem",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              <a
                target="_blank"
                href={invoiceUrlList[index]}
                alt={`${invoice.name}`}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <PictureAsPdfTwoToneIcon
                  color="disabled"
                  fontSize="medium"
                  sx={{ mr: "1rem" }}
                />
                <span>{`${invoice.name}`}</span>
              </a>
              <Button
                aria-label="Delete"
                size="small"
                color="primary"
                style={{
                  backgroundColor: "rgba(85, 105, 255, 0.1)",
                  minWidth: 0,
                  width: "1.5rem",
                  height: "1.5rem",
                  borderRadius: "50%",
                  marginLeft: "auto",
                }}
                onClick={(event) => {
                  deleteFile(index);
                }}
              >
                <CloseIcon color="disabled" fontSize="small" />
              </Button>
            </Card>
          </Grid>
        ))}
        <Grid container>
          <Grid
            item
            style={{
              display: "flex",
              flexDirection: "row",
            }}
            xs={6}
            sm={6}
            lg={6}
          >
            <Tooltip arrow title={t("Click to create a new invoice")}>
              <CardAddAction
                sx={{
                  m: 1,
                }}
              >
                <CardActionArea onClick={(e) => {}}>
                  <CardContent xs={12} sm={6} lg={3}>
                    <AvatarAddWrapper>
                      <AddTwoToneIcon fontSize="medium" />
                    </AvatarAddWrapper>
                  </CardContent>
                </CardActionArea>
              </CardAddAction>
            </Tooltip>
          </Grid>
          <Grid
            item
            style={{
              display: "flex",
              flexDirection: "row",
            }}
            xs={6}
            sm={6}
            lg={6}
          >
            <Dropzone
              onDrop={(acceptedFiles, event) => {
                handleSubmit(acceptedFiles, event);
              }}
              maxFiles={1}
              style={{ width: "100%" }}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps({ style })}>
                  <input {...getInputProps()} />
                  <Tooltip
                    arrow
                    title={t("Click to attach an invoice from your computer")}
                  >
                    <CardAddAction style={{ backgroundColor: "lightgrey" }}>
                      <CardActionArea>
                        <CardContent
                          xs={12}
                          sm={6}
                          lg={8}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <AvatarAddWrapper>
                            <UploadTwoToneIcon
                              color="primary"
                              fontSize="medium"
                            />
                          </AvatarAddWrapper>
                          {loading ? (
                            <span>{progresspercent}%</span>
                          ) : (
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              sx={{
                                py: 0.5,
                              }}
                            >
                              {t("drag & drop files here")}
                            </Typography>
                          )}
                        </CardContent>
                      </CardActionArea>
                    </CardAddAction>
                  </Tooltip>
                </div>
              )}
            </Dropzone>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Invoices;

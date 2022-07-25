import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import {
  CardActionArea,
  CardContent,
  Tooltip,
  Card,
  Avatar,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import UploadTwoToneIcon from "@mui/icons-material/UploadTwoTone";
import PictureAsPdfTwoToneIcon from "@mui/icons-material/PictureAsPdfTwoTone";
import CloseIcon from "@mui/icons-material/Close";
import Dropzone from "react-dropzone";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
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

function Documents({
  orderID,
  currentOrder,
  setCurrentOrder,
  urlList,
  setUrlList,
}) {
  const { t } = useTranslation();

  const [progresspercent, setProgresspercent] = useState(0);

  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, error] = useAuthState(auth);

  const [docList, setDocList] = useState([]);

  const fetchDocuments = async (listToFetch) => {
    console.log(listToFetch);

    const newDocList = listToFetch.map((url, index) => {
      const fileRef = ref(storage, url);

      return { name: fileRef.name };
    });

    setDocList([...newDocList]);

    // listToFetch.forEach((url, index) => {
    //   if (index === 0) {
    //     getMetadata(ref(storage, url)).then((metadata) => {
    //       setDocList([
    //         { name: metadata.name, fileSize: Number(metadata.size) / 1048576 },
    //       ]);
    //     });
    //   } else {
    //     getMetadata(ref(storage, url)).then((metadata) => {
    //       setDocList((previousState) => {
    //         return [
    //           ...previousState,
    //           {
    //             name: metadata.name,
    //             fileSize: Number(metadata.size) / 1048576,
    //           },
    //         ];
    //       });
    //     });
    //   }
    // });
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
        alert(err); // eslint-disable-line
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrlList([...currentOrder.documents, downloadURL]);

          setCurrentOrder({
            ...currentOrder,
            documents: [...currentOrder.documents, downloadURL],
          });
        });
      }
    );
  };

  const deleteFile = (index) => {
    // Delete the file
    deleteObject(ref(storage, urlList[index]))
      .then(() => {
        // File deleted successfully
        const updatedList = urlList.filter((url) => url !== urlList[index]);
        setUrlList([...updatedList]);
        setCurrentOrder({ ...currentOrder, documents: [...updatedList] });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.error(error);
      });
    console.log(currentOrder);
    console.log(urlList);
  };

  useEffect(() => {
    if (loading) return;
    fetchDocuments(urlList);
    console.log(currentOrder.documents);
    console.log(docList);
  }, [loading, urlList]);

  return (
    <Card sx={{ p: "1.5rem" }}>
      <Typography
        variant="h4"
        component="h4"
        gutterBottom
        sx={{
          py: 0.5,
        }}
      >
        {t("Documents")}
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {docList.map((doc, index) => {
        console.log(docList);
        return (
          <Card
            key={`${index}`}
            sx={{
              py: "1rem",
              my: "1rem",
              px: "0.5rem",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            <a
              target="_blank"
              href={urlList[index]}
              alt={`${doc.name}`}
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
              <span>{`${doc.name}`}</span>
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
        );
      })}

      <Dropzone
        onDrop={(acceptedFiles, event) => {
          console.log(acceptedFiles);
          handleSubmit(acceptedFiles, event);
        }}
        maxFiles={1}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Tooltip arrow title={t("Click to add a new item")}>
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
                        <UploadTwoToneIcon color="primary" fontSize="medium" />
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
          </section>
        )}
      </Dropzone>
    </Card>
  );
}

export default Documents;

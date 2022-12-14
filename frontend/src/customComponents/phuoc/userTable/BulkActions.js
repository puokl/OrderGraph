import {
  useState,
  useRef,
  DialogWrapper,
  AvatarError,
  CloseIcon,
  forwardRef,
} from "react";

import {
  Box,
  Menu,
  Tooltip,
  IconButton,
  Button,
  ListItemText,
  ListItem,
  List,
  Typography,
  styled,
  Slide,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import MoreVertTwoToneIcon from "@mui/icons-material/MoreVertTwoTone";

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

function BulkActions({ handleConfirmDelete }) {
  const [onMenuOpen, menuOpen] = useState(false);
  const moreRef = useRef(null);
  const { t } = useTranslation();

  const openMenu = () => {
    menuOpen(true);
  };

  const closeMenu = () => {
    menuOpen(false);
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography variant="h5" color="text.secondary">
            {t("Bulk actions")}:
          </Typography>

          <ButtonError
            sx={{
              ml: 1,
            }}
            startIcon={<DeleteTwoToneIcon />}
            variant="contained"
            onClick={handleConfirmDelete}
          >
            {t("Delete")}
          </ButtonError>
        </Box>
        <IconButton
          color="primary"
          onClick={openMenu}
          ref={moreRef}
          sx={{
            ml: 2,
            p: 1,
          }}
        >
          <MoreVertTwoToneIcon />
        </IconButton>
      </Box>

      <Menu
        disableScrollLock
        keepMounted
        anchorEl={moreRef.current}
        open={onMenuOpen}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      ></Menu>
    </>
  );
}

export default BulkActions;

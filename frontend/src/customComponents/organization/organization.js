import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import {
  Grid,
  Drawer,
  Box,
  Card,
  Divider,
  useMediaQuery,
  styled,
  useTheme,
} from "@mui/material";

import ManagementUsers from "../../content/management/Users/index";

function Organization() {
  return (
    <>
      <ManagementUsers />
    </>
  );
}

export default Organization;

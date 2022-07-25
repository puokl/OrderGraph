import { NavLink } from "react-router-dom";
import { forwardRef } from "react";
import React from "react";

export const RouterLink2 = forwardRef((props, ref) => (
  <NavLink {...props} ref={ref} reloadDocument />
));

export const ClonedElementWithMoreProps = React.cloneElement(NavLink, {
  reloadDocument: true,
});

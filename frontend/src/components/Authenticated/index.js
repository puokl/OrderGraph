import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "src/hooks/useAuth";
import Login from "src/content/pages/Auth/Login/Cover";
import FinaliseRegisterWizard from "src/content/pages/Auth/FinaliseRegistration/index";
import AccentSidebarLayout from "src/layouts/AccentSidebarLayout";
import TopNavigationLayout from "src/layouts/TopNavigationLayout";

const Authenticated = (props) => {
  const { children } = props;
  const auth = useAuth();
  const location = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!auth.isAuthenticated) {
    if (location.pathname !== requestedLocation) {
      setRequestedLocation(location.pathname);
    }
    return <Login />;
  }

  if (!auth.hasOrg) {
    return <FinaliseRegisterWizard />;
  }

  if (requestedLocation && location.pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }
  if (auth.role === "admin") {
    return <AccentSidebarLayout>{children}</AccentSidebarLayout>;
  }
  if (auth.role === "worker") {
    return <TopNavigationLayout>{children}</TopNavigationLayout>;
  }
};

Authenticated.propTypes = {
  children: PropTypes.node,
};

export default Authenticated;

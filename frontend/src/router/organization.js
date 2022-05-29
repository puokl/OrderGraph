import { Suspense, lazy } from "react";
// import { Navigate } from "react-router-dom";

import SuspenseLoader from "src/components/SuspenseLoader";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Organization

const Organization = Loader(
  lazy(() => import("src/customComponents/organization/organization"))
);

const organizationRoutes = [
  {
    path: "/",
    element: <Organization />,
  },
];

export default organizationRoutes;

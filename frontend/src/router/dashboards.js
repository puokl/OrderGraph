import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

import SuspenseLoader from "src/components/SuspenseLoader";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Dashboards

const Calendar = Loader(
  lazy(() => import("src/content/applications/Calendar"))
);

const dashboardsRoutes = [
  {
    path: "/",
    element: <Navigate to="dashboard" replace />,
  },
  {
    path: "dashboard",
    element: <Calendar />,
  },
];

export default dashboardsRoutes;

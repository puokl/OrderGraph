import { Suspense, lazy } from "react";
// import { Navigate } from "react-router-dom";

import SuspenseLoader from "src/components/SuspenseLoader";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Orders

const Calendar = Loader(
  lazy(() => import("src/content/applications/Calendar"))
);

const ordersRoutes = [
  {
    path: "/",
    element: <Calendar />,
  },
];

export default ordersRoutes;

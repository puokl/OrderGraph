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
const Gantt = Loader(lazy(() => import("src/customComponents/gantt/index")));
const FullGantt = Loader(
  lazy(() => import("src/customComponents/gantt/fullGannt"))
);
const Overview = Loader(
  lazy(() => import("src/customComponents/orders/overview/OrderOverview"))
);
const CreateOrder = Loader(
  lazy(() => import("src/customComponents/orders/create/index"))
);
const OrderDetails = Loader(
  lazy(() => import("src/customComponents/orders/details/index"))
);

const ordersRoutes = [
  {
    path: "/",
    element: <Calendar />,
  },
  {
    path: "overview",
    element: <Overview />,
  },
  {
    path: "create",
    element: <CreateOrder />,
  },
  {
    path: "/:orderID",
    element: <OrderDetails />,
  },
  {
    path: "edit/:orderID",
    element: <CreateOrder />,
  },
];

export default ordersRoutes;

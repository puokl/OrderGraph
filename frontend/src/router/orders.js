import { Suspense, lazy } from "react";
// import { Navigate } from "react-router-dom";
import data from "./data.js";
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
const Gantt = Loader(lazy(() => import("src/customComponents/Gantt/index")));

const ordersRoutes = [
  {
    path: "/",
    element: <Calendar />,
  },
  {
    path: "gantt",
    element: <Gantt tasks={data} />,
  },
];

export default ordersRoutes;

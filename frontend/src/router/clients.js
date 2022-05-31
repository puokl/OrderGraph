import { Suspense, lazy } from "react";
// import { Navigate } from "react-router-dom";

import SuspenseLoader from "src/components/SuspenseLoader";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Clients

const AddClient = Loader(
  lazy(() => import("src/customComponents/clients/createNewClients"))
);

const clientsRoutes = [
  {
    path: "add",
    element: <AddClient />,
  },
];

export default clientsRoutes;

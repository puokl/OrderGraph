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
  lazy(() => import("src/customComponents/clients/addClient"))
);

const ClientDetails = Loader(
  lazy(() => import("src/customComponents/clients/ClientPage"))
);

const ClientOverview = Loader(
  lazy(() => import("src/customComponents/clients/ClientOverview"))
);

const clientsRoutes = [
  {
    path: "add",
    element: <AddClient />,
  },

  {
    path: "/edit/:clientId",
    element: <AddClient />,
  },

  {
    path: "/details",
    element: <ClientDetails />,
  },
  {
    path: "/overview",
    element: <ClientOverview />,
  },

  {
    path: "/details/:clientId",
    element: <ClientDetails />,
  },
];

export default clientsRoutes;

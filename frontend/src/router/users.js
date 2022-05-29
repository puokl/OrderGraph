import { Suspense, lazy } from "react";
// import { Navigate } from "react-router-dom";

import SuspenseLoader from "src/components/SuspenseLoader";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Users

const Users = Loader(lazy(() => import("src/customComponents/users/users")));

const usersRoutes = [
  {
    path: "/",
    element: <Users />,
  },
];

export default usersRoutes;

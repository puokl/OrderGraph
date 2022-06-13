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

const Users = Loader(lazy(() => import("src/customComponents/users/users.js")));
const TestUsers = Loader(
  lazy(() => import("src/customComponents/users/index.js"))
);

const usersRoutes = [
  {
    path: "/",
    element: <Users />,
  },
  {
    path: "/test",
    element: <TestUsers />,
  },
  {
    path: "/test/:clientId",
    element: <TestUsers />,
  },
];

export default usersRoutes;

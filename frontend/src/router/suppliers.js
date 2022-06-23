import { Suspense, lazy } from "react";
// import { Navigate } from "react-router-dom";

import SuspenseLoader from "src/components/SuspenseLoader";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Suppliers

const AddSupplier = Loader(
  lazy(() => import("src/customComponents/suppliers/addSupplier"))
);
const SuppliersOverview = Loader(
  lazy(() => import("src/customComponents/suppliers/SuppliersOverview"))
);

const suppliersRoutes = [
  {
    path: "add",
    element: <AddSupplier />,
  },
  {
    path: "overview",
    element: <SuppliersOverview />,
  },
];

export default suppliersRoutes;

import Authenticated from "src/components/Authenticated";
import { Navigate } from "react-router-dom";

import DocsLayout from "src/layouts/DocsLayout";
import BaseLayout from "src/layouts/BaseLayout";
import AccentSidebarLayout from "src/layouts/AccentSidebarLayout";
import TopNavigationLayout from "src/layouts/TopNavigationLayout";

import dashboardsRoutes from "./dashboards";
import blocksRoutes from "./blocks";
import applicationsRoutes from "./applications";
import managementRoutes from "./management";
import documentationRoutes from "./documentation";
import accountRoutes from "./account";
import baseRoutes from "./base";
import clientsRoutes from "./clients";
import ordersRoutes from "./orders";
import suppliersRoutes from "./suppliers";

const router = [
  {
    path: "account",
    children: accountRoutes,
  },
  {
    path: "*",
    element: <BaseLayout />,
    children: baseRoutes,
  },

  // Documentation

  {
    path: "docs",
    element: <DocsLayout />,
    children: documentationRoutes,
  },

  // Accent Sidebar Layout

  {
    path: "/",
    element: (
      <Authenticated>
        <AccentSidebarLayout />
      </Authenticated>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        children: dashboardsRoutes,
      },
      {
        path: "blocks",
        children: blocksRoutes,
      },
      {
        path: "applications",
        children: applicationsRoutes,
      },
      {
        path: "management",
        children: managementRoutes,
      },
      {
        path: "clients",
        children: clientsRoutes,
      },
      {
        path: "orders",
        children: ordersRoutes,
      },
      {
        path: "suppliers",
        children: suppliersRoutes,
      },
    ],
  },

  // Top Navigation Layout

  {
    path: "top-navigation",
    element: (
      <Authenticated>
        <TopNavigationLayout />
      </Authenticated>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to="dashboards" replace />,
      },
      {
        path: "dashboards",
        children: dashboardsRoutes,
      },
      {
        path: "blocks",
        children: blocksRoutes,
      },
      {
        path: "applications",
        children: applicationsRoutes,
      },
      {
        path: "management",
        children: managementRoutes,
      },
    ],
  },
];

export default router;

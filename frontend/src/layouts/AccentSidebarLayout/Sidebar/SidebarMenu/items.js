import StorefrontTwoToneIcon from "@mui/icons-material/StorefrontTwoTone";
import AssignmentTwoToneIcon from "@mui/icons-material/AssignmentTwoTone";
import CakeTwoToneIcon from "@mui/icons-material/CakeTwoTone";
import CorporateFareTwoToneIcon from "@mui/icons-material/CorporateFareTwoTone";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import BarChartIcon from "@mui/icons-material/BarChart";

const menuItems = [
  {
    items: [
      {
        name: "Dashboard",
        icon: BarChartIcon,
        link: "/",
      },
    ],
  },
  {
    heading: "Production Management",
    items: [
      {
        name: "Orders",
        icon: AssignmentTwoToneIcon,
        link: "/orders",
        items: [
          {
            name: "Overview",
            link: "orders/overview",
            badgeTooltip: "An overview of your orders",
          },
          {
            name: "Create Order",
            link: "orders/create",
            badgeTooltip: "Create a new order",
          },
        ],
      },
      {
        name: "Clients",
        icon: CakeTwoToneIcon,
        link: "/clients",
        items: [
          {
            name: "Client Overview",
            link: "clients/overview",
            badgeTooltip: "An overview of your clients",
          },
          {
            name: "Add Client",
            link: "clients/add",
            badgeTooltip: "Add a client",
          },
        ],
      },
      {
        name: "Suppliers",
        icon: StorefrontTwoToneIcon,
        badgeTooltip: "Suppliers",
        link: "/suppliers",
        items: [
          {
            name: "Supplier Overview",
            link: "suppliers/overview",
            badgeTooltip: "An overview of your suppliers",
          },
          {
            name: "Add Supplier",
            link: "suppliers/add",
            badge: "",
            badgeTooltip: "Add a supplier",
          },
        ],
      },
    ],
  },
  {
    heading: "Administration",
    items: [
      {
        name: "Organization",
        icon: CorporateFareTwoToneIcon,
        link: "/organization",
      },
      {
        name: "Users",
        icon: AccountCircleTwoToneIcon,
        link: "/users/test",
      },
      {
        name: "Account",
        icon: SettingsTwoToneIcon,
        link: "/account",
      },
    ],
  },
];

export default menuItems;

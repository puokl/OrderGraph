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
        link: "/accent-sidebar/",
      },
    ],
  },
  {
    heading: "Production Management",
    items: [
      {
        name: "Orders",
        icon: AssignmentTwoToneIcon,
        link: "",
        items: [
          {
            name: "Overview",
            link: "/accent-sidebar/dashboards",
            badgeTooltip: "Added in version 3.0",
          },
          {
            name: "Create Order",
            link: "/accent-header/dashboards",
            badgeTooltip: "Updated",
          },
        ],
      },
      {
        name: "Clients",
        icon: CakeTwoToneIcon,
        link: "/accent-sidebar/dashboards",
        items: [
          {
            name: "Overview",
            link: "dashboards/reports",
            badgeTooltip: "Reports Dashboard - version 3.0",
          },
          {
            name: "Add Client",
            link: "dashboards/expenses",
            badgeTooltip: "Expenses Dashboard - version 3.0",
          },
        ],
      },
      {
        name: "Suppliers",
        icon: StorefrontTwoToneIcon,
        badgeTooltip: "Tokyo 3.0 contains over 250 new data display blocks",
        link: "/accent-sidebar/blocks",
        items: [
          {
            name: "Overview",
            link: "dashboards/reports",
            badgeTooltip: "Reports Dashboard - version 3.0",
          },
          {
            name: "Add Supplier",
            link: "dashboards/expenses",
            badge: "",
            badgeTooltip: "Expenses Dashboard - version 3.0",
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
        link: "/accent-sidebar/management/projects/list",
      },
      {
        name: "Account",
        icon: SettingsTwoToneIcon,
        link: "/accent-sidebar/management/commerce",
      },
    ],
  },
];

export default menuItems;

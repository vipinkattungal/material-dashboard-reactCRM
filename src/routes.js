/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import ReportingAndAnalytics from "components/Account-companies/pages/ReportingAndAnalytics";
import RTL from "layouts/rtl";
import Socialmedia from "components/Account-companies/pages/Socialmedia";
import AccountManagementModule from "components/Account-companies/pages/Contacts";
import LeadManagement from "components/Account-companies/pages/LeadManagement";
import QuoteProposalManagement from "components/Account-companies/pages/QuoteProposal";
import OpportunityModule from "components/OpportunityModule/OpportunityModule";
import TaskActivityModule from "components/Task/TaskActivityModule";
import DocumentManagement from "components/Account-companies/pages/DocumentManagement";
import SalesCRMPage from "components/Accounts/AccountAndCompanyModule";
import Icon from "@mui/material/Icon";
import SalesPipelineModule from "components/Account-companies/pages/SalesPipeline";
import EmailAndCommunicationModule from "components/Account-companies/pages/Emailcommunication";
import Integrations from "components/Account-companies/pages/Integrations";
import CustomerJourneyMapping from "components/Account-companies/pages/CustomerJourney";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  // {
  //   type: "collapse",
  //   name: "Leads Management",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/tables",
  //   component: <LeadManagement />,
  // },
  {
    type: "collapse",
    name: "Opportunities",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Opportunities",
    component: <OpportunityModule />,
  },
  {
    type: "Contacts",
    name: "RTL",
    key: "rtl",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/rtl",
    component: <RTL />,
  },
  {
    type: "collapse1",
    name: "Tasks & Activities",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <TaskActivityModule />,
  },
  {
    type: "collapse",
    name: "Accounts/Companies",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <SalesCRMPage />,
  },
  {
    type: "collapse",
    name: "Contacts",
    key: "Contacts",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/Contacts",
    component: <AccountManagementModule />,
  },
  {
    type: "collapse",
    name: "Lead Management",
    key: "Lead-Management",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/leadManagement",
    component: <LeadManagement />,
  },
  {
    type: "collapse",
    name: "SalesPipeline",
    key: "SalesPipeline",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/SalesPipeline",
    component: <SalesPipelineModule />,
  },
  {
    type: "collapse",
    name: "Email Communication",
    key: "Email-Communication",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <EmailAndCommunicationModule />,
  },
  {
    type: "collapse",
    name: "Report",
    key: "Report",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/report",
    component: <ReportingAndAnalytics />,
  },
  {
    type: "collapse",
    name: "Quote Preposal",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/QuoteProposalManagement",
    component: <QuoteProposalManagement />,
  },
  {
    type: "collapse",
    name: "Document Management",
    key: "DocumentManagement",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/DocumentManagement",
    component: <DocumentManagement />,
  },
  {
    type: "collapse",
    name: "Integrations",
    key: "Integrations",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Integrations",
    component: <Integrations />,
  },
  {
    type: "collapse",
    name: "Customer journey",
    key: "Customerjourney",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Customerjourney",
    component: <CustomerJourneyMapping />,
  },
  {
    type: "collapse",
    name: "Socialmedia Integration",
    key: "Socialmedia",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Socialmedia",
    component: <Socialmedia />,
  },
];

export default routes;

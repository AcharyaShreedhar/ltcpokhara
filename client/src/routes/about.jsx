import Objectives from "../views/About/Objectives";
import Introduction from "../views/About/Introduction";
import OrganizationStructure from "../views/About/OrganizationStructure";
import Tor from "../views/About/Tor";
import Staff from "../views/About/Staff";

const aboutRoutes = [
  {
    path: "/about/introduction",
    title: "Introduction",
    name: "introduction",
    component: Introduction,
  },
  {
    path: "/about/organization_structure",
    title: "Organization Structure",
    name: "organization structure",
    component: OrganizationStructure,
  },
  {
    path: "/about/objectives",
    title: "Objectives",
    name: "objectives",
    component: Objectives,
  },
  {
    path: "/about/tor",
    title: "TOR",
    name: "tor",
    component: Tor,
  },
  {
    path: "/about/stafflist",
    title: "Staff",
    name: "staff",
    component: Staff,
  },
  {
    path: "/about/staffedit/:id",
    title: "Staff",
    name: "staff",
    component: Staff,
  },
  {
    path: "/about/staffdetail/:id",
    title: "Staff",
    name: "staff",
    component: Staff,
  },
  {
    redirect: true,
    path: "/about",
    to: "/about/introduction",
    name: "About",
    component: Introduction,
  },
];

export default aboutRoutes;

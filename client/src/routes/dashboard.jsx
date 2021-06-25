import Login from "../layouts/Login";
import Home from "../views/Home";
import About from "../views/About";
import Notice from "../views/Notice";
import Downloads from "../views/Downloads";
import Publications from "../views/Publications";
import Gallery from "../views/Gallery";
import Contact from "../views/Contact";
import AdminPanel from "../views/AdminPanel";

const dashboardRoutes = [
  // {
  //   path: "/auth",
  //   name: "Login",
  //   component: Login,
  // },
  {
    path: "/admin",
    name: "adminPanel",
    component: AdminPanel,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/notice",
    name: "Notice",
    component: Notice,
  },
  {
    path: "/downloads",
    name: "/Downloads",
    component: Downloads,
  },
  {
    path: "/publications",
    name: "Publications",
    component: Publications,
  },
  {
    path: "/gallery",
    name: "Gallery",
    component: Gallery,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    redirect: true,
    path: "/",
    to: "/home",
    name: "Dashboard",
  },
];

export default dashboardRoutes;

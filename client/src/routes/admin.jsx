import Login from "../layouts/Login";
import AddNotice from "../views/AdminPanel/AddNotice";
import AddBook from "../views/AdminPanel/AddBook";
import AddStaff from "../views/AdminPanel/AddStaff";

const adminRoutes = [
  {
    path: "/admin/auth",
    name: "Login",
    component: Login,
  },

  {
    path: "/admin/add_notice",
    title: "AddNotice",
    name: "AddNotice",
    component: AddNotice,
  },
  {
    path: "/admin/add_staff",
    title: "AddStaff",
    name: "AddStaff",
    component: AddStaff,
  },
  {
    path: "/admin/add_book",
    title: "AddBook",
    name: "AddBook",
    component: AddBook,
  },

  {
    redirect: true,
    path: "/admin",
    to: "/admin/auth",
    name: "adminPanel",
    component: Login,
  },
];

export default adminRoutes;

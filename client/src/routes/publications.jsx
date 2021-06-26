import Books from "../views/Publications/Books";
import Procedures from "../views/Publications/Procedures";

const publicationsRoutes = [
  {
    path: "/publications/procedureslist",
    title: "Procedures",
    name: "procedures",
    component: Procedures,
  },
  {
    path: "/publications/proceduredetail/:id",
    title: "Procedures",
    name: "procedures",
    component: Procedures,
  },
  {
    path: "/publications/procedureedit/:id",
    title: "Procedures",
    name: "procedures",
    component: Procedures,
  },
  {
    path: "/publications/bookslist",
    title: "Books",
    name: "books",
    component: Books,
  },
  {
    path: "/publications/booksedit/:id",
    title: "Books",
    name: "books",
    auth: true,
    component: Books,
  },
  {
    path: "/publications/booksdetail/:id",
    title: "Books",
    name: "books",
    component: Books,
  },

  {
    redirect: true,
    path: "/publications",
    to: "/publications/procedures",
    name: "publications",
    component: Procedures,
  },
];

export default publicationsRoutes;

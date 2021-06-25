import Books from "../views/Publications/Books";
import Downloads from "../views/Publications/Downloads";
import Procedures from "../views/Publications/Procedures";

const publicationsRoutes = [
  {
    path: "/publications/procedures",
    title: "Procedures",
    name: "procedures",
    component: Procedures,
  },
  {
    path: "/publications/downloads",
    title: "Downloads",
    name: "downloads",
    component: Downloads,
  },
  {
    path: "/publications/books",
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

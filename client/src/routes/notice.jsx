import NewsAndNotice from "../views/Notice/NewsAndNotice";
import Events from "../views/Notice/Events";
import PressRelease from "../views/Notice/PressRelease";

const noticeRoutes = [
  {
    path: "/notice/newsandnotices",
    title: "NewsAndNotice",
    name: "newsandnotice",
    component: NewsAndNotice,
  },
  {
    path: "/notice/pressrelease",
    title: "Press Release",
    name: "press release",
    component: PressRelease,
  },
  {
    path: "/notice/events",
    title: "Events",
    name: "events",
    component: Events,
  },
  {
    redirect: true,
    path: "/notice",
    to: "/notice/newsandnotices",
    name: "notice",
    component: NewsAndNotice,
  },
];

export default noticeRoutes;

import NewsAndNotice from "../views/Notice/NewsAndNotice";
import Events from "../views/Notice/Events";
import PressRelease from "../views/Notice/PressRelease";

const noticeRoutes = [
  {
    path: "/notice/newsandnoticeslist",
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
    path: "/notice/eventslist",
    title: "Events",
    name: "events",
    component: Events,
  },
  {
    path: "/notice/eventsedit:id",
    title: "Events",
    name: "events",
    component: Events,
  },
  {
    path: "/notice/eventsdetail:id",
    title: "Events",
    name: "events",
    component: Events,
  },
  {
    redirect: true,
    path: "/notice",
    to: "/notice/newsandnoticeslist",
    name: "notice",
    component: NewsAndNotice,
  },
];

export default noticeRoutes;

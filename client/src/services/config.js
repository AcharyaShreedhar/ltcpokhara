import { equals } from "ramda";
const addMenuItems = [
  { id: 1, label: "Add Notice", name: "notice", url: "/admin/add_notice" },
  {
    id: 2,
    label: "Update PhotoGallery",
    name: "gallery",
    url: "/admin/update_photo_gallery",
  },
  { id: 3, label: "Add Staffs", name: "staff", url: "/admin/add_staff" },
  {
    id: 4,
    label: "Add Book",
    name: "book",
    url: "/admin/add_book",
  },
  { id: 5, label: "Add Event", name: "event", url: "/admin/add_event" },
  {
    id: 6,
    label: "Add Pressrelease",
    name: "pressrelease",
    url: "/admin/add_pressrelease",
  },
];

const AssetsURL = equals(process.env.NODE_ENV, "production")
  ? "https://www.ltcpokhara.com/assets"
  : "https://www.ltcpokhara.com/assets";

const SPECIALOPTIONS = {
  ALL: -1, // Select All
  NONE: -2, // Select None
  SELFASSIGNED: -3,
  LIST: -4, // List
};

export { AssetsURL, addMenuItems, SPECIALOPTIONS };

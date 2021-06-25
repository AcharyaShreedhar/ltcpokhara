import PhotoGallery from "../views/Gallery/PhotoGallery";
import VideoGallery from "../views/Gallery/VideoGallery";

const galleryRoutes = [
  {
    path: "/gallery/photogallery",
    title: "Photo Gallery",
    name: "photogallery",
    component: PhotoGallery,
  },
  {
    path: "/gallery/videogallery",
    title: "Video Gallery",
    name: "video gallery",
    component: VideoGallery,
  },
  {
    redirect: true,
    path: "/gallery",
    to: "/gallery/photogallery",
    name: "gallery",
    component: PhotoGallery,
  },
];

export default galleryRoutes;

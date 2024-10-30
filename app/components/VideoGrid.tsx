import { FC } from "react";

interface VideoGridProps {
  session: any;
}

interface Video {
  id: number;
  title: string;
  category: string;
  url: string;
  comments: string;
  store: {
    name: string;
    address: string;
  };
}

const VideoGrid: FC<VideoGridProps> = ({ session }) => {
  const videos: Video[] = [
    {
      id: 1,
      title: "Video de ropa",
      category: "Ropa",
      url: "https://res.cloudinary.com/dhnkojapo/video/upload/v1730321490/samples/dance-2.mp4",
      comments: "Ropa de alta calidad",
      store: { name: "De ropa", address: "Calle 123, Ciudad Rosario" },
    },
    {
      id: 2,
      title: "Video de zapatos",
      category: "Zapatos",
      url: "https://res.cloudinary.com/dhnkojapo/video/upload/v1730321490/samples/cld-sample-video.mp4",
      comments: "Zapatos de moda",
      store: { name: "De zapatos", address: "Calle 456, Ciudad" },
    },
    {
      id: 3,
      title: "Video de relojes",
      category: "Relojes",
      url: "https://res.cloudinary.com/dhnkojapo/video/upload/v1730321490/samples/cld-sample-video.mp4",
      comments: "Relojes de alta calidad",
      store: { name: "De relojes", address: "Calle 789, Ciudad" },
    },
    {
      id: 4,
      title: "Video de accesorios",
      category: "Accesorios",
      url: "https://res.cloudinary.com/dhnkojapo/video/upload/v1730321490/samples/cld-sample-video.mp4",
      comments: "Accesorios de moda",
      store: { name: "De accesorios", address: "Calle 1011, Ciudad" },
    },
    {
      id: 5,
      title: "Video de ropa",
      category: "Ropa",
      url: "https://res.cloudinary.com/dhnkojapo/video/upload/v1730321490/samples/cld-sample-video.mp4",
      comments: "Este es un video de ropa de alta calidad",
      store: { name: "De ropa", address: "Calle 123, Ciudad" },
    },
    {
      id: 6,
      title: "Video de zapatos",
      category: "Zapatos",
      url: "https://res.cloudinary.com/dhnkojapo/video/upload/v1730321490/samples/cld-sample-video.mp4",
      comments: "Este es un video de zapatos de moda",
      store: { name: "De zapatos", address: "Calle 456, Ciudad" },
    },
  ];

  return (
    <div className="grid">
      {videos.map((video) => (
        <div key={video.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <video src={video.url} controls className="w-full h-40 object-cover" autoPlay />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{video.title}</h2>
            <p className="text-gray-600 dark:text-gray-300">Categoría: {video.category}</p>
            <p className="text-gray-600 dark:text-gray-300"> {video.comments}</p>
            <p className="text-gray-600 dark:text-gray-300">Tienda: {video.store.name} - {video.store.address}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;
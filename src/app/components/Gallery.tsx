import { tailspin } from "ldrs";
import React from "react";

tailspin.register();
type GalleryProps = {
  photos: {
    id: string;
    urls: { small: string };
    alt_description: string;
    likes: number;
    user: { username: string; profile_image: { small: string } };
  }[];
  query: string;
};

export default function Gallery({ photos, query }: GalleryProps) {
  if (!photos || photos.length === 0) {
    return (
      <div className="flex items-center justify-center py-4">
        {React.createElement("l-tailspin", {
          size: "40",
          stroke: "5",
          speed: "0.9",
          color: "#0070f3",
        })}
      </div>
    );
  }
  return (
    <div className="py-4 sm:px-30 px-8">
      <p className="text-2xl mb-8">
        Showing results for{" "}
        <span className="font-semibold border-b border-dotted capitalize">
          {query}
        </span>
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div
            className="overflow-hidden sm:h-[250px] h-[280px] rounded-lg object-cover object-top shadow-sm relative border border-[#CCCCCC]"
            key={photo.id}
          >
            <div className="absolute right-2 top-2 flex items-center gap-6 justify-center bg-white rounded-full text-[10px] w-12 h-6 z-1000">
              ❤️ {photo?.likes}
            </div>
            <img
              src={photo.urls.small}
              alt={photo.alt_description}
              className="w-full h-[75%] z-1"
            />
            <div className="p-5 h-[25%] bg-[#F4F4F5] flex justify-between items-center">
              <img
                src={photo.user.profile_image.small}
                alt={photo.user.username}
                className="w-10 h-10 rounded-full"
              />
              <p className="text-[12px]">{photo.user.username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

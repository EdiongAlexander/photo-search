"use client";

import { tailspin } from "ldrs";
import React, { useEffect, useState } from "react";

type Photo = {
  id: string;
  urls: { small: string };
  alt_description: string;
  likes: number;
  user: { username: string; profile_image: { small: string } };
};

type GalleryProps = {
  photos: Photo[];
  query: string;
};

export default function Gallery({ photos, query }: GalleryProps) {
  const [loadingImages, setLoadingImages] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      tailspin.register();
    }
  }, []);

  const handleImageLoad = (id: string) => {
    setLoadingImages((prev) => ({ ...prev, [id]: false }));
  };

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
            key={photo.id}
            className="overflow-hidden rounded-lg shadow-sm border border-[#CCCCCC] bg-[#F4F4F5] relative"
          >
            <div className="absolute right-2 top-2 flex items-center gap-6 justify-center bg-white rounded-full text-[10px] w-12 h-6 z-1000">
              ❤️ {photo?.likes}
            </div>

            <div className="relative w-full min-h-[200px] aspect-[4/3] bg-[#F4F4F5]">
              {loadingImages[photo.id] !== false && (
                <div className="absolute inset-0 w-full h-full bg-[#F4F4F5] animate-pulse"></div>
              )}

              <img
                src={photo.urls.small}
                alt={photo.alt_description || "Photo"}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                onLoad={() => handleImageLoad(photo.id)}
                onError={(e) => (e.currentTarget.style.opacity = "0")}
              />
            </div>

            <div className="p-4 flex items-center gap-3">
              <img
                src={photo.user.profile_image.small}
                alt={photo.user.username}
                className="w-10 h-10 rounded-full"
              />
              <p className="text-sm">{photo.user.username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

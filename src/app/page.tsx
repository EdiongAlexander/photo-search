"use client";

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Gallery from "./components/Gallery";
import { tailspin } from "ldrs";


export default function Home() {
  const [query, setQuery] = useState("London");
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    async function fetchPhotos() {
      setLoading(true);
      const res = await fetch(`/api/search?query=${query}&page=${page}`);
      const data = await res.json();

      setPhotos((prevPhotos) =>
        page === 1 ? data.results : [...prevPhotos, ...data.results]
      );

      setLoading(false);
    }

    fetchPhotos();
  }, [query, page]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      tailspin.register();
    }
  }, []);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
    setPhotos([]);
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header onSearch={handleSearch} />
      <Gallery photos={photos} query={query} />

      {photos.length > 0 && (
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={loading}
          className="w-[90px] sm:py-2 mb-20 text-sm border border-[#CCCCCC] border-1 font-bold rounded-[8px] hover:bg-gray-50 cursor-pointer transition"
        >
           {loading
            ? React.createElement("l-tailspin", {
                size: "20",
                stroke: "4",
                speed: "0.9",
                color: "#0070f3",
              })
            : "Load More"}
        </button>
      )}
    </div>
  );
}

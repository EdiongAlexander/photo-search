"use client";

import { useState } from "react";

type HeaderProps = {
  onSearch: (query: string) => void;
};

export default function Header({ onSearch }: HeaderProps) {
  const [inputValue, setInputValue] = useState("");

  return (
    <header className="bg-[#F4F4F5] w-full py-20 sm:px-30 px-8">
      <div className="flex sm:flex-row flex-col items-center sm:justify-between">
        <h5 className="text-2xl font-bold font-pacifico">PhotoSearch.</h5>
        <p>
          {`${new Date().toLocaleDateString("en-US", {
            weekday: "long",
          })}, ${new Date().toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })}`}
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(inputValue);
        }}
        className="mt-20 w-full flex gap-4"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border border-[#CCCCCC] py-1.5 px-2 rounded-md w-[90%] outline-[#2563EB] bg-[#FFFFFF]"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-1.5 rounded-md transition-opacity font-semibold text-sm hover:bg-blue-500 cursor-pointer"
        >
          Search
        </button>
      </form>
    </header>
  );
}

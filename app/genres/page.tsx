"use client";
import Button from "@/components/button";
import { useRouter } from "next/navigation";

const Genres = () => {
  const router = useRouter();

  return (
    <div
      className="h-fit
      flex
      justify-center
          bg-gradient-to-b
          from-emerald-800
          p-6"
    >
      <div>
        <h1 className="font-bold text-3xl text-center m-16">Your Genres</h1>
        <div className="flex justify-evenly flex-row w-full">
          <Button
            onClick={() => router.push("/genres/short_term")}
            className="bg-green-600 font-semibold text-xl m-9 text-white w-52"
          >
            Last 4 weeks
          </Button>
          <Button
            onClick={() => router.push("/genres/medium_term")}
            className="bg-green-600 font-semibold text-xl m-9 text-white w-52"
          >
            Last 6 months
          </Button>
          <Button
            onClick={() => router.push("/genres/long_term")}
            className="bg-green-600 font-semibold text-xl m-9 text-white w-52"
          >
            All time
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Genres;

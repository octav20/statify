"use client";
import Button from "@/components/button";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import React, { use, useEffect } from "react";

const Songs = () => {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);
  return (
    <div
      className="h-fit
      flex
      justify-center
          bg-gradient-to-b
          from-emerald-800
          p-6`"
    >
      <div>
        <h1 className="font-bold text-3xl text-center m-16">Your Songs</h1>
        <div className="flex justify-evenly flex-row w-full">
          <Button
            onClick={() => router.push("/songs/short_term")}
            className="bg-green-600 font-semibold text-xl m-9 text-white w-52"
          >
            Last 4 weeks
          </Button>
          <Button
            onClick={() => router.push("/songs/medium_term")}
            className="bg-green-600 font-semibold text-xl m-9 text-white w-52"
          >
            Last 6 months
          </Button>
          <Button
            onClick={() => router.push("/songs/long_term")}
            className="bg-green-600 font-semibold text-xl m-9 text-white w-52"
          >
            All time
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Songs;

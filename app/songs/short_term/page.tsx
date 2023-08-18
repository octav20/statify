"use client";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SongsContainer from "../components/songs-container";

const ShortTerm = () => {
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
        <h1 className="font-bold text-3xl text-center m-16">
          Your Songs (Last 4 weeks)
        </h1>

        <SongsContainer />
      </div>
    </div>
  );
};

export default ShortTerm;

"use client";
import axios from "axios";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
const Home = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const spotyCode = searchParams.get("code");
    if (spotyCode) {
      autenticateUser(spotyCode);
    }
  }, []);

  const autenticateUser = (spotyCode: string) => {
    try {
      const searchParams = new URLSearchParams();

      searchParams.append("code", spotyCode);
      searchParams.append("grant_type", "authorization_code");
      searchParams.append(
        "redirect_uri",
        process.env.NEXT_PUBLIC_REDIRECT_URI || ""
      ); // Ensure not undefined
      searchParams.append("client_id", process.env.NEXT_PUBLIC_CLIENT_ID || ""); // Ensure not undefined
      searchParams.append(
        "client_secret",
        process.env.NEXT_PUBLIC_CLIENT_SECRET || ""
      );
      axios
        .post("https://accounts.spotify.com/api/token", searchParams)
        .then((res) => {
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("refresh_token", res.data.refresh_token);
          router.push("/songs/short_term");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex justify-center h-fit
          bg-gradient-to-b
          from-emerald-800
          p-6`"
    >
      <h2 className="mt-48 font-medium align-middle text-3xl text-center w-2/3">
        Unlock the Numbers Behind Your Music! Welcome to Statify, where your
        playlists turn into statistics. Log in to explore your musical journey
        from an entirely new perspective.
      </h2>
    </div>
  );
};

export default Home;

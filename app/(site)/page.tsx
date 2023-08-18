"use client";
import useUser from "@/hooks/useUser";
import axios from "axios";
import Image from "next/image";

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
  });

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
          router.push("/");
        });
    } catch (error) {
      console.log(error);
    }
  };
  const user = useUser();

  if (user) {
    console.log("Hay usuario");
  } else {
    console.log("No hay usuario");
  }

  // const getUsuario = () => {
  //   if (typeof window !== "undefined") {
  //     window.localStorage.getItem("access_token");
  //     const token = window.localStorage.getItem("access_token");
  //     if (token) {
  //       axios
  //         .get("https://api.spotify.com/v1/me", {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         })
  //         .then((response) => {
  //           const nombre = response.data;
  //           console.log(nombre);
  //         });
  //     } else {
  //       console.log("No hay token");
  //     }
  //   }
  // };
  // getUsuario();
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

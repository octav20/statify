"use client";
import { MainNav } from "@/components/main-nav";
import { useRouter } from "next/navigation";
import Button from "./button";
import Link from "next/link";
import { useEffect, useState } from "react";
const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState<boolean>();
  const spoty_url = `https://accounts.spotify.com/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&scope=${process.env.NEXT_PUBLIC_SCOPES}`;
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("access_token");
      if (token) {
        setUser(true);
      } else {
        setUser(false);
      }
    }
  }, []);
  function login() {
    router.push(spoty_url);
  }
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/" className="text-2xl font-bold m-10">
          Statify
        </Link>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          {user ? (
            <Button onClick={() => {}} className="bg-white px-6 py-2">
              Logout
            </Button>
          ) : (
            <Button
              onClick={login}
              className="
                          bg-white
                         px-6
                          py-2"
            >
              Log in
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

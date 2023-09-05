"use client";
import { MainNav } from "@/components/main-nav";
import Button from "./button";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import useUser from "@/hooks/useUser";
const Navbar = () => {
  const user = useUser();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/" className="text-2xl font-bold m-10">
          Statify
        </Link>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          {user ? (
            <Button onClick={() => signOut()} className="bg-white px-6 py-2">
              Logout
            </Button>
          ) : (
            <Button
              onClick={() =>
                signIn("spotify", { callbackUrl: "/songs/short_term" })
              }
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

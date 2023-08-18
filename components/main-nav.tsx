"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/songs`,
      label: "Your songs",
      active: [
        "/songs",
        "/songs/short_term",
        "/songs/medium_term",
        "/songs/long_term",
      ].find((path: string) => pathname === path),
    },
    {
      href: `/artists`,
      label: "Your artists",
      active: [
        "/artists",
        "/artists/short_term",
        "/artists/medium_term",
        "/artists/long_term",
      ].find((path: string) => pathname === path),
    },
    {
      href: `/genres`,
      label: "Your genres",
      active: [
        "/genres",
        "/genres/short_term",
        "/genres/medium_term",
        "/genres/long_term",
      ].find((path: string) => pathname === path),
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-lg font-medium transition-colors hover:text-white",
            route.active ? "text-black dark:text-white " : "text-gray-400"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}

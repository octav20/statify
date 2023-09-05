"use client";
import { SessionProvider } from "next-auth/react";
interface SessionProviderWrapperProps {
  children: React.ReactNode;
}
const SessionProviderWrapper: React.FC<SessionProviderWrapperProps> = ({
  children,
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviderWrapper;

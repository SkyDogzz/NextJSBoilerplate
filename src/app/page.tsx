"use client"
import React from "react";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    console.log("User is logged in", session);
  }

  return <div>{status === "authenticated" ? "Logged in" : "Not logged in"}</div>;
};

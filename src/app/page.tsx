"use client"
import { useSession } from "next-auth/react"

export default function HomePage() {
  const { data: session } = useSession()

  return (
    <div className="text-black dark:text-white">
      <h1 className="text-center text-8xl font-bold">Home Page</h1>
      {session ? (
        <p className="text-center text-xl">Signed in as {session.user.email}</p>
      ) : (
        <p className="text-center text-xl">Not signed in</p>
      )}
    </div>
  )
};

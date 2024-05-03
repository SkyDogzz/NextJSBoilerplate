"use client"
import { useSession } from "next-auth/react"

export default function HomePage() {
  const { data: session } = useSession()

  return (
    <div>
      <h1>Home Page</h1>
      {session ? (
        <p>Signed in as {session.user.email}</p>
      ) : (
        <p>Not signed in</p>
      )}
    </div>
  )
};

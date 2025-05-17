'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()

  if (!session) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h2>Nu ești logat</h2>
        <button onClick={() => signIn('google')} style={{ padding: '10px 20px', fontSize: 16 }}>
          Login cu Google
        </button>
      </div>
    )
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Bun venit, {session.user?.name}!</h2>
      <p>Email: {session.user?.email}</p>
      <button onClick={() => signOut()} style={{ padding: '10px 20px', fontSize: 16 }}>
        Logout
      </button>
    </div>
  )
}

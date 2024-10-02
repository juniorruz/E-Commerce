import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "content-type": "application/json" },
          },
        )

        const user = await res.json()
        if (res.ok && user) {
          return user
        }
        return null
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any
      return session
    },
  },

  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    newUser: "/auth/signup",
  },

  secret: process.env.NEXTAUTH_SECRET,
}

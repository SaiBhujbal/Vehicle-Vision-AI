import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        token.id = user.id
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id as string
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

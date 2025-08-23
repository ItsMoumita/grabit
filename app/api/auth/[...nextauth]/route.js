import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise, { getDb } from "@/lib/mongodb";
import { compare } from "bcryptjs";

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise, { databaseName: "grabitdb" }), // <- enforce DB
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const db = await getDb();
        const user = await db.collection("users").findOne({ email: credentials.email.toLowerCase() });
        if (!user?.password) return null;
        const ok = await compare(credentials.password, user.password);
        if (!ok) return null;
        return { id: user._id.toString(), name: user.name || "", email: user.email };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.uid = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token?.uid) {
        session.user = session.user || {};
        session.user.id = token.uid;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
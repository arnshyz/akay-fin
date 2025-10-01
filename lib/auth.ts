import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export const { auth, handlers, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [Credentials({
    name:"Email & Password", credentials:{ email:{}, password:{} },
    async authorize(c){
      const email = String(c?.email || ""); const pass = String(c?.password || "");
      const user = await prisma.user.findUnique({ where:{ email } }); if(!user) return null;
      const ok = await bcrypt.compare(pass, user.password); if(!ok) return null;
      return { id:user.id, name:user.name, email:user.email, role:user.role };
    }
  })],
  callbacks: {
    async jwt({ token, user }) { if(user) (token as any).role = (user as any).role; return token; },
    async session({ session, token }) { (session as any).role = (token as any).role; if(session.user) (session.user as any).id = token.sub; return session; }
  }
});

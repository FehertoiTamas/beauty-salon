import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_HASHED_PASSWORD = "$2b$10$i8Rg6VMhMGKDX809b51LMO37kxf3tV2sNXYkISIHtF3Wi95fg0cTe";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        // Ellenőrizzük az emailt
        if (credentials.email !== ADMIN_EMAIL) {
          throw new Error("Invalid email or password");
        }

        // Ellenőrizzük a jelszót bcrypttel
        const isValid = await compare(credentials.password, ADMIN_HASHED_PASSWORD);
        if (!isValid) {
          throw new Error("Invalid email or password");
        }

        // Ha minden rendben, visszaadjuk az admin user adatait
        return { id: "1", name: "Admin", email: credentials.email, isAdmin: true };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.isAdmin = token.isAdmin;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

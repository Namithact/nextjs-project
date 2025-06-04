
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
const ADMIN_EMAILS = ["admin@example.com", "namithasanu48@gmail.com"];
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        
        if (
          credentials.email === "admin@example.com" &&
          credentials.password === "admin123"
        ) {
          return {
            id: 1,
            name: "Admin",
            email: "admin@example.com",
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session }) {
      session.isAdmin=ADMIN_EMAILS.includes(session.user.email);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

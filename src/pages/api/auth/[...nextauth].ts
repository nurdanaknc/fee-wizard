import axios from "axios";
import * as https from "https";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const httpsAgent = new https.Agent({
  rejectUnauthorized: true,
});

console.log(process.env.NEXT_PUBLIC_API_URL, "api url");

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60, // 1 saat
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const response = await axios.post(
            "/users/login",
            {
              email: credentials?.email,
              password: credentials?.password,
            },
            {
              httpsAgent,
              baseURL: process.env.NEXT_PUBLIC_API_URL,
            }
          );

          const user = response.data;
          console.log(user, "user");

          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt(jwtProps: any) {
      const { token, user } = jwtProps;
      
      if (user?.access_token) {
        token.accessToken = user.access_token;
      }

      return token;
    },
    async session(sessionProps: any) {
      const { session, token } = sessionProps;
      console.log(token.accessToken, "token");
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      } else {
        session.error = "Access token is missing";
      }

      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      if (user) {
        return true;
      } else {
        return '/error';
      }
    }
  },
};

export default NextAuth(authOptions);

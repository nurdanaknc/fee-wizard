import axios from "axios";
import * as https from "https";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // Set to false for testing
});

console.log(process.env.NEXT_PUBLIC_API_URL, "API URL");

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60, // 1 hour
  },
  pages: {
    signIn: "/login",
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

          console.log(response.data, "response data"); // Log response data for debugging
          const user = response.data;
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
        token.user_id = user.user._id;
        token.email = user.user.email;
        token.fullname = user.user.fullname;
      }

      return token;
    },
    async session(sessionProps: any) {
      const { session, token } = sessionProps;
      if (token.accessToken) {
        session.accessToken = token.accessToken;
        session.user = {
          user_id: token.user_id,
          email: token.email,
          fullname: token.fullname,
        };
      } else {
        session.error = "Access token is missing";
      }

      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      if (user) {
        return true;
      } else {
        return "/error";
      }
    },
  },
};

export default NextAuth(authOptions);

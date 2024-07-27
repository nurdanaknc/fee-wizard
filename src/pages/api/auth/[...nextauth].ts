import axios from "axios";
import * as https from "https";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60, // 1 saat
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        //console.log(credentials, "asd")
        const user = await axios
          .post(
            "/auth/login",
            {
              password: credentials?.password,
              username: credentials?.username,
            },
            {
              httpsAgent,
              baseURL: process.env.NEXT_PUBLIC_API_URL,
            }
          )
          .catch((error) => {
            return error.response;
          });

        // STEP - 1
        if (user?.data) {
          return user.data;
        } else if (!user?.data) {
          throw new Error(JSON.stringify(user.data));
        }

        return null;
      },
    }),
 
    // ...add more providers here
  ],
  callbacks: {
    // STEP - 2 ve STEP - 3. Gelen user bilgileri jwt token a çevirlmeden önce obje tekrar customize ediliyor ardından jwt token a dönüştürülüyor.
    // Dönüştürüldükten sonra STEP - 3 olarak tetikleniyor.
    async jwt(jwtProps: any) {
      const { token, user } = jwtProps;
      
      if (user?.data) {
        token.accessToken = user.data;
        //localStorage.setItem("accessToken", token.accessToken || "");
       // console.log(user, "user blb")
      }
      //console.log(jwtProps, "jwtProps");
      //console.log(token.accessToken, "token access token 5" )
      return token;
    },
    // STEP - 4. Decode edilen token içerisindeki accessToken eklenerek session objesi clint a gönderiliyor.
    async session(sessionProps: any) {
      const { session, token } = sessionProps;
      session.accessToken = token.accessToken;

      console.log(session, "session");
      //console.log(sessionProps, "sessionProps blb");
      return session;
    },

  
  },
};

export default NextAuth(authOptions);
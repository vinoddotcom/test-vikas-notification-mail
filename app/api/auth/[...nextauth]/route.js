import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import LinkedInProvider from "next-auth/providers/linkedin";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET,
    // }),

    // LinkedInProvider({
    //   clientId: process.env.LINKEDIN_ID,
    //   clientSecret: process.env.LINKEDIN_SECRET,
    //   authorization: {
    //     params: {
    //       scope: "r_liteprofile r_emailaddress",
    //     },
    //   },
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },


  callbacks: {
    // Redirect to home page after sign in
    async redirect({ url, baseUrl }) {
      // After sign out, redirect to home
      if (url.includes("signout") || url.includes("logout")) {
        return baseUrl;
      }
      // After sign in, redirect to home
      if (url.startsWith(baseUrl)) {
        return baseUrl;
      }
      // Default: redirect to home
      return baseUrl;
    },
  },

  debug: true, // 👈 prod logs ke liye
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

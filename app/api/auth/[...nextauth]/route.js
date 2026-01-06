import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import LinkedInProvider from "next-auth/providers/linkedin";

export const authOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      authorization: {
        params: {
          scope: "public_profile email",
        },
      },
    }),

   LinkedInProvider({
  clientId: process.env.LINKEDIN_ID,
  clientSecret: process.env.LINKEDIN_SECRET,

  issuer: "https://www.linkedin.com/oauth",

  authorization: {
    params: {
      scope: "openid profile email",
    },
  },

  idToken: true,
  checks: ["pkce", "state"],
}),

  ],

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

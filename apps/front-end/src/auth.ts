import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    signIn: async ({ account }) => {
      if (account && account.provider && account.providerAccountId) {
        const { expires_in, ...accountData } = account;

        const response = await fetch(
          "http://localhost:3000/accounts/authorize",
          {
            method: "POST",
            body: JSON.stringify({
              ...accountData,
              expires_at: account.expires_at,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response);

        return true;
      }
    },
  },
});

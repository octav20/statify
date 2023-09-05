import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const scopes = [
  "user-read-email",
  "user-top-read",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-read-currently-playing",
  "user-modify-playback-state",
].join(",");

const params = {
  scope: scopes,
};

const LOGIN_URL =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams(params).toString();

async function refreshAccessToken(token: any) {
  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", token.refreshToken);

  const authString = `${process.env.NEXT_PUBLIC_CLIENT_ID}:${process.env.NEXT_PUBLIC_CLIENT_SECRET}`;
  const authBuffer = Buffer.from(authString, "utf8");
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${authBuffer.toString("base64")}`,
    },
    body: params,
  });
  const data = await response.json();
  console.log("Token renovado");
  return {
    ...token,
    accessToken: data.access_token,
    refreshToken: data.refresh_token ?? token.refreshToken,
    accessTokenExpires: Math.floor(Date.now() / 1000) + data.expires_in,
  };
}
export const authOptions = {
  // Configure one or more authentication providers

  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET || "",
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXT_PUBLIC_JWT_SECRET || "",
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, account }: any) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.token_expires_at;
        return token;
      } else if (
        token.accessTokenExpires &&
        Math.floor(Date.now() / 1000) < token.accessTokenExpires
      ) {
        return token;
      }
      return await refreshAccessToken(token);

      // if (
      //   token.accessTokenExpires &&
      //   Date.now() < token.accessTokenExpires * 1000
      // ) {
      //   return token;
      // }
      // return await refreshAccessToken(token);
    },
    async session({ session, token, user }: any) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

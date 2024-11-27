import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

// Mueve la configuración de `authOptions` aquí o a un archivo separado.
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

const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET || "",
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.NEXT_PUBLIC_JWT_SECRET || "",
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, account }: any) {
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
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

// Exporta los métodos HTTP GET y POST
export { handler as GET, handler as POST };

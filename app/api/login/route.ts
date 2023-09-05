// // /pages/api/spotify-auth.ts
// import { NextApiRequest, NextApiResponse } from "next";
// import { NextRequest, NextResponse } from "next/server";
// import querystring from "querystring";
// const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
// const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;
// const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
// const scopes =
//   "user-read-private user-read-email user-top-read playlist-read-private";

// export default async function GET(
//   req: Request,
//   res: Response
// ) {
//     const {searchParams} = new URL(req.url)
//     const authorizationCode = searchParams.get('code')
//     const authHeader = `Basic ${Buffer.from(
//       `${clientId}:${clientSecret}`
//     ).toString("base64")}`;

//     const tokenResponse = await fetch(
//       "https://accounts.spotify.com/api/token",
//       {
//         method: "POST",
//         headers: {
//           Authorization: authHeader,
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: querystring.stringify({
//           grant_type: "authorization_code",
//           code: authorizationCode,
//           redirect_uri: redirectUri,
//           scopes: scopes,
//         }),
//       }
//     );

//     if (tokenResponse.ok) {
//       const tokenData = await tokenResponse.json();

//         return new Response("token", {
//           status: 200,
//           headers: {
//               "Set-Cookie": [`access_token=${tokenData.access_token}`, `refresh_token=${tokenData.refresh_token}`],

//           },
//         });
//     } else {
//       return NextResponse
//         .json({ status:tokenResponse.status });
//     }
// }

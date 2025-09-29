export async function GET(req) {
    return new Response("Cookie cleared!", {
    headers: {
      "Set-Cookie": `token=; Path=/; Max-Age=0`,
    },
  });
}
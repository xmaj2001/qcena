import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/bookings?${searchParams.toString()}`;
  console.log(baseUrl);
  const res = await fetch(baseUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: request.headers.get("Cookie") || "",
    },
    credentials: "include",
  });
  const data = await res.json();
  return NextResponse.json(data);
}

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/services?${searchParams.toString()}`;

  const services = await fetch(backendUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const res = await services.json();
  return NextResponse.json(res);
}

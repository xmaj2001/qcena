import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/bookings/service/${id}`;
  const res = await fetch(backendUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: req.headers.get("Cookie") || "",
    },
    credentials: "include",
  });
  const data = await res.json();
  return NextResponse.json(data);
}

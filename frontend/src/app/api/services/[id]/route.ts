import { NextRequest, NextResponse } from "next/server";
import { generateMockServices } from "@/server/services/mocks/service.mock";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return NextResponse.json(data);
}

import { NextResponse } from "next/server";
import { generateMockServices } from "@/server/services/mocks/service.mock";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const data = generateMockServices(100);
  return NextResponse.json({
    success: true,
    data: data,
    ts: new Date().toISOString(),
  });
}

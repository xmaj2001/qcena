import { generateMockServices } from "@/modules/services/mocks/service.mock";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  eq: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const data = generateMockServices(100).find((service) => service.id === id);
  return NextResponse.json({
    success: true,
    data: data,
    ts: new Date().toISOString(),
  });
}

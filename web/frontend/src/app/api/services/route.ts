import { NextResponse } from "next/server";
import { generateMockServices } from "@/server/services/mocks/service.mock";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: generateMockServices(100),
    ts: new Date().toISOString(),
  });
}

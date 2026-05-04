import { NextResponse } from "next/server";
import { generateMockServices } from "@/modules/services/mocks/service.mock";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: generateMockServices(10),
    ts: new Date().toISOString(),
  });
}

import { NextResponse } from "next/server";
import { COLLECTIONS } from "@/server/services/constant";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: COLLECTIONS,
    ts: new Date().toISOString(),
  });
}

import { COLLECTIONS } from "@/modules/services/constant";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: COLLECTIONS,
    ts: new Date().toISOString(),
  });
}

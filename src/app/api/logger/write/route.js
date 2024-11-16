import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
export async function POST(req) {
  try {
    const body = await req.json();
    const { action, data } = body;

    if (!action || !data) {
      return NextResponse.json({
        success: false,
        error: "Invalid payload: 'action' and 'data' are required",
      });
    }

    const logPath = path.join(process.cwd(), "public", "log", action + ".txt");
    const logDir = path.dirname(logPath);
    const logData = { action, data, timestamp: new Date().toISOString() };

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    const formattedLog = JSON.stringify(logData, null, 2);

    fs.appendFileSync(logPath, formattedLog + "\n");

    return NextResponse.json({ success: true, message: "Log saved successfully" });
  } catch (error) {
    console.error("Error saving log:", error);
    return NextResponse.json({ success: false, error: "Failed to save log" });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { mockAPI } from "@/lib/api/mock-api";

/**
 * GET /api/models
 * Fetch all available AI models
 */
export async function GET(request: NextRequest) {
  try {
    const response = await mockAPI.getModels();

    if (response.success) {
      return NextResponse.json(
        {
          success: true,
          data: response.data,
          message: response.message,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: response.error,
          message: response.message,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in GET /api/models:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: "Failed to fetch models",
      },
      { status: 500 }
    );
  }
}

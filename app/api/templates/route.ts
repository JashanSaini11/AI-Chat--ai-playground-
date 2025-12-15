import { NextRequest, NextResponse } from "next/server";
import { mockAPI } from "@/lib/api/mock-api";

/**
 * GET /api/templates
 * Fetch all templates or search templates
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");
    const id = searchParams.get("id");

    // Get specific template by ID
    if (id) {
      const response = await mockAPI.getTemplateById(id);

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
          { status: 404 }
        );
      }
    }

    // Search templates
    if (query) {
      const response = await mockAPI.searchTemplates(query);

      if (response.success) {
        return NextResponse.json(
          {
            success: true,
            data: response.data,
            message: response.message,
          },
          { status: 200 }
        );
      }
    }

    // Get all templates
    const response = await mockAPI.getTemplates();

    if (response.success) {
      return NextResponse.json(
        {
          success: true,
          templates: response.data,
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
    console.error("Error in GET /api/templates:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: "Failed to fetch templates",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/templates
 * Create a new template
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, prompt, description } = body;

    // Validation
    if (!name || !prompt) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation error",
          message: "Name and prompt are required",
        },
        { status: 400 }
      );
    }

    const response = await mockAPI.saveTemplate(name, prompt, description);

    if (response.success) {
      return NextResponse.json(
        {
          success: true,
          template: response.data,
          message: response.message,
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: response.error,
          message: response.message,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error in POST /api/templates:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: "Failed to create template",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/templates
 * Update an existing template
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, prompt, description } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation error",
          message: "Template ID is required",
        },
        { status: 400 }
      );
    }

    const updates: any = {};
    if (name) updates.name = name;
    if (prompt) updates.prompt = prompt;
    if (description !== undefined) updates.description = description;

    const response = await mockAPI.updateTemplate(id, updates);

    if (response.success) {
      return NextResponse.json(
        {
          success: true,
          template: response.data,
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
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error in PUT /api/templates:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: "Failed to update template",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/templates
 * Delete a template
 */
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation error",
          message: "Template ID is required",
        },
        { status: 400 }
      );
    }

    const response = await mockAPI.deleteTemplate(id);

    if (response.success) {
      return NextResponse.json(
        {
          success: true,
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
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error in DELETE /api/templates:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: "Failed to delete template",
      },
      { status: 500 }
    );
  }
}

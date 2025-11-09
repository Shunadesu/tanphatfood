import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000/api'

// GET /api/quotes/[id] - Get quote by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const url = `${BACKEND_URL}/quotes/${id}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Lỗi khi lấy thông tin yêu cầu báo giá',
        error: error.message,
      },
      { status: 500 }
    )
  }
}

// PUT /api/quotes/[id] - Update quote
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const response = await fetch(`${BACKEND_URL}/quotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Lỗi khi cập nhật yêu cầu báo giá',
        error: error.message,
      },
      { status: 500 }
    )
  }
}

// DELETE /api/quotes/[id] - Delete quote
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const response = await fetch(`${BACKEND_URL}/quotes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Lỗi khi xóa yêu cầu báo giá',
        error: error.message,
      },
      { status: 500 }
    )
  }
}


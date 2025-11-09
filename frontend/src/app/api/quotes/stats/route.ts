import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000/api'

// GET /api/quotes/stats - Get quote statistics
export async function GET(request: NextRequest) {
  try {
    const url = `${BACKEND_URL}/quotes/stats`

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
        message: 'Lỗi khi lấy thống kê',
        error: error.message,
      },
      { status: 500 }
    )
  }
}


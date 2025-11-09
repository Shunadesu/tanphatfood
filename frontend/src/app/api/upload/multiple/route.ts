import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000/api'

// POST /api/upload/multiple - Upload multiple images
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const searchParams = request.nextUrl.searchParams
    const folder = searchParams.get('folder')
    
    const url = folder
      ? `${BACKEND_URL}/upload/multiple?folder=${folder}`
      : `${BACKEND_URL}/upload/multiple`

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Lỗi khi upload ảnh',
        error: error.message,
      },
      { status: 500 }
    )
  }
}


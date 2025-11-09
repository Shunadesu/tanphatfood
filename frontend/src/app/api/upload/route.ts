import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000/api'

// POST /api/upload - Upload image
// Forward multipart/form-data directly to backend without parsing
export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const folder = searchParams.get('folder')
    
    const url = folder
      ? `${BACKEND_URL}/upload?folder=${folder}`
      : `${BACKEND_URL}/upload`

    // Get Content-Type header (includes boundary)
    const contentType = request.headers.get('content-type')
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid content type. Expected multipart/form-data',
        },
        { status: 400 }
      )
    }

    // Get the raw body as ArrayBuffer
    const body = await request.arrayBuffer()
    
    // Forward the raw body directly to backend
    // This preserves the multipart/form-data format with boundary
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': contentType, // This includes the boundary
      },
      body: body,
    })

    // Get response text first to check if it's JSON
    const responseText = await response.text()
    
    let data
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      // If response is not JSON, return error with text
      console.error('Backend response (not JSON):', responseText)
      console.error('Response status:', response.status)
      console.error('Response headers:', Object.fromEntries(response.headers.entries()))
      
      return NextResponse.json(
        {
          success: false,
          message: 'Lỗi khi upload ảnh: Backend trả về response không hợp lệ',
          error: responseText.substring(0, 500),
          status: response.status,
        },
        { status: response.status || 500 }
      )
    }
    
    // Forward the exact response from backend
    return NextResponse.json(data, { status: response.status })
  } catch (error: any) {
    console.error('Upload error:', error)
    console.error('Error stack:', error.stack)
    
    return NextResponse.json(
      {
        success: false,
        message: 'Lỗi khi upload ảnh',
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}


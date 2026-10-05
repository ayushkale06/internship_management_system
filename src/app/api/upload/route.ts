import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
  }

  // If no Blob token is present, fallback to local mock behavior
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.warn("MOCK UPLOAD: No Vercel Blob token found. Simulating upload.");
    return NextResponse.json({ 
      url: `/mock-uploads/${filename}`,
      mock: true
    });
  }

  if (!request.body) {
    return NextResponse.json({ error: 'Request body is empty' }, { status: 400 });
  }

  try {
    const blob = await put(filename, request.body, {
      access: 'public',
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error("Blob upload failed:", error);
    return NextResponse.json({ error: 'Failed to upload to cloud storage' }, { status: 500 });
  }
}

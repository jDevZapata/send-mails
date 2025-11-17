import { NextResponse } from 'next/server'

export async function GET() {
    const payload = {
        status: 'ok',
        message: 'All ok on server side',
    }

    return NextResponse.json(payload)
}
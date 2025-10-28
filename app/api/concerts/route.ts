import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// 全ての演奏会を取得（公開用）
export async function GET() {
  try {
    const concerts = await prisma.concert.findMany({
      include: {
        images: true,
      },
      orderBy: {
        concertNumber: 'desc',
      },
    });

    const response = NextResponse.json(concerts);
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120');
    return response;
  } catch (error) {
    console.error('Error fetching concerts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch concerts' },
      { status: 500 }
    );
  }
}

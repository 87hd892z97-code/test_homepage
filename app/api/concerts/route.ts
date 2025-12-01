import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// 全ての演奏会を取得（公開用）
export async function GET() {
  try {
    // Prismaが利用可能かチェック
    if (!prisma) {
      console.error('Prisma client is not initialized. Check USE_PRISMA environment variable.');
      return NextResponse.json(
        { error: 'Database connection not available. Please check USE_PRISMA environment variable.' },
        { status: 503 }
      );
    }

    const concerts = await (prisma as any).concert.findMany({
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('Error details:', { message: errorMessage, stack: errorStack });
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch concerts',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}

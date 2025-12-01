import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

// 過去の演奏会を取得
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
      where: {
        status: 'completed',
      },
      include: {
        images: true,
      },
      orderBy: {
        concertNumber: 'desc',
      },
    });

    return NextResponse.json(concerts);
  } catch (error) {
    console.error('Error fetching past concerts:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('Error details:', { message: errorMessage, stack: errorStack });
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch past concerts',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}


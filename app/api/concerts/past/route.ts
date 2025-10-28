import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

// 過去の演奏会を取得
export async function GET() {
  try {
    const concerts = await prisma.concert.findMany({
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
    return NextResponse.json(
      { error: 'Failed to fetch past concerts' },
      { status: 500 }
    );
  }
}


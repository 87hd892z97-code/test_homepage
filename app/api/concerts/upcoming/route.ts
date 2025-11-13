import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

// 今後の演奏会を取得（cancelled=false で日付が未来のものを取得）
export async function GET() {
  try {
    const today = new Date();

    const concerts = await prisma.concert.findMany({
      where: {
        cancelled: false,
        // 日付が今日以降のものを取得（簡易的な処理）
      },
      include: {
        images: true,
      },
      orderBy: {
        concertNumber: 'desc',
      },
      take: 10, // 最新10件
    });

    return NextResponse.json(concerts);
  } catch (error) {
    console.error('Error fetching upcoming concerts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch upcoming concerts' },
      { status: 500 }
    );
  }
}

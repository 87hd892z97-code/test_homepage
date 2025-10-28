import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

// GET: 全ての演奏会を取得
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

    return NextResponse.json(concerts);
  } catch (error) {
    console.error('Error fetching concerts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch concerts' },
      { status: 500 }
    );
  }
}

// POST: 新しい演奏会を作成
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const concert = await prisma.concert.create({
      data: {
        concertNumber: data.concertNumber,
        date: data.date,
        venue: data.venue,
        conductor: data.conductor,
        cancelled: data.cancelled || false,
        status: data.status,
        chorus: data.chorus,
        soprano: data.soprano,
        soprano2: data.soprano2,
        mezzoSoprano: data.mezzoSoprano,
        alto: data.alto,
        tenor: data.tenor,
        bassBaritone: data.bassBaritone,
        soloist: data.soloist,
        soloistInstrument: data.soloistInstrument,
        ticketUrl: data.ticketUrl,
        pieces: data.pieces || [],
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(concert, { status: 201 });
  } catch (error) {
    console.error('Error creating concert:', error);
    return NextResponse.json(
      { error: 'Failed to create concert' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

// GET: 特定の演奏会を取得
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const concert = await prisma.concert.findUnique({
      where: { id: parseInt(id) },
      include: {
        images: true,
      },
    });

    if (!concert) {
      return NextResponse.json(
        { error: 'Concert not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(concert);
  } catch (error) {
    console.error('Error fetching concert:', error);
    return NextResponse.json(
      { error: 'Failed to fetch concert' },
      { status: 500 }
    );
  }
}

// PUT: 演奏会を更新
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();

    const concert = await prisma.concert.update({
      where: { id: parseInt(id) },
      data: {
        concertNumber: data.concertNumber,
        date: data.date,
        venue: data.venue,
        conductor: data.conductor,
        cancelled: data.cancelled,
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

    return NextResponse.json(concert);
  } catch (error) {
    console.error('Error updating concert:', error);
    return NextResponse.json(
      { error: 'Failed to update concert' },
      { status: 500 }
    );
  }
}

// DELETE: 演奏会を削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.concert.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Concert deleted successfully' });
  } catch (error) {
    console.error('Error deleting concert:', error);
    return NextResponse.json(
      { error: 'Failed to delete concert' },
      { status: 500 }
    );
  }
}

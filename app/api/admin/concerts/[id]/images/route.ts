import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!prisma) {
      return NextResponse.json({ error: 'Database connection not available.' }, { status: 503 });
    }

    const concertId = Number(params.id);
    const concertClient = prisma as any;

    const images = await concertClient.concertImage.findMany({
      where: { concertId },
      orderBy: [{ createdAt: 'desc' }],
    });

    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching concert images:', error);
    return NextResponse.json({ error: '画像の取得に失敗しました' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!prisma) {
      return NextResponse.json({ error: 'Database connection not available.' }, { status: 503 });
    }

    const concertId = Number(params.id);
    const { imagePath, imageType = 'poster', composerName } = await request.json();

    if (!imagePath || typeof imagePath !== 'string') {
      return NextResponse.json({ error: '画像パスは必須です' }, { status: 400 });
    }

    const concertClient = prisma as any;

    const image = await concertClient.concertImage.create({
      data: {
        concertId,
        imagePath,
        imageType,
        composerName,
      },
    });

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error('Error creating concert image:', error);
    return NextResponse.json({ error: '画像の追加に失敗しました' }, { status: 500 });
  }
}

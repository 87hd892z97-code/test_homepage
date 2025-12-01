import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!prisma) {
      return NextResponse.json(
        { error: 'Database connection not available.' },
        { status: 503 }
      );
    }

    const trainerId = Number(params.id);
    const trainerClient = prisma as any;

    const images = await trainerClient.trainerImage.findMany({
      where: { trainerId },
      orderBy: [{ isPrimary: 'desc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching trainer images:', error);
    return NextResponse.json(
      { error: '画像の取得に失敗しました' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!prisma) {
      return NextResponse.json(
        { error: 'Database connection not available.' },
        { status: 503 }
      );
    }

    const trainerId = Number(params.id);
    const { imagePath, isPrimary } = await request.json();

    if (!imagePath || typeof imagePath !== 'string') {
      return NextResponse.json({ error: '画像パスは必須です' }, { status: 400 });
    }

    const trainerClient = prisma as any;

    const image = await trainerClient.$transaction(async (tx: any) => {
      if (isPrimary) {
        await tx.trainerImage.updateMany({
          where: { trainerId },
          data: { isPrimary: false },
        });
      }

      return tx.trainerImage.create({
        data: {
          trainerId,
          imagePath,
          isPrimary: Boolean(isPrimary),
        },
      });
    });

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error('Error creating trainer image:', error);
    return NextResponse.json(
      { error: '画像の追加に失敗しました' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

async function verifyImageOwnership(trainerId: number, imageId: number) {
  const trainerClient = prisma as any;
  const image = await trainerClient.trainerImage.findUnique({ where: { id: imageId } });
  if (!image || image.trainerId !== trainerId) {
    return null;
  }
  return image;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; imageId: string } }
) {
  try {
    if (!prisma) {
      return NextResponse.json(
        { error: 'Database connection not available.' },
        { status: 503 }
      );
    }

    const trainerId = Number(params.id);
    const imageId = Number(params.imageId);
    const { imagePath, isPrimary } = await request.json();

    const trainerClient = prisma as any;
    const existing = await verifyImageOwnership(trainerId, imageId);
    if (!existing) {
      return NextResponse.json({ error: '画像が見つかりません' }, { status: 404 });
    }

    const updated = await trainerClient.$transaction(async (tx: any) => {
      const data: Record<string, unknown> = {};

      if (typeof imagePath === 'string') {
        data.imagePath = imagePath;
      }

      if (typeof isPrimary === 'boolean' && isPrimary) {
        await tx.trainerImage.updateMany({
          where: { trainerId },
          data: { isPrimary: false },
        });
        data.isPrimary = true;
      } else if (typeof isPrimary === 'boolean') {
        data.isPrimary = isPrimary;
      }

      return tx.trainerImage.update({
        where: { id: imageId },
        data,
      });
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating trainer image:', error);
    return NextResponse.json(
      { error: '画像の更新に失敗しました' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string; imageId: string } }
) {
  try {
    if (!prisma) {
      return NextResponse.json(
        { error: 'Database connection not available.' },
        { status: 503 }
      );
    }

    const trainerId = Number(params.id);
    const imageId = Number(params.imageId);
    const trainerClient = prisma as any;

    const existing = await verifyImageOwnership(trainerId, imageId);
    if (!existing) {
      return NextResponse.json({ error: '画像が見つかりません' }, { status: 404 });
    }

    await trainerClient.trainerImage.delete({ where: { id: imageId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting trainer image:', error);
    return NextResponse.json(
      { error: '画像の削除に失敗しました' },
      { status: 500 }
    );
  }
}

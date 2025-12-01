import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!prisma) {
      console.error('Prisma client is not initialized. Set USE_PRISMA=true and install @prisma/client.');
      return NextResponse.json(
        { error: 'Database connection not available. Please check server configuration.' },
        { status: 503 }
      );
    }

    const trainerClient = prisma as any;
    const trainerId = Number(params.id);
    const data = await request.json();

    const { imagePath, ...trainerData } = data;

    const trainer = await trainerClient.trainer.update({
      where: { id: trainerId },
      data: {
        name: trainerData.name,
        instrument: trainerData.instrument,
        title: trainerData.title,
        description: trainerData.description,
        order: trainerData.order ?? 0,
      },
      include: {
        images: {
          orderBy: [{ isPrimary: 'desc' }, { createdAt: 'desc' }],
        },
      },
    });

    let finalImagePath = trainer.images?.[0]?.imagePath ?? null;

    if (imagePath !== undefined) {
      if (imagePath) {
        await trainerClient.trainerImage.upsert({
          where: {
            trainerId_imagePath: {
              trainerId: trainer.id,
              imagePath,
            },
          },
          update: { isPrimary: true },
          create: {
            trainerId: trainer.id,
            imagePath,
            isPrimary: true,
          },
        });
        finalImagePath = imagePath;
      } else {
        await trainerClient.trainerImage.deleteMany({
          where: { trainerId: trainer.id },
        });
        finalImagePath = null;
      }
    }

    return NextResponse.json({
      ...trainer,
      imagePath: finalImagePath,
    });
  } catch (error) {
    console.error('Error updating trainer:', error);
    return NextResponse.json(
      { error: 'トレーナーの更新に失敗しました' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!prisma) {
      console.error('Prisma client is not initialized. Set USE_PRISMA=true and install @prisma/client.');
      return NextResponse.json(
        { error: 'Database connection not available. Please check server configuration.' },
        { status: 503 }
      );
    }

    const trainerClient = prisma as any;
    const trainerId = Number(params.id);

    await trainerClient.trainer.delete({
      where: { id: trainerId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting trainer:', error);
    return NextResponse.json(
      { error: 'トレーナーの削除に失敗しました' },
      { status: 500 }
    );
  }
}


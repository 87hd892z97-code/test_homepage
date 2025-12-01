import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    if (!prisma) {
      console.error('Prisma client is not initialized. Set USE_PRISMA=true and install @prisma/client.');
      return NextResponse.json(
        { error: 'Database connection not available. Please check server configuration.' },
        { status: 503 }
      );
    }

    const trainerClient = prisma as any;

    const trainers = await trainerClient.trainer.findMany({
      orderBy: [
        { instrument: 'asc' },
        { order: 'asc' },
        { name: 'asc' },
      ],
      include: {
        images: {
          orderBy: [{ isPrimary: 'desc' }, { createdAt: 'desc' }],
        },
      },
    });

    return NextResponse.json(
      trainers.map((trainer: any) => ({
        ...trainer,
        imagePath: trainer.images?.[0]?.imagePath ?? null,
      }))
    );
  } catch (error) {
    console.error('Error fetching trainers:', error);
    return NextResponse.json(
      { error: 'トレーナー情報の取得に失敗しました' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!prisma) {
      console.error('Prisma client is not initialized. Set USE_PRISMA=true and install @prisma/client.');
      return NextResponse.json(
        { error: 'Database connection not available. Please check server configuration.' },
        { status: 503 }
      );
    }

    const trainerClient = prisma as any;
    const data = await request.json();

    const { imagePath, ...trainerData } = data;

    const trainer = await trainerClient.trainer.create({
      data: {
        name: trainerData.name,
        instrument: trainerData.instrument,
        title: trainerData.title,
        description: trainerData.description,
        order: trainerData.order ?? 0,
      },
    });

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
    }

    return NextResponse.json(
      { ...trainer, imagePath: imagePath ?? null },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating trainer:', error);
    return NextResponse.json(
      { error: 'トレーナーの作成に失敗しました' },
      { status: 500 }
    );
  }
}


import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    if (!prisma) {
      console.error('Prisma client is not initialized. Set USE_PRISMA=true and install @prisma/client.');
      return NextResponse.json(
        { error: 'Database connection not available.' },
        { status: 503 }
      );
    }

    const trainers = await (prisma as any).trainer.findMany({
      orderBy: [
        { instrument: 'asc' },
        { order: 'asc' },
        { name: 'asc' },
      ],
      include: {
        images: {
          where: { isPrimary: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    const response = trainers.map((trainer: any) => ({
      id: trainer.id,
      name: trainer.name,
      instrument: trainer.instrument,
      title: trainer.title,
      description: trainer.description,
      order: trainer.order,
      createdAt: trainer.createdAt,
      updatedAt: trainer.updatedAt,
      imagePath: trainer.images?.[0]?.imagePath ?? null,
    }));

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching trainers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trainers' },
      { status: 500 }
    );
  }
}


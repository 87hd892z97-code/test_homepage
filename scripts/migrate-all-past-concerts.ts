const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting migration of all past concert data to database...\n');

  // 全過去の演奏会データをインポート
  const { getAllPastConcerts } = await import('../app/concerts/past/data.js');
  const concerts = getAllPastConcerts();

  console.log(`Found ${concerts.length} concerts to migrate\n`);

  let created = 0;
  let updated = 0;
  let skipped = 0;

  // 画像ファイルのマッピング
  const imageFiles = [
    { concertNumber: 113, imagePath: '/RegularConcertPoster/113RegularConcertPoster.jpg', imageType: 'poster' },
    { concertNumber: 115, imagePath: '/RegularConcertPoster/115RegularConcertPoster.jpg', imageType: 'poster' },
    { concertNumber: 117, imagePath: '/RegularConcertPoster/117RegularConcertPoster.jpg', imageType: 'poster' },
    { concertNumber: 118, imagePath: '/RegularConcertPoster/118RegularConcertPoster.jpg', imageType: 'poster' },
    { concertNumber: 119, imagePath: '/RegularConcertPoster/119RegularConcertPoster.png', imageType: 'poster' },
    { concertNumber: 120, imagePath: '/RegularConcertPoster/120RegularConcertPoster.JPG', imageType: 'poster' },
    { concertNumber: 121, imagePath: '/RegularConcertPoster/121RegularConcertPoster.jpg', imageType: 'poster' },
    { concertNumber: 122, imagePath: '/RegularConcertPoster/122RegularConcertPoster.jpg', imageType: 'poster' },
    { concertNumber: 123, imagePath: '/RegularConcertPoster/123RegularConcertPoster.jpg', imageType: 'poster' },
    { concertNumber: 124, imagePath: '/RegularConcertPoster/124RegularCocertPoster.jpg', imageType: 'poster' },
    { concertNumber: 125, imagePath: '/RegularConcertPoster/125RegularConcertPoster.jpg', imageType: 'poster' },
  ];

  for (const concert of concerts) {
    const concertNumberMatch = concert.concert.match(/\d+/);
    if (!concertNumberMatch) {
      console.log(`Skipping: ${concert.concert} (no concert number found)`);
      skipped++;
      continue;
    }

    const concertNumber = parseInt(concertNumberMatch[0]);

    if (concertNumber === 0) {
      console.log(`Skipping: ${concert.concert} (concert number is 0)`);
      skipped++;
      continue;
    }

    try {
      // コンサート情報を登録
      const existingConcert = await prisma.concert.findUnique({
        where: { concertNumber },
        include: { images: true },
      });

      const createdConcert = await prisma.concert.upsert({
        where: { concertNumber },
        update: {
          date: concert.date,
          venue: concert.venue,
          conductor: concert.conductor || null,
          studentConductor: concert.studentConductor || null,
          cancelled: concert.cancelled || false,
          chorus: concert.chorus || null,
          soprano: concert.soprano || null,
          soprano2: concert.soprano2 || null,
          mezzoSoprano: concert.mezzoSoprano || null,
          alto: concert.alto || null,
          tenor: concert.tenor || null,
          bassBaritone: concert.bassBaritone || null,
          soloist: concert.soloist || null,
          pieces: concert.pieces || [],
        },
        create: {
          concertNumber,
          date: concert.date,
          venue: concert.venue,
          conductor: concert.conductor || null,
          studentConductor: concert.studentConductor || null,
          cancelled: concert.cancelled || false,
          chorus: concert.chorus || null,
          soprano: concert.soprano || null,
          soprano2: concert.soprano2 || null,
          mezzoSoprano: concert.mezzoSoprano || null,
          alto: concert.alto || null,
          tenor: concert.tenor || null,
          bassBaritone: concert.bassBaritone || null,
          soloist: concert.soloist || null,
          pieces: concert.pieces || [],
        },
      });

      // 画像を登録（該当するものがあれば）
      const concertImage = imageFiles.find(img => img.concertNumber === concertNumber);
      if (concertImage) {
        await prisma.concertImage.upsert({
          where: {
            concertId_imagePath: {
              concertId: createdConcert.id,
              imagePath: concertImage.imagePath,
            },
          },
          update: {},
          create: {
            concertId: createdConcert.id,
            imagePath: concertImage.imagePath,
            imageType: concertImage.imageType,
          },
        });
      }

      if (existingConcert) {
        console.log(`✓ Updated concert ${concertNumber}`);
        updated++;
      } else {
        console.log(`✓ Created concert ${concertNumber}`);
        created++;
      }
    } catch (error) {
      console.error(`✗ Failed to migrate concert ${concertNumber}:`, error);
    }
  }

  console.log(`\n✓ Migration completed!`);
  console.log(`✓ Created: ${created} concerts`);
  console.log(`✓ Updated: ${updated} concerts`);
  console.log(`✗ Skipped: ${skipped} concerts`);
}

main()
  .catch((e) => {
    console.error('Migration error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

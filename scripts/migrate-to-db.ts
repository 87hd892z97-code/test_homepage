const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting migration of hardcoded concert data to database...\n');

  // 今後の演奏会データ
  const upcomingConcerts = [
    {
      concertNumber: 125,
      date: '2025年12月21日（日）',
      venue: 'カルッツかわさき ホール',
      conductor: '永峰大輔',
      pieces: ['マーラー：交響曲第1番「巨人」', 'ヴェルディ：「運命の力」序曲', 'J.シュトラウスⅡ世：ウィーンの森の物語'],
    },
  ];

  // 過去の演奏会データ（一部）
  const pastConcerts = [
    {
      concertNumber: 124,
      date: '2025年5月2日（金）',
      venue: 'きゅりあん(品川区立総合区民会館)',
      conductor: '栗原翼',
      pieces: ['シューマン：交響曲第3番「ライン」', 'シベリウス：交響詩「フィンランディア」', 'ビゼー：「カルメン」組曲より抜粋'],
    },
    {
      concertNumber: 123,
      date: '2024年12月29日（日）',
      venue: '横浜みなとみらいホール 大ホール',
      conductor: '佐々木新平',
      pieces: ['チャイコフスキー：交響曲第6番 ロ短調 作品74「悲愴」', 'チャイコフスキー：イタリア奇想曲 作品45', 'チャイコフスキー：バレエ組曲「くるみ割り人形」 作品71a'],
    },
    {
      concertNumber: 122,
      date: '2024年5月25日',
      venue: '大田区民ホール・アプリコ 大ホール',
      conductor: '和田 一樹',
      pieces: ['D.ショスタコーヴィチ：交響曲第5番', 'A.ボロディン：交響詩「中央アジアの草原にて」', 'A.ボロディン：楽劇「イーゴリ公」より韃靼人の踊り'],
    },
    {
      concertNumber: 121,
      date: '2023年12月24日',
      venue: 'よこすか芸術劇場',
      conductor: '佐々木 新平',
      pieces: ['チャイコフスキー：交響曲第5番 Op.64', 'J.シュトラウスⅡ世：喜歌劇「こうもり」序曲', 'ハチャトゥリアン：組曲「仮面舞踏会」'],
    },
  ];

  const imageFiles = [
    { concertNumber: 121, imagePath: '/RegularConcertPoster/121RegularConcertPoster.jpg' },
    { concertNumber: 122, imagePath: '/RegularConcertPoster/122RegularConcertPoster.jpg' },
    { concertNumber: 123, imagePath: '/RegularConcertPoster/123RegularConcertPoster.jpg' },
    { concertNumber: 124, imagePath: '/RegularConcertPoster/124RegularCocertPoster.jpg' },
  ];

  let created = 0;

  console.log('Creating upcoming concerts...');
  for (const concert of upcomingConcerts) {
    try {
      await prisma.concert.upsert({
        where: { concertNumber: concert.concertNumber },
        update: { ...concert, cancelled: false },
        create: { ...concert, cancelled: false },
      });
      console.log(`✓ Concert ${concert.concertNumber}`);
      created++;
    } catch (error) {
      console.error(`✗ Failed to create concert ${concert.concertNumber}:`, error);
    }
  }

  console.log('\nCreating past concerts...');
  for (const concert of pastConcerts) {
    try {
      const createdConcert = await prisma.concert.upsert({
        where: { concertNumber: concert.concertNumber },
        update: { ...concert, cancelled: false },
        create: { ...concert, cancelled: false },
      });

      // Add image if available
      const image = imageFiles.find(img => img.concertNumber === concert.concertNumber);
      if (image) {
        await prisma.concertImage.upsert({
          where: {
            concertId_imagePath: {
              concertId: createdConcert.id,
              imagePath: image.imagePath,
            },
          },
          update: {},
          create: {
            concertId: createdConcert.id,
            imagePath: image.imagePath,
            imageType: 'poster',
          },
        });
      }

      console.log(`✓ Concert ${concert.concertNumber}`);
      created++;
    } catch (error) {
      console.error(`✗ Failed to create concert ${concert.concertNumber}:`, error);
    }
  }

  console.log(`\n✓ Migration completed! Created/updated ${created} concerts.`);
}

main()
  .catch((e) => {
    console.error('Migration error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

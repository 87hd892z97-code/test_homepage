import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type SeedTrainer = {
  name: string;
  instrument: string;
  title?: string | null;
  description?: string | null;
  imagePath?: string | null;
  order: number;
};

const trainers: SeedTrainer[] = [
  {
    name: '平尾 信幸',
    instrument: 'パーカッション',
    description:
      '東京藝術大学卒業。神奈川フィルハーモニー管弦楽団打楽器奏者として2024年7月まで活躍し、現在は室内楽、吹奏楽、ソロなどの演奏活動のほか、吹奏楽やマーチングバンドの指導や審査員などジャンルを超えて幅広く活動している。',
    imagePath: '/TrainerImage/Perc平尾 信幸.jpg',
    order: 60,
  },
  {
    name: '名雪 裕伸',
    instrument: 'フルート',
    description:
      '国立音楽大学卒業。1982年に神奈川フィルハーモニー管弦楽団に入団し、1990年から新星日本交響楽団、2001年より東京フィルハーモニー交響楽団に在籍。定期演奏会をはじめ、新国立劇場でのオペラ・バレエ公演にレギュラー出演し、テレビ番組にも度々出演。2021年の定年退団後は国立音楽大学、洗足学園音楽大学にて講師を務める。',
    imagePath: '/TrainerImage/Fl名雪 裕伸.jpg',
    order: 61,
  },
  {
    name: '浦 丈彦',
    instrument: 'オーボエ',
    description:
      '東京藝術大学卒業。第21回民音コンクール室内楽第2位入賞。1989年に日本フィルハーモニー交響楽団へ入団し、副首席・首席奏者を歴任後、2002年から読売日本交響楽団のオーボエ奏者（イングリッシュホルン兼務）として活躍。桐朋学園大学、昭和音楽大学の非常勤講師も務める。',
    imagePath: '/TrainerImage/Ob浦 丈彦.jpg',
    order: 62,
  },
  {
    name: '齋藤 雄介',
    instrument: 'クラリネット',
    description:
      '東京藝術大学器楽科を同声会賞を得て卒業し、同大学院修士課程を修了。第18回日本管打楽器コンクール入賞。現在は神奈川フィルハーモニー管弦楽団首席クラリネット奏者を務め、東京藝術大学や尚美ミュージックカレッジ専門学校の非常勤講師として後進の指導にもあたる。',
    imagePath: '/TrainerImage/Cl齋藤 雄介.jpg',
    order: 63,
  },
  {
    name: '境野 達男',
    instrument: 'ファゴット',
    description:
      '東京藝術大学卒業。ファゴットを三田平八郎、菅原眸の各氏に、作曲法・対位法・和声学を嵐野英彦氏に師事。2012年まで神奈川フィルハーモニー管弦楽団に在籍し、現在は演奏活動のかたわらアマチュアオーケストラや吹奏楽の指導にも力を注いでいる。',
    imagePath: '/TrainerImage/Fg境野 達男.jpg',
    order: 64,
  },
  {
    name: '齋藤 善彦',
    instrument: 'ホルン',
    description:
      '高校からホルンを始め、宮田四郎、小沢千尋、田中正大の各氏に師事。武蔵野音楽大学器楽学科卒業後、全国主要オーケストラでの客演や室内楽、スタジオ録音、古楽器オーケストラなど幅広く活動。TAD Wind Symphonyのメンバーとしても活躍している。',
    imagePath: '/TrainerImage/Hr齋藤 善彦.jpg',
    order: 65,
  },
  {
    name: '三澤 徹',
    instrument: 'トランペット',
    description:
      '東京藝術大学器楽科トランペット専攻卒業。杉木峯男、福田善亮、P.ティボー、M.ケイマルの各氏に師事。現在は神奈川フィルハーモニー管弦楽団契約団員・首席トランペット奏者として活動し、室内楽やソロ、後進の指導にも取り組んでいる。',
    imagePath: '/TrainerImage/Tp三澤 徹.jpg',
    order: 66,
  },
  {
    name: '辻 姫子',
    instrument: 'トロンボーン・チューバ',
    description:
      '京都市立芸術大学音楽学部管打楽専攻を首席で卒業し、同大学大学院修士課程を修了。京都市長賞や京都音楽協会賞、第13回日本トロンボーンコンペティション第2位など多数受賞。現在は東京フィルハーモニー交響楽団首席トロンボーン奏者として活躍し、関西トロンボーン協会理事も務める。',
    imagePath: '/TrainerImage/Tb辻 姫子.jpg',
    order: 67,
  },
  {
    name: '三宅 進',
    instrument: 'チェロ',
    description:
      '桐朋学園大学、インディアナ大学にて木越洋、安田謙一郎、ヤーノシュ・シュタルケルの各氏に師事。群馬交響楽団首席などを経て仙台フィルハーモニー管弦楽団ソロ首席。武蔵野音楽大学講師。音楽監督を務める室内楽シリーズ「Music From PaToNA」が第4回ウィーンフィル＆サントリー音楽復興祈念賞を受賞。',
    imagePath: '/TrainerImage/Vc三宅 進.jpg',
    order: 68,
  },
  {
    name: '大澤 真人',
    instrument: 'チェロ',
    description: null,
    imagePath: '/TrainerImage/Vc大澤 真人.jpg',
    order: 69,
  },
  {
    name: '大西 雄二',
    instrument: 'コントラバス',
    description: null,
    imagePath: '/TrainerImage/Cb大西 雄二.jpg',
    order: 70,
  },
  {
    name: '白井 英峻',
    instrument: 'ヴァイオリン',
    description: null,
    imagePath: '/TrainerImage/Vn白井 英峻.jpg',
    order: 71,
  },
  {
    name: '中塚 良昭',
    instrument: 'ヴィオラ',
    description: null,
    imagePath: '/TrainerImage/Va中塚 良昭.jpg',
    order: 72,
  },
];

async function main() {
  let created = 0;
  let updated = 0;

  for (const trainer of trainers) {
    let record = await prisma.trainer.findFirst({
      where: {
        name: trainer.name,
        instrument: trainer.instrument,
      },
    });

    const { imagePath, ...trainerData } = trainer;

    if (record) {
      await prisma.trainer.update({
        where: { id: record.id },
        data: {
          name: trainerData.name,
          instrument: trainerData.instrument,
          title: trainerData.title,
          description: trainerData.description,
          order: trainerData.order,
        },
      });
      updated++;
      console.log(`Updated trainer: ${trainer.name}`);
    } else {
      record = await prisma.trainer.create({
        data: {
          name: trainerData.name,
          instrument: trainerData.instrument,
          title: trainerData.title,
          description: trainerData.description,
          order: trainerData.order,
        },
      });
      created++;
      console.log(`Created trainer: ${trainer.name}`);
    }

    if (imagePath) {
      await prisma.trainerImage.upsert({
        where: {
          trainerId_imagePath: {
            trainerId: record.id,
            imagePath,
          },
        },
        update: { isPrimary: true },
        create: {
          trainerId: record.id,
          imagePath,
          isPrimary: true,
        },
      });
    } else {
      await prisma.trainerImage.deleteMany({
        where: { trainerId: record.id },
      });
    }
  }

  console.log(`\nDone! Created ${created}, updated ${updated}.`);
}

main()
  .catch((error) => {
    console.error('Trainer seeding failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = 'user@nextmail.com';
  const password = '123456';

  // 既存のユーザーをチェック
  const existingUser = await (prisma as any).user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log('ユーザーは既に存在します:', email);
    return;
  }

  // パスワードをハッシュ化
  const hashedPassword = await bcrypt.hash(password, 10);

  // ユーザーを作成
  const user = await (prisma as any).user.create({
    data: {
      email,
      password: hashedPassword,
      name: 'Admin User',
    },
  });

  console.log('ユーザーを作成しました:', user.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


// Prisma を必須にしないオプション実装
// - USE_PRISMA 環境変数が 'true' のときだけ @prisma/client を読み込む
// - 未インストールでも例外を吐かず、prisma は undefined になる

type MaybePrisma = unknown | undefined;
let prisma: MaybePrisma = undefined;

if (process.env.USE_PRISMA === 'true') {
  try {
    // 動的 require して依存を必須にしない
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { PrismaClient } = require('@prisma/client') as { PrismaClient: new () => unknown };
    const globalForPrisma = globalThis as unknown as { prisma: unknown | undefined };

    prisma = globalForPrisma.prisma ?? new PrismaClient();
    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
  } catch (e) {
    // @prisma/client がない場合のフォールバック: 警告を出すだけにする
    // 必要なら here: install @prisma/client か USE_PRISMA をオフにしてください
    // console.warn を残すことでデバッグがしやすい
    // eslint-disable-next-line no-console
    console.warn('Prisma is not available or failed to load. Set USE_PRISMA=true and install @prisma/client to enable it.');
    prisma = undefined;
  }
} else {
  // デフォルトでは Prisma を有効化しない（依存削減）
  prisma = undefined;
}

export { prisma };

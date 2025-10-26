import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // バリデーション
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'すべてのフィールドを入力してください' },
        { status: 400 }
      );
    }

    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '有効なメールアドレスを入力してください' },
        { status: 400 }
      );
    }

    // 環境変数の確認
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('環境変数が設定されていません');
      return NextResponse.json(
        { error: 'メール設定が正しくありません' },
        { status: 500 }
      );
    }

    // Nodemailerの設定（Gmailを使用）
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 接続テスト
    try {
      await transporter.verify();
      console.log('メールサーバー接続成功');
    } catch (verifyError) {
      console.error('メールサーバー接続エラー:', verifyError);
      return NextResponse.json(
        { error: 'メールサーバーに接続できません' },
        { status: 500 }
      );
    }

    // 送信者への確認メール
    const confirmMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'お問い合わせを受け付けました - 横浜国立大学管弦楽団',
      html: `
        <h2>お問い合わせありがとうございます</h2>
        <p>${name} 様</p>
        <p>以下の内容でお問い合わせを受け付けました：</p>
        <hr>
        <p><strong>お名前：</strong> ${name}</p>
        <p><strong>メールアドレス：</strong> ${email}</p>
        <p><strong>メッセージ：</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p>内容を確認の上、担当者よりご連絡いたします。</p>
        <p>横浜国立大学管弦楽団</p>
      `,
    };

    // 管理者への通知メール
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: '@daichan.wpptprqw@gmail.com',
      subject: `【お問い合わせ】${name} 様からのメッセージ`,
      html: `
        <h2>新しいお問い合わせが届きました</h2>
        <hr>
        <p><strong>お名前：</strong> ${name}</p>
        <p><strong>メールアドレス：</strong> ${email}</p>
        <p><strong>メッセージ：</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p>送信日時：${new Date().toLocaleString('ja-JP')}</p>
      `,
    };

    // メール送信
    console.log('メール送信開始...');
    await transporter.sendMail(confirmMailOptions);
    console.log('確認メール送信完了');
    
    await transporter.sendMail(adminMailOptions);
    console.log('管理者メール送信完了');

    return NextResponse.json(
      { message: 'メールを送信しました' },
      { status: 200 }
    );

  } catch (error) {
    console.error('メール送信エラー:', error);
    return NextResponse.json(
      { error: `メール送信に失敗しました: ${error instanceof Error ? error.message : '不明なエラー'}` },
      { status: 500 }
    );
  }
}

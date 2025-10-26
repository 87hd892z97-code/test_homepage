// 演奏会画像のマッピング
export function getConcertImagePath(concertNumber: string, pieces?: string[], subtitle?: string): string | null {
  const number = parseInt(concertNumber.match(/\d+/)?.[0] || '0');
  
  const posterImageMap: Record<number, string> = {
    113: '/RegularConcertPoster/113RegularConcertPoster.jpg',
    115: '/RegularConcertPoster/115RegularConcertPoster.jpg',
    117: '/RegularConcertPoster/117RegularConcertPoster.jpg',
    118: '/RegularConcertPoster/118RegularConcertPoster.jpg',
    119: '/RegularConcertPoster/119RegularConcertPoster.png',
    120: '/RegularConcertPoster/120RegularConcertPoster.JPG',
    121: '/RegularConcertPoster/121RegularConcertPoster.jpg',
    122: '/RegularConcertPoster/122RegularConcertPoster.jpg',
    123: '/RegularConcertPoster/123RegularConcertPoster.jpg',
    124: '/RegularConcertPoster/124RegularCocertPoster.jpg', // タイポ対応
    125: '/RegularConcertPoster/125RegularConcertPoster.jpg',
  };
  
  // ポスター画像があればそれを優先
  if (posterImageMap[number]) {
    return posterImageMap[number];
  }
  
  // ポスター画像がない場合は、メイン曲の作曲家に基づいてデフォルト画像を返す
  // まずpiecesから、なければsubtitleから
  let composerText = '';
  if (pieces && pieces.length > 0) {
    composerText = pieces[0];
  } else if (subtitle) {
    composerText = subtitle;
  }
  
  if (composerText) {
    // 作曲家名からデフォルト画像を選択
    if (composerText.includes('チャイコフスキー') || composerText.includes('Tchaikovsky')) {
      return '/RegularConcertPoster/ynuorch-icon.jpg';
    }
    if (composerText.includes('シューマン') || composerText.includes('Schumann')) {
      return '/RegularConcertPoster/ynuorch-icon.jpg';
    }
    if (composerText.includes('ドヴォルザーク') || composerText.includes('Dvorak')) {
      return '/RegularConcertPoster/ynuorch-icon.jpg';
    }
    if (composerText.includes('ブラームス') || composerText.includes('Brahms')) {
      return '/RegularConcertPoster/ynuorch-icon.jpg';
    }
    if (composerText.includes('ベートーヴェン') || composerText.includes('Beethoven')) {
      return '/RegularConcertPoster/ynuorch-icon.jpg';
    }
    if (composerText.includes('モーツァルト') || composerText.includes('Mozart')) {
      return '/RegularConcertPoster/ynuorch-icon.jpg';
    }
    if (composerText.includes('シベリウス') || composerText.includes('Sibelius')) {
      return '/RegularConcertPoster/ynuorch-icon.jpg';
    }
    if (composerText.includes('ショスタコーヴィチ') || composerText.includes('Shostakovich')) {
      return '/RegularConcertPoster/ynuorch-icon.jpg';
    }
    if (composerText.includes('マーラー') || composerText.includes('Mahler')) {
      return '/RegularConcertPoster/ynuorch-icon.jpg';
    }
    if (composerText.includes('サン＝サーンス') || composerText.includes('Saint-Saens')) {
      return '/RegularConcertPoster/ynuorch-icon.jpg';
    }
    if (composerText.includes('シューベルト') || composerText.includes('Schubert')) {
      return '/RegularConcertPoster/ynuorch-icon.jpg';
    }
    if (composerText.includes('ワーグナー') || composerText.includes('Wagner')) {
      return '/RegularConcertPoster/ynuorch-icon.jpg';
    }
    if (composerText.includes('リスト') || composerText.includes('Liszt')) {
      return '/RegularConcertPoster/ynuorch-icon.jpg';
    }
    if (composerText.includes('メンデルスゾーン') || composerText.includes('Mendelssohn')) {
      return '/RegularConcertPoster/ynuorch-icon.jpg';
    }
    if (composerText.includes('プロコフィエフ') || composerText.includes('Prokofiev')) {
      return '/RegularConcertPoster/ynuorch-icon.jpg';
    }
    if (composerText.includes('ヒンデミット') || composerText.includes('Hindemith')) {
      return '/RegularConcertPoster/ynuorch-icon.jpg';
    }
    if (composerText.includes('ビゼー') || composerText.includes('Bizet')) {
      return '/RegularConcertPoster/ynuorch-icon.jpg';
    }
    if (composerText.includes('ボロディン') || composerText.includes('Borodin')) {
      return '/RegularConcertPoster/ynuorch-icon.jpg';
    }
    if (composerText.includes('ハチャトゥリアン') || composerText.includes('Khachaturian')) {
      return '/RegularConcertPoster/ynuorch-icon.jpg';
    }
  }
  
  // デフォルトの画像
  return '/RegularConcertPoster/ynuorch-icon.jpg';
}

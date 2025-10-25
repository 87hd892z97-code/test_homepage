import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="container page-content">
      <h1>楽団紹介</h1>
      
      <section>
        <h2>横浜国立大学管弦楽団</h2>
        <p>Yokohama National University Orchestra (YNU Orchestra)</p>
        <p>1959年3月設立。年2回の定期演奏会を中心に、各セクション（弦、木管、金管）によるコンサートや、 小学校や福祉施設での移動音楽会など、 地元横浜を中心に活動している。過去に、家田厚志、岩村力、 海老原光、長田雅人、川瀬賢太郎、河地良智、栗田博文、現田茂夫、甲賀一宏、坂本和彦、佐々木新平、 白谷隆、田中健、田部井剛、十束尚弘、冨平恭平、新田ユリ、林紀人、松尾葉子、松岡究、山岡重信、山下一史、 渡邊一正、和田一樹（五十音順、敬称略）の各氏らと共演。</p>
      </section>

      <section>
        <h2>所在地</h2>
        <ul>
          <p>〒240-8501　神奈川県横浜市保土ヶ谷区常盤台79-1横浜国立大学　文化サークル共用施設2階</p>
        </ul>
      </section>

      <section>
        <h2>第125期執行部</h2>
        <div className="executive-committee">
          <div className="committee-member">
            <Image
              src="/committee-member-optimized.png"
              alt="顧問 杉山 久仁子"
              width={80}
              height={80}
              className="profile-image"
            />
            <span className="position">顧問</span>
            <p className="name">杉山 久仁子</p>
            <p className="affiliation">（横浜国立大学教育学部教授）</p>
          </div>
          <div className="committee-member">
            <Image
              src="/committee-member-optimized.png"
              alt="学生責任者 永田 光佑"
              width={80}
              height={80}
              className="profile-image"
            />
            <span className="position">学生責任者</span>
            <p className="name">永田 光佑</p>
          </div>
          <div className="committee-member">
            <Image
              src="/committee-member-optimized.png"
              alt="コンサートマスター 橋本 大輝"
              width={80}
              height={80}
              className="profile-image"
            />
            <span className="position">コンサートマスター</span>
            <p className="name">橋本 大輝</p>
          </div>
          <div className="committee-member">
            <Image
              src="/committee-member-optimized.png"
              alt="技術委員長 森本 湧大"
              width={80}
              height={80}
              className="profile-image"
            />
            <span className="position">技術委員長</span>
            <p className="name">森本 湧大</p>
          </div>
          <div className="committee-member">
            <Image
              src="/committee-member-optimized.png"
              alt="定演委員長 中園 拓也"
              width={80}
              height={80}
              className="profile-image"
            />
            <span className="position">定演委員長</span>
            <p className="name">中園 拓也</p>
          </div>
          <div className="committee-member">
            <Image
              src="/committee-member-optimized.png"
              alt="運営委員長 鈴木 是雄"
              width={80}
              height={80}
              className="profile-image"
            />
            <span className="position">運営委員長</span>
            <p className="name">鈴木 是雄</p>
          </div>
          <div className="committee-member">
            <Image
              src="/committee-member-optimized.png"
              alt="選曲委員長 吉江 ひめ杏"
              width={80}
              height={80}
              className="profile-image"
            />
            <span className="position">選曲委員長</span>
            <p className="name">吉江 ひめ杏</p>
          </div>
          <div className="committee-member">
            <Image
              src="/committee-member-optimized.png"
              alt="移動音楽会委員長 朝見 美嘉"
              width={80}
              height={80}
              className="profile-image"
            />
            <span className="position">移動音楽会委員長</span>
            <p className="name">朝見 美嘉</p>
          </div>
          <div className="committee-member">
            <Image
              src="/committee-member-optimized.png"
              alt="機関誌委員長 佐野 汐梨"
              width={80}
              height={80}
              className="profile-image"
            />
            <span className="position">機関誌委員長</span>
            <p className="name">佐野 汐梨</p>
          </div>
          <div className="committee-member">
            <Image
              src="/committee-member-optimized.png"
              alt="執行委員 今泉 くるみ"
              width={80}
              height={80}
              className="profile-image"
            />
            <span className="position">執行委員</span>
            <p className="name">今泉 くるみ</p>
          </div>
          <div className="committee-member">
            <Image
              src="/committee-member-optimized.png"
              alt="執行委員 鈴木 颯太"
              width={80}
              height={80}
              className="profile-image"
            />
            <span className="position">執行委員</span>
            <p className="name">鈴木 颯太</p>
          </div>
          <div className="committee-member">
            <Image
              src="/committee-member-optimized.png"
              alt="執行委員 林 貴美"
              width={80}
              height={80}
              className="profile-image"
            />
            <span className="position">執行委員</span>
            <p className="name">林 貴美</p>
          </div>
        </div>
      </section>
    </div>
  );
}

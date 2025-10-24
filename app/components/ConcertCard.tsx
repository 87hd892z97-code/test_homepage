import { format, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';
import Image from 'next/image';

type ConcertProps = {
  title: string;
  date: string | Date; // Date型またはISO文字列を受け入れる
  conductor: string;
  program: string[];
  venue: string;
  image?: string;
};

export default function ConcertCard({
  title,
  date,
  conductor,
  program,
  venue,
  image
}: ConcertProps) {
  // 日付の正規化
  const concertDate = date instanceof Date ? date : parseISO(date);

  return (
    <div className="concert-card">
      {image && (
        <div className="concert-image">
          <Image
            src={image}
            alt={`${title}の公演写真`}
            width={400}
            height={300}
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}
      <div className="concert-info">
        <span className="concert-date">
          {format(concertDate, 'yyyy年M月d日(E)', { locale: ja })}
        </span>
        <h3>{title}</h3>
        <p className="conductor">指揮: {conductor}</p>
        <div className="program">
          {program.map((piece, i) => (
            <p key={i}>{piece}</p>
          ))}
        </div>
        <p className="venue">{venue}</p>
        <button 
          className="ticket-button"
          aria-label={`${title}のチケットを購入`}
        >
          チケット購入
        </button>
      </div>
    </div>
  );
}

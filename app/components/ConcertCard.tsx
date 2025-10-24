import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

type ConcertProps = {
  title: string;
  date: Date;
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
  return (
    <div className="concert-card">
      {image && (
        <div className="concert-image">
          <img src={image} alt={title} />
        </div>
      )}
      <div className="concert-info">
        <span className="concert-date">
          {format(date, 'yyyy年M月d日(E)', { locale: ja })}
        </span>
        <h3>{title}</h3>
        <p className="conductor">指揮: {conductor}</p>
        <div className="program">
          {program.map((piece, i) => (
            <p key={i}>{piece}</p>
          ))}
        </div>
        <p className="venue">{venue}</p>
        <button className="ticket-button">チケット購入</button>
      </div>
    </div>
  );
}

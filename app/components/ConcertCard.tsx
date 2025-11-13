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
    <div className="bg-gradient-to-br from-gray-light to-gray-lighter border-0 rounded-xl shadow-[0_4px_20px_rgba(43,108,176,0.1)] overflow-hidden transition-transform duration-slow ease flex flex-row min-h-[300px] items-stretch gap-0 hover:-translate-y-[5px] hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] max-mobile:flex-col max-mobile:w-full max-mobile:max-w-full">
      {image && (
        <div className="relative h-full overflow-hidden flex-[0_0_400px] w-[400px] min-w-[400px] max-w-[400px] max-mobile:h-[250px] max-mobile:flex-none max-mobile:w-full max-mobile:max-w-full">
          <Image
            src={image}
            alt={`${title}の公演写真`}
            width={400}
            height={300}
            className="w-full h-full object-cover transition-transform duration-slow ease hover:scale-105"
          />
        </div>
      )}
      <div className="p-6 bg-white rounded-lg ml-0 flex flex-col justify-center flex-1 auto w-auto min-w-[280px] max-mobile:p-6 max-mobile:ml-0 max-mobile:flex-none max-mobile:w-full max-mobile:min-w-full max-mobile:max-w-full">
        <span className="text-sm text-muted mb-2 block">
          {format(concertDate, 'yyyy年M月d日(E)', { locale: ja })}
        </span>
        <h3 className="text-2xl text-accent m-0 mb-2 font-bold">{title}</h3>
        <p className="text-muted mb-2">指揮: {conductor}</p>
        <div className="mb-4">
          {program.map((piece, i) => (
            <p key={i} className="text-muted mb-1">{piece}</p>
          ))}
        </div>
        <p className="text-muted mb-4">{venue}</p>
        <button 
          className="inline-block bg-accent text-white px-8 py-3 rounded-lg no-underline font-semibold transition-all duration-300 ease hover:bg-accent-dark hover:-translate-y-0.5 max-mobile:w-full"
          aria-label={`${title}のチケットを購入`}
        >
          チケット購入
        </button>
      </div>
    </div>
  );
}

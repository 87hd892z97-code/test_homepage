export default function UpcomingConcerts() {
  const concerts = [
    {
      id: 1,
      title: '春の定期演奏会',
      date: '2024-04-15',
      program: 'ベートーヴェン：交響曲第7番',
      conductor: '山田和樹',
      venue: '大学ホール'
    },
    {
      id: 2,
      title: '室内楽シリーズ Vol.1',
      date: '2024-05-20',
      program: 'モーツァルト：弦楽四重奏曲',
      venue: '小ホール'
    }
  ];

  return (
    <div className="list-none p-0 m-0">
      {concerts.map(concert => (
        <div key={concert.id} className="py-2 border-b border-gray-200">
          <div className="text-sm text-muted mb-1">{concert.date}</div>
          <h4 className="text-xl font-semibold text-accent mb-2">{concert.title}</h4>
          <p className="text-base text-muted mb-1">{concert.program}</p>
          {concert.conductor && (
            <p className="text-base text-muted mb-1">指揮: {concert.conductor}</p>
          )}
          <p className="text-base text-muted">{concert.venue}</p>
        </div>
      ))}
    </div>
  );
}

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
    <div className="upcoming-list">
      {concerts.map(concert => (
        <div key={concert.id} className="concert-item">
          <div className="concert-date">{concert.date}</div>
          <h4 className="concert-title">{concert.title}</h4>
          <p className="concert-program">{concert.program}</p>
          {concert.conductor && (
            <p className="concert-conductor">指揮: {concert.conductor}</p>
          )}
          <p className="concert-venue">{concert.venue}</p>
        </div>
      ))}
    </div>
  );
}

export default function NewsSection() {
  const news = [
    {
      id: 1,
      date: '2024-02-15',
      title: '春の定期演奏会のチケット販売開始',
      category: 'お知らせ'
    },
    {
      id: 2,
      date: '2024-02-10',
      title: '新入団員募集のお知らせ',
      category: '募集'
    },
    {
      id: 3,
      date: '2024-02-01',
      title: '青少年向けワークショップ開催',
      category: 'イベント'
    }
  ];

  return (
    <div className="news-list">
      {news.map(item => (
        <div key={item.id} className="news-item">
          <span className="news-date">{item.date}</span>
          <span className="news-category">{item.category}</span>
          <h4 className="news-title">{item.title}</h4>
        </div>
      ))}
    </div>
  );
}

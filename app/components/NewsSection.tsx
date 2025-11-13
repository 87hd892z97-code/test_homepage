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
    <div className="flex flex-col gap-4">
      {news.map(item => (
        <div key={item.id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border-b border-gray-200">
          <span className="text-sm text-muted font-medium min-w-[100px]">{item.date}</span>
          <span className="text-xs text-accent font-semibold uppercase px-2 py-1 bg-accent/10 rounded">{item.category}</span>
          <h4 className="text-lg font-medium text-text-secondary m-0">{item.title}</h4>
        </div>
      ))}
    </div>
  );
}

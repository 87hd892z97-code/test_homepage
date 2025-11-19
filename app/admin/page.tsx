'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { logout } from '@/app/lib/actions';

interface Concert {
  id: number;
  concertNumber: number;
  date: string;
  venue: string;
  conductor?: string;
  cancelled?: boolean;
  status?: string;
  pieces?: string[];
  [key: string]: any;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'concerts' | 'members'>('concerts');
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingConcert, setEditingConcert] = useState<Concert | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchConcerts();
  }, []);

  const fetchConcerts = async () => {
    try {
      const response = await fetch('/api/admin/concerts');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setConcerts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch concerts:', error);
      setConcerts([]); // エラー時は空配列を設定
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('この演奏会を削除してもよろしいですか？')) return;

    try {
      const response = await fetch(`/api/admin/concerts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setConcerts(concerts.filter(c => c.id !== id));
        alert('削除しました');
      }
    } catch (error) {
      console.error('Failed to delete concert:', error);
      alert('削除に失敗しました');
    }
  };

  const handleEdit = (concert: Concert) => {
    setEditingConcert(concert);
    setIsEditing(true);
  };

  const handleAdd = () => {
    setEditingConcert(null);
    setIsEditing(true);
  };

  const handleSave = async (concertData: Partial<Concert>) => {
    setSaving(true);
    try {
      let response;
      if (editingConcert) {
        // Update
        response = await fetch(`/api/admin/concerts/${editingConcert.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(concertData),
        });
      } else {
        // Create
        response = await fetch('/api/admin/concerts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(concertData),
        });
      }

      if (response.ok) {
        alert(editingConcert ? '更新しました' : '追加しました');
        setIsEditing(false);
        setEditingConcert(null);
        await fetchConcerts();
      } else {
        const errorData = await response.json();
        console.error('Failed to save concert:', errorData);
        alert('保存に失敗しました: ' + (errorData.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Failed to save concert:', error);
      alert('保存に失敗しました');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="max-w-container mx-auto px-4 w-full overflow-x-hidden py-12 pt-8 max-w-2xl mx-auto">
          <div className="max-w-container mx-auto px-4 w-full overflow-x-hidden">
            <p className="text-base leading-loose">読み込み中...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-container mx-auto px-4 w-full overflow-x-hidden py-12 pt-8 max-w-2xl mx-auto">
        <div className="max-w-container mx-auto px-4 w-full overflow-x-hidden">
          <div className="flex justify-between items-center mb-8 pb-2 border-b border-accent">
            <h1 className="text-4xl text-accent m-0">管理者ページ</h1>
            <form action={logout}>
              <button
                type="submit"
                className="px-6 py-3 bg-gray-600 text-white border-0 rounded cursor-pointer text-sm font-bold transition-opacity duration-fast hover:opacity-90"
              >
                ログアウト
              </button>
            </form>
          </div>

          <div className="mt-8 border-b-2 border-accent flex gap-8">
            <button
              onClick={() => setActiveTab('concerts')}
              className={`px-8 py-4 bg-transparent border-0 cursor-pointer text-base transition-all duration-300 ease ${
                activeTab === 'concerts' 
                  ? 'border-b-[3px] border-accent text-accent font-bold' 
                  : 'border-b-[3px] border-transparent text-text font-normal'
              }`}
            >
              演奏会情報
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`px-8 py-4 bg-transparent border-0 cursor-pointer text-base transition-all duration-300 ease ${
                activeTab === 'members' 
                  ? 'border-b-[3px] border-accent text-accent font-bold' 
                  : 'border-b-[3px] border-transparent text-text font-normal'
              }`}
            >
              執行部情報
            </button>
          </div>

          <div className="mt-8">
            {activeTab === 'concerts' && (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl mb-4 text-text-secondary m-0">演奏会情報の管理</h2>
                  {!isEditing && (
                    <button
                      onClick={handleAdd}
                      className="px-6 py-3 bg-accent text-white border-0 rounded cursor-pointer text-sm font-bold transition-opacity duration-fast hover:opacity-90"
                    >
                      + 新規追加
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <ConcertEditForm
                    concert={editingConcert}
                    saving={saving}
                    onSave={handleSave}
                    onCancel={() => {
                      setIsEditing(false);
                      setEditingConcert(null);
                    }}
                  />
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <p className="text-base leading-loose">現在 {concerts?.length || 0} 件の演奏会が登録されています。</p>
                      <input
                        type="text"
                        placeholder="検索..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-3 rounded-lg border border-border text-base min-w-[300px] outline-none transition-colors duration-fast focus:border-accent"
                      />
                    </div>
                    <div className="mt-6">
                      {(Array.isArray(concerts) ? concerts : [])
                        .filter((concert) => {
                          if (!searchQuery) return true;
                          const query = searchQuery.toLowerCase();
                          return (
                            concert.concertNumber?.toString().includes(query) ||
                            concert.date?.toLowerCase().includes(query) ||
                            concert.venue?.toLowerCase().includes(query) ||
                            concert.conductor?.toLowerCase().includes(query) ||
                            concert.status?.toLowerCase().includes(query) ||
                            concert.chorus?.toLowerCase().includes(query) ||
                            concert.soprano?.toLowerCase().includes(query) ||
                            concert.mezzoSoprano?.toLowerCase().includes(query) ||
                            concert.alto?.toLowerCase().includes(query) ||
                            concert.tenor?.toLowerCase().includes(query) ||
                            concert.bassBaritone?.toLowerCase().includes(query) ||
                            concert.soloist?.toLowerCase().includes(query) ||
                            concert.pieces?.some((piece: string) => piece.toLowerCase().includes(query))
                          );
                        })
                        .map((concert) => (
                        <div
                          key={concert.id}
                          className="p-6 mb-4 bg-gray-lightest rounded-lg border border-border"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="m-0 mb-2 text-xl font-semibold text-accent">
                                第{concert.concertNumber}回定期演奏会
                              </h3>
                              <p className="my-1 text-text-secondary">
                                {concert.date} @ {concert.venue}
                              </p>
                              {concert.conductor && (
                                <p className="my-1 text-text-secondary">
                                  指揮: {concert.conductor}
                                </p>
                              )}
                              {concert.pieces && concert.pieces.length > 0 && (
                                <div className="mt-2">
                                  <p className="my-1 text-text-secondary text-sm font-bold">
                                    曲目:
                                  </p>
                                  {concert.pieces.map((piece: string, idx: number) => (
                                    <p key={idx} className="my-0.5 ml-4 text-text-secondary text-sm">
                                      • {piece}
                                    </p>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEdit(concert)}
                                className="px-4 py-2 bg-accent text-white border-0 rounded cursor-pointer text-sm transition-opacity duration-fast hover:opacity-90"
                              >
                                編集
                              </button>
                              <button
                                onClick={() => handleDelete(concert.id)}
                                className="px-4 py-2 bg-red-600 text-white border-0 rounded cursor-pointer text-sm transition-opacity duration-fast hover:opacity-90"
                              >
                                削除
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {concerts.length === 0 && (
                        <p className="text-text-secondary">演奏会がまだ登録されていません。</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'members' && (
              <div>
                <h2 className="text-2xl mb-4 text-text-secondary">執行部メンバーの管理</h2>
                <div className="mt-8 p-8 bg-gray-lightest rounded-lg border-2 border-dashed border-accent">
                  <p className="text-base leading-loose">この機能は現在開発中です。</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

function ConcertEditForm({
  concert,
  saving,
  onSave,
  onCancel,
}: {
  concert: Concert | null;
  saving: boolean;
  onSave: (data: Partial<Concert>) => void;
  onCancel: () => void;
}) {
  // ソリストを配列形式で管理
  const [soloists, setSoloists] = useState<{name: string, instrument: string}[]>(
    (concert?.soloist && concert?.soloistInstrument) 
      ? [{name: concert.soloist, instrument: concert.soloistInstrument}]
      : [{name: '', instrument: ''}]
  );

  // 独唱者の表示/非表示を管理
  const [showSingers, setShowSingers] = useState(false);

  // 独唱者を配列形式で管理
  const [sopranos, setSopranos] = useState<string[]>(
    concert?.soprano ? concert.soprano.split('\n').filter((n: string) => n.trim()) : ['']
  );
  const [mezzoSopranos, setMezzoSopranos] = useState<string[]>(
    concert?.mezzoSoprano ? concert.mezzoSoprano.split('\n').filter((n: string) => n.trim()) : ['']
  );
  const [altos, setAltos] = useState<string[]>(
    concert?.alto ? concert.alto.split('\n').filter((n: string) => n.trim()) : ['']
  );
  const [tenors, setTenors] = useState<string[]>(
    concert?.tenor ? concert.tenor.split('\n').filter((n: string) => n.trim()) : ['']
  );
  const [bassBaritones, setBassBaritones] = useState<string[]>(
    concert?.bassBaritone ? concert.bassBaritone.split('\n').filter((n: string) => n.trim()) : ['']
  );

  const [formData, setFormData] = useState({
    concertNumber: concert?.concertNumber || 0,
    date: concert?.date || '',
    venue: concert?.venue || '',
    conductor: concert?.conductor || '',
    cancelled: concert?.cancelled || false,
    status: concert?.status || 'completed',
    chorus: concert?.chorus || '',
    ticketUrl: concert?.ticketUrl || '',
    pieces: (concert?.pieces || []).join('\n'),
  });

  const handleAddSoloist = () => {
    setSoloists([...soloists, {name: '', instrument: ''}]);
  };

  const handleRemoveSoloist = (index: number) => {
    if (soloists.length > 1) {
      setSoloists(soloists.filter((_, i) => i !== index));
    }
  };

  const handleSoloistChange = (index: number, field: 'name' | 'instrument', value: string) => {
    const updatedSoloists = [...soloists];
    updatedSoloists[index][field] = value;
    setSoloists(updatedSoloists);
  };

  // 独唱者の追加・削除・変更ハンドラー
  const createSingerHandlers = (singerArray: string[], setSingerArray: React.Dispatch<React.SetStateAction<string[]>>) => ({
    add: () => setSingerArray([...singerArray, '']),
    remove: (index: number) => {
      if (singerArray.length > 1) {
        setSingerArray(singerArray.filter((_, i) => i !== index));
      }
    },
    change: (index: number, value: string) => {
      const updated = [...singerArray];
      updated[index] = value;
      setSingerArray(updated);
    },
  });

  const sopranoHandlers = createSingerHandlers(sopranos, setSopranos);
  const mezzoSopranoHandlers = createSingerHandlers(mezzoSopranos, setMezzoSopranos);
  const altoHandlers = createSingerHandlers(altos, setAltos);
  const tenorHandlers = createSingerHandlers(tenors, setTenors);
  const bassBaritoneHandlers = createSingerHandlers(bassBaritones, setBassBaritones);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSave = {
      ...formData,
      pieces: formData.pieces.split('\n').filter(p => p.trim()),
      // ソリストが1人で名前がある場合、従来の形式でも保存
      soloist: soloists.length > 0 && soloists[0].name ? soloists[0].name : '',
      soloistInstrument: soloists.length > 0 && soloists[0].instrument ? soloists[0].instrument : '',
      // 独唱者を改行区切りで保存
      soprano: sopranos.join('\n'),
      mezzoSoprano: mezzoSopranos.join('\n'),
      alto: altos.join('\n'),
      tenor: tenors.join('\n'),
      bassBaritone: bassBaritones.join('\n'),
    };
    onSave(dataToSave);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 bg-gray-lightest rounded-lg border border-border"
    >
      <h3 className="text-2xl mb-4 text-text-secondary">{concert ? '演奏会情報の編集' : '新規演奏会の追加'}</h3>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <label className="block mb-2 font-bold text-base">
            演奏会番号 *
          </label>
          <input
            type="number"
            required
            value={formData.concertNumber}
            onChange={(e) => setFormData({ ...formData, concertNumber: parseInt(e.target.value) })}
            className="w-full p-3 rounded border border-border text-base outline-none transition-colors duration-fast focus:border-accent"
          />
        </div>

        <div>
          <label className="block mb-2 font-bold text-base">
            日付 *
          </label>
          <input
            type="text"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            placeholder="例: 2025年12月21日（日）"
            className="w-full p-3 rounded border border-border text-base outline-none transition-colors duration-fast focus:border-accent"
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-2 font-bold text-base">
            会場 *
          </label>
          <input
            type="text"
            required
            value={formData.venue}
            onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
            className="w-full p-3 rounded border border-border text-base outline-none transition-colors duration-fast focus:border-accent"
          />
        </div>

        <div>
          <label className="block mb-2 font-bold text-base">
            指揮者 *
          </label>
          <input
            type="text"
            required
            value={formData.conductor}
            onChange={(e) => setFormData({ ...formData, conductor: e.target.value })}
            className="w-full p-3 rounded border border-border text-base outline-none transition-colors duration-fast focus:border-accent"
          />
        </div>

        <div>
          <label className="block mb-2 font-bold text-base">
            ステータス
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full p-3 rounded border border-border text-base outline-none transition-colors duration-fast focus:border-accent"
          >
            <option value="completed">開催済み</option>
            <option value="upcoming">開催予定</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="block mb-2 font-bold text-base">
            チケット販売URL
          </label>
          <input
            type="url"
            value={formData.ticketUrl}
            onChange={(e) => setFormData({ ...formData, ticketUrl: e.target.value })}
            placeholder="https://teket.jp/..."
            className="w-full p-3 rounded border border-border text-base outline-none transition-colors duration-fast focus:border-accent"
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-2 font-bold text-base">
            合唱団
          </label>
          <input
            type="text"
            value={formData.chorus}
            onChange={(e) => setFormData({ ...formData, chorus: e.target.value })}
            className="w-full p-3 rounded border border-border text-base outline-none transition-colors duration-fast focus:border-accent"
          />
        </div>

        <div className="col-span-2 mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="font-bold text-base">ソリスト</label>
            <button
              type="button"
              onClick={handleAddSoloist}
              className="px-4 py-2 bg-accent text-white border-0 rounded cursor-pointer text-sm transition-opacity duration-fast hover:opacity-90"
            >
              + 追加
            </button>
          </div>
          {soloists.map((soloist, index) => (
            <div key={index} className="flex gap-2 mb-2 items-start">
              <input
                type="text"
                value={soloist.name}
                onChange={(e) => handleSoloistChange(index, 'name', e.target.value)}
                placeholder="名前"
                className="flex-1 p-3 rounded border border-border text-base outline-none transition-colors duration-fast focus:border-accent"
              />
              <input
                type="text"
                value={soloist.instrument}
                onChange={(e) => handleSoloistChange(index, 'instrument', e.target.value)}
                placeholder="楽器（例: チェロ、オルガン）"
                className="flex-1 p-3 rounded border border-border text-base outline-none transition-colors duration-fast focus:border-accent"
              />
              {soloists.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveSoloist(index)}
                  className="px-4 py-3 bg-red-600 text-white border-0 rounded cursor-pointer text-base transition-opacity duration-fast hover:opacity-90"
                >
                  削除
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="col-span-2 mt-4 mb-4">
          <button
            type="button"
            onClick={() => setShowSingers(!showSingers)}
            className={`w-full p-3 border-0 rounded cursor-pointer text-base font-bold transition-colors duration-fast ${
              showSingers 
                ? 'bg-gray-lighter text-text' 
                : 'bg-accent text-white hover:bg-accent-dark'
            }`}
          >
            {showSingers ? '独唱者セクションを閉じる ↑' : '独唱者を追加 ↓'}
          </button>
        </div>

        {showSingers && (
          <>
            <div className="col-span-2 mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="font-bold text-base">ソプラノ</label>
                <button
                  type="button"
                  onClick={sopranoHandlers.add}
                  className="px-4 py-2 bg-accent text-white border-0 rounded cursor-pointer text-sm transition-opacity duration-fast hover:opacity-90"
                >
                  + 追加
                </button>
              </div>
              {sopranos.map((soprano, index) => (
                <div key={index} className="flex gap-2 mb-2 items-start">
                  <input
                    type="text"
                    value={soprano}
                    onChange={(e) => sopranoHandlers.change(index, e.target.value)}
                    placeholder="名前を入力"
                    className="flex-1 p-3 rounded border border-border text-base outline-none transition-colors duration-fast focus:border-accent"
                  />
                  {sopranos.length > 1 && (
                    <button
                      type="button"
                      onClick={() => sopranoHandlers.remove(index)}
                      className="px-4 py-3 bg-red-600 text-white border-0 rounded cursor-pointer text-base transition-opacity duration-fast hover:opacity-90"
                    >
                      削除
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="col-span-2 mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="font-bold text-base">メゾソプラノ</label>
                <button
                  type="button"
                  onClick={mezzoSopranoHandlers.add}
                  className="px-4 py-2 bg-accent text-white border-0 rounded cursor-pointer text-sm transition-opacity duration-fast hover:opacity-90"
                >
                  + 追加
                </button>
              </div>
              {mezzoSopranos.map((mezzoSoprano, index) => (
                <div key={index} className="flex gap-2 mb-2 items-start">
                  <input
                    type="text"
                    value={mezzoSoprano}
                    onChange={(e) => mezzoSopranoHandlers.change(index, e.target.value)}
                    placeholder="名前を入力"
                    className="flex-1 p-3 rounded border border-border text-base outline-none transition-colors duration-fast focus:border-accent"
                  />
                  {mezzoSopranos.length > 1 && (
                    <button
                      type="button"
                      onClick={() => mezzoSopranoHandlers.remove(index)}
                      className="px-4 py-3 bg-red-600 text-white border-0 rounded cursor-pointer text-base transition-opacity duration-fast hover:opacity-90"
                    >
                      削除
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="col-span-2 mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="font-bold text-base">アルト</label>
                <button
                  type="button"
                  onClick={altoHandlers.add}
                  className="px-4 py-2 bg-accent text-white border-0 rounded cursor-pointer text-sm transition-opacity duration-fast hover:opacity-90"
                >
                  + 追加
                </button>
              </div>
              {altos.map((alto, index) => (
                <div key={index} className="flex gap-2 mb-2 items-start">
                  <input
                    type="text"
                    value={alto}
                    onChange={(e) => altoHandlers.change(index, e.target.value)}
                    placeholder="名前を入力"
                    className="flex-1 p-3 rounded border border-border text-base outline-none transition-colors duration-fast focus:border-accent"
                  />
                  {altos.length > 1 && (
                    <button
                      type="button"
                      onClick={() => altoHandlers.remove(index)}
                      className="px-4 py-3 bg-red-600 text-white border-0 rounded cursor-pointer text-base transition-opacity duration-fast hover:opacity-90"
                    >
                      削除
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="col-span-2 mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="font-bold text-base">テノール</label>
                <button
                  type="button"
                  onClick={tenorHandlers.add}
                  className="px-4 py-2 bg-accent text-white border-0 rounded cursor-pointer text-sm transition-opacity duration-fast hover:opacity-90"
                >
                  + 追加
                </button>
              </div>
              {tenors.map((tenor, index) => (
                <div key={index} className="flex gap-2 mb-2 items-start">
                  <input
                    type="text"
                    value={tenor}
                    onChange={(e) => tenorHandlers.change(index, e.target.value)}
                    placeholder="名前を入力"
                    className="flex-1 p-3 rounded border border-border text-base outline-none transition-colors duration-fast focus:border-accent"
                  />
                  {tenors.length > 1 && (
                    <button
                      type="button"
                      onClick={() => tenorHandlers.remove(index)}
                      className="px-4 py-3 bg-red-600 text-white border-0 rounded cursor-pointer text-base transition-opacity duration-fast hover:opacity-90"
                    >
                      削除
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="col-span-2 mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="font-bold text-base">バスバリトン</label>
                <button
                  type="button"
                  onClick={bassBaritoneHandlers.add}
                  className="px-4 py-2 bg-accent text-white border-0 rounded cursor-pointer text-sm transition-opacity duration-fast hover:opacity-90"
                >
                  + 追加
                </button>
              </div>
              {bassBaritones.map((bassBaritone, index) => (
                <div key={index} className="flex gap-2 mb-2 items-start">
                  <input
                    type="text"
                    value={bassBaritone}
                    onChange={(e) => bassBaritoneHandlers.change(index, e.target.value)}
                    placeholder="名前を入力"
                    className="flex-1 p-3 rounded border border-border text-base outline-none transition-colors duration-fast focus:border-accent"
                  />
                  {bassBaritones.length > 1 && (
                    <button
                      type="button"
                      onClick={() => bassBaritoneHandlers.remove(index)}
                      className="px-4 py-3 bg-red-600 text-white border-0 rounded cursor-pointer text-base transition-opacity duration-fast hover:opacity-90"
                    >
                      削除
                    </button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        <div className="col-span-2">
          <label className="block mb-2 font-bold text-base">
            曲目 (改行区切り)
          </label>
          <textarea
            value={formData.pieces}
            onChange={(e) => setFormData({ ...formData, pieces: e.target.value })}
            rows={5}
            className="w-full p-3 rounded border border-border text-base font-sans outline-none transition-colors duration-fast focus:border-accent resize-y"
          />
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          type="submit"
          disabled={saving}
          className={`px-8 py-3 text-white border-0 rounded cursor-pointer text-base font-bold transition-opacity duration-fast ${
            saving 
              ? 'bg-gray-400 cursor-not-allowed opacity-60' 
              : 'bg-accent hover:opacity-90'
          }`}
        >
          {saving ? '保存中...' : '保存'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className={`px-8 py-3 bg-transparent text-text border border-border rounded transition-opacity duration-fast text-base ${
            saving 
              ? 'cursor-not-allowed opacity-60' 
              : 'cursor-pointer hover:border-accent hover:text-accent'
          }`}
        >
          キャンセル
        </button>
      </div>
    </form>
  );
}
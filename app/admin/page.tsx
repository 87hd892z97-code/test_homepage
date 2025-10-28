'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';

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
        <main className="page-content">
          <div className="container">
            <p>読み込み中...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container">
          <h1>管理者ページ</h1>

          <div
            className="admin-tabs"
            style={{
              marginTop: '2rem',
              borderBottom: '2px solid var(--accent)',
              display: 'flex',
              gap: '2rem',
            }}
          >
            <button
              onClick={() => setActiveTab('concerts')}
              style={{
                padding: '1rem 2rem',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'concerts' ? '3px solid var(--accent)' : '3px solid transparent',
                color: activeTab === 'concerts' ? 'var(--accent)' : 'var(--text)',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: activeTab === 'concerts' ? 'bold' : 'normal',
                transition: 'all 0.3s ease',
              }}
            >
              演奏会情報
            </button>
            <button
              onClick={() => setActiveTab('members')}
              style={{
                padding: '1rem 2rem',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'members' ? '3px solid var(--accent)' : '3px solid transparent',
                color: activeTab === 'members' ? 'var(--accent)' : 'var(--text)',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: activeTab === 'members' ? 'bold' : 'normal',
                transition: 'all 0.3s ease',
              }}
            >
              執行部情報
            </button>
          </div>

          <div style={{ marginTop: '2rem' }}>
            {activeTab === 'concerts' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <h2>演奏会情報の管理</h2>
                  {!isEditing && (
                    <button
                      onClick={handleAdd}
                      style={{
                        padding: '0.75rem 1.5rem',
                        background: 'var(--accent)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                      }}
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                      <p>現在 {concerts?.length || 0} 件の演奏会が登録されています。</p>
                      <input
                        type="text"
                        placeholder="検索..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                          padding: '0.75rem 1rem',
                          borderRadius: '8px',
                          border: '1px solid var(--border)',
                          fontSize: '1rem',
                          minWidth: '300px',
                        }}
                      />
                    </div>
                    <div style={{ marginTop: '1.5rem' }}>
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
                          style={{
                            padding: '1.5rem',
                            marginBottom: '1rem',
                            background: 'var(--background-secondary)',
                            borderRadius: '8px',
                            border: '1px solid var(--border)',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <div>
                              <h3 style={{ margin: '0 0 0.5rem 0' }}>
                                第{concert.concertNumber}回定期演奏会
                              </h3>
                              <p style={{ margin: '0.25rem 0', color: 'var(--text-secondary)' }}>
                                {concert.date} @ {concert.venue}
                              </p>
                              {concert.conductor && (
                                <p style={{ margin: '0.25rem 0', color: 'var(--text-secondary)' }}>
                                  指揮: {concert.conductor}
                                </p>
                              )}
                              {concert.pieces && concert.pieces.length > 0 && (
                                <div style={{ marginTop: '0.5rem' }}>
                                  <p style={{ margin: '0.25rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                    曲目:
                                  </p>
                                  {concert.pieces.map((piece: string, idx: number) => (
                                    <p key={idx} style={{ margin: '0.1rem 0 0.1rem 1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                      • {piece}
                                    </p>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <button
                                onClick={() => handleEdit(concert)}
                                style={{
                                  padding: '0.5rem 1rem',
                                  background: 'var(--accent)',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                  fontSize: '0.9rem',
                                }}
                              >
                                編集
                              </button>
                              <button
                                onClick={() => handleDelete(concert.id)}
                                style={{
                                  padding: '0.5rem 1rem',
                                  background: '#dc3545',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                  fontSize: '0.9rem',
                                }}
                              >
                                削除
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {concerts.length === 0 && (
                        <p style={{ color: 'var(--text-secondary)' }}>演奏会がまだ登録されていません。</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'members' && (
              <div>
                <h2>執行部メンバーの管理</h2>
                <div
                  style={{
                    marginTop: '2rem',
                    padding: '2rem',
                    background: 'var(--background-secondary)',
                    borderRadius: '8px',
                    border: '2px dashed var(--accent)',
                  }}
                >
                  <p>この機能は現在開発中です。</p>
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
      style={{
        padding: '2rem',
        background: 'var(--background-secondary)',
        borderRadius: '8px',
        border: '1px solid var(--border)',
      }}
    >
      <h3>{concert ? '演奏会情報の編集' : '新規演奏会の追加'}</h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            演奏会番号 *
          </label>
          <input
            type="number"
            required
            value={formData.concertNumber}
            onChange={(e) => setFormData({ ...formData, concertNumber: parseInt(e.target.value) })}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '4px',
              border: '1px solid var(--border)',
              fontSize: '1rem',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            日付 *
          </label>
          <input
            type="text"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            placeholder="例: 2025年12月21日（日）"
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '4px',
              border: '1px solid var(--border)',
              fontSize: '1rem',
            }}
          />
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            会場 *
          </label>
          <input
            type="text"
            required
            value={formData.venue}
            onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '4px',
              border: '1px solid var(--border)',
              fontSize: '1rem',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            指揮者 *
          </label>
          <input
            type="text"
            required
            value={formData.conductor}
            onChange={(e) => setFormData({ ...formData, conductor: e.target.value })}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '4px',
              border: '1px solid var(--border)',
              fontSize: '1rem',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            ステータス
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '4px',
              border: '1px solid var(--border)',
              fontSize: '1rem',
            }}
          >
            <option value="completed">開催済み</option>
            <option value="upcoming">開催予定</option>
          </select>
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            チケット販売URL
          </label>
          <input
            type="url"
            value={formData.ticketUrl}
            onChange={(e) => setFormData({ ...formData, ticketUrl: e.target.value })}
            placeholder="https://teket.jp/..."
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '4px',
              border: '1px solid var(--border)',
              fontSize: '1rem',
            }}
          />
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            合唱団
          </label>
          <input
            type="text"
            value={formData.chorus}
            onChange={(e) => setFormData({ ...formData, chorus: e.target.value })}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '4px',
              border: '1px solid var(--border)',
              fontSize: '1rem',
            }}
          />
        </div>

        <div style={{ gridColumn: '1 / -1', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label style={{ fontWeight: 'bold' }}>ソリスト</label>
            <button
              type="button"
              onClick={handleAddSoloist}
              style={{
                padding: '0.5rem 1rem',
                background: 'var(--accent)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              + 追加
            </button>
          </div>
          {soloists.map((soloist, index) => (
            <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'start' }}>
              <input
                type="text"
                value={soloist.name}
                onChange={(e) => handleSoloistChange(index, 'name', e.target.value)}
                placeholder="名前"
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: '4px',
                  border: '1px solid var(--border)',
                  fontSize: '1rem',
                }}
              />
              <input
                type="text"
                value={soloist.instrument}
                onChange={(e) => handleSoloistChange(index, 'instrument', e.target.value)}
                placeholder="楽器（例: チェロ、オルガン）"
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: '4px',
                  border: '1px solid var(--border)',
                  fontSize: '1rem',
                }}
              />
              {soloists.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveSoloist(index)}
                  style={{
                    padding: '0.75rem 1rem',
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                >
                  削除
                </button>
              )}
            </div>
          ))}
        </div>

        <div style={{ gridColumn: '1 / -1', marginTop: '1rem', marginBottom: '1rem' }}>
          <button
            type="button"
            onClick={() => setShowSingers(!showSingers)}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: showSingers ? '#e9ecef' : 'var(--accent)',
              color: showSingers ? 'var(--text)' : 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
          >
            {showSingers ? '独唱者セクションを閉じる ↑' : '独唱者を追加 ↓'}
          </button>
        </div>

        {showSingers && (
          <>
            <div style={{ gridColumn: '1 / -1', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ fontWeight: 'bold' }}>ソプラノ</label>
            <button
              type="button"
              onClick={sopranoHandlers.add}
              style={{
                padding: '0.5rem 1rem',
                background: 'var(--accent)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              + 追加
            </button>
          </div>
          {sopranos.map((soprano, index) => (
            <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'start' }}>
              <input
                type="text"
                value={soprano}
                onChange={(e) => sopranoHandlers.change(index, e.target.value)}
                placeholder="名前を入力"
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: '4px',
                  border: '1px solid var(--border)',
                  fontSize: '1rem',
                }}
              />
              {sopranos.length > 1 && (
                <button
                  type="button"
                  onClick={() => sopranoHandlers.remove(index)}
                  style={{
                    padding: '0.75rem 1rem',
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                >
                  削除
                </button>
              )}
            </div>
          ))}
        </div>

        <div style={{ gridColumn: '1 / -1', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label style={{ fontWeight: 'bold' }}>メゾソプラノ</label>
            <button
              type="button"
              onClick={mezzoSopranoHandlers.add}
              style={{
                padding: '0.5rem 1rem',
                background: 'var(--accent)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              + 追加
            </button>
          </div>
          {mezzoSopranos.map((mezzoSoprano, index) => (
            <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'start' }}>
              <input
                type="text"
                value={mezzoSoprano}
                onChange={(e) => mezzoSopranoHandlers.change(index, e.target.value)}
                placeholder="名前を入力"
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: '4px',
                  border: '1px solid var(--border)',
                  fontSize: '1rem',
                }}
              />
              {mezzoSopranos.length > 1 && (
                <button
                  type="button"
                  onClick={() => mezzoSopranoHandlers.remove(index)}
                  style={{
                    padding: '0.75rem 1rem',
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                >
                  削除
                </button>
              )}
            </div>
          ))}
        </div>

        <div style={{ gridColumn: '1 / -1', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label style={{ fontWeight: 'bold' }}>アルト</label>
            <button
              type="button"
              onClick={altoHandlers.add}
              style={{
                padding: '0.5rem 1rem',
                background: 'var(--accent)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              + 追加
            </button>
          </div>
          {altos.map((alto, index) => (
            <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'start' }}>
              <input
                type="text"
                value={alto}
                onChange={(e) => altoHandlers.change(index, e.target.value)}
                placeholder="名前を入力"
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: '4px',
                  border: '1px solid var(--border)',
                  fontSize: '1rem',
                }}
              />
              {altos.length > 1 && (
                <button
                  type="button"
                  onClick={() => altoHandlers.remove(index)}
                  style={{
                    padding: '0.75rem 1rem',
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                >
                  削除
                </button>
              )}
            </div>
          ))}
        </div>

        <div style={{ gridColumn: '1 / -1', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label style={{ fontWeight: 'bold' }}>テノール</label>
            <button
              type="button"
              onClick={tenorHandlers.add}
              style={{
                padding: '0.5rem 1rem',
                background: 'var(--accent)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              + 追加
            </button>
          </div>
          {tenors.map((tenor, index) => (
            <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'start' }}>
              <input
                type="text"
                value={tenor}
                onChange={(e) => tenorHandlers.change(index, e.target.value)}
                placeholder="名前を入力"
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: '4px',
                  border: '1px solid var(--border)',
                  fontSize: '1rem',
                }}
              />
              {tenors.length > 1 && (
                <button
                  type="button"
                  onClick={() => tenorHandlers.remove(index)}
                  style={{
                    padding: '0.75rem 1rem',
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                >
                  削除
                </button>
              )}
            </div>
          ))}
        </div>

        <div style={{ gridColumn: '1 / -1', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label style={{ fontWeight: 'bold' }}>バスバリトン</label>
            <button
              type="button"
              onClick={bassBaritoneHandlers.add}
              style={{
                padding: '0.5rem 1rem',
                background: 'var(--accent)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              + 追加
            </button>
          </div>
          {bassBaritones.map((bassBaritone, index) => (
            <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'start' }}>
              <input
                type="text"
                value={bassBaritone}
                onChange={(e) => bassBaritoneHandlers.change(index, e.target.value)}
                placeholder="名前を入力"
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: '4px',
                  border: '1px solid var(--border)',
                  fontSize: '1rem',
                }}
              />
              {bassBaritones.length > 1 && (
                <button
                  type="button"
                  onClick={() => bassBaritoneHandlers.remove(index)}
                  style={{
                    padding: '0.75rem 1rem',
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                >
                  削除
                </button>
              )}
            </div>
          ))}
        </div>
          </>
        )}

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            曲目 (改行区切り)
          </label>
          <textarea
            value={formData.pieces}
            onChange={(e) => setFormData({ ...formData, pieces: e.target.value })}
            rows={5}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '4px',
              border: '1px solid var(--border)',
              fontSize: '1rem',
              fontFamily: 'inherit',
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <button
          type="submit"
          disabled={saving}
          style={{
            padding: '0.75rem 2rem',
            background: saving ? '#ccc' : 'var(--accent)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: saving ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            opacity: saving ? 0.6 : 1,
          }}
        >
          {saving ? '保存中...' : '保存'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          style={{
            padding: '0.75rem 2rem',
            background: 'transparent',
            color: 'var(--text)',
            border: '1px solid var(--border)',
            borderRadius: '4px',
            cursor: saving ? 'not-allowed' : 'pointer',
            opacity: saving ? 0.6 : 1,
            fontSize: '1rem',
          }}
        >
          キャンセル
        </button>
      </div>
    </form>
  );
}
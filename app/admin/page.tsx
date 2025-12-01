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
  images?: ConcertImage[];
  [key: string]: any;
}

interface ConcertImage {
  id: number;
  imagePath: string;
  imageType: string;
  composerName?: string | null;
}

interface Trainer {
  id: number;
  name: string;
  instrument: string;
  title: string | null;
  description: string | null;
  imagePath: string | null;
  order: number;
  images?: { id: number; imagePath: string; isPrimary: boolean }[];
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'concerts' | 'trainers' | 'members'>('concerts');
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [trainerSaving, setTrainerSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingConcert, setEditingConcert] = useState<Concert | null>(null);
  const [isEditingTrainer, setIsEditingTrainer] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState<Trainer | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [trainerSearchQuery, setTrainerSearchQuery] = useState('');
  const [newTrainerImagePath, setNewTrainerImagePath] = useState<Record<number, string>>({});
  const [newTrainerImagePrimary, setNewTrainerImagePrimary] = useState<Record<number, boolean>>({});
  const [trainerImageLoading, setTrainerImageLoading] = useState<Record<number, boolean>>({});
  const [concertImageForms, setConcertImageForms] = useState<
    Record<number, { imagePath: string; imageType: string; composerName: string }>
  >({});
  const [concertImageEdits, setConcertImageEdits] = useState<
    Record<number, { imagePath: string; imageType: string; composerName: string }>
  >({});
  const [concertImageLoading, setConcertImageLoading] = useState<Record<number, boolean>>({});
  const [concertImageRowLoading, setConcertImageRowLoading] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setLoading(true);
    if (activeTab === 'concerts') {
      fetchConcerts();
    } else if (activeTab === 'trainers') {
      fetchTrainers();
    } else {
      setLoading(false);
    }
  }, [activeTab]);

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

  const updateConcertImageForm = (
    concertId: number,
    field: 'imagePath' | 'imageType' | 'composerName',
    value: string,
  ) => {
    setConcertImageForms((prev) => ({
      ...prev,
      [concertId]: {
        imagePath: prev[concertId]?.imagePath ?? '',
        imageType: prev[concertId]?.imageType ?? 'poster',
        composerName: prev[concertId]?.composerName ?? '',
        [field]: value,
      },
    }));
  };

  const updateConcertImageDraft = (
    imageId: number,
    field: 'imagePath' | 'imageType' | 'composerName',
    value: string,
    fallback: ConcertImage,
  ) => {
    setConcertImageEdits((prev) => {
      const base = prev[imageId] ?? {
        imagePath: fallback.imagePath,
        imageType: fallback.imageType,
        composerName: fallback.composerName ?? '',
      };
      return {
        ...prev,
        [imageId]: {
          ...base,
          [field]: value,
        },
      };
    });
  };

  const setConcertImageLoadingState = (concertId: number, value: boolean) => {
    setConcertImageLoading((prev) => ({ ...prev, [concertId]: value }));
  };

  const setConcertImageRowLoadingState = (imageId: number, value: boolean) => {
    setConcertImageRowLoading((prev) => ({ ...prev, [imageId]: value }));
  };

  const handleConcertImageAdd = async (concertId: number) => {
    const form = concertImageForms[concertId] ?? {
      imagePath: '',
      imageType: 'poster',
      composerName: '',
    };

    if (!form.imagePath.trim()) {
      alert('画像パスを入力してください');
      return;
    }

    setConcertImageLoadingState(concertId, true);
    try {
      const response = await fetch(`/api/admin/concerts/${concertId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imagePath: form.imagePath.trim(),
          imageType: form.imageType || 'poster',
          composerName: form.composerName?.trim() || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add image');
      }

      setConcertImageForms((prev) => ({
        ...prev,
        [concertId]: { imagePath: '', imageType: 'poster', composerName: '' },
      }));
      await fetchConcerts();
    } catch (error) {
      console.error('Failed to add concert image:', error);
      alert('画像の追加に失敗しました');
    } finally {
      setConcertImageLoadingState(concertId, false);
    }
  };

  const handleConcertImageDelete = async (concertId: number, imageId: number) => {
    if (!confirm('この画像を削除してもよろしいですか？')) return;
    setConcertImageRowLoadingState(imageId, true);
    try {
      const response = await fetch(`/api/admin/concerts/${concertId}/images/${imageId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete image');
      }

      await fetchConcerts();
      setConcertImageEdits((prev) => {
        const next = { ...prev };
        delete next[imageId];
        return next;
      });
    } catch (error) {
      console.error('Failed to delete concert image:', error);
      alert('画像の削除に失敗しました');
    } finally {
      setConcertImageRowLoadingState(imageId, false);
    }
  };

  const handleConcertImageUpdate = async (
    concertId: number,
    image: ConcertImage,
  ) => {
    const draft = concertImageEdits[image.id] ?? {
      imagePath: image.imagePath,
      imageType: image.imageType,
      composerName: image.composerName ?? '',
    };

    setConcertImageRowLoadingState(image.id, true);
    try {
      const response = await fetch(`/api/admin/concerts/${concertId}/images/${image.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imagePath: draft.imagePath.trim(),
          imageType: draft.imageType,
          composerName: draft.composerName.trim() || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update image');
      }

      await fetchConcerts();
      setConcertImageEdits((prev) => {
        const next = { ...prev };
        delete next[image.id];
        return next;
      });
    } catch (error) {
      console.error('Failed to update concert image:', error);
      alert('画像の更新に失敗しました');
    } finally {
      setConcertImageRowLoadingState(image.id, false);
    }
  };

  const fetchTrainers = async () => {
    try {
      const response = await fetch('/api/admin/trainers');
      if (!response.ok) throw new Error('Failed to fetch trainers');
      const data = await response.json();
      setTrainers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch trainers:', error);
      setTrainers([]);
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

  const handleTrainerDelete = async (id: number) => {
    if (!confirm('このトレーナーを削除してもよろしいですか？')) return;

    try {
      const response = await fetch(`/api/admin/trainers/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTrainers(trainers.filter((t) => t.id !== id));
        alert('削除しました');
      } else {
        throw new Error('Failed');
      }
    } catch (error) {
      console.error('Failed to delete trainer:', error);
      alert('削除に失敗しました');
    }
  };

  const handleTrainerEdit = (trainer: Trainer) => {
    setEditingTrainer(trainer);
    setIsEditingTrainer(true);
  };

  const handleTrainerAdd = () => {
    setEditingTrainer(null);
    setIsEditingTrainer(true);
  };

  const handleTrainerSave = async (trainerData: Partial<Trainer>) => {
    setTrainerSaving(true);
    try {
      let response;
      if (editingTrainer) {
        response = await fetch(`/api/admin/trainers/${editingTrainer.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(trainerData),
        });
      } else {
        response = await fetch('/api/admin/trainers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(trainerData),
        });
      }

      if (response.ok) {
        alert(editingTrainer ? '更新しました' : '追加しました');
        setIsEditingTrainer(false);
        setEditingTrainer(null);
        await fetchTrainers();
      } else {
        const errorData = await response.json();
        console.error('Failed to save trainer:', errorData);
        alert('保存に失敗しました: ' + (errorData.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Failed to save trainer:', error);
      alert('保存に失敗しました');
    } finally {
      setTrainerSaving(false);
    }
  };

  const setTrainerImageLoadingState = (trainerId: number, value: boolean) => {
    setTrainerImageLoading((prev) => ({ ...prev, [trainerId]: value }));
  };

  const handleTrainerImageAdd = async (trainerId: number) => {
    const imagePath = (newTrainerImagePath[trainerId] || '').trim();
    if (!imagePath) {
      alert('画像パスを入力してください');
      return;
    }

    setTrainerImageLoadingState(trainerId, true);
    try {
      const response = await fetch(`/api/admin/trainers/${trainerId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imagePath,
          isPrimary: newTrainerImagePrimary[trainerId] || false,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add image');
      }

      setNewTrainerImagePath((prev) => ({ ...prev, [trainerId]: '' }));
      setNewTrainerImagePrimary((prev) => ({ ...prev, [trainerId]: false }));
      await fetchTrainers();
    } catch (error) {
      console.error('Failed to add trainer image:', error);
      alert('画像の追加に失敗しました');
    } finally {
      setTrainerImageLoadingState(trainerId, false);
    }
  };

  const handleTrainerImageDelete = async (trainerId: number, imageId: number) => {
    if (!confirm('この画像を削除してもよろしいですか？')) return;

    setTrainerImageLoadingState(trainerId, true);
    try {
      const response = await fetch(`/api/admin/trainers/${trainerId}/images/${imageId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete image');
      }

      await fetchTrainers();
    } catch (error) {
      console.error('Failed to delete trainer image:', error);
      alert('画像の削除に失敗しました');
    } finally {
      setTrainerImageLoadingState(trainerId, false);
    }
  };

  const handleTrainerImageSetPrimary = async (trainerId: number, imageId: number) => {
    setTrainerImageLoadingState(trainerId, true);
    try {
      const response = await fetch(`/api/admin/trainers/${trainerId}/images/${imageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPrimary: true }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update image');
      }

      await fetchTrainers();
    } catch (error) {
      console.error('Failed to set primary trainer image:', error);
      alert('メイン画像の設定に失敗しました');
    } finally {
      setTrainerImageLoadingState(trainerId, false);
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
            <p className="text-base leading-loose dark:text-[#cccccc]">読み込み中...</p>
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
          <div className="flex justify-between items-center mb-8 pb-2 border-b border-accent dark:border-[#4aaaf0]">
            <h1 className="text-4xl text-accent dark:text-[#4aaaf0] m-0">管理者ページ</h1>
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
                  ? 'border-b-[3px] border-accent dark:border-[#4aaaf0] text-accent dark:text-[#4aaaf0] font-bold' 
                  : 'border-b-[3px] border-transparent text-text dark:text-[#cccccc] font-normal'
              }`}
            >
              演奏会情報
            </button>
            <button
              onClick={() => setActiveTab('trainers')}
              className={`px-8 py-4 bg-transparent border-0 cursor-pointer text-base transition-all duration-300 ease ${
                activeTab === 'trainers'
                  ? 'border-b-[3px] border-accent dark:border-[#4aaaf0] text-accent dark:text-[#4aaaf0] font-bold'
                  : 'border-b-[3px] border-transparent text-text dark:text-[#cccccc] font-normal'
              }`}
            >
              トレーナー情報
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`px-8 py-4 bg-transparent border-0 cursor-pointer text-base transition-all duration-300 ease ${
                activeTab === 'members' 
                  ? 'border-b-[3px] border-accent dark:border-[#4aaaf0] text-accent dark:text-[#4aaaf0] font-bold' 
                  : 'border-b-[3px] border-transparent text-text dark:text-[#cccccc] font-normal'
              }`}
            >
              執行部情報
            </button>
          </div>

          <div className="mt-8">
            {activeTab === 'concerts' && (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl mb-4 text-text-secondary dark:text-[#d4d4d4] m-0">演奏会情報の管理</h2>
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
                      <p className="text-base leading-loose dark:text-[#cccccc]">現在 {concerts?.length || 0} 件の演奏会が登録されています。</p>
                      <input
                        type="text"
                        placeholder="検索..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-3 rounded-lg border border-border dark:border-[#3e3e42] text-base dark:text-[#cccccc] dark:bg-[#1e1e1e] min-w-[300px] outline-none transition-colors duration-fast focus:border-accent dark:focus:border-[#4aaaf0]"
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
                          className="p-6 mb-4 bg-gray-lightest dark:bg-[#252526] rounded-lg border border-border dark:border-[#3e3e42]"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="m-0 mb-2 text-xl font-semibold text-accent dark:text-[#4aaaf0]">
                                第{concert.concertNumber}回定期演奏会
                              </h3>
                              <p className="my-1 text-text-secondary dark:text-[#cccccc]">
                                {concert.date} @ {concert.venue}
                              </p>
                              {concert.conductor && (
                                <p className="my-1 text-text-secondary dark:text-[#cccccc]">
                                  指揮: {concert.conductor}
                                </p>
                              )}
                              {concert.pieces && concert.pieces.length > 0 && (
                                <div className="mt-2">
                                  <p className="my-1 text-text-secondary dark:text-[#cccccc] text-sm font-bold">
                                    曲目:
                                  </p>
                                  {concert.pieces.map((piece: string, idx: number) => (
                                    <p key={idx} className="my-0.5 ml-4 text-text-secondary dark:text-[#cccccc] text-sm">
                                      • {piece}
                                    </p>
                                  ))}
                                </div>
                              )}
                              <div className="mt-4">
                                <p className="text-sm font-semibold text-text-secondary dark:text-[#d4d4d4] mb-2">画像一覧</p>
                                {concert.images && concert.images.length > 0 ? (
                                  <div className="flex flex-col gap-4">
                                    {concert.images.map((image) => {
                                      const draft = concertImageEdits[image.id] ?? {
                                        imagePath: image.imagePath,
                                        imageType: image.imageType,
                                        composerName: image.composerName ?? '',
                                      };
                                      return (
                                        <div key={image.id} className="p-3 rounded border border-border dark:border-[#3e3e42]">
                                          <div className="flex flex-col gap-2">
                                            <label className="text-xs font-semibold text-text-secondary dark:text-[#cccccc]">
                                              画像パス
                                            </label>
                                            <input
                                              type="text"
                                              value={draft.imagePath}
                                              onChange={(e) =>
                                                updateConcertImageDraft(image.id, 'imagePath', e.target.value, image)
                                              }
                                              className="w-full p-2 rounded border border-border dark:border-[#3e3e42] text-sm dark:text-[#cccccc] dark:bg-[#1e1e1e] outline-none transition-colors duration-fast focus:border-accent dark:focus:border-[#4aaaf0]"
                                            />
                                            <div className="grid grid-cols-2 gap-2">
                                              <div>
                                                <label className="block text-xs font-semibold text-text-secondary dark:text-[#cccccc] mb-1">
                                                  種類
                                                </label>
                                                <select
                                                  value={draft.imageType}
                                                  onChange={(e) =>
                                                    updateConcertImageDraft(image.id, 'imageType', e.target.value, image)
                                                  }
                                                  className="w-full p-2 rounded border border-border dark:border-[#3e3e42] text-sm dark:text-[#cccccc] dark:bg-[#1e1e1e] outline-none transition-colors duration-fast focus:border-accent dark:focus:border-[#4aaaf0]"
                                                >
                                                  <option value="poster">ポスター</option>
                                                  <option value="fallback">代替画像</option>
                                                </select>
                                              </div>
                                              <div>
                                                <label className="block text-xs font-semibold text-text-secondary dark:text-[#cccccc] mb-1">
                                                  作曲者／補足
                                                </label>
                                                <input
                                                  type="text"
                                                  value={draft.composerName}
                                                  onChange={(e) =>
                                                    updateConcertImageDraft(image.id, 'composerName', e.target.value, image)
                                                  }
                                                  placeholder="例: Beethoven"
                                                  className="w-full p-2 rounded border border-border dark:border-[#3e3e42] text-sm dark:text-[#cccccc] dark:bg-[#1e1e1e] outline-none transition-colors duration-fast focus:border-accent dark:focus:border-[#4aaaf0]"
                                                />
                                              </div>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                              <button
                                                onClick={() => handleConcertImageUpdate(concert.id, image)}
                                                className="px-4 py-2 bg-accent text-white border-0 rounded cursor-pointer text-sm transition-opacity duration-fast hover:opacity-90 disabled:opacity-60"
                                                disabled={concertImageRowLoading[image.id]}
                                              >
                                                保存
                                              </button>
                                              <button
                                                onClick={() => handleConcertImageDelete(concert.id, image.id)}
                                                className="px-4 py-2 bg-red-600 text-white border-0 rounded cursor-pointer text-sm transition-opacity duration-fast hover:opacity-90 disabled:opacity-60"
                                                disabled={concertImageRowLoading[image.id]}
                                              >
                                                削除
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                ) : (
                                  <p className="text-sm text-muted dark:text-[#858585]">画像がまだ登録されていません。</p>
                                )}
                                <div className="mt-4 flex flex-col gap-3">
                                  <input
                                    type="text"
                                    value={concertImageForms[concert.id]?.imagePath || ''}
                                    onChange={(e) => updateConcertImageForm(concert.id, 'imagePath', e.target.value)}
                                    placeholder="/RegularConcertPoster/125RegularConcertPoster.jpg"
                                    className="w-full p-2 rounded border border-border dark:border-[#3e3e42] text-sm dark:text-[#cccccc] dark:bg-[#1e1e1e] outline-none transition-colors duration-fast focus:border-accent dark:focus:border-[#4aaaf0]"
                                  />
                                  <div className="grid grid-cols-2 gap-2">
                                    <select
                                      value={concertImageForms[concert.id]?.imageType || 'poster'}
                                      onChange={(e) => updateConcertImageForm(concert.id, 'imageType', e.target.value)}
                                      className="w-full p-2 rounded border border-border dark:border-[#3e3e42] text-sm dark:text-[#cccccc] dark:bg-[#1e1e1e] outline-none transition-colors duration-fast focus:border-accent dark:focus:border-[#4aaaf0]"
                                    >
                                      <option value="poster">ポスター</option>
                                      <option value="fallback">代替画像</option>
                                    </select>
                                    <input
                                      type="text"
                                      value={concertImageForms[concert.id]?.composerName || ''}
                                      onChange={(e) => updateConcertImageForm(concert.id, 'composerName', e.target.value)}
                                      placeholder="作曲者名など"
                                      className="w-full p-2 rounded border border-border dark:border-[#3e3e42] text-sm dark:text-[#cccccc] dark:bg-[#1e1e1e] outline-none transition-colors duration-fast focus:border-accent dark:focus:border-[#4aaaf0]"
                                    />
                                  </div>
                                  <button
                                    onClick={() => handleConcertImageAdd(concert.id)}
                                    className="self-start px-4 py-2 bg-accent text-white border-0 rounded cursor-pointer text-sm transition-opacity duration-fast hover:opacity-90 disabled:opacity-60"
                                    disabled={concertImageLoading[concert.id]}
                                  >
                                    画像を追加
                                  </button>
                                </div>
                              </div>
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
                        <p className="text-text-secondary dark:text-[#cccccc]">演奏会がまだ登録されていません。</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'trainers' && (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl mb-4 text-text-secondary dark:text-[#d4d4d4] m-0">トレーナー情報の管理</h2>
                  {!isEditingTrainer && (
                    <button
                      onClick={handleTrainerAdd}
                      className="px-6 py-3 bg-accent text-white border-0 rounded cursor-pointer text-sm font-bold transition-opacity duration-fast hover:opacity-90"
                    >
                      + 新規追加
                    </button>
                  )}
                </div>

                {isEditingTrainer ? (
                  <TrainerEditForm
                    trainer={editingTrainer}
                    saving={trainerSaving}
                    onSave={handleTrainerSave}
                    onCancel={() => {
                      setIsEditingTrainer(false);
                      setEditingTrainer(null);
                    }}
                  />
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <p className="text-base leading-loose dark:text-[#cccccc]">現在 {trainers?.length || 0} 件のトレーナーが登録されています。</p>
                      <input
                        type="text"
                        placeholder="検索..."
                        value={trainerSearchQuery}
                        onChange={(e) => setTrainerSearchQuery(e.target.value)}
                        className="px-4 py-3 rounded-lg border border-border dark:border-[#3e3e42] text-base dark:text-[#cccccc] dark:bg-[#1e1e1e] min-w-[300px] outline-none transition-colors duration-fast focus:border-accent dark:focus:border-[#4aaaf0]"
                      />
                    </div>
                    <div className="mt-6">
                      {(Array.isArray(trainers) ? trainers : [])
                        .filter((trainer) => {
                          if (!trainerSearchQuery) return true;
                          const query = trainerSearchQuery.toLowerCase();
                          return (
                            trainer.name?.toLowerCase().includes(query) ||
                            trainer.instrument?.toLowerCase().includes(query) ||
                            trainer.title?.toLowerCase().includes(query) ||
                            trainer.description?.toLowerCase().includes(query)
                          );
                        })
                        .map((trainer) => (
                          <div
                            key={trainer.id}
                            className="p-6 mb-4 bg-gray-lightest dark:bg-[#252526] rounded-lg border border-border dark:border-[#3e3e42]"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="m-0 mb-2 text-xl font-semibold text-accent dark:text-[#4aaaf0]">
                                  {trainer.name} ({trainer.instrument})
                                </h3>
                                {trainer.title && (
                                  <p className="my-1 text-text-secondary dark:text-[#cccccc]">
                                    {trainer.title}
                                  </p>
                                )}
                                {trainer.description && (
                                  <p className="my-1 text-text-secondary dark:text-[#cccccc] text-sm leading-relaxed">
                                    {trainer.description}
                                  </p>
                                )}
                                {trainer.imagePath && (
                                  <p className="my-1 text-text-secondary dark:text-[#cccccc] text-sm">
                                    画像パス: {trainer.imagePath}
                                  </p>
                                )}
                                <p className="my-1 text-text-secondary dark:text-[#cccccc] text-sm">
                                  表示順: {trainer.order}
                                </p>
                                <div className="mt-4">
                                  <p className="text-sm font-semibold text-text-secondary dark:text-[#d4d4d4] mb-2">画像一覧</p>
                                  {trainer.images && trainer.images.length > 0 ? (
                                    <div className="flex flex-col gap-2">
                                      {trainer.images.map((image) => (
                                        <div
                                          key={image.id}
                                          className="flex flex-wrap items-center gap-2 text-sm text-text-secondary dark:text-[#cccccc]"
                                        >
                                          <code className="bg-gray-100 dark:bg-[#1e1e1e] px-2 py-1 rounded border border-border dark:border-[#3e3e42] break-all">
                                            {image.imagePath}
                                          </code>
                                          {image.isPrimary && (
                                            <span className="text-xs font-semibold text-accent dark:text-[#4aaaf0]">メイン</span>
                                          )}
                                          {!image.isPrimary && (
                                            <button
                                              className="px-3 py-1 bg-transparent border border-accent dark:border-[#4aaaf0] text-accent dark:text-[#4aaaf0] rounded text-xs cursor-pointer transition-colors duration-fast hover:bg-accent hover:text-white disabled:opacity-60"
                                              onClick={() => handleTrainerImageSetPrimary(trainer.id, image.id)}
                                              disabled={trainerImageLoading[trainer.id]}
                                            >
                                              メインにする
                                            </button>
                                          )}
                                          <button
                                            className="px-3 py-1 bg-red-600 text-white border-0 rounded text-xs cursor-pointer transition-opacity duration-fast hover:opacity-90 disabled:opacity-60"
                                            onClick={() => handleTrainerImageDelete(trainer.id, image.id)}
                                            disabled={trainerImageLoading[trainer.id]}
                                          >
                                            削除
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-sm text-muted dark:text-[#858585]">画像がまだ登録されていません。</p>
                                  )}
                                  <div className="mt-4 flex flex-wrap items-center gap-3">
                                    <input
                                      type="text"
                                      value={newTrainerImagePath[trainer.id] || ''}
                                      onChange={(e) =>
                                        setNewTrainerImagePath((prev) => ({ ...prev, [trainer.id]: e.target.value }))
                                      }
                                      placeholder="/TrainerImage/example.jpg"
                                      className="flex-1 min-w-[200px] p-2 rounded border border-border dark:border-[#3e3e42] text-sm dark:text-[#cccccc] dark:bg-[#1e1e1e] outline-none transition-colors duration-fast focus:border-accent dark:focus:border-[#4aaaf0]"
                                    />
                                    <label className="flex items-center gap-2 text-sm text-text-secondary dark:text-[#cccccc]">
                                      <input
                                        type="checkbox"
                                        checked={newTrainerImagePrimary[trainer.id] || false}
                                        onChange={(e) =>
                                          setNewTrainerImagePrimary((prev) => ({ ...prev, [trainer.id]: e.target.checked }))
                                        }
                                      />
                                      メインにする
                                    </label>
                                    <button
                                      onClick={() => handleTrainerImageAdd(trainer.id)}
                                      className="px-4 py-2 bg-accent text-white border-0 rounded cursor-pointer text-sm transition-opacity duration-fast hover:opacity-90 disabled:opacity-60"
                                      disabled={trainerImageLoading[trainer.id]}
                                    >
                                      画像を追加
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleTrainerEdit(trainer)}
                                  className="px-4 py-2 bg-accent text-white border-0 rounded cursor-pointer text-sm transition-opacity duration-fast hover:opacity-90"
                                >
                                  編集
                                </button>
                                <button
                                  onClick={() => handleTrainerDelete(trainer.id)}
                                  className="px-4 py-2 bg-red-600 text-white border-0 rounded cursor-pointer text-sm transition-opacity duration-fast hover:opacity-90"
                                >
                                  削除
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      {trainers.length === 0 && (
                        <p className="text-text-secondary dark:text-[#cccccc]">トレーナーがまだ登録されていません。</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'members' && (
              <div>
                <h2 className="text-2xl mb-4 text-text-secondary dark:text-[#d4d4d4]">執行部メンバーの管理</h2>
                <div className="mt-8 p-8 bg-gray-lightest dark:bg-[#252526] rounded-lg border-2 border-dashed border-accent dark:border-[#4aaaf0]">
                  <p className="text-base leading-loose dark:text-[#cccccc]">この機能は現在開発中です。</p>
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
      className="p-8 bg-gray-lightest dark:bg-[#252526] rounded-lg border border-border dark:border-[#3e3e42]"
    >
      <h3 className="text-2xl mb-4 text-text-secondary dark:text-[#d4d4d4]">{concert ? '演奏会情報の編集' : '新規演奏会の追加'}</h3>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <label className="block mb-2 font-bold text-base dark:text-[#d4d4d4]">
            演奏会番号 *
          </label>
          <input
            type="number"
            required
            value={formData.concertNumber}
            onChange={(e) => setFormData({ ...formData, concertNumber: parseInt(e.target.value) })}
            className="w-full p-3 rounded border border-border dark:border-[#3e3e42] text-base dark:text-[#cccccc] dark:bg-[#1e1e1e] outline-none transition-colors duration-fast focus:border-accent dark:focus:border-[#4aaaf0]"
          />
        </div>

        <div>
          <label className="block mb-2 font-bold text-base dark:text-[#d4d4d4]">
            日付 *
          </label>
          <input
            type="text"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            placeholder="例: 2025年12月21日（日）"
            className="w-full p-3 rounded border border-border dark:border-[#3e3e42] text-base dark:text-[#cccccc] dark:bg-[#1e1e1e] outline-none transition-colors duration-fast focus:border-accent dark:focus:border-[#4aaaf0]"
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-2 font-bold text-base dark:text-[#d4d4d4]">
            会場 *
          </label>
          <input
            type="text"
            required
            value={formData.venue}
            onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
            className="w-full p-3 rounded border border-border dark:border-[#3e3e42] text-base dark:text-[#cccccc] dark:bg-[#1e1e1e] outline-none transition-colors duration-fast focus:border-accent dark:focus:border-[#4aaaf0]"
          />
        </div>

        <div>
          <label className="block mb-2 font-bold text-base dark:text-[#d4d4d4]">
            指揮者 *
          </label>
          <input
            type="text"
            required
            value={formData.conductor}
            onChange={(e) => setFormData({ ...formData, conductor: e.target.value })}
            className="w-full p-3 rounded border border-border dark:border-[#3e3e42] text-base dark:text-[#cccccc] dark:bg-[#1e1e1e] outline-none transition-colors duration-fast focus:border-accent dark:focus:border-[#4aaaf0]"
          />
        </div>

        <div>
          <label className="block mb-2 font-bold text-base dark:text-[#d4d4d4]">
            ステータス
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full p-3 rounded border border-border dark:border-[#3e3e42] text-base dark:text-[#cccccc] dark:bg-[#1e1e1e] outline-none transition-colors duration-fast focus:border-accent dark:focus:border-[#4aaaf0]"
          >
            <option value="completed">開催済み</option>
            <option value="upcoming">開催予定</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="block mb-2 font-bold text-base dark:text-[#d4d4d4]">
            チケット販売URL
          </label>
          <input
            type="url"
            value={formData.ticketUrl}
            onChange={(e) => setFormData({ ...formData, ticketUrl: e.target.value })}
            placeholder="https://teket.jp/..."
            className="w-full p-3 rounded border border-border dark:border-[#3e3e42] text-base dark:text-[#cccccc] dark:bg-[#1e1e1e] outline-none transition-colors duration-fast focus:border-accent dark:focus:border-[#4aaaf0]"
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-2 font-bold text-base dark:text-[#d4d4d4]">
            合唱団
          </label>
          <input
            type="text"
            value={formData.chorus}
            onChange={(e) => setFormData({ ...formData, chorus: e.target.value })}
            className="w-full p-3 rounded border border-border dark:border-[#3e3e42] text-base dark:text-[#cccccc] dark:bg-[#1e1e1e] outline-none transition-colors duration-fast focus:border-accent dark:focus:border-[#4aaaf0]"
          />
        </div>

        <div className="col-span-2 mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="font-bold text-base dark:text-[#d4d4d4]">ソリスト</label>
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
                className="flex-1 p-3 rounded border border-border dark:border-[#3e3e42] text-base dark:text-[#cccccc] dark:bg-[#1e1e1e] outline-none transition-colors duration-fast focus:border-accent dark:focus:border-[#4aaaf0]"
              />
              <input
                type="text"
                value={soloist.instrument}
                onChange={(e) => handleSoloistChange(index, 'instrument', e.target.value)}
                placeholder="楽器（例: チェロ、オルガン）"
                className="flex-1 p-3 rounded border border-border dark:border-[#3e3e42] text-base dark:text-[#cccccc] dark:bg-[#1e1e1e] outline-none transition-colors duration-fast focus:border-accent dark:focus:border-[#4aaaf0]"
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
                <label className="font-bold text-base dark:text-[#d4d4d4]">ソプラノ</label>
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
                    className="flex-1 p-3 rounded border border-border dark:border-[#3e3e42] text-base dark:text-[#cccccc] dark:bg-[#1e1e1e] outline-none transition-colors duration-fast focus:border-accent dark:focus:border-[#4aaaf0]"
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
                    className="flex-1 p-3 rounded border border-border dark:border-[#3e3e42] text-base dark:text-[#cccccc] dark:bg-[#1e1e1e] outline-none transition-colors duration-fast focus:border-accent dark:focus:border-[#4aaaf0]"
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
                    className="flex-1 p-3 rounded border border-border dark:border-[#3e3e42] text-base dark:text-[#cccccc] dark:bg-[#1e1e1e] outline-none transition-colors duration-fast focus:border-accent dark:focus:border-[#4aaaf0]"
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
                    className="flex-1 p-3 rounded border border-border dark:border-[#3e3e42] text-base dark:text-[#cccccc] dark:bg-[#1e1e1e] outline-none transition-colors duration-fast focus:border-accent dark:focus:border-[#4aaaf0]"
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
                    className="flex-1 p-3 rounded border border-border dark:border-[#3e3e42] text-base dark:text-[#cccccc] dark:bg-[#1e1e1e] outline-none transition-colors duration-fast focus:border-accent dark:focus:border-[#4aaaf0]"
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
          <label className="block mb-2 font-bold text-base dark:text-[#d4d4d4]">
            曲目 (改行区切り)
          </label>
          <textarea
            value={formData.pieces}
            onChange={(e) => setFormData({ ...formData, pieces: e.target.value })}
            rows={5}
            className="w-full p-3 rounded border border-border dark:border-[#3e3e42] text-base dark:text-[#cccccc] dark:bg-[#1e1e1e] font-sans outline-none transition-colors duration-fast focus:border-accent dark:focus:border-[#4aaaf0] resize-y"
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
          className={`px-8 py-3 bg-transparent text-text dark:text-[#cccccc] border border-border dark:border-[#3e3e42] rounded transition-opacity duration-fast text-base ${
            saving 
              ? 'cursor-not-allowed opacity-60' 
              : 'cursor-pointer hover:border-accent dark:hover:border-[#4aaaf0] hover:text-accent dark:hover:text-[#4aaaf0]'
          }`}
        >
          キャンセル
        </button>
      </div>
    </form>
  );
}

function TrainerEditForm({
  trainer,
  saving,
  onSave,
  onCancel,
}: {
  trainer: Trainer | null;
  saving: boolean;
  onSave: (data: Partial<Trainer>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    name: trainer?.name || '',
    instrument: trainer?.instrument || '',
    title: trainer?.title || '',
    description: trainer?.description || '',
    imagePath: trainer?.imagePath || '',
    order: trainer?.order ?? 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 bg-gray-lightest dark:bg-[#252526] rounded-lg border border-border dark:border-[#3e3e42]"
    >
      <h3 className="text-2xl mb-4 text-text-secondary dark:text-[#d4d4d4]">{trainer ? 'トレーナー情報の編集' : '新規トレーナーの追加'}</h3>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <label className="block mb-2 font-bold text-base dark:text-[#d4d4d4]">
            名前 *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 rounded border border-border dark:border-[#3e3e42] text-base dark:text-[#cccccc] dark:bg-[#1e1e1e] outline-none transition-colors duration-fast focus:border-accent dark:focus:border-[#4aaaf0]"
          />
        </div>

        <div>
          <label className="block mb-2 font-bold text-base dark:text-[#d4d4d4]">
            担当楽器 *
          </label>
          <input
            type="text"
            required
            value={formData.instrument}
            onChange={(e) => setFormData({ ...formData, instrument: e.target.value })}
            className="w-full p-3 rounded border border-border dark:border-[#3e3e42] text-base dark:text-[#cccccc] dark:bg-[#1e1e1e] outline-none transition-colors duration-fast focus:border-accent dark:focus:border-[#4aaaf0]"
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-2 font-bold text-base dark:text-[#d4d4d4]">
            肩書き
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-3 rounded border border-border dark:border-[#3e3e42] text-base dark:text-[#cccccc] dark:bg-[#1e1e1e] outline-none transition-colors duration-fast focus:border-accent dark:focus:border-[#4aaaf0]"
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-2 font-bold text-base dark:text-[#d4d4d4]">
            紹介文
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={5}
            className="w-full p-3 rounded border border-border dark:border-[#3e3e42] text-base dark:text-[#cccccc] dark:bg-[#1e1e1e] font-sans outline-none transition-colors duration-fast focus:border-accent dark:focus:border-[#4aaaf0] resize-y"
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-2 font-bold text-base dark:text-[#d4d4d4]">
            画像パス
          </label>
          <input
            type="text"
            value={formData.imagePath}
            onChange={(e) => setFormData({ ...formData, imagePath: e.target.value })}
            placeholder="/TrainerImage/example.jpg"
            className="w-full p-3 rounded border border-border dark:border-[#3e3e42] text-base dark:text-[#cccccc] dark:bg-[#1e1e1e] outline-none transition-colors duration-fast focus:border-accent dark:focus:border-[#4aaaf0]"
          />
        </div>

        <div>
          <label className="block mb-2 font-bold text-base dark:text-[#d4d4d4]">
            表示順
          </label>
          <input
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
            className="w-full p-3 rounded border border-border dark:border-[#3e3e42] text-base dark:text-[#cccccc] dark:bg-[#1e1e1e] outline-none transition-colors duration-fast focus:border-accent dark:focus:border-[#4aaaf0]"
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
          className={`px-8 py-3 bg-transparent text-text dark:text-[#cccccc] border border-border dark:border-[#3e3e42] rounded transition-opacity duration-fast text-base ${
            saving
              ? 'cursor-not-allowed opacity-60'
              : 'cursor-pointer hover:border-accent dark:hover:border-[#4aaaf0] hover:text-accent dark:hover:text-[#4aaaf0]'
          }`}
        >
          キャンセル
        </button>
      </div>
    </form>
  );
}
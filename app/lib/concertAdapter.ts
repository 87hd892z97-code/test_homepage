// データベース形式をフロントエンドのCard形式に変換するアダプター

interface DbConcert {
  id: number;
  concertNumber: number;
  date: string;
  venue: string;
  conductor?: string | null;
  studentConductor?: string | null;
  cancelled?: boolean;
  status?: string | null;
  pieces?: string[];
  chorus?: string | null;
  soprano?: string | null;
  mezzoSoprano?: string | null;
  alto?: string | null;
  tenor?: string | null;
  bassBaritone?: string | null;
  soloist?: string | null;
  soloistInstrument?: string | null;
  ticketUrl?: string | null;
}

interface FrontendConcert {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  time?: string;
  venue: string;
  conductor: string;
  price?: string;
  status: 'upcoming' | 'completed';
  description?: string;
  pieces?: string[];
  chorus?: string;
  soprano?: string;
  mezzoSoprano?: string;
  alto?: string;
  tenor?: string;
  bassBaritone?: string;
  soloist?: string;
  soloistInstrument?: string;
  ticketUrl?: string;
}

export function adaptDbConcertToFrontend(dbConcert: DbConcert): FrontendConcert {
  return {
    id: dbConcert.id,
    title: `第${dbConcert.concertNumber}回定期演奏会`,
    subtitle: dbConcert.pieces?.[0] || '',
    date: dbConcert.date,
    venue: dbConcert.venue,
    conductor: dbConcert.conductor || '',
    status: dbConcert.status === 'upcoming' ? 'upcoming' : 'completed',
    description: dbConcert.pieces ? dbConcert.pieces.join('、') : '',
    pieces: dbConcert.pieces,
    chorus: dbConcert.chorus || undefined,
    soprano: dbConcert.soprano || undefined,
    mezzoSoprano: dbConcert.mezzoSoprano || undefined,
    alto: dbConcert.alto || undefined,
    tenor: dbConcert.tenor || undefined,
    bassBaritone: dbConcert.bassBaritone || undefined,
    soloist: dbConcert.soloist || undefined,
    soloistInstrument: dbConcert.soloistInstrument || undefined,
    ticketUrl: dbConcert.ticketUrl || undefined,
  };
}

export function adaptDbConcertToPastConcert(dbConcert: DbConcert) {
  return {
    concert: `第${dbConcert.concertNumber}回`,
    date: dbConcert.date,
    venue: dbConcert.venue,
    conductor: dbConcert.conductor || undefined,
    studentConductor: dbConcert.studentConductor || undefined,
    pieces: dbConcert.pieces || [],
    cancelled: dbConcert.cancelled || false,
    chorus: dbConcert.chorus || undefined,
    soprano: dbConcert.soprano || undefined,
    soprano2: undefined,
    mezzoSoprano: dbConcert.mezzoSoprano || undefined,
    alto: dbConcert.alto || undefined,
    tenor: dbConcert.tenor || undefined,
    bassBaritone: dbConcert.bassBaritone || undefined,
    soloist: dbConcert.soloist || undefined,
  };
}


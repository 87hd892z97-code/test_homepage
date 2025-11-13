export default function Skeleton({ lines = 4 }: { lines?: number }) {
  return (
    <div className="block gap-2.5 py-2.5" aria-hidden>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 rounded-sm bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 bg-[200%_100%] animate-shimmer max-mobile:w-11 max-mobile:h-11" />
        <div style={{ flex: 1 }}>
          <div className="h-3 rounded-sm bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 bg-[200%_100%] animate-shimmer w-2/5 mb-1.5" />
          <div className="h-3 rounded-sm bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 bg-[200%_100%] animate-shimmer w-full mb-1.5" />
        </div>
      </div>

      {Array.from({ length: lines }).map((_, i) => (
        <div className="my-1.5" key={i}>
          <div className="h-3 rounded-sm bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 bg-[200%_100%] animate-shimmer w-full max-mobile:h-[11px]" />
        </div>
      ))}
    </div>
  );
}

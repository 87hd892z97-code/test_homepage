export default function Skeleton({ lines = 4 }: { lines?: number }) {
  return (
    <div className="skeleton" aria-hidden>
      <div className="skeleton-row">
        <div className="skeleton-avatar" />
        <div style={{ flex: 1 }}>
          <div className="skeleton-line short" />
          <div className="skeleton-line" />
        </div>
      </div>

      {Array.from({ length: lines }).map((_, i) => (
        <div className="skeleton-line-wrapper" key={i}>
          <div className="skeleton-line" />
        </div>
      ))}
    </div>
  );
}

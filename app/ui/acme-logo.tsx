import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        lineHeight: 1,
        color: 'white',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        style={{ transform: 'rotate(15deg)' }}
      >
        <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M3 12h18" stroke="white" strokeWidth="0.9" strokeLinecap="round" />
        <path d="M12 3c2.5 3 2.5 12 0 18" stroke="white" strokeWidth="0.9" strokeLinecap="round" />
        <path d="M12 3C9.5 6 9.5 15 12 21" stroke="white" strokeWidth="0.9" strokeLinecap="round" />
      </svg>

      <p style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>Acme</p>
    </div>
  );
}

type IconName =
  | "cart"
  | "play"
  | "flag"
  | "eye"
  | "box"
  | "heart"
  | "chevron"
  | "menu"
  | "close"
  | "instagram"
  | "facebook"
  | "tiktok";

const paths: Record<IconName, React.ReactNode> = {
  cart: (
    <>
      <circle cx="9" cy="20" r="1.6" />
      <circle cx="18" cy="20" r="1.6" />
      <path d="M2 3h3l2.6 12.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L21 8H6" />
    </>
  ),
  play: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M10 8.5v7l6-3.5z" fill="currentColor" />
    </>
  ),
  flag: <path d="M5 21V4m0 0h11l-2 4 2 4H5" />,
  eye: (
    <>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  box: (
    <>
      <path d="M21 8l-9-5-9 5v8l9 5 9-5z" />
      <path d="M3 8l9 5 9-5M12 13v8" />
    </>
  ),
  heart: <path d="M12 20s-7.5-4.6-9.3-9.2C1.4 7.2 4 4 7.2 4c2 0 3.6 1.2 4.8 3 1.2-1.8 2.8-3 4.8-3C20 4 22.6 7.2 21.3 10.8 19.5 15.4 12 20 12 20z" />,
  chevron: <path d="M6 9l6 6 6-6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </>
  ),
  facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5a.5.5 0 0 1 .5-.5z" />,
  tiktok: <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.4 2.8 2.2 4.6 5 5" />,
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}

export type { IconName };

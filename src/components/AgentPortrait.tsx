import Image from "next/image";

interface AgentPortraitProps {
  name: string;
  photo: string;
  credentials: string[];
}

export function AgentPortrait({ name, photo, credentials }: AgentPortraitProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const isPlaceholder = photo.includes("unsplash.com");

  return (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-sm">
      {isPlaceholder ? (
        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-navy to-ocean">
          <span className="font-serif text-6xl tracking-widest text-gold md:text-7xl">
            {initials}
          </span>
          <p className="mt-4 text-xs tracking-[0.2em] text-white/40 uppercase">
            Photo Coming Soon
          </p>
        </div>
      ) : (
        <Image
          src={photo}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      )}
      <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-navy/80 to-transparent p-6">
        <div className="flex flex-wrap gap-2">
          {credentials.map((cred) => (
            <span
              key={cred}
              className="border border-gold/40 px-2 py-0.5 text-[10px] tracking-wider text-gold uppercase"
            >
              {cred}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

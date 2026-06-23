import { PlaceholderCard } from "@/components/ui/PlaceholderCard";
import Image from "next/image";

interface AgentPortraitProps {
  name: string;
  photo: string;
  credentials: string[];
}

export function AgentPortrait({ name, photo, credentials }: AgentPortraitProps) {
  const isPlaceholder = !photo || photo.includes("unsplash.com");

  return (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-sm border border-sand bg-white shadow-sm">
      {isPlaceholder ? (
        <PlaceholderCard
          label="Agent portrait pending client upload"
          description="Professional photography will appear here once provided."
          variant="neutral"
          className="h-full border-0 bg-gradient-to-br from-sky/30 to-sand/40"
        />
      ) : (
        <Image
          src={photo}
          alt={`${name}, Principal Broker — professional portrait`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      )}
      {!isPlaceholder && (
        <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-navy/80 to-transparent p-6">
          <CredentialBadges credentials={credentials} />
        </div>
      )}
      {isPlaceholder && (
        <div className="absolute right-0 bottom-0 left-0 border-t border-sand bg-white/90 p-5">
          <CredentialBadges credentials={credentials} />
        </div>
      )}
    </div>
  );
}

function CredentialBadges({ credentials }: { credentials: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {credentials.map((cred) => (
        <span
          key={cred}
          className="border border-gold/30 bg-white/80 px-2.5 py-1 text-[10px] tracking-wider text-navy uppercase"
        >
          {cred}
        </span>
      ))}
    </div>
  );
}

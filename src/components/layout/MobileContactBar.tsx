"use client";

interface MobileContactBarProps {
  phone: string;
  email: string;
  wechat: string;
}

export function MobileContactBar({
  phone,
  email,
  wechat,
}: MobileContactBarProps) {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-40 flex border-t border-sand bg-white/95 backdrop-blur-sm lg:hidden">
      <a
        href={`tel:${phone}`}
        className="flex flex-1 items-center justify-center py-4 text-sm font-medium tracking-wider text-navy uppercase"
      >
        Call
      </a>
      <a
        href={`mailto:${email}`}
        className="flex flex-1 items-center justify-center border-l border-sand py-4 text-sm font-medium tracking-wider text-navy uppercase"
      >
        Email
      </a>
      <a
        href="/contact#wechat"
        className="flex flex-1 items-center justify-center border-l border-sand bg-gold py-4 text-sm font-medium tracking-wider text-navy uppercase"
        title={`WeChat: ${wechat}`}
      >
        WeChat
      </a>
    </div>
  );
}

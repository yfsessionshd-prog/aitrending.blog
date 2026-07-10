type AdSlotProps = {
  label?: string;
};

export function AdSlot({ label = "AI resource" }: AdSlotProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  return (
    <div className="ad-slot rounded-xl border border-dashed border-white/10 bg-white/[0.025] px-5 py-6 text-center">
      <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/35">{label}</p>
      {client && client !== "ca-pub-XXXX" ? (
        <ins className="adsbygoogle mt-3 block min-h-24" data-ad-client={client} data-ad-format="auto" data-full-width-responsive="true" />
      ) : (
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/45">
          Curated space for relevant AI tools, platforms and research resources.
        </p>
      )}
    </div>
  );
}

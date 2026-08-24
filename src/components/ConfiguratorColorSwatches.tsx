import { useState } from "react";
import { Img } from "@/components/Img";

interface Swatch {
  id: string;
  src: string;
  alt: string;
}

interface ConfiguratorColorSwatchesProps {
  swatches: Swatch[];
}

export function ConfiguratorColorSwatches({ swatches }: ConfiguratorColorSwatchesProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const selected = swatches[selectedIndex];

  return (
    <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-white shadow-sm transition-transform hover:scale-105"
        aria-label={`Geselecteerde kleur: ${selected.alt}`}
      >
        <Img src={selected.src} alt={selected.alt} className="h-full w-full object-cover" w={96} />
      </button>

      {isOpen && (
        <>
          {swatches.map((swatch, index) => {
            if (index === selectedIndex) return null;
            return (
              <button
                key={swatch.id}
                type="button"
                onClick={() => {
                  setSelectedIndex(index);
                  setIsOpen(false);
                }}
                className="h-8 w-8 overflow-hidden rounded-full border-2 border-white shadow-sm transition-transform hover:scale-105"
                aria-label={`Kies kleur ${swatch.alt}`}
              >
                <Img src={swatch.src} alt={swatch.alt} className="h-full w-full object-cover" w={96} />
              </button>
            );
          })}
        </>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="ml-1 text-[11px] font-[500] tracking-[0.08em] text-[#071426]/60 transition hover:text-[#071426]"
      >
        + meer
      </button>
    </div>
  );
}

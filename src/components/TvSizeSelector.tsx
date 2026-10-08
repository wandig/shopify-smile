import { Button } from "@/components/ui/button";
import { TV_INCHES, type TvInches } from "@/lib/tv-sizes";

interface TvSizeSelectorProps {
  selected: TvInches;
  onChange: (size: TvInches) => void;
  unavailable?: TvInches[];
}

export function TvSizeSelector({ selected, onChange, unavailable = [] }: TvSizeSelectorProps) {
  return (
    <div className="tv-size-selector" role="group" aria-label="Tv-maat">
      <div className="tv-size-selector-label">
        <span className="font-bold">Tv-maat</span>
        <span className="text-muted-foreground" aria-live="polite">{selected} inch</span>
      </div>
      <div className="tv-size-selector-options">
        {TV_INCHES.map((size) => (
          <Button
            key={size}
            type="button"
            variant="ghost"
            size="icon"
            className="tv-size-dot"
            aria-label={`${size} inch`}
            aria-pressed={selected === size}
            disabled={unavailable.includes(size)}
            title={unavailable.includes(size) ? `${size} inch — nog niet beschikbaar` : `${size} inch`}
            onClick={() => onChange(size)}
          >
            {size}
          </Button>
        ))}
      </div>
    </div>
  );
}
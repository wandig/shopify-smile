import { Img } from "@/components/Img";
import { useState } from "react";
import { Eye, Lock, Percent, ShieldCheck, X, Zap } from "lucide-react";

import in3Logo from "@/assets/in3-logo.jpg.asset.json";
import sprayPayLogo from "@/assets/spraypay.svg";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const euro = (value: number, decimals = 0) =>
  new Intl.NumberFormat("nl-NL", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-[#fff1e7] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#ef7027]">
    {children}
  </span>
);

const Perk = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex flex-col items-center gap-2 text-center">
    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fff1e7] text-[#ef7027]">{icon}</span>
    <span className="text-[11px] font-medium text-[#071426]">{label}</span>
  </div>
);

const Step = ({ index, title, body }: { index: number; title: string; body: string }) => (
  <div className="flex items-start gap-3">
    <span className="mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#071426] text-[10px] font-bold text-white">
      {index}
    </span>
    <div>
      <p className="text-[13px] font-semibold leading-tight text-[#071426]">{title}</p>
      <p className="mt-0.5 text-[12px] leading-snug text-[#071426]/55">{body}</p>
    </div>
  </div>
);

function BadgeButton({
  onClick,
  logo,
  children,
  ariaLabel,
}: {
  onClick: () => void;
  logo: React.ReactNode;
  children: React.ReactNode;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="flex w-full flex-col items-start gap-1 rounded-[14px] border border-[#eeeeee] bg-white px-2 py-2.5 text-left transition hover:border-[#ef7027]/45 hover:shadow-[0_10px_24px_rgba(42,31,22,0.07)] sm:flex-row sm:items-center sm:justify-start sm:gap-3 sm:px-3 sm:py-3"
    >
      <span className="flex w-full shrink-0 items-center justify-between sm:hidden">
        <span className="shrink-0">{logo}</span>
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f2efec] text-[11px] font-bold italic text-[#071426]/60">
          i
        </span>
      </span>
      <span className="hidden shrink-0 sm:block">{logo}</span>
      <span className="min-w-0 flex-1 text-[11px] leading-snug text-[#071426] sm:text-[12.5px]">{children}</span>
      <span className="hidden h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f2efec] text-[11px] font-bold italic text-[#071426]/60 sm:flex">
        i
      </span>
    </button>
  );
}

function ModalShell({
  open,
  onOpenChange,
  brand,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  brand: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[88vh] gap-0 overflow-y-auto rounded-[22px] border-none bg-white p-0 sm:max-w-[420px] [&>button]:hidden"
      >
        <div className="flex items-center justify-between gap-3 border-b border-[#f0ece8] px-5 py-4">
          <p className="flex items-center gap-2 text-[12.5px] text-[#071426]/60">
            {brand}
            <span>
              In samenwerking met <strong className="font-semibold text-[#071426]">wandig.nl</strong>
            </span>
          </p>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Sluiten"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f2efec] text-[#071426]/70 transition hover:bg-[#e9e4df]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="px-5 pb-6 pt-5 text-center">
          <DialogTitle className="sr-only">{title}</DialogTitle>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}

const In3Logo = () => (
  <span className="flex h-7 items-center justify-start overflow-hidden rounded-[6px] bg-white">
    <Img src={in3Logo.url} alt="in3" className="h-3.5 w-auto object-contain" w={64} />
  </span>
);

const SpreadLogo = () => (
  <span className="flex h-7 items-center justify-start overflow-hidden rounded-[6px] bg-white">
    <Img src={sprayPayLogo} alt="SprayPay" className="h-5 w-auto object-contain" w={64} />
  </span>
);

export function PaymentOptionsBadges({ price }: { price: number }) {
  const [openIn3, setOpenIn3] = useState(false);
  const [openSpread, setOpenSpread] = useState(false);
  const [months, setMonths] = useState(60);

  if (!price || price <= 0) return null;

  const third = price / 3;
  const monthly = Math.round(price / months);
  const maxMonthly = Math.round(price / 12);
  const minMonthly = Math.round(price / 60);

  return (
    <>
      <div className="mt-2 mb-2 grid grid-cols-2 gap-2.5">
        <BadgeButton onClick={() => setOpenIn3(true)} logo={<In3Logo />} ariaLabel="Meer over betalen in 3 delen">
          Betaal in 3 delen van <strong className="font-bold">{euro(third)},-</strong>
        </BadgeButton>
        <BadgeButton onClick={() => setOpenSpread(true)} logo={<SpreadLogo />} ariaLabel="Meer over gespreid betalen">
          Vanaf slechts <strong className="font-bold">{euro(minMonthly)},-</strong> per maand
        </BadgeButton>
      </div>

      <ModalShell open={openIn3} onOpenChange={setOpenIn3} brand={<In3Logo />} title="Betaal in 3 delen">
        <Pill>0% rente · geen BKR-registratie</Pill>
        <h3 className="mt-3 text-[22px] font-bold leading-tight text-[#071426]">Betaal in 3 delen</h3>
        <p className="mt-2 text-[13px] leading-snug text-[#071426]/60">
          Verdeel je aankoop in 3 gelijke delen.
          <br />
          Betaal met iDEAL, zonder rente of kosten.
        </p>

        <div className="mt-4 rounded-[16px] bg-[#f7f4f1] px-4 py-5">
          <p className="flex items-baseline justify-center gap-2 text-[#071426]">
            <span className="text-[13px] font-medium text-[#071426]/55">3 ×</span>
            <span className="text-[34px] font-bold leading-none">{euro(third, 2)}</span>
          </p>
        </div>

        <div className="mt-4 space-y-0 text-left">
          {[
            { label: "Vandaag", sub: "1e termijn" },
            { label: "Over 30 dagen", sub: "2e termijn" },
            { label: "Over 60 dagen", sub: "3e termijn" },
          ].map((row, index) => (
            <div key={row.label} className="flex items-center gap-3 border-b border-[#f0ece8] py-3 last:border-b-0">
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${index === 0 ? "border-[#ef7027]" : "border-[#071426]/70"}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${index === 0 ? "bg-[#ef7027]" : "bg-[#071426]/70"}`} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-semibold leading-tight text-[#071426]">{row.label}</span>
                <span className="block text-[11.5px] text-[#071426]/50">{row.sub}</span>
              </span>
              <span className="text-[13px] font-semibold text-[#071426]">{euro(third, 2)}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[#f0ece8] pt-5">
          <Perk icon={<Percent className="h-4 w-4" />} label="0% rente" />
          <Perk icon={<ShieldCheck className="h-4 w-4" />} label="Geen verborgen kosten" />
          <Perk icon={<Lock className="h-4 w-4" />} label="Veilig betalen" />
        </div>

        <div className="mt-5 space-y-3 border-t border-[#f0ece8] pt-5 text-left">
          <p className="text-center text-[14px] font-bold text-[#071426]">Hoe werkt het?</p>
          <Step index={1} title="Kies in3 bij het afrekenen" body="Betaal het eerste deel direct met iDEAL." />
          <Step index={2} title="Tweede deel na 30 dagen" body="Je ontvangt op tijd een herinnering." />
          <Step index={3} title="Derde deel na 60 dagen" body="Daarna is je aankoop volledig betaald." />
        </div>

        <button
          type="button"
          onClick={() => setOpenIn3(false)}
          className="mt-5 h-12 w-full rounded-full bg-[#ef7027] text-[14px] font-light text-white transition hover:bg-[#e2651e]"
        >
          Kies in3 bij het afrekenen
        </button>
      </ModalShell>

      <ModalShell open={openSpread} onOpenChange={setOpenSpread} brand={<SpreadLogo />} title="Gespreid betalen">
        <Pill>
          <Percent className="h-3 w-3" /> Gespreid betalen
        </Pill>
        <h3 className="mt-3 text-[22px] font-bold leading-tight text-[#071426]">Kies je maandbedrag</h3>
        <p className="mt-2 text-[13px] leading-snug text-[#071426]/60">
          Sleep de looptijd en zie meteen wat je per maand betaalt.
        </p>

        <div className="mt-4 rounded-[16px] bg-[#f7f4f1] px-4 py-5">
          <p className="flex items-baseline justify-center text-[#071426]">
            <span className="text-[34px] font-bold leading-none">{euro(monthly)}</span>
            <span className="text-[15px] font-medium text-[#071426]/60">,- p/mnd</span>
          </p>
        </div>

        <p className="mt-4 text-[12.5px] text-[#071426]/60">
          bij een looptijd van <strong className="font-semibold text-[#071426]">{months} maanden</strong>
        </p>

        <input
          type="range"
          min={12}
          max={60}
          step={6}
          value={months}
          onChange={(event) => setMonths(Number(event.target.value))}
          aria-label="Looptijd in maanden"
          className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[#e9e4df] accent-[#ef7027]"
        />
        <div className="mt-2 flex items-center justify-between text-[11px] text-[#071426]/50">
          <span>12 mnd</span>
          <span>kortere looptijd · lagere kosten</span>
          <span>60 mnd</span>
        </div>

        <div className="mt-5 space-y-0 text-left">
          <div className="flex items-center justify-between border-b border-[#f0ece8] py-3">
            <span className="text-[13px] text-[#071426]/70">Maandbedrag</span>
            <span className="text-[13px] font-semibold text-[#071426]">{euro(monthly)},-</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-[13px] text-[#071426]/70">Looptijd</span>
            <span className="text-[13px] font-semibold text-[#071426]">{months} maanden</span>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 border-t border-[#f0ece8] pt-5">
          <Perk icon={<ShieldCheck className="h-4 w-4" />} label="Veilig betalen" />
          <Perk icon={<Zap className="h-4 w-4" />} label="Direct antwoord" />
          <Perk icon={<Eye className="h-4 w-4" />} label="Geen verrassingen" />
        </div>

        <div className="mt-5 space-y-3 border-t border-[#f0ece8] pt-5 text-left">
          <p className="text-center text-[14px] font-bold text-[#071426]">Hoe werkt het?</p>
          <Step index={1} title="Kies gespreid betalen bij het afrekenen" body={`Van ${euro(minMonthly)},- tot ${euro(maxMonthly)},- per maand.`} />
          <Step index={2} title="Vul je gegevens in" body="Korte aanvraag, je krijgt meteen antwoord." />
          <Step index={3} title="Wij bouwen jouw tv-wand" body="Je betaalt elke maand het bedrag dat je koos." />
        </div>

        <button
          type="button"
          onClick={() => setOpenSpread(false)}
          className="mt-5 h-12 w-full rounded-full bg-[#ef7027] text-[14px] font-light text-white transition hover:bg-[#e2651e]"
        >
          Kies SprayPay bij het afrekenen
        </button>
      </ModalShell>
    </>
  );
}

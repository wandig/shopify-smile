import { Img } from "@/components/Img";
import { useRef, useState } from "react";
import { Plus, User } from "lucide-react";
import gebouwdOmMeeTeGaan1Img from "@/assets/gebouwd-om-mee-te-gaan-1.png.asset.json";
import plugPlayGeleverdV2Img from "@/assets/plug-play-geleverd-v2.png.asset.json";
import proefkijkenBgV2Img from "@/assets/100-dagen-proefkijken-bg-v2.png.asset.json";
import dutchDesignBgImg from "@/assets/dutch-design-voor-aan-de-muur-bg.png.asset.json";

const BUILT_TO_LAST_CARDS: Array<{
  eyebrow: string;
  title: string;
  body: string;
  bg: string;
  tone: "light" | "dark";
  imageUrl?: string;
  textColor?: string;
  bodyMaxWidth?: string;
}> = [
  {
    eyebrow: "Gemaakt om te blijven",
    title: "10 jaar garantie\nop jouw tv-kast.",
    body: "Ontworpen voor jarenlang dagelijks gebruik, zonder dat je je zorgen hoeft te maken.",
    bg: "#f0e4d5",
    tone: "light",
    imageUrl: gebouwdOmMeeTeGaan1Img.url,
    textColor: "#071426",
  },
  {
    eyebrow: "Zo staat hij",
    title: "Plug-and-play\ngemonteerd.",
    body: "Slim voorbereid en\neenvoudig in elkaar te zetten,\nzonder ingewikkeld maatwerk.",
    bg: "#c0b3a4",
    tone: "light",
    imageUrl: plugPlayGeleverdV2Img.url,
    bodyMaxWidth: "180px",
  },
  {
    eyebrow: "Kijk het rustig aan",
    title: "100 dagen\nproefkijken.",
    body: "Ervaar thuis of jouw nieuwe tv-kast echt bij je interieur past.",
    bg: "#a55f3e",
    tone: "dark",
    imageUrl: proefkijkenBgV2Img.url,
    bodyMaxWidth: "120px",
  },
  {
    eyebrow: "Van Nederlandse bodem",
    title: "Dutch Design\nvoor aan de muur.",
    body: "Rustig vormgegeven in Nederland, met aandacht voor ieder detail.",
    bg: "#936850",
    tone: "dark",
    imageUrl: dutchDesignBgImg.url,
    bodyMaxWidth: "170px",
  },
];

const FAQ_ITEMS: Array<{ question: string; answer: string }> = [
  {
    question: "Wat zijn de afmetingen van de cinewall?",
    answer: "De Wandig Full House is 240 cm breed, 180 cm hoog en 32 cm diep. Het centrale tv-vlak is geschikt voor televisies tot 80 inch.",
  },
  {
    question: "Past mijn soundbar in de cinewall?",
    answer: "Ja, de open vakken en het ruime ontwerp bieden genoeg plaats voor een soundbar, media-apparatuur en accessoires.",
  },
  {
    question: "Is mijn muur geschikt voor een cinewall?",
    answer: "De cinewall is geschikt voor de meeste vlakke, draagkrachtige muren. Bij twijfel kun je gratis contact opnemen met ons adviesteam.",
  },
  {
    question: "Hoe bestel ik een kleurstaal?",
    answer: "Je kunt eenvoudig gratis kleurstalen aanvragen via onze website. Zo zie je thuis precies hoe de afwerking bij jouw interieur past.",
  },
  {
    question: "Wanneer staat mijn cinewall in huis?",
    answer: "Na bestelling is de levertijd gemiddeld 7 tot 14 werkdagen. We plannen samen met jou een dag en tijdslot voor bezorging.",
  },
  {
    question: "Hoe wordt de cinewall aan de muur bevestigd?",
    answer: "De cinewall wordt geleverd inclusief bevestigingsmateriaal en een duidelijke handleiding. De muurbeugels zijn speciaal ontworpen voor een veilige montage.",
  },
  {
    question: "Hoe bevestig ik mijn tv in de cinewall?",
    answer: "Je tv wordt gemonteerd met een VESA-compatibele wandsteun op het centrale tv-vlak. De steun zelf is niet inbegrepen.",
  },
  {
    question: "Hoe sluit ik mijn apparatuur netjes aan?",
    answer: "De achterwand heeft een kabeldoorvoer, zodat alle kabels uit het zicht lopen en je interieur rustig blijft ogen.",
  },
  {
    question: "Kan ik de cinewall zelf monteren?",
    answer: "Ja, de cinewall wordt in voorgemonteerde modules geleverd. Met de meegeleverde klikverbindingen zet je hem in gemiddeld 45 minuten samen.",
  },
  {
    question: "Lukt de montage ook in mijn eentje?",
    answer: "We raden aan om de montage met twee personen te doen, vooral bij het optillen en uitlijnen van de grotere modules.",
  },
  {
    question: "Heb ik speciaal gereedschap nodig?",
    answer: "Nee, voor de montage heb je alleen basisgereedschap zoals een schroevendraaier en een boormachine nodig.",
  },

  {
    question: "Hoeveel jaar garantie krijg ik?",
    answer:
      "Op de Wandig Full House krijg je 10 jaar garantie. Zo geniet je jarenlang zorgeloos van jouw nieuwe tv-wand.",
  },
];

const REVIEWS: Array<{ name: string; location: string; rating: number; title: string; body: string; date: string }> = [
  { name: "Sanne V.", location: "Utrecht", rating: 5, title: "Kwaliteit is top", body: "De Full House staat prachtig in onze woonkamer. Afwerking is echt perfect en de montage was zo gepiept.", date: "3 weken geleden" },
  { name: "Jeroen B.", location: "Amsterdam", rating: 5, title: "Meer dan verwacht", body: "Bestelling verliep soepel en levering was op tijd. De kast oogt luxer dan op de foto's.", date: "1 maand geleden" },
  { name: "Lisa D.", location: "Den Haag", rating: 5, title: "Fantastisch meubel", body: "Onze woonkamer is compleet veranderd. Kabels netjes weggewerkt en de soundbar past perfect.", date: "1 maand geleden" },
  { name: "Mark H.", location: "Rotterdam", rating: 4, title: "Mooi en stevig", body: "Zeer tevreden over de kwaliteit. Montage duurde iets langer dan verwacht maar het resultaat is top.", date: "2 maanden geleden" },
  { name: "Eva K.", location: "Eindhoven", rating: 5, title: "Precies wat we zochten", body: "De kleurstalen thuis waren super handig. Uiteindelijk gekozen voor eiken, ziet er warm en tijdloos uit.", date: "2 maanden geleden" },
  { name: "Tom S.", location: "Groningen", rating: 5, title: "Klantenservice top", body: "Had een vraag over de afmetingen en werd direct geholpen. Aanrader!", date: "2 maanden geleden" },
  { name: "Anouk M.", location: "Breda", rating: 5, title: "Design meubel", body: "Ziet er echt uit als een designstuk. Vrienden vragen meteen waar we hem vandaan hebben.", date: "3 maanden geleden" },
  { name: "Rick J.", location: "Nijmegen", rating: 4, title: "Solide en netjes", body: "Kwaliteit is prima, prijs is eerlijk. Levertijd was 10 dagen, precies zoals aangegeven.", date: "3 maanden geleden" },
  { name: "Fleur P.", location: "Haarlem", rating: 5, title: "Zo blij mee", body: "De tv-wand maakt onze woonkamer af. Zelfmontage was verrassend makkelijk met z'n tweeën.", date: "4 maanden geleden" },
];

export function BuiltToLastSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const movedRef = useRef(false);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    setIsDragging(true);
    movedRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartScrollRef.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const el = scrollerRef.current;
    if (!el) return;
    const dx = e.clientX - dragStartXRef.current;
    if (Math.abs(dx) > 4) movedRef.current = true;
    el.scrollLeft = dragStartScrollRef.current - dx;
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    const el = scrollerRef.current;
    if (el && el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
  };

  return (
    <section className="bg-gradient-to-b from-[#faf8f5] to-white pt-12 md:pt-20 pb-12 md:pb-20">
      <div className="mx-auto max-w-[1400px] px-3 md:px-10">
        <div className="mb-6 text-center md:mb-10">
          <h2 className="text-[22px] md:text-[26px] font-bold leading-tight text-[#071426]">
            Gebouwd om mee te gaan
          </h2>
        </div>

        <div
          ref={scrollerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          className={`-mx-5 flex gap-3 overflow-x-auto scrollbar-hide px-5 md:mx-0 md:gap-4 md:px-0 ${
            isDragging ? "cursor-grabbing select-none" : "cursor-grab"
          }`}
          style={{ scrollSnapType: "x mandatory" }}
        >
          {BUILT_TO_LAST_CARDS.map((card, i) => (
            <article
              key={i}
              className="relative shrink-0 overflow-hidden rounded-[18px] w-[280px] h-[280px] md:w-[360px] md:h-[360px]"
              style={{ scrollSnapAlign: "start", backgroundColor: card.bg }}
            >
              {card.imageUrl && (
                <Img src={card.imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
              )}
              <div
                className={`relative flex h-full flex-col p-6 md:p-7 ${
                  card.textColor ? "" : card.tone === "light" ? "text-[#071426]" : "text-white"
                }`}
                style={{ color: card.textColor }}
              >
                <div
                  className="text-[12px] md:text-[13px] font-normal"
                  style={{ color: card.textColor, opacity: card.textColor ? 1 : undefined }}
                >
                  {card.eyebrow}
                </div>
                <h3 className="mt-2 whitespace-pre-line text-[18px] md:text-[22px] font-bold leading-[1.15]">
                  {card.title}
                </h3>
                <p
                  className="mt-3 max-w-[240px] text-[13px] md:text-[14px] leading-relaxed font-light"
                  style={{ color: card.textColor, opacity: card.textColor ? 1 : undefined, maxWidth: card.bodyMaxWidth }}
                >
                  {card.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  const [openLeft, setOpenLeft] = useState<number | null>(null);
  const [openRight, setOpenRight] = useState<number | null>(null);

  const mid = Math.ceil(FAQ_ITEMS.length / 2);
  const leftItems = FAQ_ITEMS.slice(0, mid);
  const rightItems = FAQ_ITEMS.slice(mid);

  const renderItem = (item: { question: string; answer: string }, i: number, isRight: boolean) => {
    const isOpen = isRight ? openRight === i : openLeft === i;
    const setOpen = isRight ? setOpenRight : setOpenLeft;
    return (
      <div key={`${isRight ? "r" : "l"}-${i}`} className="rounded-[14px] bg-[#faf8f5] p-4 md:p-5">
        <button
          type="button"
          onClick={() => setOpen(isOpen ? null : i)}
          aria-expanded={isOpen}
          className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
        >
          <span className="text-[14px] font-[500] leading-snug text-[#071426] md:text-[15px]">{item.question}</span>
          <span
            className={`flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full border border-[#cdc0b5] text-[#071426] transition-transform duration-300 ease-out ${isOpen ? "rotate-45" : "rotate-0"}`}
          >
            <Plus className="h-3 w-3" strokeWidth={2} />
          </span>
        </button>
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="overflow-hidden">
            <div className="pt-3 text-[13px] leading-relaxed text-[#071426]/65 md:text-[14px]">{item.answer}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-white pb-12 pt-0 md:pb-20">
      <div className="mx-auto max-w-[1400px] px-3 md:px-10">
        <div className="mb-6 text-center md:mb-10">
          <span className="text-[11px] font-[500] uppercase tracking-[0.14em] text-[#90949b]">FAQ</span>
          <h2 className="mt-2 text-[22px] md:text-[26px] font-bold leading-tight text-[#071426]">
            Veelgestelde vragen
          </h2>
          <p className="mt-2 text-[13px] md:text-[14px] text-[#071426]/55">
            Alles wat je wilt weten over onze cinewalls.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:gap-4">
          <div className="flex flex-1 flex-col gap-3 md:gap-4">
            {leftItems.map((item, i) => renderItem(item, i, false))}
          </div>
          <div className="flex flex-1 flex-col gap-3 md:gap-4">
            {rightItems.map((item, i) => renderItem(item, i, true))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ReviewsSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section className="bg-[#fff7ef] py-10 md:py-16">
      <div className="mx-auto max-w-[1400px] px-3 md:px-10">
        <div className="mb-6 flex items-end justify-between gap-4 md:mb-10">
          <div>
            <span className="text-[11px] font-[500] uppercase tracking-[0.14em] text-[#90949b]">Reviews</span>
            <h2 className="mt-2 text-[22px] md:text-[26px] font-bold leading-tight text-[#071426]">
              Wat klanten zeggen over hun tv-kast.
            </h2>
          </div>
          <div className="hidden gap-2 md:flex">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Vorige"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f4f2ee] bg-white text-[#071426] transition hover:bg-[#faf8f5]"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Volgende"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f4f2ee] bg-white text-[#071426] transition hover:bg-[#faf8f5]"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="mx-auto flex max-w-[1400px] snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-3 md:px-10 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-pl-3 md:scroll-pl-10"
      >
        {REVIEWS.map((r, i) => (
          <article
            key={i}
            className="flex w-[280px] shrink-0 snap-start flex-col justify-between rounded-[14px] bg-white p-5 shadow-[0_2px_10px_rgba(42,31,22,0.06)] md:w-[340px]"
          >
            <div className="pb-5">
              <div className="flex items-center gap-1 text-[#ef7027]">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span key={idx} className={idx < r.rating ? "text-[#ef7027]" : "text-[#e5ded4]"}>★</span>
                ))}
              </div>
              <h3 className="mt-3 text-[15px] font-[500] text-[#071426]">{r.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#071426]/65 md:text-[14px]">{r.body}</p>
            </div>
            <div className="border-t border-[#e5ded4]/40 pt-5 flex items-center gap-2.5 text-[12px]">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#f4f2ee] bg-white text-[#ef7027]">
                <User className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
              <span className="font-[500] text-[#071426]">{r.name} · {r.location}</span>
              <span className="text-[#071426]/50">· {r.date}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

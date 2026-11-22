"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Adresse utilisée pour le bouton d’accroche hero et le lien « Nous contacter » dans le menu. */
const CONTACT_EMAIL = "agorafilminvest@gmail.com";

type NavLink = {
  label: string;
  id: string;
  mailto?: string;
};

const navItems: NavLink[] = [
  { label: "Accueil", id: "accueil" },
  { label: "Nos réalisations", id: "realisations" },
  { label: "À propos", id: "apropos" },
  { label: "Nos produits", id: "produits" },
  { label: "Notre équipe", id: "equipe" },
  { label: "Actualités", id: "actualites" },
  { label: "Galerie", id: "galerie" },
  { label: "Nous contacter", id: "contact", mailto: CONTACT_EMAIL },
];

const logos = [
  { src: "/logos/logo-festival-cannes.png", alt: "Festival de Cannes" },
  { src: "/logos/logo-epices.png", alt: "ÉPICES" },
  { src: "/logos/logo-mycanal-caraibes.png", alt: "myCANAL Caraïbes" },
  { src: "/logos/logo-filmdis.png", alt: "Filmdis" },
  { src: "/logos/logo-partenaire-5.png", alt: "Logo partenaire" },
  { src: "/logos/logo-riviera-levant.png", alt: "La Riviera du Levant" },
  { src: "/logos/logo-acme.png", alt: "Cosmakeup" },
  { src: "/logos/logo-studio-sud.png", alt: "Vivita" },
];

const team = [
  { name: "Didier Mouliom", role: "Producteur", img: "/images/team-didier.jpg" },
  { name: "Kadia Mouliom", role: "Responsable Afrique de l'ouest", img: "/images/team-kadia.jpg" },
  { name: "Tony Coco-Viloin", role: "Directeur ÉPICES et Réalisateur", img: "/images/team-tony.jpg" },
  { name: "Julien Kemajou", role: "Responsable Marketing", img: "/images/team-julien.jpg" },
  { name: "Myriam Laffond", role: "Chargée de production", img: "/images/team-member-5.jpg" },
  { name: "Ibrahim Souleymane", role: "Chargé de production", img: "/images/team-member-6.jpg" },
  { name: "Jean-José Caddy", role: "Caméraman", img: "/images/team-member-7.jpg" },
  { name: "Leanna Reeves", role: "Consultante en Finance internationale", img: "/images/team-member-8.jpg" },
  { name: "Michel Coursil", role: "Président", img: "/images/team-michel-coursil.jpeg" },
  { name: "Daouda Seidou", role: "Responsable administratif", img: "/images/team-daouda-seidou.jpeg" },
  { name: "Aicha Gning", role: "Production", img: "/images/team-aicha-gning.jpg" },
  { name: "Cheikh Senghor", role: "Production", img: "/images/team-cheikh-senghor.jpg" },
  { name: "Thierno Diop", role: "Production", img: "/images/team-thierno-diop.jpg" },
  {
    name: "Alain Martinoli",
    role: "Co-producteur\nCasting\nHealth director",
    img: "/images/team-alain-martinoli.jpg",
  },
  {
    name: "Yoan Guy-Yves N'Dri",
    role: "Producteur, acteur",
    img: "/images/team-yoan-guy-yves-n-dri.jpg",
  },
  {
    name: "Déborah Denecke",
    role: "Chargée de coproduction Brésil et Allemagne, makeup artiste",
    img: "/images/team-deborah-denecke.jpg",
  },
  {
    name: "Chiamaka Sandra Anthony",
    role:
      "TV / Film Essentiels — New York School of the Arts — réalisatrice de courts métrages\nCostumière / styliste — ESMOD (école de mode française)",
    img: "/images/team-chiamaka-sandra-anthony.jpg",
  },
];

const galerie = Array.from({ length: 10 }, (_, i) => `/images/galerie-${i + 1}.jpg`);

type ProductCard = {
  label: string;
  icon: string;
  /** Texte d'action toujours visible (pas seulement au survol). */
  cta: string;
  hoverImage?: string;
  href?: string;
};

const products: ProductCard[] = [
  {
    label: "Court-métrage",
    icon: "/images/produit-long-metrage.png",
    cta: "Regarder la vidéo",
    href: "https://youtu.be/NVBIvPkcIzs?is=cYKazqzLr2ty9Bya",
  },
  {
    label: "Court-métrage",
    icon: "/images/produit-court-metrage.png",
    cta: "Voir l'affiche",
    hoverImage: "/images/produit-court-metrage-hover.jpg",
  },
];

function SocialIconLink({
  href,
  ariaLabel,
  src,
  fallback,
}: {
  href: string;
  ariaLabel: string;
  src: string;
  fallback: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-zinc-100 ring-1 ring-black/10 transition hover:bg-brand-sand"
      aria-label={ariaLabel}
    >
      {failed ? (
        <span className="flex h-full w-full items-center justify-center rounded-full bg-black text-xs font-bold text-white">
          {fallback}
        </span>
      ) : (
        <Image
          src={src}
          alt=""
          fill
          sizes="44px"
          className="object-contain p-1.5"
          onError={() => setFailed(true)}
        />
      )}
    </a>
  );
}

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M17 6h2.5a1.5 1.5 0 0 1 1.5 1.5V8a4 4 0 0 1-4 4M7 6H4.5A1.5 1.5 0 0 0 3 7.5V8a4 4 0 0 0 4 4" />
    </svg>
  );
}

function VivitaIllustration() {
  const [usePlaceholder, setUsePlaceholder] = useState(false);
  if (usePlaceholder) {
    return (
      <div
        className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl border-2 border-dashed border-black/20 bg-white/50 px-4 py-8 text-center text-xs text-black/50 sm:px-6 sm:text-sm"
        role="img"
        aria-label="Emplacement visuel"
      >
        <span className="max-w-[280px] leading-relaxed sm:max-w-none">
          Ajoutez votre image sous{" "}
          <code className="block break-all rounded bg-black/5 px-1.5 py-0.5 text-[0.7rem] sm:inline sm:text-xs">
            public/images/actualite-vivita.png
          </code>
        </span>
      </div>
    );
  }
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.1)]">
      <Image
        src="/images/actualite-vivita.png"
        alt="Vivita — visuel d&apos;illustration"
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 48vw"
        onError={() => setUsePlaceholder(true)}
      />
    </div>
  );
}

const galerieLayout = [
  "lg:[grid-column:1/span_3] lg:[grid-row:1/span_2]",
  "lg:[grid-column:4/span_2] lg:[grid-row:1/span_2]",
  "lg:[grid-column:6/span_5] lg:[grid-row:1/span_4]",
  "lg:[grid-column:11/span_3] lg:[grid-row:1/span_5]",
  "lg:[grid-column:14/span_3] lg:[grid-row:1/span_2]",
  "lg:[grid-column:1/span_5] lg:[grid-row:3/span_5]",
  "lg:[grid-column:6/span_2] lg:[grid-row:5/span_3]",
  "lg:[grid-column:8/span_3] lg:[grid-row:5/span_3]",
  "lg:[grid-column:11/span_3] lg:[grid-row:6/span_2]",
  "lg:[grid-column:14/span_3] lg:[grid-row:3/span_5]",
];

/** Ouvre le client mail avec les champs du formulaire (pas de backend d'envoi). */
function handleContactSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const get = (key: string) => String(data.get(key) ?? "").trim();
  const fullName = [get("prenom"), get("nom")].filter(Boolean).join(" ");
  const subject = get("objet") || "Demande de contact — site Agora Film Invest";
  const details = [
    fullName && `Nom : ${fullName}`,
    get("email") && `E-mail : ${get("email")}`,
    get("telephone") && `Téléphone : ${get("telephone")}`,
  ].filter(Boolean);
  const body = [get("message"), "", "—", ...details].join("\n");
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const inputClass =
  "w-full rounded-lg border border-transparent bg-[#e2e2e2] px-4 py-3.5 text-[16px] font-normal text-black transition placeholder:text-black/45 hover:border-black/15 focus:border-black focus:bg-white";
const labelClass = "mb-1.5 block text-[13px] font-semibold text-black/70";

export default function Home() {
  const [activeProductImage, setActiveProductImage] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const hoverCleanups: Array<() => void> = [];
    let revertMatchMedia: (() => void) | undefined;

    const ctx = gsap.context(() => {
      gsap.from(".site-header", {
        y: -24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      const mm = gsap.matchMedia();

      /* Scroll (desktop / tablette) : évite sur mobile (titres tronqués, bande grise, blocs vides)
         et pour les visiteurs qui ont demandé à réduire les animations. */
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".fade-section").forEach((el) => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          });
        });

        gsap.utils.toArray<HTMLElement>(".reveal-title, .section-title").forEach((el) => {
          gsap.from(el, {
            yPercent: 20,
            opacity: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
            },
          });
        });

        gsap.utils.toArray<HTMLElement>(".stagger-list").forEach((list) => {
          const items = list.querySelectorAll(".stagger-item");
          if (items.length === 0) return;

          gsap.from(items, {
            y: 24,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: list,
              start: "top 85%",
            },
          });
        });

        gsap.utils.toArray<HTMLElement>(".parallax-media").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
              },
            },
          );
        });
      });
      revertMatchMedia = () => mm.revert();

      gsap.utils.toArray<HTMLElement>(".hover-lift").forEach((card) => {
        const onEnter = () => gsap.to(card, { y: -6, scale: 1.015, duration: 0.25, ease: "power2.out" });
        const onLeave = () => gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);

        hoverCleanups.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        });
      });
    });

    return () => {
      hoverCleanups.forEach((cleanup) => cleanup());
      revertMatchMedia?.();
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (!activeProductImage) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProductImage(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeProductImage]);

  return (
    <main id="contenu" className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#efefef]">
      <header className="site-header sticky top-0 z-50 pt-3">
        <div className="container-site px-4 md:px-8">
          <div className="flex items-center justify-between rounded-full bg-white/95 px-6 py-2.5 shadow-sm backdrop-blur">
            <a
              href="#accueil"
              className="relative block h-[48px] w-[75px] shrink-0 sm:h-[54px] sm:w-[84px]"
              aria-label="Agora Film Invest — retour en haut de page"
            >
              <Image
                src="/logo/logo-agora.png"
                alt="Agora Film Invest"
                fill
                sizes="84px"
                className="object-contain object-left"
                priority
              />
            </a>
            <nav className="hidden items-center gap-6 text-[15px] font-medium lg:flex xl:gap-8" aria-label="Menu principal">
              {navItems.map((item) =>
                item.mailto ? (
                  <a key={item.id} href={`mailto:${item.mailto}`} className="btn-primary px-5 py-2.5 text-[14px]">
                    {item.label}
                  </a>
                ) : (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="relative py-1 transition after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:origin-left after:scale-x-0 after:bg-brand-sand-dark after:transition-transform after:duration-200 hover:after:scale-x-100"
                  >
                    {item.label}
                  </a>
                ),
              )}
            </nav>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <span>FR</span>
                <span className="text-[10px]">▼</span>
              </div>
              <button
                type="button"
                className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full transition hover:bg-black/5 lg:hidden"
                aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={menuOpen}
                aria-controls="menu-mobile"
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span className={`block h-[2px] w-6 bg-black transition ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
                <span className={`block h-[2px] w-6 bg-black transition ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-[2px] w-6 bg-black transition ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
              </button>
            </div>
          </div>
          {menuOpen ? (
            <nav
              id="menu-mobile"
              className="mt-2 rounded-3xl bg-white px-6 py-4 shadow-sm lg:hidden"
              aria-label="Menu principal"
            >
              <ul className="divide-y divide-black/5">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.mailto ? `mailto:${item.mailto}` : `#${item.id}`}
                      className="block py-3 text-[16px] transition hover:opacity-60"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>
      </header>

      <section
        id="accueil"
        className="container-site min-w-0 px-4 pt-2 pb-8 md:px-8 md:pt-3 md:pb-12 lg:-mt-10 lg:pt-0"
      >
        <div className="grid min-w-0 gap-8 lg:grid-cols-[1.15fr,1.2fr] lg:items-start">
          <div className="min-w-0 space-y-8 pt-6 lg:flex lg:min-h-[500px] lg:flex-col lg:justify-center lg:pt-14">
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-brand-sand-dark sm:text-[13px]">
              Production · Coproduction · Promotion
            </p>
            <h1 className="!mt-4 max-w-full text-[1.4rem] font-bold leading-[1.18] tracking-[-0.01em] sm:text-[1.6rem] md:text-[31px] lg:max-w-[860px] lg:text-[34px]">
              <span className="hidden lg:block">
                <span className="block whitespace-nowrap">
                  <span className="text-brand-plum">AGORA FILM INVEST</span>{" "}fait émerger,
                </span>
                <span className="block whitespace-nowrap">développe la créativité, la production</span>
                <span className="block whitespace-nowrap">cinématographique et s&apos;occupe de la</span>
                <span className="block whitespace-nowrap">promotion des talents</span>
              </span>
              <span className="lg:hidden">
                <span className="text-brand-plum">AGORA FILM INVEST</span>{" "}fait émerger, développe la créativité, la
                production cinématographique et s&apos;occupe de la promotion des talents
              </span>
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <a href={`mailto:${CONTACT_EMAIL}`} className="btn-primary px-9 py-4 text-base">
                Nous contacter
              </a>
              <a href="#realisations" className="btn-secondary py-[14px]">
                Voir nos réalisations
              </a>
            </div>
          </div>
          <div className="parallax-media relative h-[360px] overflow-hidden rounded-[24px] sm:h-[440px] lg:-mt-4 lg:h-[500px]">
            <Image src="/images/hero-main.jpg" alt="Agora Film Invest — production cinématographique" fill sizes="(max-width: 1024px) 100vw, 55vw" loading="eager" className="object-cover" />
          </div>
        </div>
        <div className="relative mt-8 h-[340px] min-w-0 overflow-x-clip md:h-[400px] lg:-ml-6 lg:mt-6 lg:h-[470px]">
          <div className="parallax-media absolute left-[6%] top-[8px] z-10 h-[210px] w-[40%] overflow-hidden rounded-[24px] shadow-[0_10px_26px_rgba(0,0,0,0.14)] md:left-[4%] md:h-[260px] md:w-[38%] lg:left-[0px] lg:top-[40px] lg:h-[248px] lg:w-[465px]">
            <Image src="/images/hero-collage-1.jpg" alt="" fill sizes="(max-width: 1024px) 45vw, 36vw" className="object-cover object-center" />
          </div>
          <div className="parallax-media absolute left-[27%] top-[56px] z-20 h-[220px] w-[47%] overflow-hidden rounded-[24px] shadow-[0_12px_28px_rgba(0,0,0,0.16)] md:left-[25%] md:h-[275px] md:w-[45%] lg:left-[320px] lg:top-[108px] lg:h-[290px] lg:w-[520px]">
            <Image src="/images/hero-collage-2.jpg" alt="" fill sizes="(max-width: 1024px) 48vw, 40vw" className="object-cover object-center" />
          </div>
          <div className="parallax-media absolute right-[1%] top-[118px] z-10 h-[228px] w-[46%] overflow-hidden rounded-[24px] shadow-[0_10px_26px_rgba(0,0,0,0.14)] md:right-[1%] md:h-[280px] md:w-[42%] lg:right-[8px] lg:top-[172px] lg:h-[286px] lg:w-[468px]">
            <Image src="/images/hero-collage-3.jpg" alt="" fill sizes="(max-width: 1024px) 42vw, 34vw" className="object-cover object-center" />
          </div>
        </div>
      </section>

      <section className="fade-section relative h-[360px] w-full min-w-0 overflow-hidden md:h-[460px]">
        <Image src="/images/banner-camera.jpg" alt="" fill sizes="100vw" className="parallax-media object-cover" />
      </section>

      <section id="qui-sommes-nous" className="fade-section bg-[#efefef] px-4 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1340px]">
          <h2 className="section-title reveal-title">Qui sommes-nous ?</h2>
          <span className="section-bar" aria-hidden="true" />
          <div className="mx-auto mt-12 max-w-[760px] space-y-6 text-[17px] leading-[1.7] text-[#151515]">
            <p>
              <span className="font-extrabold">AGORA FILM INVEST</span>{" "}
              est animée par un esprit du Sud et s&apos;intéresse à tous ceux qui interrogent leur rapport au monde,
              mais pas seulement. Se pencher sur la question des ignorances, de l&apos;arrogance, de la diversité, de
              l&apos;esthétique, du regard et de l&apos;écoute de l&apos;autre, n&apos;est jamais simple mais raconter des
              histoires aussi incroyables raccorde tout spectateur. C&apos;est là le défi que nous nous attachons à
              relever quotidiennement.
            </p>
            <p>
              Nous apprécions particulièrement les regards croisés, cette introspection dans l&apos;histoire du cinéma
              de chacun. Nous partageons avec d&apos;autres producteurs cet immense désir de combler ces ignorances
              qui finissent par cloisonner les productions trop « régionales » pour reprendre le terme du cinéaste
              Youssef Chahine.
            </p>
            <p>
              Le cinéma c&apos;est une boucle et accompagner les auteurs dans ce travail de mémoire qui nous est cher
              consiste aussi à inviter d&apos;autres dans cette boucle, à dérouler notre envie d&apos;aller un peu plus
              loin dans la connaissance du 7e art, dans la connaissance d&apos;autres humanités. Outre sa bonne
              connaissance des dispositifs d&apos;aide à la production, l&apos;implantation d&apos;
              <span className="font-extrabold">AGORA FILM INVEST</span>{" "}au coeur de la Caraïbe traduit aussi cette
              volonté de coopérer et de co-produire avec l&apos;Afrique, les USA, l&apos;Europe et la région Caraïbes.
            </p>
            <p>
              <span className="font-extrabold">AGORA FILM INVEST</span>{" "}propose un positionnement spécifique :
              production de projets cinématographiques se réalisant dans la Caraïbe, en Europe, en Afrique ou dans
              les Amériques, avec des possibilités de transversalité. Saisie par cette attente et dans l&apos;approche
              que nous avons de chaque projet, <span className="font-extrabold">AGORA FILM INVEST</span>{" "}privilégie
              les histoires individuelles qui se retrouvent au fur et à mesure dans une histoire tant collective
              qu&apos;originelle.
            </p>
          </div>
        </div>
      </section>

      <section id="apropos" className="fade-section bg-black px-6 py-[70px] text-white md:px-8">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="section-title reveal-title">À propos de nous</h2>
          <span className="section-bar" aria-hidden="true" />
          <div className="mx-auto mt-12 max-w-[760px] space-y-6 text-[17px] font-normal leading-[1.7] text-white/90">
            <p>
              De la question des origines, nous aimons qu&apos;elle interpelle l&apos;Histoire en général, parfois
              l&apos;archéologie. Le texte est notre matière première et il est toujours vécu par notre équipe comme un
              retour aux sources. Notre investissement dans l&apos;industrie du film est le signe d&apos;un désir de
              raccordement, d&apos;interaction plus intelligente entre acteurs, producteurs, réalisateurs et décideurs
              dudit mainstream et ceux de la diaspora africaine (Caraïbes, Europe, Amériques). Il s&apos;agit d&apos;élever
              l&apos;affichage des cinémas par delà les filtres de l&apos;esthétisme et de l&apos;exotisme.
            </p>
            <p>
              L&apos;un des premiers objectifs d&apos;AGORA FILM INVEST est de faire émerger des talents, de développer la
              créativité, la production cinématographique et de les promouvoir. L&apos;expérience des associés
              d&apos;AGORA FILM INVEST est la force de notre entreprise. Elle facilite l&apos;accompagnement des porteurs
              de projets, grâce à une méthodologie spécifique, la rigueur, l&apos;exigence dans l&apos;établissement des
              dossiers de production et les stratégies marketing.
            </p>
            <p>
              AGORA FILM INVEST est une structure qui a focalisé sa politique de production afin d&apos;amplifier
              l&apos;attention à porter sur la diversité dans l&apos;industrie du film, dans ses formes les plus étrangères.
              Nous ciblons pour cela les salons et marchés tels que Cannes, La Rochelle (Sunny Side of the Doc), le
              MICA (Marché International du Cinéma Africain) au Burkina Faso, Sundance ou encore les festivals
              caribéens dédiés au cinéma.
            </p>
            <p>AGORA FILM INVEST aime développer les films avec les régions intimement en lien avec les auteurs.</p>
          </div>
        </div>
      </section>

      <section id="realisations" className="fade-section container-site min-w-0 px-4 pt-[80px] pb-[72px] sm:px-6 md:px-10">
        <h2 className="section-title reveal-title">Nos réalisations</h2>
        <span className="section-bar" aria-hidden="true" />
        <div className="stagger-list mt-14 grid gap-y-16 md:gap-y-[112px]">
          <article className="stagger-item relative flex max-w-full flex-col gap-6 rounded-[28px] bg-black py-7 pl-6 pr-6 text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] md:flex-row md:gap-0 md:pl-[250px] md:pr-8 md:py-8 lg:mx-auto lg:max-w-[1120px] lg:pl-[250px] lg:pr-10 lg:py-[30px]">
            <div className="hover-lift relative mx-auto h-[300px] w-[220px] shrink-0 overflow-hidden rounded-[18px] shadow-[0_10px_24px_rgba(0,0,0,0.25)] max-md:mx-auto md:absolute md:-left-[24px] md:top-1/2 md:mx-0 md:h-[300px] md:w-[220px] md:-translate-y-1/2 lg:h-[360px] lg:w-[255px]">
              <Image src="/images/realisation-here-we-are-poster.jpg" alt="Here we are" fill sizes="(max-width: 1024px) 220px, 255px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1 space-y-[12px]">
              <p className="inline-flex items-center gap-2 rounded-full bg-brand-sand px-3.5 py-1.5 text-[13px] font-bold text-black">
                <TrophyIcon className="h-4 w-4" />
                Meilleur documentaire · LEKKIFEST 2026, Lagos
              </p>
              <h3 className="text-[26px] font-bold leading-[1.2] text-brand-sand">TOUT LE MONDE EST LÀ (Here We Are)</h3>
              <p><span className="inline-block rounded-full border border-brand-sand/50 px-3 py-1 text-[13px] font-semibold uppercase tracking-[0.12em] text-brand-sand">Court métrage documentaire · 13 min</span></p>
              <p className="text-[15px] leading-[1.6] text-white/70">
                (Une coproduction AGORA FILM INVEST - IMAGIN STUDIO)
                <br />
                <span className="font-semibold text-brand-sand">Auteur :</span> Tony Coco-Viloin
              </p>
              <p className="text-[16px] leading-[1.65] text-white/85 text-white">
                2019, la ville de Cannes célèbre pour la 72ème fois le Cinéma... et la première fois, selon
                d&apos;autres, celui d&apos;Afrique(s). Sauf que, 22 ans plus tôt, pour la 50ème édition du festival, des
                cinéastes venus du monde entier avaient déjà fait émerger le concept d&apos;Agora, Art Général
                d&apos;Origine Africaine, A.G.O.R.A. Entre poésie et amnésie, certaines questions ne meurent jamais,
                grâce à ceux qui ne s&apos;endorment ni la nuit, ni le jour.
              </p>
            </div>
          </article>
          <article className="stagger-item relative w-full max-w-full overflow-visible rounded-[28px] bg-black px-6 py-[30px] text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] md:px-8 lg:mx-auto lg:max-w-[1120px] lg:px-[50px] lg:pr-[250px] lg:py-[30px]">
            <div className="min-w-0 w-full max-w-full space-y-[12px]">
              <h3 className="text-[26px] font-bold leading-[1.2] text-brand-sand">LE CINÉMA DE GUIZMO &amp; MRCLAP</h3>
              <p><span className="inline-block rounded-full border border-brand-sand/50 px-3 py-1 text-[13px] font-semibold uppercase tracking-[0.12em] text-brand-sand">Shortcom TV · 60 × 2 min</span></p>
              <p className="text-[16px] leading-[1.65] text-white/85">
                (Une coproduction ÉPICES - AGORA FILM INVEST - CANAL+ ANTILLES - CANAL+ GUYANE - FILMDIS)
                <br />
                <span className="font-semibold text-brand-sand">Auteur :</span> Tony Coco-Viloin
                <br />
                (Cinéaste et directeur de l&apos;école ÉPICES)
              </p>
              <p className="text-[16px] leading-[1.65] text-white/85">
                <span className="font-semibold">Le concept :</span>{" "}Sous forme de série feuilletonnante, l&apos;histoire
                du cinéma est racontée avec humour par MrClap, professeur de cinéma et Guizmo, assistant de cours,
                tous deux rescapés d&apos;un crash aérien. Cette shortcom s&apos;adresse à l&apos;ensemble du monde en
                racontant pour la première fois l&apos;histoire du cinéma, à partir d&apos;une mise en scène caribéenne.
              </p>
            </div>
            <div className="absolute right-[-18px] top-1/2 hidden -translate-y-1/2 lg:block">
              <div className="hover-lift relative h-[392px] w-[255px] overflow-hidden rounded-[18px] shadow-[0_10px_24px_rgba(0,0,0,0.25)]">
                <Image src="/images/realisation-guizmo-mrclap-poster.jpg" alt="Guizmo et MrClap" fill sizes="(max-width: 1024px) 215px, 255px" className="object-cover" />
              </div>
            </div>
            <div className="hover-lift relative mt-6 h-[302px] w-[215px] overflow-hidden rounded-[18px] shadow-[0_8px_25px_rgba(0,0,0,0.2)] lg:hidden">
              <Image src="/images/realisation-guizmo-mrclap-poster.jpg" alt="Guizmo et MrClap" fill sizes="215px" className="object-cover" />
            </div>
          </article>
        </div>
      </section>

      <section className="fade-section container-site min-w-0 px-4 pt-[90px] pb-[80px] sm:px-6 md:px-10">
        <h2 className="section-title reveal-title">Projet en développement</h2>
        <span className="section-bar" aria-hidden="true" />
        <article className="stagger-item relative mt-14 flex max-w-full flex-col gap-6 rounded-[28px] bg-black py-7 pl-6 pr-6 text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] md:flex-row md:gap-0 md:pl-[250px] md:pr-8 md:py-8 lg:mx-auto lg:max-w-[1120px] lg:pl-[250px] lg:pr-10 lg:py-[30px]">
          <div className="hover-lift relative mx-auto h-[300px] w-[220px] shrink-0 overflow-hidden rounded-[18px] shadow-[0_10px_24px_rgba(0,0,0,0.25)] max-md:mx-auto md:absolute md:-left-[24px] md:top-1/2 md:mx-0 md:h-[300px] md:w-[220px] md:-translate-y-1/2 lg:h-[360px] lg:w-[255px]">
            <Image
              src="/images/developpement-lautre-clef-poster.jpg"
              alt="L'autre clef"
              fill
              sizes="(max-width: 1024px) 220px, 255px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1 space-y-[12px]">
            <h3 className="text-[26px] font-bold leading-[1.2] text-brand-sand">L&apos;AUTRE CLEF</h3>
            <p><span className="inline-block rounded-full border border-brand-sand/50 px-3 py-1 text-[13px] font-semibold uppercase tracking-[0.12em] text-brand-sand">Long métrage documentaire · 120 min</span></p>
            <p className="text-[16px] leading-[1.65] text-white/85">(Une production AGORA FILM INVEST)</p>
            <p className="text-[16px] leading-[1.65] text-white/85">
              <span className="font-semibold text-brand-sand">Auteur :</span> Tony Coco-Viloin
            </p>
            <p className="text-[16px] leading-[1.65] text-white/85">
              <span className="font-semibold">Le concept :</span>{" "}L&apos;autre Clef s&apos;affiche comme un road-movie
              pour 4 comédiennes qui, autour de plusieurs continents, sous le mode d&apos;une fiction-documentaire nous
              guident des terres parfois inconnues, au Festival de Cannes. Un cheminement pour certaines figures du
              cinéma, parfois icônes, parfois idoles, vers un « exorcisme » culturel, un ciné-transe.
            </p>
          </div>
        </article>
      </section>

      <section className="fade-section relative scroll-mt-24 bg-white px-4 pb-[100px] pt-24 sm:pt-[72px] md:pt-[60px]">
        <div className="container-site min-w-0">
          <h2 className="section-title reveal-title">Ils nous ont fait confiance</h2>
          <span className="section-bar" aria-hidden="true" />
          <ul className="mx-auto mt-12 grid max-w-5xl grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-4">
            {logos.map((logo) => (
              <li key={logo.src} className="relative mx-auto h-16 w-36">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="144px"
                  className="object-contain grayscale transition duration-300 hover:grayscale-0"
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="pointer-events-none absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1440 120" className="h-[100px] w-full" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,80 C250,140 900,20 1440,90 L1440,120 L0,120 Z" fill="#007f59" />
          </svg>
        </div>
      </section>

      <section id="produits" className="fade-section -mt-px min-w-0 scroll-mt-20 bg-agGreen px-4 pb-[80px] pt-[60px] text-white sm:px-6 sm:pt-20">
        <div className="container-site min-w-0">
          <h2 className="section-title reveal-title">Nos produits</h2>
          <span className="section-bar !bg-white/80" aria-hidden="true" />
          <div className="mx-auto mt-12 grid max-w-2xl gap-5 sm:max-w-3xl sm:grid-cols-2">
            {products.map((product, index) => {
              const cardContent = (
                <>
                  <div className="relative mx-auto mb-5 h-14 w-14">
                    <Image src={product.icon} alt="" fill sizes="56px" className="object-contain" />
                  </div>
                  <p className="text-[20px] font-bold leading-[1.2]">{product.label}</p>
                  <p className="mt-3 inline-flex items-center gap-2 text-[14px] font-semibold uppercase tracking-[0.1em] text-agGreen transition-colors group-hover:text-white">
                    {product.cta}
                    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                      {product.href ? (
                        <path d="M6.3 3.7A1 1 0 0 0 4.8 4.6v10.8a1 1 0 0 0 1.5.9l8.6-5.4a1 1 0 0 0 0-1.8L6.3 3.7Z" />
                      ) : (
                        <path d="M10 4C5.5 4 2 10 2 10s3.5 6 8 6 8-6 8-6-3.5-6-8-6Zm0 9.5A3.5 3.5 0 1 1 10 6.5a3.5 3.5 0 0 1 0 7Zm0-5.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                      )}
                    </svg>
                  </p>
                </>
              );
              const cardClass =
                "group hover-lift relative block w-full cursor-pointer overflow-hidden rounded-2xl bg-white px-6 py-8 text-center text-black shadow-soft transition";

              if (product.href) {
                return (
                  <a
                    key={`${product.label}-${index}`}
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${cardClass} hover:bg-brand-plum hover:text-white`}
                    aria-label={`${product.label} — ${product.cta} (nouvel onglet)`}
                  >
                    {cardContent}
                  </a>
                );
              }

              if (product.hoverImage) {
                return (
                  <button
                    key={`${product.label}-${index}`}
                    type="button"
                    onClick={() => setActiveProductImage(product.hoverImage ?? null)}
                    className={`${cardClass} hover:text-white`}
                    aria-label={`${product.label} — ${product.cta}`}
                  >
                    <span className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                      <Image
                        src={product.hoverImage}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover"
                      />
                      <span className="absolute inset-0 bg-black/60" />
                    </span>
                    <div className="relative z-10">{cardContent}</div>
                  </button>
                );
              }

              return (
                <div
                  key={`${product.label}-${index}`}
                  className="hover-lift rounded-xl bg-white p-6 text-center text-black shadow-soft transition hover:-translate-y-1"
                >
                  {cardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="actualites" className="fade-section scroll-mt-20 bg-[#efefef]">
        {/* À la une : distinction LEKKIFEST 2026 */}
        <div className="px-4 pt-16 sm:px-6 md:px-10 md:pt-20">
          <article className="mx-auto grid max-w-[1120px] items-center gap-8 overflow-hidden rounded-[28px] bg-black p-6 text-white shadow-soft sm:p-8 md:grid-cols-[220px,1fr] md:gap-12 md:p-12">
            <div className="relative mx-auto h-[300px] w-[210px] shrink-0 overflow-hidden rounded-[18px] shadow-[0_10px_24px_rgba(0,0,0,0.4)] ring-2 ring-brand-sand/60">
              <Image
                src="/images/realisation-here-we-are-poster.jpg"
                alt="Affiche du film Tout le monde est là (Here We Are)"
                fill
                sizes="210px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.22em] text-brand-sand sm:text-[13px]">
                <TrophyIcon className="h-4 w-4" />
                À la une · Distinction
              </p>
              <h2 className="mt-3 text-[1.75rem] font-extrabold leading-tight md:text-[38px]">
                « Tout le monde est là » sacré Meilleur documentaire au LEKKIFEST 2026
              </h2>
              <p className="mt-4 inline-flex rounded-full bg-brand-sand px-4 py-1.5 text-[13px] font-semibold text-black">
                17 – 21 novembre 2026 · Lagos, Nigeria
              </p>
              <p className="mt-5 max-w-[640px] text-[16px] leading-[1.7] text-white/85">
                Le court métrage documentaire de Tony Coco-Viloin, coproduit par AGORA FILM INVEST et IMAGIN STUDIO,
                remporte le Prix du meilleur documentaire au Lekki International Film Festival (LEKKIFEST) de Lagos.
              </p>
              <p className="mt-3 max-w-[640px] text-[16px] leading-[1.7] text-white/85">
                Le film revient sur la naissance du concept AGORA — Art Général d&apos;Origine Africaine — lors du 50ᵉ
                Festival de Cannes en 1997, et interroge la reconnaissance des cinémas d&apos;Afrique et de sa diaspora.
                Une distinction obtenue aux côtés d&apos;autres productions francophones primées cette année.
              </p>
              <a href="#realisations" className="btn-secondary mt-7 border-brand-sand text-brand-sand hover:bg-brand-sand hover:text-black">
                Découvrir le film
              </a>
            </div>
          </article>
        </div>
        <div className="mx-auto grid w-full grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col md:min-h-[560px] md:items-center md:justify-center md:px-12 md:py-16">
            <div className="w-full max-w-[540px] pl-3 md:pl-4">
              <div className="px-6 pb-6 pt-14 md:px-0 md:pb-0 md:pt-0">
                <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-brand-sand-dark sm:text-[13px]">Actualité</p>
                <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-[40px]">Festival de Cannes 2026</h2>
                <p className="mt-4 inline-flex rounded-full bg-black px-4 py-1.5 text-[13px] font-semibold text-brand-sand">12 – 23 mai 2026</p>
                <p className="mt-5 max-w-[470px] text-[17px] font-normal leading-[1.7]">
                  La société AGORA FILM INVEST assistera une fois de plus, comme à son habitude, à la 79ème édition
                  du Festival de Cannes qui aura lieu du 12 au 23 mai 2026.
                </p>
              </div>
              <div className="parallax-media relative min-h-[260px] w-full overflow-hidden md:hidden">
                <Image
                  src="/images/actus-cannes-75.jpg"
                  alt="Festival international du film de Cannes"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div className="px-6 pb-10 pt-[40px] md:mt-[60px] md:px-0 md:pb-0 md:pt-0">
                <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-brand-sand-dark sm:text-[13px]">Évènement</p>
                <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-[40px]">Lancement international de Vivita</h2>
                <p className="mt-4 inline-flex rounded-full bg-black px-4 py-1.5 text-[13px] font-semibold text-brand-sand">20 mai 2026 · Cannes</p>
                <p className="mt-5 max-w-[470px] text-[17px] font-normal leading-[1.7]">
                  Vivita est une marque de cosmétiques née en 2022 au Sénégal, pensée pour répondre aux besoins
                  d&apos;une clientèle moderne en quête de qualité, d&apos;accessibilité et d&apos;efficacité.
                </p>
                <p className="mt-4 max-w-[470px] text-[17px] font-normal leading-[1.7]">
                  Fabriquée au Canada et portée par le holding Cosmakeup, Vivita s&apos;appuie sur un écosystème solide
                  de distribution, avec plusieurs boutiques au Sénégal et une présence à Abidjan et au Rwanda.
                </p>
                <p className="mt-4 max-w-[470px] text-[17px] font-normal leading-[1.7]">
                  Déjà visible à travers des événements prestigieux et des partenariats dans l&apos;univers du cinéma
                  avec plusieurs maisons de production au Sénégal, cette fois avec Agora Film Invest, la marque
                  affirme un positionnement à la fois premium, culturel et international.
                </p>
                <p className="mt-4 max-w-[470px] text-[17px] font-normal leading-[1.7]">
                  Le 20 mai, à l&apos;occasion du Festival de Cannes, Vivita franchit une étape clé avec son lancement
                  international officiel.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="https://www.eventbrite.com/e/billets-seance-de-projection-de-rafprod-agora-film-invest-344147232637"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary px-7 py-3 text-base"
                  >
                    Inscription à l&apos;évènement
                  </a>
                  <button type="button" className="btn-secondary">
                    Programme de l&apos;évènement
                  </button>
                </div>
              </div>
              <div className="parallax-media relative min-h-[260px] w-full overflow-hidden md:hidden">
                <Image
                  src="/images/evenement-radisson.jpg"
                  alt="Événement Radisson Cannes"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="hidden min-h-[560px] grid-cols-1 grid-rows-2 md:grid">
            <div className="parallax-media relative min-h-[280px] overflow-hidden md:min-h-0 md:h-full">
              <Image
                src="/images/actus-cannes-75.jpg"
                alt="Festival international du film de Cannes"
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
            <div className="parallax-media relative min-h-[280px] overflow-hidden md:min-h-0 md:h-full">
              <Image
                src="/images/evenement-radisson.jpg"
                alt="Événement Radisson Cannes"
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="equipe" className="fade-section bg-black px-6 py-20 text-white md:px-10 md:py-24">
        <div className="container-site">
          <h2 className="section-title reveal-title">Notre équipe</h2>
          <span className="section-bar" aria-hidden="true" />
          <div className="stagger-list mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="stagger-item group text-center">
                <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full ring-2 ring-white/15 transition duration-300 group-hover:ring-brand-sand sm:h-40 sm:w-40">
                  <Image src={member.img} alt={member.name} fill sizes="(max-width: 640px) 128px, 160px" className="object-cover" />
                </div>
                <h3 className="mt-5 break-words text-lg font-bold leading-tight sm:text-xl md:text-2xl">{member.name}</h3>
                <p className="mx-auto mt-2 max-w-[240px] whitespace-pre-line text-[14px] leading-snug text-brand-sand/90">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="galerie" className="fade-section container-site px-6 py-20 md:px-10 md:py-24">
        <h2 className="section-title reveal-title">Agora Film Invest en images</h2>
        <span className="section-bar" aria-hidden="true" />
        <div className="mt-12 grid grid-cols-2 auto-rows-[110px] gap-3 md:grid-cols-4 lg:grid-cols-[repeat(16,minmax(0,1fr))] lg:auto-rows-[72px]">
          {galerie.map((img, index) => (
            <div
              key={img}
              className={`hover-lift relative col-span-1 row-span-2 overflow-hidden rounded-xl shadow-soft ${galerieLayout[index] ?? "lg:col-span-2 lg:row-span-3"}`}
            >
              <Image
                src={img}
                alt={`Agora Film Invest en image — photo ${index + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 32vw"
                quality={95}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="fade-section bg-[#e9e9e9] py-10 md:py-16">
        <div className="mx-auto grid w-full max-w-[1280px] items-stretch overflow-hidden md:grid-cols-2 md:rounded-[28px] md:shadow-soft">
          <div className="relative h-full">
            <Image src="/images/contact-bg.jpg" alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" className="parallax-media object-cover" />
            <div className="absolute inset-0 bg-black/65" />
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 py-16 text-center text-white">
              <h2 className="section-title reveal-title">Contact</h2>
              <span className="section-bar" aria-hidden="true" />
              <p className="mt-8 text-[17px] leading-[1.7]">
                <span className="font-semibold text-brand-sand">Email :</span>{" "}
                <a href="mailto:contactagorafilminvest@gmail.com" className="break-all underline-offset-4 hover:underline">
                  contactagorafilminvest@gmail.com
                </a>
              </p>
              <p className="mt-2 text-[17px] leading-[1.7]">
                <span className="font-semibold text-brand-sand">Adresse :</span> 12 rue de la République Domly 97110 Pointe-à-Pitre, France
              </p>
              <p className="mt-2 text-[17px] leading-[1.7]">
                <span className="font-semibold text-brand-sand">Tél :</span>{" "}
                <a href="tel:+33778214874" className="underline-offset-4 hover:underline">
                  +33 7 78 21 48 74
                </a>
              </p>
            </div>
          </div>

          <div className="bg-[#efefef] px-6 py-12 md:px-12">
            <div className="mx-auto max-w-[560px]">
              <h3 className="reveal-title text-center text-[28px] font-extrabold leading-[1.2] text-black">Écrivez-nous</h3>
              <form className="mt-10 space-y-4" onSubmit={handleContactSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className={labelClass}>Prénom</span>
                    <input name="prenom" autoComplete="given-name" className={inputClass} />
                  </label>
                  <label className="block">
                    <span className={labelClass}>Nom</span>
                    <input name="nom" autoComplete="family-name" className={inputClass} />
                  </label>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className={labelClass}>E-mail</span>
                    <input name="email" type="email" autoComplete="email" className={inputClass} placeholder="nom@exemple.com" />
                  </label>
                  <label className="block">
                    <span className={labelClass}>Téléphone</span>
                    <input name="telephone" type="tel" autoComplete="tel" className={inputClass} />
                  </label>
                </div>
                <label className="block">
                  <span className={labelClass}>Objet</span>
                  <input name="objet" className={inputClass} />
                </label>
                <label className="block">
                  <span className={labelClass}>
                    Message <span className="text-brand-sand-dark" aria-hidden="true">*</span>
                  </span>
                  <textarea name="message" required className={`h-36 resize-y ${inputClass}`} placeholder="Rédigez votre message ici" />
                </label>
                <div className="pt-3 text-center">
                  <button type="submit" className="btn-primary px-12 py-3.5 text-[16px]">
                    Envoyer
                  </button>
                  <p className="mt-4 text-[14px] font-normal text-black/60">
                    Le bouton ouvre votre messagerie avec le message pré-rempli.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white">
        <div className="container-site flex flex-col items-center gap-6 px-6 py-10 md:flex-row md:justify-between md:px-10">
          <a href="#accueil" className="relative block h-[54px] w-[84px] shrink-0" aria-label="Agora Film Invest — retour en haut de page">
            <Image src="/logo/logo-agora.png" alt="Agora Film Invest" fill sizes="84px" className="object-contain" />
          </a>
          <nav aria-label="Liens de pied de page" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[14px] text-black/70">
            {navItems
              .filter((item) => !item.mailto)
              .map((item) => (
                <a key={item.id} href={`#${item.id}`} className="transition hover:text-black">
                  {item.label}
                </a>
              ))}
          </nav>
          <div className="flex items-center gap-3">
            <SocialIconLink href="https://www.facebook.com/" ariaLabel="Facebook" src="/social/icon-facebook.png" fallback="f" />
            <SocialIconLink href="https://www.instagram.com/" ariaLabel="Instagram" src="/social/icon-instagram.png" fallback="ig" />
          </div>
        </div>
        <div className="border-t border-black/5 px-6 py-4 text-center text-[13px] text-black/60">
          © 2021–<span suppressHydrationWarning>{new Date().getFullYear()}</span> Agora Film Invest · Site réalisé par Fastgraphiste
        </div>
      </footer>

      {activeProductImage ? (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 px-4 py-8"
          onClick={() => setActiveProductImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Aperçu de l'image produit"
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-black transition hover:bg-white"
            onClick={() => setActiveProductImage(null)}
          >
            Fermer
          </button>
          <div
            className="relative h-[min(82vh,900px)] w-[min(94vw,1300px)] overflow-hidden rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image src={activeProductImage} alt="Aperçu produit" fill sizes="100vw" className="object-contain bg-black" />
          </div>
        </div>
      ) : null}
    </main>
  );
}

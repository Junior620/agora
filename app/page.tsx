"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const navItems = [
  { label: "Accueil", id: "accueil" },
  { label: "Nos réalisations", id: "realisations" },
  { label: "A propos de nous", id: "apropos" },
  { label: "Nos produits", id: "produits" },
  { label: "Notre équipe", id: "equipe" },
  { label: "Actualités", id: "actualites" },
  { label: "Galerie", id: "galerie" },
  { label: "Nous contacter", id: "contact" },
];

const logos = [
  "/logos/logo-festival-cannes.png",
  "/logos/logo-epices.png",
  "/logos/logo-mycanal-caraibes.png",
  "/logos/logo-filmdis.png",
  "/logos/logo-partenaire-5.png",
  "/logos/logo-riviera-levant.png",
  "/logos/logo-acme.png",
  "/logos/logo-studio-sud.png",
];

const team = [
  { name: "Didier Mouliom", role: "Directeur Général", img: "/images/team-didier.jpg" },
  { name: "Kadia Mouliom", role: "Responsable Afrique de l'ouest", img: "/images/team-kadia.jpg" },
  { name: "Tony Coco-Viloin", role: "Directeur ÉPICES et Réalisateur", img: "/images/team-tony.jpg" },
  { name: "Julien Kemajou", role: "Responsable Marketing", img: "/images/team-julien.jpg" },
  { name: "Myriam Laffond", role: "Chargée de production", img: "/images/team-member-5.jpg" },
  { name: "Ibrahim Souleymane", role: "Chargé de production", img: "/images/team-member-6.jpg" },
  { name: "Jean-José Caddy", role: "Caméraman", img: "/images/team-member-7.jpg" },
  { name: "Leanna Reeves", role: "Consultante en Finance internationale", img: "/images/team-member-8.jpg" },
  { name: "Aicha Gning", role: "Production", img: "/images/team-aicha-gning.jpg" },
  { name: "Cheikh Senghor", role: "Production", img: "/images/team-cheikh-senghor.jpg" },
  { name: "Thierno Diop", role: "Production", img: "/images/team-thierno-diop.jpg" },
];

const galerie = Array.from({ length: 10 }, (_, i) => `/images/galerie-${i + 1}.jpg`);
const products = [
  { label: "Long-metrage", icon: "/images/produit-long-metrage.png" },
  { label: "Court-metrage", icon: "/images/produit-court-metrage.png" },
  { label: "Séries télévisées", icon: "/images/produit-series-televisees.png" },
  { label: "Long-metrage", icon: "/images/produit-long-metrage-2.png" },
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
      className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-zinc-200 ring-1 ring-black/10 transition hover:bg-zinc-300"
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
          sizes="40px"
          className="object-contain p-1.5"
          onError={() => setFailed(true)}
        />
      )}
    </a>
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

export default function Home() {
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

      /* Scroll (desktop / tablette) : évite sur mobile (titres tronqués, bande grise, blocs vides) */
      mm.add("(min-width: 768px)", () => {
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

  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#efefef]">
      <header className="site-header sticky top-0 z-50 pt-3">
        <div className="container-site px-4 md:px-8">
          <div className="flex items-center justify-between rounded-full bg-white px-6 py-4 shadow-sm">
            <a href="#accueil" className="relative block h-[60px] w-[132px] shrink-0 sm:h-[64px] sm:w-[142px] lg:h-[68px] lg:w-[152px]">
              <Image
                src="/logo/logo.png"
                alt="Logo Agora Film Invest"
                fill
                sizes="(max-width: 640px) 132px, (max-width: 1024px) 142px, 152px"
                className="object-contain object-left"
                priority
              />
            </a>
            <nav className="hidden items-center gap-10 text-[15px] font-normal lg:flex">
              {navItems.map((item) => (
                <a key={item.id} href={`#${item.id}`} className="transition hover:opacity-60">
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2 text-sm">
              <span>FR</span>
              <span className="text-[10px]">▼</span>
            </div>
          </div>
        </div>
      </header>

      <section
        id="accueil"
        className="fade-section container-site min-w-0 px-4 pt-2 pb-8 md:px-8 md:pt-3 md:pb-12 lg:-mt-10 lg:pt-0"
      >
        <div className="grid min-w-0 gap-8 lg:grid-cols-[1.15fr,1.2fr] lg:items-start">
          <div className="min-w-0 space-y-8 pt-6 lg:flex lg:min-h-[500px] lg:flex-col lg:justify-center lg:pt-14">
            <h1 className="max-w-full text-[1.4rem] font-bold leading-[1.18] tracking-[-0.01em] sm:text-[1.6rem] md:text-[31px] lg:max-w-[860px] lg:text-[34px]">
              <span className="hidden lg:block">
                <span className="block whitespace-nowrap">AGORA FILM INVEST fait émerger,</span>
                <span className="block whitespace-nowrap">développe la créativité, la production</span>
                <span className="block whitespace-nowrap">cinématographique et s&apos;occupe de la</span>
                <span className="block whitespace-nowrap">promotion des talents</span>
              </span>
              <span className="lg:hidden">
                AGORA FILM INVEST fait émerger, développe la créativité, la production cinématographique et
                s&apos;occupe de la promotion des talents
              </span>
            </h1>
            <a href="#contact" className="btn-primary self-start px-10 py-4 text-base lg:self-center lg:ml-0">
              Nous contacter
            </a>
          </div>
          <div className="parallax-media relative h-[500px] overflow-hidden rounded-sm lg:-mt-4">
            <Image src="/images/hero-main.jpg" alt="Hero principal" fill sizes="(max-width: 1024px) 100vw, 55vw" loading="eager" className="object-cover" />
          </div>
        </div>
        <div className="relative mt-8 h-[340px] min-w-0 overflow-x-clip md:h-[400px] lg:-ml-6 lg:mt-6 lg:h-[470px]">
          <div className="parallax-media absolute left-[6%] top-[8px] z-10 h-[210px] w-[40%] overflow-hidden rounded-[24px] shadow-[0_10px_26px_rgba(0,0,0,0.14)] md:left-[4%] md:h-[260px] md:w-[38%] lg:left-[0px] lg:top-[40px] lg:h-[248px] lg:w-[465px]">
            <Image src="/images/hero-collage-1.jpg" alt="Collage 1" fill sizes="(max-width: 1024px) 45vw, 36vw" className="object-cover object-center" />
          </div>
          <div className="parallax-media absolute left-[27%] top-[56px] z-20 h-[220px] w-[47%] overflow-hidden rounded-[24px] shadow-[0_12px_28px_rgba(0,0,0,0.16)] md:left-[25%] md:h-[275px] md:w-[45%] lg:left-[320px] lg:top-[108px] lg:h-[290px] lg:w-[520px]">
            <Image src="/images/hero-collage-2.jpg" alt="Collage 2" fill sizes="(max-width: 1024px) 48vw, 40vw" className="object-cover object-center" />
          </div>
          <div className="parallax-media absolute right-[1%] top-[118px] z-10 h-[228px] w-[46%] overflow-hidden rounded-[24px] shadow-[0_10px_26px_rgba(0,0,0,0.14)] md:right-[1%] md:h-[280px] md:w-[42%] lg:right-[8px] lg:top-[172px] lg:h-[286px] lg:w-[468px]">
            <Image src="/images/hero-collage-3.jpg" alt="Collage 3" fill sizes="(max-width: 1024px) 42vw, 34vw" className="object-cover object-center" />
          </div>
        </div>
      </section>

      <section className="fade-section relative h-[360px] w-full min-w-0 overflow-hidden md:h-[460px]">
        <Image src="/images/banner-camera.jpg" alt="Bannière caméra" fill sizes="100vw" className="parallax-media object-cover" />
      </section>

      <section id="qui-sommes-nous" className="fade-section bg-[#efefef] px-4 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1340px]">
          <h2 className="text-center text-[36px] font-extrabold uppercase leading-none tracking-[0.03em]">
            QUI SOMMES NOUS ?
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-[68px] bg-black" />
          <div className="mx-auto mt-12 max-w-[1180px] space-y-7 text-[17px] leading-[1.36] text-[#151515] md:text-[17px]">
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
              <span className="font-extrabold">AGORA FILM INVEST</span> au coeur de la Caraïbe traduit aussi cette
              volonté de coopérer et de co-produire avec l&apos;Afrique, les USA, l&apos;Europe et la région Caraïbes.
            </p>
            <p>
              <span className="font-extrabold">AGORA FILM INVEST</span> propose un positionnement spécifique :
              production de projets cinématographiques se réalisant dans la Caraïbe, en Europe, en Afrique ou dans
              les Amériques, avec des possibilités de transversalité. Saisie par cette attente et dans l&apos;approche
              que nous avons de chaque projet, <span className="font-extrabold">AGORA FILM INVEST</span> privilégie
              les histoires individuelles qui se retrouvent au fur et à mesure dans une histoire tant collective
              qu&apos;originelle.
            </p>
          </div>
        </div>
      </section>

      <section id="apropos" className="fade-section bg-black px-6 py-[70px] text-white md:px-8">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex flex-col items-center">
            <h2 className="text-center text-[36px] font-bold uppercase leading-[1.2] tracking-[0.03em]">
              A PROPOS DE NOUS
            </h2>
            <div className="mt-[14px] h-[3px] w-[56px] bg-white" />
          </div>
          <div className="mx-auto mt-[42px] max-w-[1230px] space-y-[24px] text-[17px] font-normal leading-[1.4] text-white">
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
        <h2 className="reveal-title break-words text-center text-[1.6rem] font-bold uppercase leading-tight tracking-[0.02em] sm:text-4xl md:text-5xl lg:text-[56px]">
          NOS RÉALISATIONS
        </h2>
        <div className="stagger-list mt-[48px] grid gap-y-[112px]">
          <article className="stagger-item relative flex max-w-full flex-col gap-6 rounded-[28px] bg-black py-7 pl-6 pr-6 text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] md:flex-row md:gap-0 md:pl-[250px] md:pr-8 md:py-8 lg:mx-auto lg:max-w-[1120px] lg:pl-[250px] lg:pr-10 lg:py-[30px]">
            <div className="hover-lift relative mx-auto h-[300px] w-[220px] shrink-0 overflow-hidden rounded-[18px] shadow-[0_10px_24px_rgba(0,0,0,0.25)] max-md:mx-auto md:absolute md:-left-[24px] md:top-1/2 md:mx-0 md:h-[300px] md:w-[220px] md:-translate-y-1/2 lg:h-[360px] lg:w-[255px]">
              <Image src="/images/realisation-here-we-are-poster.jpg" alt="Here we are" fill sizes="(max-width: 1024px) 220px, 255px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1 space-y-[12px]">
              <h3 className="text-[26px] font-bold leading-[1.2] text-yellow-300">TOUT LE MONDE EST LÀ (Here We Are)</h3>
              <p className="text-[16px] leading-[1.35] text-white">CM-DOC (13 min.)</p>
              <p className="text-[16px] leading-[1.35] text-white">
                (Une coproduction AGORA FILM INVEST - IMAGIN STUDIO)
                <br />
                <span className="font-semibold text-yellow-400">Auteur :</span> Tony Coco-Viloin
              </p>
              <p className="text-[17px] leading-[1.4] text-white">
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
              <h3 className="text-[26px] font-bold leading-[1.2]">LE CINÉMA DE GUIZMO &amp; MRCLAP</h3>
              <p className="text-[16px] leading-[1.35]">Shortcom TV (60 x 2min.)</p>
              <p className="text-[17px] leading-[1.4]">
                (Une coproduction ÉPICES - AGORA FILM INVEST - CANAL+ ANTILLES - CANAL+ GUYANE - FILMDIS)
                <br />
                <span className="font-semibold text-yellow-400">Auteur :</span> Tony Coco-Viloin
                <br />
                (Cinéaste et directeur de l&apos;école ÉPICES)
              </p>
              <p className="text-[17px] leading-[1.4]">
                <span className="font-semibold">Le concept :</span> Sous forme de série feuilletonnante, l&apos;histoire
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
        <h2 className="reveal-title break-words text-center text-[1.5rem] font-bold uppercase leading-tight tracking-[0.02em] sm:text-3xl md:text-5xl lg:text-[56px]">
          PROJET EN DÉVELOPPEMENT
        </h2>
        <article className="stagger-item relative mt-[48px] flex max-w-full flex-col gap-6 rounded-[28px] bg-black py-7 pl-6 pr-6 text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] md:flex-row md:gap-0 md:pl-[250px] md:pr-8 md:py-8 lg:mx-auto lg:max-w-[1120px] lg:pl-[250px] lg:pr-10 lg:py-[30px]">
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
            <h3 className="text-[26px] font-bold leading-[1.2]">L&apos;AUTRE CLEF</h3>
            <p className="text-[16px] leading-[1.35]">LM-DOC (120 min.)</p>
            <p className="text-[17px] leading-[1.4]">(Une production AGORA FILM INVEST)</p>
            <p className="text-[17px] leading-[1.4]">
              <span className="font-semibold text-yellow-400">Auteur :</span> Tony Coco-Viloin
            </p>
            <p className="text-[17px] leading-[1.4]">
              <span className="font-semibold">Le concept :</span> L&apos;autre Clef s&apos;affiche comme un road-movie
              pour 4 comédiennes qui, autour de plusieurs continents, sous le mode d&apos;une fiction-documentaire nous
              guident des terres parfois inconnues, au Festival de Cannes. Un cheminement pour certaines figures du
              cinéma, parfois icônes, parfois idoles, vers un « exorcisme » culturel, un ciné-transe.
            </p>
          </div>
        </article>
      </section>

      <section className="fade-section relative scroll-mt-24 bg-white px-4 pb-[100px] pt-24 sm:pt-[72px] md:pt-[60px]">
        <div className="container-site min-w-0">
          <h2 className="reveal-title break-words text-center text-3xl font-black sm:text-4xl md:text-5xl">Ils nous ont fait confiance</h2>
          <div className="mt-10 grid grid-cols-2 items-center gap-8 md:grid-cols-3 lg:grid-cols-6">
            {logos.map((logo) => (
              <div key={logo} className="relative mx-auto h-16 w-36">
                <Image src={logo} alt="Logo partenaire" fill sizes="(max-width: 768px) 30vw, 140px" className="object-contain" />
              </div>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1440 120" className="h-[100px] w-full" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,80 C250,140 900,20 1440,90 L1440,120 L0,120 Z" fill="#0b8d62" />
          </svg>
        </div>
      </section>

      <section id="produits" className="fade-section -mt-px min-w-0 scroll-mt-20 bg-agGreen px-4 pb-[80px] pt-[60px] text-white sm:px-6 sm:pt-20">
        <div className="container-site min-w-0">
          <h2 className="section-title reveal-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl">NOS PRODUITS</h2>
          <div className="stagger-list mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => (
              <div
                key={`${product.label}-${index}`}
                className="stagger-item hover-lift rounded-xl bg-white p-6 text-center text-black shadow-soft transition hover:-translate-y-1"
              >
                <div className="relative mx-auto mb-4 h-11 w-11">
                  <Image src={product.icon} alt={`Icône ${product.label}`} fill sizes="44px" className="object-contain" />
                </div>
                <p className="text-[18px] font-semibold leading-[1.2]">{product.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fade-section grid bg-[#efefef] md:grid-cols-2">
        <div className="flex items-center justify-center px-6 py-14 md:px-12 md:py-16">
          <div className="w-full max-w-[540px] pl-3 md:pl-4">
            <div>
              <h2 className="text-[50px] font-bold leading-[1.2]">Actualité :</h2>
              <p className="mt-6 max-w-[450px] text-[17px] font-normal leading-[1.75]">
                La société AGORA FILM INVEST assistera une fois de plus comme à son habitude à la 75ème édition du
                Festival de Cannes qui aura lieu du 17 au 28 Mai 2022.
              </p>
            </div>
            <div className="mt-[60px]">
              <h2 className="text-[50px] font-bold leading-[1.2]">Évènement :</h2>
              <p className="mt-6 max-w-[470px] text-[17px] font-normal leading-[1.75]">
                Les sociétés de production RAFPROD et Agora Film Invest ont organisé, les 15 Mai 2022 de 14h a 17h,
                à hôtel radisson 1255 de Cannes une séance de projection de ses différentes oeuvres (courtmétrage,
                court métrage et séries).
              </p>
              <p className="mt-4 max-w-[470px] text-[17px] font-normal leading-[1.75]">
                Nous vous invitons à venir découvrir lors de cet évènement nos réalisations en avant l&apos;avant
                rencontre le talentueux producteur sénégalais Mme Clara Gaye et le réalisateur français Tony Coco-Vioin.
              </p>
              <div className="mt-[30px] flex flex-col items-start gap-[15px]">
                <button className="rounded-full bg-gray-500 px-7 py-3 text-base font-medium text-white transition hover:bg-gray-600">
                  Programme de l&apos;évènement
                </button>
                <button className="rounded-full bg-gray-500 px-7 py-3 text-base font-medium text-white transition hover:bg-gray-600">
                  Inscription à l&apos;évènement
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid min-h-[560px] grid-rows-2">
          <div className="parallax-media relative overflow-hidden">
            <Image src="/images/actus-cannes-75.jpg" alt="Cannes 75" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className="parallax-media relative overflow-hidden">
            <Image src="/images/evenement-radisson.jpg" alt="Evenement Radisson" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section id="actualites" className="fade-section border-t border-black/5 bg-white px-4 py-12 sm:px-6 sm:py-14 md:px-10 md:py-16">
        <div className="container-site mx-auto max-w-[1180px]">
          <h2 className="section-title reveal-title px-1">Actualités</h2>
          <article className="mt-8 grid gap-8 sm:mt-10 sm:gap-10 md:mt-12 lg:grid-cols-2 lg:items-start lg:gap-14">
            <div className="min-w-0 max-w-prose space-y-5 text-base leading-[1.7] text-[#1a1a1a] sm:space-y-6 sm:text-[17px] sm:leading-[1.75] lg:max-w-none">
              <h3 className="text-2xl font-bold leading-tight text-black sm:text-3xl md:text-4xl">Vivita</h3>
              <p>
                Vivita est une marque de cosmétiques née en 2022 au Sénégal, pensée pour répondre aux besoins
                d&apos;une clientèle moderne en quête de qualité, d&apos;accessibilité et d&apos;efficacité.
              </p>
              <p>
                Fabriquée au Canada et portée par le holding Cosmakeup, Vivita s&apos;appuie sur un écosystème
                solide de distribution, avec plusieurs boutiques au Sénégal et une présence à Abidjan et au Rwanda.
              </p>
              <p>
                Déjà visible à travers des événements prestigieux et des partenariats dans l&apos;univers du cinéma
                avec plusieurs maisons de production au Sénégal, cette fois avec Agora Film Invest, la marque
                affirme un positionnement à la fois premium, culturel et international.
              </p>
              <p className="border-l-4 border-agGreen pl-4 text-base font-medium leading-[1.6] text-black sm:pl-5 sm:text-[17px] md:text-[18px]">
                Le 20 mai, à l&apos;occasion du Festival de Cannes, Vivita franchit une étape clé avec son
                lancement international officiel.
              </p>
            </div>
            <div className="min-w-0 w-full lg:sticky lg:top-24 lg:self-start">
              <VivitaIllustration />
            </div>
          </article>
        </div>
      </section>

      <section id="equipe" className="fade-section bg-black px-6 py-16 text-white md:px-10">
        <div className="container-site">
          <h2 className="section-title reveal-title">Notre équipe</h2>
          <div className="stagger-list mt-14 grid grid-cols-2 gap-8 md:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="stagger-item text-center">
                <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full ring-2 ring-white/20">
                  <Image src={member.img} alt={member.name} fill sizes="160px" className="object-cover" />
                </div>
                <h3 className="mt-4 text-3xl font-bold">{member.name}</h3>
                <p className="mt-1 text-base text-white/80">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="galerie" className="fade-section container-site px-6 py-16 md:px-10">
        <h2 className="section-title reveal-title">AGORA FILM INVEST EN IMAGE</h2>
        <div className="mt-12 grid grid-cols-2 auto-rows-[110px] gap-3 md:grid-cols-4 lg:grid-cols-[repeat(16,minmax(0,1fr))] lg:auto-rows-[72px]">
          {galerie.map((img, index) => (
            <div
              key={img}
              className={`hover-lift relative col-span-1 row-span-2 overflow-hidden rounded-lg shadow-soft transition hover:scale-[1.02] ${galerieLayout[index] ?? "lg:col-span-2 lg:row-span-3"}`}
            >
              <Image
                src={img}
                alt="Galerie Agora Film Invest"
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 32vw"
                quality={95}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="fade-section bg-[#e9e9e9] py-8 md:py-12">
        <div className="mx-auto grid w-full max-w-[1400px] items-stretch overflow-hidden md:grid-cols-2">
          <div className="relative h-full">
            <Image src="/images/contact-bg.jpg" alt="Contact background" fill sizes="(max-width: 1024px) 100vw, 50vw" className="parallax-media object-cover" />
            <div className="absolute inset-0 bg-black/65" />
            <div className="relative z-10 flex h-full flex-col items-center px-8 pt-20 text-center text-white">
              <h2 className="reveal-title text-[50px] font-bold uppercase tracking-[0.2em]">Contact</h2>
              <p className="mt-6 text-[18px] leading-[1.7]">
                <span className="font-semibold">Tél :</span> +33778214874
              </p>
              <p className="mt-2 text-[18px] leading-[1.7]">
                <span className="font-semibold">Email :</span> contactagorafilminvest@gmail.com
              </p>
              <p className="mt-2 text-[18px] leading-[1.7]">
                <span className="font-semibold">Adresse :</span> 12 rue de la République Domly 97110 Pointe-a-Pitre, France
              </p>
              <div className="mt-6 h-[3px] w-14 bg-white/90" />
            </div>
          </div>

          <div className="bg-[#efefef] px-6 py-12 md:px-12">
            <div className="mx-auto max-w-[560px]">
              <h3 className="reveal-title text-center text-[30px] font-bold leading-[1.2] text-black">Nous contacter</h3>
              <form className="mt-10 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className="w-full rounded-md bg-[#dcdcdc] px-5 py-4 text-[16px] font-normal text-black placeholder:text-[16px] placeholder:text-black/65" placeholder="Prénom" />
                  <input className="w-full rounded-md bg-[#dcdcdc] px-5 py-4 text-[16px] font-normal text-black placeholder:text-[16px] placeholder:text-black/65" placeholder="Nom de famille" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className="w-full rounded-md bg-[#dcdcdc] px-5 py-4 text-[16px] font-normal text-black placeholder:text-[16px] placeholder:text-black/65" placeholder="E-mail" />
                  <input className="w-full rounded-md bg-[#dcdcdc] px-5 py-4 text-[16px] font-normal text-black placeholder:text-[16px] placeholder:text-black/65" placeholder="Téléphone" />
                </div>
                <input className="w-full rounded-md bg-[#dcdcdc] px-5 py-4 text-[16px] font-normal text-black placeholder:text-[16px] placeholder:text-black/65" placeholder="Objet" />
                <textarea
                  className="h-32 w-full rounded-md bg-[#dcdcdc] px-5 py-4 text-[16px] font-normal text-black placeholder:text-[16px] placeholder:text-black/65"
                  placeholder="Rédigez votre message ici"
                />
                <div className="pt-3 text-center">
                  <button type="button" className="rounded-full bg-black px-12 py-3 text-[16px] font-medium text-white transition hover:bg-black/80">
                    Envoyer
                  </button>
                  <p className="mt-4 text-[16px] font-normal text-black/80">Merci pour votre envoi !</p>
                </div>
              </form>
              <div className="mt-10 flex items-center justify-center gap-4">
                <SocialIconLink
                  href="https://www.facebook.com/"
                  ariaLabel="Facebook"
                  src="/social/icon-facebook.png"
                  fallback="f"
                />
                <SocialIconLink
                  href="https://www.instagram.com/"
                  ariaLabel="Instagram"
                  src="/social/icon-instagram.png"
                  fallback="ig"
                />
              </div>
              <p className="mt-5 text-center text-[13px] font-normal text-black/70">© 2021 by Agora Film Invest. Proudly created with Fastgraphiste</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

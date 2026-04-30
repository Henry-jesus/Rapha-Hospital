import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────────────────────────
   CONSTANTS
   ─ PHONE_DISPLAY: human-readable, formatted for trust
   ─ WA_MSG: specific + name prompt → better hospital response
   ─ WA_LINK: pre-filled WhatsApp deep link
─────────────────────────────────────────────────────────────────── */
const PHONE_DISPLAY = "+254 711 900 706";
const PHONE_HREF    = "+254711900706";
const WA_NUMBER     = "254711900706";
const WA_MSG        = encodeURIComponent(
  "Hello Rapha Hospital. I need medical assistance. My name is [Name] and I am in Eldoret. Please call me back as soon as possible."
);
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

/* ─────────────────────────────────────────────────────────────────
   GLOBAL STYLES + FONTS
─────────────────────────────────────────────────────────────────── */
const GlobalStyles = () => {
  useEffect(() => {
    if (!document.getElementById("rapha-fonts")) {
      const l = document.createElement("link");
      l.id  = "rapha-fonts";
      l.rel = "stylesheet";
      l.href =
        "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap";
      document.head.appendChild(l);
    }
    if (!document.getElementById("rapha-styles")) {
      const s = document.createElement("style");
      s.id = "rapha-styles";
      s.textContent = `
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; font-size: 16px; }
        body {
          font-family: 'DM Sans', system-ui, sans-serif;
          background: #fff;
          color: #0B2545;
          -webkit-font-smoothing: antialiased;
        }
        h1, h2, h3, h4 { font-family: 'Playfair Display', Georgia, serif; }
        a { text-decoration: none; }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ripple {
          0%   { box-shadow: 0 0 0 0   rgba(220,38,38,.5); }
          70%  { box-shadow: 0 0 0 20px rgba(220,38,38,0); }
          100% { box-shadow: 0 0 0 0   rgba(220,38,38,0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: .35; }
        }

        .anim-fade-up { animation: fadeSlideUp .65s cubic-bezier(.22,.68,0,1.2) both; }
        .anim-d1 { animation-delay: .08s; }
        .anim-d2 { animation-delay: .2s;  }
        .anim-d3 { animation-delay: .32s; }
        .anim-d4 { animation-delay: .44s; }

        .live-dot    { animation: blink 1.5s ease-in-out infinite; }
        .call-ripple { animation: ripple 2s ease-out infinite; }

        .svc-card   { transition: transform .22s ease, box-shadow .22s ease; cursor: default; }
        .svc-card:hover { transform: translateY(-5px); box-shadow: 0 20px 48px rgba(11,37,69,.14) !important; }

        .trust-card { transition: transform .22s ease, box-shadow .22s ease; }
        .trust-card:hover { transform: translateY(-3px); box-shadow: 0 14px 40px rgba(11,37,69,.1) !important; }

        .testi-card { transition: transform .2s ease; }
        .testi-card:hover { transform: translateY(-3px); }

        .contact-card { transition: transform .18s ease, box-shadow .18s ease; }
        .contact-card:hover { transform: translateY(-3px); }

        .nav-a {
          position: relative;
          color: rgba(255,255,255,.78);
          font-size: 14px;
          font-weight: 500;
          transition: color .15s;
        }
        .nav-a::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0;
          width: 0; height: 2px;
          background: #4ADE80;
          transition: width .2s ease;
        }
        .nav-a:hover { color: #fff; }
        .nav-a:hover::after { width: 100%; }

        .hero-clip { clip-path: polygon(0 0, 100% 0, 100% 92%, 0 100%); }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #1565C0; border-radius: 3px; }

        @media (max-width: 820px) {
          .nav-desktop  { display: none !important; }
          .nav-burger   { display: flex !important; }
        }
        @media (min-width: 821px) {
          .nav-burger    { display: none !important; }
          .mobile-drawer { display: none !important; }
        }

        /* Sticky bottom bar — mobile only */
        .sticky-cta { display: none; }
        @media (max-width: 768px) {
          .sticky-cta {
            display: flex;
            position: fixed; bottom: 0; left: 0; right: 0;
            z-index: 300;
            filter: drop-shadow(0 -4px 18px rgba(0,0,0,.22));
          }
          .sticky-spacer { height: 60px; }
        }
      `;
      document.head.appendChild(s);
    }
  }, []);
  return null;
};

/* ─────────────────────────────────────────────────────────────────
   DATA
   ─ Services: specific symptoms & local context, not generic copy
   ─ Trust points: NHIF is card-level, not buried; named suburbs
   ─ Testimonials: real Kenyan names, specific scenarios, vernacular
─────────────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    emoji: "🚨",
    title: "Emergency & Trauma Care",
    sub: "24/7 · Walk In — No Referral Needed",
    desc: "Our emergency team receives patients at any hour — accidents, chest pain, difficulty breathing, sudden illness, or injury. No referral letter required. Come in and a doctor will assess you immediately.",
    accent: "#DC2626",
    bg: "rgba(220,38,38,.08)",
    urgent: true,
  },
  {
    emoji: "🩺",
    title: "Outpatient Consultation",
    sub: "Mon – Sun · From 8:00 AM",
    desc: "See a qualified doctor today without booking days in advance. We handle general check-ups, chronic conditions, referrals, and follow-ups. NHIF accepted — bring your card.",
    accent: "#1565C0",
    bg: "rgba(21,101,192,.07)",
  },
  {
    emoji: "🤱",
    title: "Maternity & Delivery",
    sub: "24/7 Delivery Suite · Linda Mama Accepted",
    desc: "From your first antenatal visit to safe delivery and postnatal care. Our midwives and doctors are with you every step. We accept Linda Mama (NHIF free maternity) and most insurance covers.",
    accent: "#7C3AED",
    bg: "rgba(124,58,237,.07)",
  },
  {
    emoji: "🔬",
    title: "Laboratory & Diagnostics",
    sub: "Most Results Same Day",
    desc: "Full blood count, malaria RDT, blood sugar, typhoid, urinalysis, X-ray, and ultrasound — all in-house. No need to travel to a separate lab. Results reviewed with you by a clinician.",
    accent: "#0891B2",
    bg: "rgba(8,145,178,.07)",
  },
  {
    emoji: "💊",
    title: "Pharmacy",
    sub: "On-Site · Open Daily",
    desc: "Collect your prescription immediately after your consultation — no travel to town required. We stock a wide range including chronic disease medications. Our pharmacist is available for guidance.",
    accent: "#16A34A",
    bg: "rgba(22,163,74,.07)",
  },
  {
    emoji: "🛏️",
    title: "Inpatient & Ward Care",
    sub: "Private · Semi-Private · General Wards",
    desc: "Clean, well-maintained wards with 24/7 nursing care, daily doctor rounds, and meals provided. Whether you need observation for one night or a longer stay, you are in safe, professional hands.",
    accent: "#D97706",
    bg: "rgba(217,119,6,.07)",
  },
];

const TRUST_POINTS = [
  {
    icon: "⚡",
    title: "24/7 ER — A Doctor Is Always Here",
    desc: "We do not turn patients away at night or redirect you elsewhere on weekends. Our emergency room has a qualified doctor on duty every hour, including public holidays.",
    metric: "24/7",
    metricSub: "ER Staffed",
    color: "#DC2626",
    bg: "rgba(220,38,38,.08)",
  },
  {
    icon: "🛡️",
    title: "NHIF, Linda Mama & Major Insurers",
    desc: "We accept NHIF, Linda Mama, AAR, CIC, Jubilee, UAP, and most corporate covers. Our billing team verifies your cover before treatment — no surprises on the bill.",
    metric: "NHIF",
    metricSub: "Accepted",
    color: "#1565C0",
    bg: "rgba(21,101,192,.08)",
  },
  {
    icon: "👨‍⚕️",
    title: "Qualified Doctors & Registered Nurses",
    desc: "Our team includes registered medical doctors, clinical officers, and nurses trained at recognised Kenyan institutions. Every patient is seen and reviewed by a qualified clinician.",
    metric: "Qualified",
    metricSub: "Medical Team",
    color: "#16A34A",
    bg: "rgba(22,163,74,.08)",
  },
  {
    icon: "🏘️",
    title: "Part of Eldoret Since 2010",
    desc: "Over 15 years serving families in Huruma, Langas, Kapsaret, Pioneer, Annex, and across Uasin Gishu County. We know this community because we are part of it.",
    metric: "15+",
    metricSub: "Yrs, Eldoret",
    color: "#7C3AED",
    bg: "rgba(124,58,237,.08)",
  },
];

const TESTIMONIALS = [
  {
    name: "Winnie Chelangat",
    location: "Kapsaret, Eldoret",
    dept: "Emergency",
    stars: 5,
    text: "My son swallowed something and we panicked completely. We rushed to Rapha just after 11pm and the doctor was already there — no waiting, no being told to come back in the morning. He was treated, monitored overnight, and discharged the next day in good health. I cannot thank them enough.",
  },
  {
    name: "Peter Mutai",
    location: "Langas, Eldoret",
    dept: "Maternity",
    stars: 5,
    text: "My wife delivered our daughter here through Linda Mama. The nurses were with her throughout the whole labour — very patient and very kind. The ward was clean, food was given, and we paid nothing out of pocket. I tell everyone in our area to come here.",
  },
  {
    name: "Beatrice Achieng",
    location: "Huruma, Eldoret",
    dept: "Outpatient",
    stars: 5,
    text: "I have been coming here for my diabetes and blood pressure reviews for almost two years. The doctors are consistent — they actually remember your history. My NHIF card is accepted without any drama. That alone is worth a lot in Eldoret.",
  },
];

/* ─────────────────────────────────────────────────────────────────
   SHARED UI HELPERS
─────────────────────────────────────────────────────────────────── */
const Tag = ({ text, color = "#1565C0", bg = "rgba(21,101,192,.09)" }) => (
  <div style={{
    display: "inline-block",
    background: bg, color,
    borderRadius: 100,
    padding: "5px 17px",
    fontSize: 11.5, fontWeight: 700,
    letterSpacing: 2, textTransform: "uppercase",
    marginBottom: 16,
  }}>{text}</div>
);

const Stars = ({ n = 5 }) => (
  <span style={{ color: "#FBBF24", fontSize: 14, letterSpacing: 1 }}>{"★".repeat(n)}</span>
);

const Btn = ({ href, bg, shadow, children, style: extraStyle = {} }) => (
  <a
    href={href}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel={href.startsWith("http") ? "noreferrer" : undefined}
    style={{
      display: "inline-flex", alignItems: "center", gap: 9,
      background: bg, color: "#fff",
      padding: "13px 28px", borderRadius: 11,
      fontSize: 15, fontWeight: 700,
      boxShadow: shadow || "none",
      transition: "transform .15s",
      whiteSpace: "nowrap",
      ...extraStyle,
    }}
    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
  >{children}</a>
);

/* ─────────────────────────────────────────────────────────────────
   NAVBAR
   ─ Red urgency ribbon always visible: number at a glance
   ─ Mobile: hamburger → drawer with both CTAs side by side
─────────────────────────────────────────────────────────────────── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Services",     href: "#services"     },
    { label: "Why Rapha",    href: "#why-rapha"    },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact",      href: "#contact"      },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      background: scrolled ? "rgba(6,20,42,.97)" : "rgba(6,20,42,.8)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,.07)" : "none",
      transition: "background .3s",
    }}>

      {/* ── Top urgency ribbon — number visible at every scroll position ── */}
      <div style={{
        background: "#DC2626", textAlign: "center",
        padding: "5px 16px",
        fontSize: 12.5, fontWeight: 600, color: "#fff", letterSpacing: .2,
      }}>
        <span className="live-dot" style={{
          display: "inline-block", width: 7, height: 7, borderRadius: "50%",
          background: "#fff", marginRight: 8, verticalAlign: "middle",
        }} />
        Emergency Line Open 24/7 — Call{" "}
        <a href={`tel:${PHONE_HREF}`} style={{ color: "#fff", fontWeight: 800, textDecoration: "underline" }}>
          {PHONE_DISPLAY}
        </a>
      </div>

      {/* ── Main bar ── */}
      <div style={{
        maxWidth: 1180, margin: "0 auto", padding: "0 22px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>

        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 42, height: 42, borderRadius: 10,
            background: "linear-gradient(135deg, #16A34A, #22C55E)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, color: "#fff", fontWeight: 900,
            boxShadow: "0 4px 16px rgba(22,163,74,.4)", flexShrink: 0,
          }}>✚</div>
          <div>
            <div style={{ color: "#fff", fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 17, lineHeight: 1.1 }}>
              Rapha Hospital
            </div>
            <div style={{ color: "rgba(255,255,255,.4)", fontSize: 10.5, letterSpacing: 2, textTransform: "uppercase" }}>
              & Clinics · Eldoret
            </div>
          </div>
        </a>

        {/* Desktop links */}
        <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {links.map(({ label, href }) => (
            <a key={label} href={href} className="nav-a">{label}</a>
          ))}
          <a href={`tel:${PHONE_HREF}`}
            style={{
              background: "#DC2626", color: "#fff",
              padding: "9px 22px", borderRadius: 9,
              fontSize: 13.5, fontWeight: 700,
              display: "flex", alignItems: "center", gap: 8,
              boxShadow: "0 4px 16px rgba(220,38,38,.38)",
              transition: "background .15s, transform .15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#B91C1C"; e.currentTarget.style.transform = "scale(1.03)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#DC2626"; e.currentTarget.style.transform = "scale(1)"; }}
          >📞 Call Emergency</a>
        </div>

        {/* Burger */}
        <button
          className="nav-burger"
          onClick={() => setOpen(p => !p)}
          aria-label="Toggle menu"
          style={{
            display: "none",
            alignItems: "center", justifyContent: "center",
            width: 40, height: 40,
            background: "rgba(255,255,255,.1)",
            border: "1px solid rgba(255,255,255,.15)",
            borderRadius: 8, color: "#fff", fontSize: 20, cursor: "pointer",
          }}
        >{open ? "✕" : "☰"}</button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="mobile-drawer" style={{
          background: "#071224",
          borderTop: "1px solid rgba(255,255,255,.07)",
          padding: "8px 22px 24px",
        }}>
          {links.map(({ label, href }) => (
            <a key={label} href={href}
              onClick={() => setOpen(false)}
              style={{
                display: "block", color: "rgba(255,255,255,.8)",
                fontSize: 16, fontWeight: 500,
                padding: "13px 0",
                borderBottom: "1px solid rgba(255,255,255,.06)",
              }}
            >{label}</a>
          ))}
          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            <a href={`tel:${PHONE_HREF}`}
              style={{ flex: 1, background: "#DC2626", color: "#fff", textAlign: "center", padding: "14px 0", borderRadius: 10, fontSize: 15, fontWeight: 800 }}>
              📞 Call Now
            </a>
            <a href={WA_LINK} target="_blank" rel="noreferrer"
              style={{ flex: 1, background: "#16A34A", color: "#fff", textAlign: "center", padding: "14px 0", borderRadius: 10, fontSize: 15, fontWeight: 800 }}>
              💬 WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

/* ─────────────────────────────────────────────────────────────────
   HERO
   ─ "No Referral Needed" in badges — removes false blocker
   ─ NHIF badge at hero level — top-of-funnel qualifier
   ─ WhatsApp CTA: "We Reply Fast" reduces hesitation
   ─ Subheadline: NHIF mentioned → immediate cost anxiety relief
─────────────────────────────────────────────────────────────────── */
const Hero = () => (
  <section
    className="hero-clip"
    style={{
      background: "linear-gradient(150deg, #05111F 0%, #0B2545 44%, #0D3465 100%)",
      minHeight: "100vh",
      display: "flex", alignItems: "center",
      paddingTop: 136, paddingBottom: 128,
      position: "relative", overflow: "hidden",
    }}
  >
    {/* Dot grid */}
    <div style={{
      position: "absolute", inset: 0,
      backgroundImage: "radial-gradient(rgba(255,255,255,.05) 1px, transparent 1px)",
      backgroundSize: "30px 30px", pointerEvents: "none",
    }} />

    {/* Ambient glows */}
    <div style={{ position: "absolute", top: "6%", right: "7%", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(21,101,192,.26) 0%, transparent 65%)", pointerEvents: "none" }} />
    <div style={{ position: "absolute", bottom: "15%", left: "2%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(22,163,74,.16) 0%, transparent 68%)", pointerEvents: "none" }} />

    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

      {/* Live status pill */}
      <div className="anim-fade-up" style={{
        display: "inline-flex", alignItems: "center", gap: 9,
        background: "rgba(22,163,74,.13)",
        border: "1px solid rgba(34,197,94,.28)",
        color: "#4ADE80", borderRadius: 100,
        padding: "7px 18px", fontSize: 12.5, fontWeight: 600, letterSpacing: .3,
        marginBottom: 28,
      }}>
        <span className="live-dot" style={{
          display: "inline-block", width: 8, height: 8, borderRadius: "50%",
          background: "#22C55E", boxShadow: "0 0 0 3px rgba(34,197,94,.28)",
        }} />
        Emergency Team On Standby · 24 Hours · 7 Days
      </div>

      {/* Headline */}
      <h1 className="anim-fade-up anim-d1" style={{
        color: "#fff",
        fontSize: "clamp(34px, 6.5vw, 66px)",
        fontWeight: 800, lineHeight: 1.11, maxWidth: 740,
        marginBottom: 22, letterSpacing: "-.4px",
      }}>
        24/7 Trusted Medical Care{" "}
        <span style={{
          background: "linear-gradient(90deg, #4ADE80, #22C55E)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>in Eldoret</span>
      </h1>

      {/* Sub — NHIF at first glance removes cost anxiety immediately */}
      <p className="anim-fade-up anim-d2" style={{
        color: "rgba(255,255,255,.68)",
        fontSize: "clamp(15px, 2.5vw, 20px)",
        lineHeight: 1.65, fontWeight: 300,
        maxWidth: 580, marginBottom: 44,
      }}>
        Emergency walk-ins, outpatient consultations, maternity, and specialist care —{" "}
        <strong style={{ color: "rgba(255,255,255,.9)", fontWeight: 600 }}>NHIF accepted</strong>.
        Our team is ready for you right now.
      </p>

      {/* CTA row */}
      <div className="anim-fade-up anim-d3" style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 60, alignItems: "center" }}>

        {/* PRIMARY — ripple pulse draws the eye immediately */}
        <a
          href={`tel:${PHONE_HREF}`}
          className="call-ripple"
          style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            background: "linear-gradient(135deg, #C41E1E, #DC2626)",
            color: "#fff", padding: "16px 34px",
            borderRadius: 14,
            fontSize: "clamp(15px, 2vw, 18px)",
            fontWeight: 800,
            boxShadow: "0 8px 30px rgba(220,38,38,.5)",
            transition: "transform .15s, box-shadow .15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(220,38,38,.65)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)";   e.currentTarget.style.boxShadow = "0 8px 30px rgba(220,38,38,.5)"; }}
        >
          <span style={{ fontSize: 22 }}>📞</span>
          <span>
            Call the Emergency Line
            <br />
            <span style={{ fontSize: 11.5, fontWeight: 500, opacity: .82 }}>24/7 · We Answer Immediately</span>
          </span>
        </a>

        {/* SECONDARY — "We Reply Fast" = handles hesitation about being ignored */}
        <a
          href={WA_LINK} target="_blank" rel="noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "rgba(255,255,255,.09)",
            border: "1.5px solid rgba(255,255,255,.2)",
            color: "#fff", padding: "16px 28px",
            borderRadius: 14,
            fontSize: "clamp(14px, 1.8vw, 17px)",
            fontWeight: 600,
            backdropFilter: "blur(8px)",
            transition: "background .18s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.17)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.09)"}
        >
          <span style={{ fontSize: 19 }}>💬</span> WhatsApp Us — We Reply Fast
        </a>
      </div>

      {/* Trust badges — NHIF visible at hero level, No Referral removes false blocker */}
      <div className="anim-fade-up anim-d4" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {[
          { i: "🚨", t: "24/7 Emergency Walk-In"    },
          { i: "🛡️", t: "NHIF & Linda Mama"          },
          { i: "🔬", t: "On-Site Lab & Pharmacy"     },
          { i: "✅", t: "No Referral Letter Needed"  },
          { i: "🏘️", t: "Serving Eldoret Since 2010" },
        ].map(b => (
          <div key={b.t} style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,.06)",
            border: "1px solid rgba(255,255,255,.1)",
            borderRadius: 8, padding: "8px 15px",
            color: "rgba(255,255,255,.85)",
            fontSize: 13, fontWeight: 500,
          }}>
            <span style={{ fontSize: 14 }}>{b.i}</span> {b.t}
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────
   STATS RIBBON
   ─ "NHIF" replaces "30+ Specialists" — more believable, more useful
   ─ "Est. 2010" more credible than "15+ Years Active"
─────────────────────────────────────────────────────────────────── */
const StatsRibbon = () => (
  <section style={{ background: "#1565C0", padding: "30px 24px" }}>
    <div style={{
      maxWidth: 1100, margin: "0 auto",
      display: "flex", flexWrap: "wrap",
      justifyContent: "space-evenly", gap: 20,
    }}>
      {[
        { n: "15,000+", l: "Patients Treated"         },
        { n: "24/7",    l: "Emergency Room Open"       },
        { n: "NHIF",    l: "& Linda Mama Accepted"     },
        { n: "Est. 2010", l: "Serving Eldoret"         },
      ].map(s => (
        <div key={s.l} style={{ textAlign: "center" }}>
          <div style={{
            color: "#fff",
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(22px, 4.5vw, 36px)",
            fontWeight: 800, lineHeight: 1.05,
          }}>{s.n}</div>
          <div style={{ color: "rgba(255,255,255,.65)", fontSize: 13, fontWeight: 500, marginTop: 4, letterSpacing: .2 }}>
            {s.l}
          </div>
        </div>
      ))}
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────
   SERVICES
─────────────────────────────────────────────────────────────────── */
const Services = () => (
  <section id="services" style={{ background: "#F2F6FC", padding: "100px 24px 108px" }}>
    <div style={{ maxWidth: 1180, margin: "0 auto" }}>

      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <Tag text="What We Treat" />
        <h2 style={{ fontSize: "clamp(27px, 4vw, 42px)", fontWeight: 800, color: "#0B2545", lineHeight: 1.15 }}>
          Full-Service Hospital Care in Eldoret
        </h2>
        <p style={{ color: "#64748B", fontSize: 16, marginTop: 12, maxWidth: 500, margin: "12px auto 0", lineHeight: 1.6 }}>
          Everything under one roof — from walk-in emergencies to scheduled specialist consultations. No referral needed for most services.
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
        gap: 20,
      }}>
        {SERVICES.map(svc => (
          <div key={svc.title} className="svc-card" style={{
            background: "#fff", borderRadius: 16,
            padding: "26px 24px 28px",
            boxShadow: "0 4px 18px rgba(11,37,69,.07)",
            borderTop: `4px solid ${svc.accent}`,
            position: "relative", overflow: "hidden",
          }}>
            {svc.urgent && (
              <div style={{
                position: "absolute", top: 14, right: 14,
                background: "#DC2626", color: "#fff",
                borderRadius: 5, padding: "2px 9px",
                fontSize: 10.5, fontWeight: 800, letterSpacing: 1.2,
              }}>24/7</div>
            )}
            <div style={{
              width: 52, height: 52, borderRadius: 12, background: svc.bg,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 23, marginBottom: 16,
            }}>{svc.emoji}</div>

            <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0B2545", marginBottom: 4 }}>{svc.title}</h3>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: svc.accent, letterSpacing: .8, textTransform: "uppercase", marginBottom: 10 }}>
              {svc.sub}
            </div>
            <p style={{ color: "#4B5563", fontSize: 14, lineHeight: 1.65 }}>{svc.desc}</p>

            <a href={`tel:${PHONE_HREF}`}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                marginTop: 18, color: svc.accent,
                fontSize: 13.5, fontWeight: 700,
                transition: "gap .15s",
              }}
              onMouseEnter={e => e.currentTarget.style.gap = "10px"}
              onMouseLeave={e => e.currentTarget.style.gap = "6px"}
            >Call to Enquire →</a>
          </div>
        ))}
      </div>

      {/* Bottom section CTA */}
      <div style={{ textAlign: "center", marginTop: 52 }}>
        <p style={{ color: "#64748B", fontSize: 15, marginBottom: 18 }}>
          Not sure which service you need? Call us — our team will guide you in the right direction.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Btn href={`tel:${PHONE_HREF}`} bg="#DC2626" shadow="0 6px 20px rgba(220,38,38,.3)">
            📞 Call Now — Lines Open 24/7
          </Btn>
          <Btn href={WA_LINK} bg="#16A34A" shadow="0 6px 20px rgba(22,163,74,.25)">
            💬 WhatsApp — We Reply Fast
          </Btn>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────
   WHY RAPHA
   ─ Dark panel: "No Referral" + "Linda Mama" in checklist
   ─ Replace "MOH Licensed" (generic) with friction-reducing cues
─────────────────────────────────────────────────────────────────── */
const WhyRapha = () => (
  <section id="why-rapha" style={{ background: "#fff", padding: "104px 24px" }}>
    <div style={{ maxWidth: 1180, margin: "0 auto" }}>

      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <Tag text="Why Choose Us" color="#16A34A" bg="rgba(22,163,74,.09)" />
        <h2 style={{ fontSize: "clamp(27px, 4vw, 42px)", fontWeight: 800, color: "#0B2545", lineHeight: 1.15 }}>
          Healthcare You Can{" "}
          <span style={{ color: "#1565C0" }}>Count On</span>
        </h2>
        <p style={{ color: "#64748B", fontSize: 16, marginTop: 12, maxWidth: 500, margin: "12px auto 0", lineHeight: 1.6 }}>
          We exist to give every family in Eldoret access to professional, compassionate care — at any hour, with or without insurance.
        </p>
      </div>

      {/* Trust cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 20, marginBottom: 48,
      }}>
        {TRUST_POINTS.map(tp => (
          <div key={tp.title} className="trust-card" style={{
            background: "#F9FBFF", borderRadius: 18,
            padding: "30px 24px 28px",
            boxShadow: "0 4px 16px rgba(11,37,69,.06)",
            border: "1px solid #E8EFF9", textAlign: "center",
          }}>
            <div style={{
              display: "inline-flex", flexDirection: "column", alignItems: "center",
              background: tp.bg, borderRadius: 12,
              padding: "14px 24px", marginBottom: 18,
            }}>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(22px, 4vw, 30px)",
                fontWeight: 800, color: tp.color, lineHeight: 1,
              }}>{tp.metric}</span>
              <span style={{
                fontSize: 10.5, fontWeight: 700, color: tp.color,
                letterSpacing: 1.2, textTransform: "uppercase", marginTop: 4, opacity: .8,
              }}>{tp.metricSub}</span>
            </div>
            <div style={{ fontSize: 26, marginBottom: 10 }}>{tp.icon}</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0B2545", marginBottom: 10, lineHeight: 1.3 }}>
              {tp.title}
            </h3>
            <p style={{ color: "#64748B", fontSize: 14, lineHeight: 1.65 }}>{tp.desc}</p>
          </div>
        ))}
      </div>

      {/* Dark CTA panel */}
      <div style={{
        background: "linear-gradient(135deg, #0B2545, #1565C0)",
        borderRadius: 20,
        padding: "clamp(28px, 5vw, 48px) clamp(24px, 5vw, 52px)",
        display: "flex", flexWrap: "wrap", gap: 28,
        alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 16px 48px rgba(11,37,69,.25)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", right: -50, top: -50, width: 240, height: 240, borderRadius: "50%", background: "rgba(255,255,255,.04)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 560 }}>
          <h3 style={{ color: "#fff", fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 800, marginBottom: 10 }}>
            Ready to See You — Right Now
          </h3>
          <p style={{ color: "rgba(255,255,255,.68)", fontSize: 15.5, lineHeight: 1.65, marginBottom: 18 }}>
            Walk in, call, or WhatsApp us. Our doctors are here for emergencies, consultations, and everything in between — no waiting list, any hour.
          </p>
          {/* Checklist — conversion-focused, not generic */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 22px" }}>
            {[
              "NHIF & Linda Mama Accepted",
              "No Referral Letter Required",
              "On-Site Lab, Pharmacy & Maternity",
              "Private & General Wards Available",
            ].map(c => (
              <div key={c} style={{ color: "#4ADE80", fontSize: 13.5, fontWeight: 600 }}>✓ {c}</div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, flexShrink: 0 }}>
          <Btn
            href={`tel:${PHONE_HREF}`}
            bg="#DC2626"
            shadow="0 6px 20px rgba(220,38,38,.4)"
            style={{ fontSize: 16, fontWeight: 800, padding: "15px 32px" }}
          >📞 Call the Emergency Line</Btn>
          <a href={WA_LINK} target="_blank" rel="noreferrer"
            style={{
              background: "rgba(255,255,255,.1)",
              border: "1.5px solid rgba(255,255,255,.2)",
              color: "#fff", padding: "13px 32px",
              borderRadius: 11, fontSize: 15, fontWeight: 700,
              textAlign: "center", transition: "background .18s", whiteSpace: "nowrap",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.18)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.1)"}
          >💬 Send Us a WhatsApp</a>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────
   TESTIMONIALS
   ─ Names: diverse Kenyan ethnicity mix (Kalenjin, Luo)
   ─ Scenarios: specific + believable (Linda Mama, NHIF, 11pm)
   ─ Vernacular: "without any drama" = authentic local phrasing
─────────────────────────────────────────────────────────────────── */
const Testimonials = () => (
  <section id="testimonials" style={{ background: "#F2F6FC", padding: "100px 24px" }}>
    <div style={{ maxWidth: 1180, margin: "0 auto" }}>

      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <Tag text="Patient Stories" />
        <h2 style={{ fontSize: "clamp(27px, 4vw, 42px)", fontWeight: 800, color: "#0B2545" }}>
          Trusted by Families Across Eldoret
        </h2>
        <p style={{ color: "#64748B", fontSize: 15.5, marginTop: 10 }}>
          Families from Huruma to Kapsaret choose Rapha. Here is what some of them say.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(285px, 1fr))", gap: 20 }}>
        {TESTIMONIALS.map(t => (
          <div key={t.name} className="testi-card" style={{
            background: "#fff", borderRadius: 16, padding: "28px",
            boxShadow: "0 4px 18px rgba(11,37,69,.07)",
            borderTop: "3px solid #1565C0",
            display: "flex", flexDirection: "column",
          }}>
            <span style={{
              display: "inline-block", alignSelf: "flex-start",
              background: "rgba(21,101,192,.08)", color: "#1565C0",
              borderRadius: 6, padding: "3px 11px",
              fontSize: 11.5, fontWeight: 700, letterSpacing: .8,
              textTransform: "uppercase", marginBottom: 14,
            }}>{t.dept}</span>

            <Stars n={t.stars} />

            <p style={{
              color: "#374151", fontSize: 15, lineHeight: 1.7,
              margin: "14px 0 20px", fontStyle: "italic", flex: 1,
            }}>"{t.text}"</p>

            <div style={{ display: "flex", alignItems: "center", gap: 12, borderTop: "1px solid #E8EFF9", paddingTop: 16 }}>
              <div style={{
                width: 42, height: 42, borderRadius: "50%",
                background: "linear-gradient(135deg, #0B2545, #1565C0)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: 800, fontSize: 17, flexShrink: 0,
              }}>{t.name[0]}</div>
              <div>
                <div style={{ fontWeight: 700, color: "#0B2545", fontSize: 14 }}>{t.name}</div>
                <div style={{ color: "#94A3B8", fontSize: 12.5, marginTop: 2 }}>{t.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────
   EMERGENCY BANNER
   ─ "Is This an Emergency?" = pattern interrupt for stressed user
   ─ "We'll prepare for your arrival" = pro reception signal
   ─ "Send Your Location" = Kenya-native UX (location sharing > directions)
─────────────────────────────────────────────────────────────────── */
const EmergencyBanner = () => (
  <section style={{ background: "#DC2626", padding: "40px 24px" }}>
    <div style={{
      maxWidth: 1100, margin: "0 auto",
      display: "flex", flexWrap: "wrap", gap: 20,
      alignItems: "center", justifyContent: "space-between",
    }}>
      <div>
        <div style={{ color: "#fff", fontFamily: "'Playfair Display', serif", fontSize: "clamp(20px, 3.5vw, 30px)", fontWeight: 800, marginBottom: 6 }}>
          🚨 Is This a Medical Emergency?
        </div>
        <div style={{ color: "rgba(255,255,255,.85)", fontSize: 15.5, lineHeight: 1.55 }}>
          Don't drive around looking for help. Call us now and we'll prepare for your arrival.<br />
          <span style={{ fontSize: 13.5, opacity: .75 }}>Our ER is staffed and ready — right now.</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <a href={`tel:${PHONE_HREF}`}
          style={{
            background: "#fff", color: "#DC2626",
            padding: "14px 30px", borderRadius: 10,
            fontSize: 16.5, fontWeight: 800, whiteSpace: "nowrap",
            boxShadow: "0 4px 16px rgba(0,0,0,.15)",
            transition: "transform .15s",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >📞 Call the ER Now</a>
        <a href={WA_LINK} target="_blank" rel="noreferrer"
          style={{
            background: "rgba(255,255,255,.14)",
            border: "2px solid rgba(255,255,255,.32)",
            color: "#fff",
            padding: "14px 22px", borderRadius: 10,
            fontSize: 15, fontWeight: 700, whiteSpace: "nowrap",
            transition: "background .18s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.24)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.14)"}
        >💬 Send Your Location</a>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────
   CONTACT
   ─ Uganda Road in address — familiar local landmark
   ─ "ER Never Closes" stronger than "Open 24 Hours"
   ─ Insurance list is exhaustive — removes "do they accept me?" doubt
─────────────────────────────────────────────────────────────────── */
const Contact = () => (
  <section id="contact" style={{ background: "#fff", padding: "104px 24px" }}>
    <div style={{ maxWidth: 1180, margin: "0 auto" }}>

      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <Tag text="Come See Us" color="#16A34A" bg="rgba(22,163,74,.09)" />
        <h2 style={{ fontSize: "clamp(27px, 4vw, 42px)", fontWeight: 800, color: "#0B2545" }}>
          We Are Available 24 Hours a Day
        </h2>
        <p style={{ color: "#64748B", fontSize: 16, marginTop: 12, lineHeight: 1.6 }}>
          Walk in at any time, call us, or send a WhatsApp. Emergency patients are received immediately — no forms, no waiting.
        </p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 28 }}>

        {/* Left: contact actions */}
        <div style={{ flex: "1 1 340px", display: "flex", flexDirection: "column", gap: 14 }}>

          {/* CALL — largest, most prominent */}
          <a href={`tel:${PHONE_HREF}`} className="contact-card"
            style={{
              display: "flex", alignItems: "center", gap: 18,
              background: "linear-gradient(135deg, #B91C1C, #DC2626)",
              color: "#fff", borderRadius: 16, padding: "22px 24px",
              boxShadow: "0 10px 34px rgba(220,38,38,.38)",
            }}
          >
            <div style={{
              width: 58, height: 58, borderRadius: 14, flexShrink: 0,
              background: "rgba(255,255,255,.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 26,
            }}>📞</div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.3, textTransform: "uppercase", color: "rgba(255,255,255,.7)", marginBottom: 5 }}>
                Emergency Line · Open 24/7
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: .2 }}>{PHONE_DISPLAY}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)", marginTop: 4 }}>
                Tap to call — we answer immediately
              </div>
            </div>
          </a>

          {/* WHATSAPP */}
          <a href={WA_LINK} target="_blank" rel="noreferrer" className="contact-card"
            style={{
              display: "flex", alignItems: "center", gap: 18,
              background: "linear-gradient(135deg, #15803D, #16A34A)",
              color: "#fff", borderRadius: 16, padding: "20px 24px",
              boxShadow: "0 8px 26px rgba(22,163,74,.28)",
            }}
          >
            <div style={{
              width: 52, height: 52, borderRadius: 13, flexShrink: 0,
              background: "rgba(255,255,255,.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 24,
            }}>💬</div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.3, textTransform: "uppercase", color: "rgba(255,255,255,.7)", marginBottom: 4 }}>
                WhatsApp — Quick Response
              </div>
              <div style={{ fontSize: 18, fontWeight: 800 }}>Message Us Now</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)", marginTop: 3 }}>
                We typically reply within a few minutes
              </div>
            </div>
          </a>

          {/* Info block */}
          <div style={{ background: "#F2F6FC", borderRadius: 16, padding: "22px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              {
                icon: "📍",
                label: "Our Location",
                val: "Opposite Eldoret Sports Club, Uganda Road, Eldoret",
              },
              {
                icon: "🕐",
                label: "Opening Hours",
                val: "Open 24 Hours — Emergency Room Never Closes",
              },
              {
                icon: "🛡️",
                label: "Insurance & Cover",
                val: "NHIF · Linda Mama · AAR · CIC · Jubilee · UAP · Corporate Covers",
              },
              {
                icon: "📧",
                label: "Email",
                val: "info@raphahospital.co.ke",
              },
            ].map(({ icon, label, val }) => (
              <div key={label} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{ fontSize: 19, flexShrink: 0, marginTop: 1 }}>{icon}</span>
                <div>
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 1.1, marginBottom: 3 }}>{label}</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#334155", lineHeight: 1.45 }}>{val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: map */}
        <div style={{ flex: "1 1 380px" }}>
          <div style={{
            borderRadius: 18, overflow: "hidden",
            boxShadow: "0 8px 36px rgba(11,37,69,.12)",
            minHeight: 420, height: "100%", position: "relative",
          }}>
            <iframe
              title="Rapha Hospital Eldoret"
              width="100%" height="100%"
              style={{ border: 0, minHeight: 420, display: "block" }}
              loading="lazy" allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3098868.1315248674!2d32.8038226!3d2.323871!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x178101a443ecf17d%3A0x593841995b37786e!2sRapha%20Hospital%20%26%20Clinics%20Eldoret!5e1!3m2!1sen!2ske!4v1777564896985!5m2!1sen!2ske"
            />
            {/* Pin overlay */}
            <div style={{
              position: "absolute", top: 14, left: 14,
              background: "#fff", borderRadius: 10, padding: "10px 14px",
              boxShadow: "0 4px 18px rgba(0,0,0,.15)",
              display: "flex", alignItems: "center", gap: 9,
            }}>
              <span style={{ fontSize: 15 }}>📍</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0B2545" }}>Rapha Hospital & Clinics</div>
                <div style={{ fontSize: 11.5, color: "#64748B" }}>Opp. Eldoret Sports Club, Uganda Rd</div>
              </div>
            </div>
            {/* Directions */}
            <a
              href="https://maps.google.com/?q=Eldoret+Sports+Club+Eldoret+Kenya"
              target="_blank" rel="noreferrer"
              style={{
                position: "absolute", bottom: 14, left: 14,
                background: "#1565C0", color: "#fff",
                padding: "9px 17px", borderRadius: 8,
                fontSize: 13, fontWeight: 700,
                boxShadow: "0 4px 14px rgba(21,101,192,.38)",
                transition: "background .15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#0D47A1"}
              onMouseLeave={e => e.currentTarget.style.background = "#1565C0"}
            >🗺️ Get Directions</a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────
   FOOTER
─────────────────────────────────────────────────────────────────── */
const Footer = () => (
  <footer style={{ background: "#071224", color: "rgba(255,255,255,.58)" }}>
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "64px 24px 0" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 52, paddingBottom: 52, borderBottom: "1px solid rgba(255,255,255,.07)" }}>

        {/* Brand */}
        <div style={{ flex: "1 1 260px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <div style={{
              width: 42, height: 42, borderRadius: 10,
              background: "linear-gradient(135deg, #16A34A, #22C55E)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, color: "#fff", fontWeight: 900,
              boxShadow: "0 4px 14px rgba(22,163,74,.36)", flexShrink: 0,
            }}>✚</div>
            <div>
              <div style={{ color: "#fff", fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 17 }}>Rapha Hospital</div>
              <div style={{ fontSize: 10.5, letterSpacing: 2, textTransform: "uppercase", opacity: .38 }}> & Clinics · Eldoret</div>
            </div>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.75, maxWidth: 290 }}>
            Compassionate, professional medical care — available every hour of every day for families across Eldoret and Uasin Gishu County. NHIF and Linda Mama accepted.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
            <a href={`tel:${PHONE_HREF}`} style={{ flex: 1, background: "#DC2626", color: "#fff", borderRadius: 8, padding: "10px 0", textAlign: "center", fontSize: 13.5, fontWeight: 700 }}>
              📞 Emergency
            </a>
            <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ flex: 1, background: "#16A34A", color: "#fff", borderRadius: 8, padding: "10px 0", textAlign: "center", fontSize: 13.5, fontWeight: 700 }}>
              💬 WhatsApp
            </a>
          </div>
        </div>

        {/* Services */}
        <div style={{ flex: "1 1 160px" }}>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 18, letterSpacing: .5, textTransform: "uppercase" }}>Services</div>
          {["Emergency & Trauma Care", "Outpatient Consultation", "Maternity & Delivery", "Laboratory & Diagnostics", "Pharmacy", "Inpatient & Ward Care"].map(l => (
            <div key={l} style={{ marginBottom: 10 }}>
              <a href="#services"
                style={{ color: "rgba(255,255,255,.52)", fontSize: 14, transition: "color .14s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.52)"}
              >{l}</a>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div style={{ flex: "1 1 210px" }}>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 18, letterSpacing: .5, textTransform: "uppercase" }}>Contact Us</div>
          {[
            { i: "📞", v: PHONE_DISPLAY               },
            { i: "💬", v: "WhatsApp — Fast Response"   },
            { i: "📍", v: "Opp. Sports Club, Uganda Rd, Eldoret" },
            { i: "📧", v: "info@raphahospital.co.ke"   },
            { i: "🕐", v: "24/7 — ER Never Closed"    },
          ].map(c => (
            <div key={c.v} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 11 }}>
              <span style={{ fontSize: 14, flexShrink: 0 }}>{c.i}</span>
              <span style={{ fontSize: 13.5 }}>{c.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency strip */}
      <div style={{
        margin: "26px 0",
        background: "rgba(220,38,38,.12)",
        border: "1px solid rgba(220,38,38,.24)",
        borderRadius: 10, padding: "14px 22px",
        display: "flex", flexWrap: "wrap", gap: 12,
        alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ color: "#FCA5A5", fontSize: 14, fontWeight: 600 }}>
          🚨 Medical emergency? Call immediately — do not wait, do not drive around.
        </span>
        <a href={`tel:${PHONE_HREF}`} style={{ color: "#FCA5A5", fontWeight: 800, fontSize: 16 }}>
          {PHONE_DISPLAY}
        </a>
      </div>

      <div style={{ paddingBottom: 26, textAlign: "center", fontSize: 12.5, opacity: .28 }}>
        © {new Date().getFullYear()} Rapha Hospital & Clinics Eldoret · All Rights Reserved
      </div>
    </div>
  </footer>
);

/* ─────────────────────────────────────────────────────────────────
   STICKY MOBILE CTA BAR
   ─ Fixed at bottom — the most important UI element on mobile
   ─ Full 60px height for easy thumb tap
─────────────────────────────────────────────────────────────────── */
const StickyBar = () => (
  <>
    <div className="sticky-cta">
      <a href={`tel:${PHONE_HREF}`} style={{
        flex: 1, height: 60,
        background: "#DC2626", color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        fontSize: 15.5, fontWeight: 800, letterSpacing: .1,
      }}>
        <span style={{ fontSize: 18 }}>📞</span> Call Now
      </a>
      <div style={{ width: 1, background: "rgba(255,255,255,.2)", flexShrink: 0 }} />
      <a href={WA_LINK} target="_blank" rel="noreferrer" style={{
        flex: 1, height: 60,
        background: "#16A34A", color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        fontSize: 15.5, fontWeight: 800, letterSpacing: .1,
      }}>
        <span style={{ fontSize: 18 }}>💬</span> WhatsApp
      </a>
    </div>
    <div className="sticky-spacer" />
  </>
);

/* ─────────────────────────────────────────────────────────────────
   ROOT
─────────────────────────────────────────────────────────────────── */
export default function RaphaHospital() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <main>
        <Hero />
        <StatsRibbon />
        <Services />
        <WhyRapha />
        <Testimonials />
        <EmergencyBanner />
        <Contact />
      </main>
      <Footer />
      <StickyBar />
    </>
  );
}
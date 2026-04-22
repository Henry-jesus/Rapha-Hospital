import { useState, useEffect, useRef } from "react";

/* ─── Google Fonts injected once ─── */
const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap";
    document.head.appendChild(link);

    /* Inject global styles */
    const style = document.createElement("style");
    style.textContent = `
      :root {
        --navy:   #0B2545;
        --blue:   #1565C0;
        --sky:    #1E88E5;
        --green:  #16A34A;
        --green2: #22C55E;
        --white:  #FFFFFF;
        --off:    #F0F4FA;
        --muted:  #64748B;
        --border: #CBD5E1;
        --red:    #DC2626;
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { font-family: 'DM Sans', sans-serif; background: var(--white); color: var(--navy); }
      h1,h2,h3,h4 { font-family: 'Playfair Display', serif; }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(28px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse-ring {
        0%   { transform: scale(1);    opacity: .8; }
        70%  { transform: scale(1.35); opacity: 0;  }
        100% { transform: scale(1);    opacity: 0;  }
      }
      @keyframes slidein {
        from { opacity: 0; transform: translateX(-20px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      .fade-up   { animation: fadeUp .7s ease both; }
      .d100 { animation-delay: .1s; }
      .d200 { animation-delay: .2s; }
      .d300 { animation-delay: .3s; }
      .d400 { animation-delay: .4s; }
      .d500 { animation-delay: .5s; }
      .d600 { animation-delay: .6s; }

      .pulse-btn::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: var(--red);
        animation: pulse-ring 1.8s ease-out infinite;
        z-index: -1;
      }

      .service-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 16px 40px rgba(11,37,69,.13);
      }
      .service-card { transition: transform .25s ease, box-shadow .25s ease; }

      .why-card:hover .why-icon {
        background: var(--blue);
        color: white;
      }
      .why-icon { transition: background .2s, color .2s; }

      .testimonial-card { transition: transform .2s ease; }
      .testimonial-card:hover { transform: translateY(-3px); }

      /* Diagonal hero divider */
      .hero-clip {
        clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%);
      }

      /* Nav link hover underline */
      .nav-link {
        position: relative;
        text-decoration: none;
        color: inherit;
      }
      .nav-link::after {
        content: '';
        position: absolute;
        bottom: -3px; left: 0;
        width: 0; height: 2px;
        background: var(--green2);
        transition: width .2s ease;
      }
      .nav-link:hover::after { width: 100%; }

      /* Scrollbar */
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: #f1f5f9; }
      ::-webkit-scrollbar-thumb { background: var(--blue); border-radius: 3px; }
    `;
    document.head.appendChild(style);
  }, []);
  return null;
};

/* ─── DATA ─── */
const PHONE = "+254711900706";
const WHATSAPP = "254711900706";
const WA_MSG = encodeURIComponent("Hello Rapha Hospital, I need medical assistance.");

const SERVICES = [
  {
    icon: "🚨",
    title: "Emergency Care",
    badge: "24/7",
    badgeColor: "#DC2626",
    desc: "Immediate trauma response, resuscitation, and critical care. Our ER team is always on standby.",
  },
  {
    icon: "🩺",
    title: "General Consultation",
    badge: null,
    desc: "Comprehensive outpatient consultations with experienced doctors across all specialties.",
  },
  {
    icon: "🤱",
    title: "Maternity & Child Health",
    badge: null,
    desc: "Prenatal care, safe delivery, postnatal support, and paediatric services under one roof.",
  },
  {
    icon: "🏥",
    title: "Surgical Services",
    badge: null,
    desc: "Elective and emergency surgical procedures performed in modern, sterile theatres.",
  },
  {
    icon: "🔬",
    title: "Laboratory & Diagnostics",
    badge: null,
    desc: "Full blood work, imaging (X-ray, ultrasound), and rapid diagnostic tests on-site.",
  },
  {
    icon: "💊",
    title: "Chronic Disease Management",
    badge: null,
    desc: "Structured care programs for diabetes, hypertension, asthma, and other long-term conditions.",
  },
];

const WHY = [
  { icon: "⚡", title: "Immediate Emergency Response", desc: "Our ER team responds within minutes — no waiting in a queue during critical moments." },
  { icon: "❤️", title: "Patient-Centred Compassion", desc: "Every decision is guided by what is best for the patient and their family." },
  { icon: "🛠️", title: "Advanced Medical Equipment", desc: "Modern diagnostic and treatment technology for accurate, faster results." },
  { icon: "🏘️", title: "Trusted by Eldoret Families", desc: "Thousands of families across Uasin Gishu County rely on us for their health." },
];

const TESTIMONIALS = [
  {
    name: "Grace M.",
    location: "Eldoret Town",
    stars: 5,
    text: "My husband had a severe accident and the emergency team was ready the moment we arrived. They stabilised him within minutes. We are forever grateful.",
    tag: "Emergency Care",
  },
  {
    name: "James K.",
    location: "Langas",
    stars: 5,
    text: "The doctors and nurses treated us like family. Very professional, very caring. The maternity ward is clean and well-staffed — our baby was delivered safely.",
    tag: "Maternity",
  },
  {
    name: "Faith A.",
    location: "Huruma",
    stars: 5,
    text: "I've visited many hospitals in Eldoret but Rapha stands out. The lab results were ready fast, the wards are spotless, and the staff are respectful.",
    tag: "Outpatient",
  },
];

/* ─── HELPERS ─── */
const Stars = ({ count = 5 }) => (
  <span style={{ color: "#F59E0B", fontSize: 15, letterSpacing: 1 }}>
    {"★".repeat(count)}
  </span>
);

/* ─── NAV ─── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Services", "Why Rapha", "Testimonials", "Contact"];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(11,37,69,.97)" : "rgba(11,37,69,.85)",
        backdropFilter: "blur(10px)",
        transition: "background .3s",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,.08)" : "none",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: "linear-gradient(135deg, #16A34A, #22C55E)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, fontWeight: 800, color: "white",
            boxShadow: "0 4px 14px rgba(22,163,74,.4)",
            flexShrink: 0,
          }}>✚</div>
          <div>
            <div style={{ color: "white", fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 17, lineHeight: 1.1 }}>
              Rapha Hospital
            </div>
            <div style={{ color: "rgba(255,255,255,.5)", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase" }}>
              & Clinics Eldoret
            </div>
          </div>
        </div>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 36, alignItems: "center" }} className="desktop-nav">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} className="nav-link"
              style={{ color: "rgba(255,255,255,.85)", fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
              {l}
            </a>
          ))}
          <a href={`tel:${PHONE}`}
            style={{
              background: "#DC2626", color: "white", padding: "9px 20px",
              borderRadius: 8, fontSize: 13, fontWeight: 600,
              textDecoration: "none", display: "flex", alignItems: "center", gap: 7,
              transition: "background .2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#B91C1C"}
            onMouseLeave={e => e.currentTarget.style.background = "#DC2626"}
          >
            📞 Emergency
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(p => !p)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "white", fontSize: 24, display: "none" }}
          className="hamburger"
          aria-label="Menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{
          background: "#0B2545", padding: "16px 20px 24px",
          borderTop: "1px solid rgba(255,255,255,.1)",
          display: "flex", flexDirection: "column", gap: 4,
        }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`}
              onClick={() => setMobileOpen(false)}
              style={{ color: "rgba(255,255,255,.85)", padding: "12px 0", fontSize: 16, fontWeight: 500, textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
              {l}
            </a>
          ))}
          <a href={`tel:${PHONE}`}
            style={{
              marginTop: 12, background: "#DC2626", color: "white",
              padding: "14px 0", borderRadius: 10, fontSize: 15, fontWeight: 700,
              textDecoration: "none", textAlign: "center",
            }}>
            📞 Call Emergency Now
          </a>
        </div>
      )}

      {/* Mobile nav CSS */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

/* ─── HERO ─── */
const Hero = () => (
  <section
    className="hero-clip"
    style={{
      background: "linear-gradient(135deg, #071A38 0%, #0B2545 45%, #0D3565 100%)",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      paddingTop: 100,
      paddingBottom: 100,
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Background pattern */}
    <div style={{
      position: "absolute", inset: 0, opacity: .04,
      backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
      backgroundSize: "32px 32px",
    }} />

    {/* Glowing orbs */}
    <div style={{
      position: "absolute", top: "15%", right: "10%",
      width: 300, height: 300, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(21,101,192,.35) 0%, transparent 70%)",
      pointerEvents: "none",
    }} />
    <div style={{
      position: "absolute", bottom: "20%", left: "5%",
      width: 200, height: 200, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(22,163,74,.2) 0%, transparent 70%)",
      pointerEvents: "none",
    }} />

    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px", position: "relative" }}>
      {/* Availability pill */}
      <div className="fade-up" style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        background: "rgba(22,163,74,.15)", border: "1px solid rgba(22,163,74,.35)",
        color: "#4ADE80", borderRadius: 100, padding: "6px 16px",
        fontSize: 13, fontWeight: 600, marginBottom: 28, letterSpacing: .5,
      }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", display: "inline-block", boxShadow: "0 0 0 3px rgba(34,197,94,.25)" }} />
        Open Now · Emergency Team on Standby 24/7
      </div>

      <h1 className="fade-up d100" style={{
        color: "white", fontSize: "clamp(32px, 6vw, 60px)",
        lineHeight: 1.15, maxWidth: 700, marginBottom: 22,
        fontWeight: 800,
      }}>
        24/7 Trusted Medical Care{" "}
        <span style={{ color: "#4ADE80" }}>in Eldoret</span>
      </h1>

      <p className="fade-up d200" style={{
        color: "rgba(255,255,255,.72)", fontSize: "clamp(15px, 2.5vw, 19px)",
        lineHeight: 1.65, maxWidth: 560, marginBottom: 40, fontWeight: 300,
      }}>
        From emergency response to specialised treatment — our team is ready to care for you and your family, anytime.
      </p>

      {/* CTAs */}
      <div className="fade-up d300" style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 60 }}>
        <a href={`tel:${PHONE}`}
          style={{
            position: "relative",
            background: "#DC2626",
            color: "white",
            padding: "16px 32px",
            borderRadius: 12,
            fontSize: 16, fontWeight: 700,
            textDecoration: "none",
            display: "flex", alignItems: "center", gap: 10,
            boxShadow: "0 8px 30px rgba(220,38,38,.4)",
            zIndex: 1,
          }}
          className="pulse-btn"
        >
          📞 Call Now (24/7 Emergency)
        </a>

        <a href={`https://wa.me/${WHATSAPP}?text=${WA_MSG}`} target="_blank" rel="noreferrer"
          style={{
            background: "rgba(255,255,255,.1)",
            border: "1.5px solid rgba(255,255,255,.25)",
            color: "white",
            padding: "16px 32px",
            borderRadius: 12,
            fontSize: 16, fontWeight: 600,
            textDecoration: "none",
            display: "flex", alignItems: "center", gap: 10,
            backdropFilter: "blur(8px)",
            transition: "background .2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.18)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.1)"}
        >
          <span style={{ fontSize: 18 }}>💬</span> Chat on WhatsApp
        </a>
      </div>

      {/* Trust badges */}
      <div className="fade-up d400" style={{
        display: "flex", flexWrap: "wrap", gap: 12,
      }}>
        {[
          { icon: "🚨", label: "24/7 Emergency Services" },
          { icon: "👨‍⚕️", label: "Experienced Medical Team" },
          { icon: "🔬", label: "Modern Diagnostics" },
          { icon: "🛡️", label: "Insurance Accepted" },
        ].map(b => (
          <div key={b.label} style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,.07)",
            border: "1px solid rgba(255,255,255,.12)",
            borderRadius: 8, padding: "9px 16px",
            color: "rgba(255,255,255,.85)", fontSize: 13, fontWeight: 500,
          }}>
            <span>{b.icon}</span> {b.label}
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── STATS BANNER ─── */
const StatsBanner = () => (
  <section style={{ background: "#1565C0", padding: "28px 24px" }}>
    <div style={{
      maxWidth: 1180, margin: "0 auto",
      display: "flex", flexWrap: "wrap", justifyContent: "space-around", gap: 24,
    }}>
      {[
        { num: "10,000+", label: "Patients Served" },
        { num: "24/7", label: "Emergency Ready" },
        { num: "30+", label: "Medical Specialists" },
        { num: "15+", label: "Years of Service" },
      ].map(s => (
        <div key={s.label} style={{ textAlign: "center" }}>
          <div style={{ color: "white", fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 5vw, 36px)", fontWeight: 800 }}>{s.num}</div>
          <div style={{ color: "rgba(255,255,255,.7)", fontSize: 13, fontWeight: 500, marginTop: 2 }}>{s.label}</div>
        </div>
      ))}
    </div>
  </section>
);

/* ─── SERVICES ─── */
const Services = () => (
  <section id="services" style={{ background: "#F0F4FA", padding: "100px 24px" }}>
    <div style={{ maxWidth: 1180, margin: "0 auto" }}>
      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <div style={{
          display: "inline-block",
          background: "rgba(21,101,192,.1)", color: "#1565C0",
          borderRadius: 100, padding: "5px 18px", fontSize: 12,
          fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
          marginBottom: 16,
        }}>Our Services</div>
        <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, color: "#0B2545", lineHeight: 1.2 }}>
          Comprehensive Hospital Care
        </h2>
        <p style={{ color: "#64748B", fontSize: 16, marginTop: 12, maxWidth: 480, margin: "12px auto 0" }}>
          Full-service medical care across all major specialties — all under one roof in Eldoret.
        </p>
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 20,
      }}>
        {SERVICES.map((s, i) => (
          <div key={s.title} className="service-card" style={{
            background: "white",
            borderRadius: 16,
            padding: "28px 28px 28px 24px",
            borderLeft: `4px solid ${s.badgeColor || "#1565C0"}`,
            boxShadow: "0 4px 20px rgba(11,37,69,.07)",
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <div style={{
                width: 52, height: 52, borderRadius: 12, flexShrink: 0,
                background: s.badgeColor ? "rgba(220,38,38,.08)" : "rgba(21,101,192,.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24,
              }}>{s.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0B2545" }}>{s.title}</h3>
                  {s.badge && (
                    <span style={{
                      background: "#DC2626", color: "white",
                      borderRadius: 4, padding: "2px 8px", fontSize: 10, fontWeight: 700, letterSpacing: 1,
                    }}>{s.badge}</span>
                  )}
                </div>
                <p style={{ color: "#64748B", fontSize: 14, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── WHY RAPHA ─── */
const WhyRapha = () => (
  <section id="why-rapha" style={{ background: "white", padding: "100px 24px" }}>
    <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 60, alignItems: "center" }}>
      {/* Left content */}
      <div style={{ flex: "1 1 420px" }}>
        <div style={{
          display: "inline-block",
          background: "rgba(22,163,74,.1)", color: "#16A34A",
          borderRadius: 100, padding: "5px 18px", fontSize: 12,
          fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
          marginBottom: 16,
        }}>Why Choose Us</div>
        <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, color: "#0B2545", lineHeight: 1.2, marginBottom: 18 }}>
          Healthcare You Can{" "}
          <span style={{ color: "#1565C0" }}>Trust</span>
        </h2>
        <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.7, marginBottom: 36 }}>
          Rapha Hospital & Clinics is built on a foundation of clinical excellence and genuine compassion. We exist to give every patient in Eldoret access to world-class care.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {WHY.map((w, i) => (
            <div key={w.title} className="why-card" style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
              <div className="why-icon" style={{
                width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                background: "#F0F4FA", color: "#1565C0",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
              }}>{w.icon}</div>
              <div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: "#0B2545", marginBottom: 4 }}>{w.title}</h4>
                <p style={{ color: "#64748B", fontSize: 14, lineHeight: 1.6 }}>{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — visual highlight card */}
      <div style={{ flex: "1 1 320px" }}>
        <div style={{
          background: "linear-gradient(145deg, #0B2545, #1565C0)",
          borderRadius: 24, padding: "44px 36px",
          boxShadow: "0 24px 60px rgba(11,37,69,.25)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -30, right: -30,
            width: 200, height: 200, borderRadius: "50%",
            background: "rgba(255,255,255,.05)",
          }} />
          <div style={{ position: "relative" }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>🏥</div>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              color: "white", fontSize: 26, fontWeight: 800, marginBottom: 16, lineHeight: 1.2,
            }}>
              Rapha Hospital & Clinics
            </h3>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 14, lineHeight: 1.7, marginBottom: 28 }}>
              Serving Eldoret and Uasin Gishu County with uncompromising medical care, every hour of every day.
            </p>

            {/* Mini trust row */}
            {[
              "✓  Fully licensed by MOH Kenya",
              "✓  Accredited diagnostic lab",
              "✓  NHIF & major insurers accepted",
              "✓  Qualified nursing staff 24/7",
            ].map(item => (
              <div key={item} style={{ color: "#4ADE80", fontSize: 14, fontWeight: 500, marginBottom: 10 }}>{item}</div>
            ))}

            <a href={`tel:${PHONE}`}
              style={{
                display: "block", marginTop: 28,
                background: "#DC2626",
                color: "white", textAlign: "center",
                padding: "14px", borderRadius: 10,
                fontSize: 15, fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 6px 20px rgba(220,38,38,.35)",
                transition: "background .2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#B91C1C"}
              onMouseLeave={e => e.currentTarget.style.background = "#DC2626"}
            >
              📞 Call Emergency Line
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ─── TESTIMONIALS ─── */
const Testimonials = () => (
  <section id="testimonials" style={{ background: "#F0F4FA", padding: "100px 24px" }}>
    <div style={{ maxWidth: 1180, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <div style={{
          display: "inline-block",
          background: "rgba(21,101,192,.1)", color: "#1565C0",
          borderRadius: 100, padding: "5px 18px", fontSize: 12,
          fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
          marginBottom: 16,
        }}>Patient Stories</div>
        <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, color: "#0B2545" }}>
          Trusted by Families Across Eldoret
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 20 }}>
        {TESTIMONIALS.map((t, i) => (
          <div key={t.name} className="testimonial-card" style={{
            background: "white", borderRadius: 16,
            padding: "28px", boxShadow: "0 4px 20px rgba(11,37,69,.07)",
            position: "relative",
            borderTop: "3px solid #1565C0",
          }}>
            {/* Tag */}
            <span style={{
              background: "rgba(21,101,192,.08)", color: "#1565C0",
              borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700,
              letterSpacing: .5, textTransform: "uppercase", marginBottom: 16, display: "inline-block",
            }}>{t.tag}</span>

            {/* Stars */}
            <div style={{ marginBottom: 14 }}><Stars count={t.stars} /></div>

            {/* Quote */}
            <p style={{
              color: "#334155", fontSize: 15, lineHeight: 1.7, marginBottom: 24,
              fontStyle: "italic",
            }}>"{t.text}"</p>

            {/* Author */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, borderTop: "1px solid #E2E8F0", paddingTop: 16 }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "linear-gradient(135deg, #1565C0, #1E88E5)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontWeight: 700, fontSize: 16,
              }}>
                {t.name[0]}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: "#0B2545", fontSize: 14 }}>{t.name}</div>
                <div style={{ color: "#94A3B8", fontSize: 12 }}>{t.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── EMERGENCY BANNER ─── */
const EmergencyBanner = () => (
  <section style={{
    background: "#DC2626", padding: "40px 24px",
  }}>
    <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between" }}>
      <div>
        <div style={{ color: "white", fontFamily: "'Playfair Display', serif", fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 800, marginBottom: 6 }}>
          🚨 Medical Emergency?
        </div>
        <div style={{ color: "rgba(255,255,255,.85)", fontSize: 16 }}>
          Don't wait. Call our 24/7 emergency line immediately.
        </div>
      </div>
      <a href={`tel:${PHONE}`}
        style={{
          background: "white", color: "#DC2626",
          padding: "14px 32px", borderRadius: 10,
          fontSize: 17, fontWeight: 800,
          textDecoration: "none", whiteSpace: "nowrap",
          boxShadow: "0 4px 16px rgba(0,0,0,.15)",
          transition: "transform .15s",
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >
        📞 Call Now
      </a>
    </div>
  </section>
);

/* ─── CONTACT ─── */
const Contact = () => (
  <section id="contact" style={{ background: "white", padding: "100px 24px" }}>
    <div style={{ maxWidth: 1180, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <div style={{
          display: "inline-block",
          background: "rgba(22,163,74,.1)", color: "#16A34A",
          borderRadius: 100, padding: "5px 18px", fontSize: 12,
          fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
          marginBottom: 16,
        }}>Get in Touch</div>
        <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, color: "#0B2545" }}>
          We're Here When You Need Us
        </h2>
        <p style={{ color: "#64748B", fontSize: 16, marginTop: 12 }}>
          Walk in, call, or WhatsApp us — no appointment needed for emergencies.
        </p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 32 }}>
        {/* Contact cards */}
        <div style={{ flex: "1 1 340px", display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Call */}
          <a href={`tel:${PHONE}`} style={{
            display: "flex", alignItems: "center", gap: 18,
            background: "#DC2626", borderRadius: 14, padding: "22px 24px",
            textDecoration: "none", boxShadow: "0 8px 28px rgba(220,38,38,.3)",
            transition: "transform .2s",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <div style={{ fontSize: 32 }}>📞</div>
            <div>
              <div style={{ color: "rgba(255,255,255,.8)", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Emergency Line (24/7)</div>
              <div style={{ color: "white", fontSize: 20, fontWeight: 800 }}>{PHONE}</div>
            </div>
          </a>

          {/* WhatsApp */}
          <a href={`https://wa.me/${WHATSAPP}?text=${WA_MSG}`} target="_blank" rel="noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: 18,
              background: "#16A34A", borderRadius: 14, padding: "22px 24px",
              textDecoration: "none", boxShadow: "0 8px 28px rgba(22,163,74,.25)",
              transition: "transform .2s",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <div style={{ fontSize: 32 }}>💬</div>
            <div>
              <div style={{ color: "rgba(255,255,255,.8)", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>WhatsApp Chat</div>
              <div style={{ color: "white", fontSize: 18, fontWeight: 700 }}>Message Us Now</div>
            </div>
          </a>

          {/* Info cards */}
          <div style={{
            background: "#F0F4FA", borderRadius: 14, padding: "22px 24px",
            display: "flex", flexDirection: "column", gap: 16,
          }}>
            {[
              { icon: "📍", label: "Location", val: "Opposite Eldoret Sports Club, Eldoret, Kenya" },
              { icon: "🕐", label: "Hours", val: "Open 24 Hours — 365 Days a Year" },
              { icon: "📧", label: "Email", val: "info@raphahospital.co.ke" },
            ].map(info => (
              <div key={info.label} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{info.icon}</span>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>{info.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#334155" }}>{info.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map placeholder */}
        <div style={{ flex: "1 1 380px" }}>
          <div style={{
            borderRadius: 16, overflow: "hidden",
            boxShadow: "0 8px 32px rgba(11,37,69,.12)",
            height: "100%", minHeight: 380,
            background: "#E8EFF7",
            position: "relative",
          }}>
            <iframe
              title="Rapha Hospital Location"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 380, display: "block" }}
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3098868.1315248674!2d32.8038226!3d2.323871!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x178101a443ecf17d%3A0x593841995b37786e!2sRapha%20Hospital%20%26%20Clinics%20Eldoret!5e1!3m2!1sen!2ske!4v1776855143448!5m2!1sen!2ske"
            />
            {/* Map overlay pin */}
            <div style={{
              position: "absolute", top: 16, left: 16,
              background: "white", borderRadius: 10, padding: "10px 14px",
              boxShadow: "0 4px 16px rgba(0,0,0,.15)",
              display: "flex", alignItems: "center", gap: 10,
              fontSize: 13, fontWeight: 600, color: "#0B2545",
            }}>
              <span>📍</span> Opposite Eldoret Sports Club
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ─── FOOTER ─── */
const Footer = () => (
  <footer style={{ background: "#071A38", color: "rgba(255,255,255,.65)" }}>
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "60px 24px 0" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 48, paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        {/* Brand */}
        <div style={{ flex: "1 1 260px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: "linear-gradient(135deg, #16A34A, #22C55E)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, color: "white", fontWeight: 800,
            }}>✚</div>
            <div>
              <div style={{ color: "white", fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 17 }}>Rapha Hospital</div>
              <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", opacity: .5 }}> & Clinics Eldoret</div>
            </div>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>
            Comprehensive, compassionate medical care available every hour of every day in Eldoret, Kenya.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            <a href={`tel:${PHONE}`}
              style={{
                background: "#DC2626", color: "white", borderRadius: 8,
                padding: "8px 16px", fontSize: 13, fontWeight: 700, textDecoration: "none",
              }}>
              📞 Emergency
            </a>
            <a href={`https://wa.me/${WHATSAPP}?text=${WA_MSG}`} target="_blank" rel="noreferrer"
              style={{
                background: "#16A34A", color: "white", borderRadius: 8,
                padding: "8px 16px", fontSize: 13, fontWeight: 700, textDecoration: "none",
              }}>
              💬 WhatsApp
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div style={{ flex: "1 1 160px" }}>
          <div style={{ color: "white", fontWeight: 700, fontSize: 14, marginBottom: 18, letterSpacing: .5 }}>Services</div>
          {["Emergency Care", "General Consultation", "Maternity & Child", "Surgical Services", "Laboratory", "Chronic Disease"].map(l => (
            <div key={l} style={{ marginBottom: 10 }}>
              <a href="#services" style={{ color: "rgba(255,255,255,.6)", fontSize: 14, textDecoration: "none", transition: "color .15s" }}
                onMouseEnter={e => e.currentTarget.style.color = "white"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.6)"}
              >{l}</a>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div style={{ flex: "1 1 220px" }}>
          <div style={{ color: "white", fontWeight: 700, fontSize: 14, marginBottom: 18, letterSpacing: .5 }}>Contact</div>
          {[
            { icon: "📞", val: PHONE },
            { icon: "💬", val: "WhatsApp Chat" },
            { icon: "📧", val: "info@raphahospital.co.ke" },
            { icon: "📍", val: "Opposite Sports Club, Eldoret" },
            { icon: "🕐", val: "24/7 — Open Always" },
          ].map(c => (
            <div key={c.val} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
              <span style={{ fontSize: 14, flexShrink: 0 }}>{c.icon}</span>
              <span style={{ fontSize: 13 }}>{c.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency reminder strip */}
      <div style={{
        background: "rgba(220,38,38,.12)",
        border: "1px solid rgba(220,38,38,.25)",
        borderRadius: 10, padding: "14px 20px",
        margin: "28px 0",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 12,
      }}>
        <span style={{ color: "#FCA5A5", fontSize: 14, fontWeight: 600 }}>
          🚨 For emergencies, call immediately — do not wait.
        </span>
        <a href={`tel:${PHONE}`} style={{ color: "#FCA5A5", fontWeight: 800, fontSize: 15, textDecoration: "none" }}>
          {PHONE}
        </a>
      </div>

      <div style={{ paddingBottom: 28, textAlign: "center", fontSize: 12, opacity: .35 }}>
        © {new Date().getFullYear()} Rapha Hospital & Clinics Eldoret. All rights reserved.
      </div>
    </div>
  </footer>
);

/* ─── STICKY MOBILE CTA ─── */
const StickyMobileCTA = () => (
  <>
    <style>{`
      .sticky-mobile-cta { display: none; }
      @media (max-width: 768px) {
        .sticky-mobile-cta {
          display: flex;
          position: fixed;
          bottom: 0; left: 0; right: 0;
          z-index: 200;
          box-shadow: 0 -4px 24px rgba(0,0,0,.2);
        }
      }
    `}</style>
    <div className="sticky-mobile-cta">
      <a href={`tel:${PHONE}`}
        style={{
          flex: 1, background: "#DC2626", color: "white",
          padding: "16px 0", textAlign: "center",
          fontSize: 15, fontWeight: 700, textDecoration: "none",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
        📞 Call Now
      </a>
      <a href={`https://wa.me/${WHATSAPP}?text=${WA_MSG}`} target="_blank" rel="noreferrer"
        style={{
          flex: 1, background: "#16A34A", color: "white",
          padding: "16px 0", textAlign: "center",
          fontSize: 15, fontWeight: 700, textDecoration: "none",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
        💬 WhatsApp
      </a>
    </div>
    {/* Spacer so content isn't hidden behind sticky bar */}
    <div style={{ height: 0 }} className="sticky-spacer" />
    <style>{`
      @media (max-width: 768px) {
        .sticky-spacer { height: 56px; }
      }
    `}</style>
  </>
);

/* ─── ROOT COMPONENT ─── */
export default function RaphaHospital() {
  return (
    <>
      <FontLoader />
      <Navbar />
      <main>
        <Hero />
        <StatsBanner />
        <Services />
        <WhyRapha />
        <Testimonials />
        <EmergencyBanner />
        <Contact />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
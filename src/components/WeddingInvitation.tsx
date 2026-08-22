import { useState, useCallback } from "react";
import floralFrame from "@/assets/floral-frame.png";

type Stage = "closed" | "opening" | "open";

/* Ornate laurel-wreath crest surrounding the monogram */
function CrestWreath() {
  // a single laurel branch, drawn rising along a curve; mirrored for the right side
  const branch = (side: 1 | -1) => (
    <g transform={`scale(${side},1)`}>
      <path
        d="M30 96 C 12 78, 6 50, 16 22"
        fill="none"
        stroke="var(--gold-deep)"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.85"
      />
      {Array.from({ length: 7 }).map((_, i) => {
        const t = i / 6;
        const y = 96 - t * 74;
        const x = 30 - (1 - t) * 0 + Math.sin(t * Math.PI) * 4;
        return (
          <g key={i} transform={`translate(${x - 7},${y}) rotate(${-42 - i * 4})`}>
            <path
              d="M0 0 C 4 -3, 13 -3, 17 0 C 13 3, 4 3, 0 0 Z"
              fill="var(--gold)"
              opacity="0.9"
            />
          </g>
        );
      })}
    </g>
  );
  return (
    <svg className="crest-wreath" viewBox="0 0 120 120" aria-hidden="true">
      {/* top floral cluster */}
      <g transform="translate(60,16)">
        <circle r="3.4" fill="var(--gold)" />
        <circle cx="-7" cy="3" r="2.6" fill="var(--gold-soft)" />
        <circle cx="7" cy="3" r="2.6" fill="var(--gold-soft)" />
        <circle cx="-4" cy="-5" r="2.1" fill="var(--blush)" opacity="0.8" />
        <circle cx="4" cy="-5" r="2.1" fill="var(--blush)" opacity="0.8" />
      </g>
      {/* rings */}
      <circle cx="60" cy="60" r="42" fill="none" stroke="var(--gold)" strokeWidth="1" opacity="0.6" />
      <circle cx="60" cy="60" r="38" fill="none" stroke="var(--gold-deep)" strokeWidth="0.7" opacity="0.5" strokeDasharray="1 3" />
      {/* laurel branches */}
      {branch(1)}
      {branch(-1)}
      {/* bottom knot */}
      <path d="M52 100 Q 60 94 68 100" fill="none" stroke="var(--gold-deep)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/* small gold divider with a diamond */
function Divider() {
  return (
    <div className="div-orn" aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 14 14">
        <path d="M7 0 L14 7 L7 14 L0 7 Z" fill="var(--gold)" />
        <path d="M7 3 L11 7 L7 11 L3 7 Z" fill="var(--paper)" opacity="0.6" />
      </svg>
    </div>
  );
}

const program = [
  {
    title: "عقد القران ومأدبة العروس",
    items: [
      { label: "عقد القران:", venue: "في جامع الزمزمية (بعد صلاة العصر مباشرة)" },
      { label: "مأدبة العروس:", venue: "قاعة دار زمان عنتر (بعد صلاة العصر)" },
      { label: "حنة العروس:", venue: "قاعة مسايا عنتر" },
    ],
  },
  {
    title: "حفل الزفاف ومأدبة العريس (26 سبتمبر)",
    items: [
      { label: "مأدبة عشاء العريس:", venue: "قاعة La Marquise" },
      { label: "حفل الزفاف:", venue: "قاعة La Marquise" },
    ],
  },
];

export default function WeddingInvitation() {
  const [stage, setStage] = useState<Stage>("closed");

  const open = useCallback(() => {
    setStage((s) => {
      if (s !== "closed") return s;
      return "opening";
    });
    window.setTimeout(() => setStage("open"), 620);
  }, []);

  const close = useCallback(() => setStage("closed"), []);

  return (
    <main className="inv-page">
      <div
        className="inv-card"
        data-stage={stage}
        onClick={stage === "closed" ? open : undefined}
        role={stage === "closed" ? "button" : undefined}
        tabIndex={stage === "closed" ? 0 : undefined}
        onKeyDown={
          stage === "closed"
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  open();
                }
              }
            : undefined
        }
      >
        <img
          className="inv-surface"
          src={floralFrame}
          alt=""
          width={1200}
          height={1712}
          loading="eager"
        />

        {/* ---------- Closed front ---------- */}
        <div className="inv-layer inv-front">
          <div className="inv-crest">
            <CrestWreath />
            <div className="crest-monogram">H & R</div>
          </div>

          <div className="inv-band">
            <div className="inv-ribbon" />
            <div className="inv-seal" aria-hidden="true">
              <div className="seal-disc" />
              <div className="seal-ring" />
              <span className="seal-mono">H&R</span>
            </div>
          </div>

          <div style={{ marginTop: "auto", marginBottom: "2%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="inv-names">H & R</div>
            <Divider />
            <div className="inv-hint">اضغط لفتح الدعوة</div>
          </div>
        </div>

        {/* ---------- Opened inside ---------- */}
        <div className="inv-layer inv-inside arabic">
          {stage === "open" && (
            <button className="inv-close" onClick={(e) => { e.stopPropagation(); close(); }} aria-label="إغلاق">
              ✕ عودة
            </button>
          )}

          <p className="verse">
            <span className="br">﴿</span>
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
            لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
            <span className="br">﴾</span>
          </p>

          <Divider />

          <p className="inv-intro">
            يسرّ عائلة [اسم عائلة العريس] وعائلة [اسم عائلة العروس] دعوتكم لحضور حفل
            زفاف ولديهما:
          </p>
          <p className="couple">
            [اسم العريس] <span className="amp">&</span> [اسم العروس]
          </p>
          <p className="inv-plea">
            وتكتمل فرحتنا ومسرتنا بتشريفكم ومشاركتكم لنا هذه اللحظات المباركة وفق
            البرنامج التالي:
          </p>

          {program.map((s) => (
            <div key={s.title} style={{ width: "100%" }}>
              <Divider />
              <div className="section-title">{s.title}</div>
              {s.items.map((it) => (
                <div className="program-item" key={it.label}>
                  <span className="label">{it.label}</span>{" "}
                  <span className="venue">{it.venue}</span>
                </div>
              ))}
            </div>
          ))}

          <Divider />
          <p className="closing">
            حضوركم يسعدنا ويشرّفنا، ودعواتكم الصادقة تضيء دربنا
          </p>
        </div>
      </div>
    </main>
  );
}

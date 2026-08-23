import { useState, useCallback } from "react";
import floralFrame from "@/assets/floral-frame.png";

type Stage = "closed" | "opening" | "open";

/* Heraldic shield crest: crown + shield + laurel + monogram */
function ShieldCrest() {
  const branch = (side: 1 | -1) => (
    <g transform={side === 1 ? undefined : "translate(140,0) scale(-1,1)"}>
      <path
        d="M68 128 C 50 112, 36 86, 34 52"
        fill="none"
        stroke="var(--gold-deep)"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.85"
      />
      {Array.from({ length: 6 }).map((_, i) => {
        const t = i / 5;
        const x = 68 - t * 34 + Math.sin(t * Math.PI) * 5;
        const y = 128 - t * 76;
        return (
          <g key={i} transform={`translate(${x - 7},${y}) rotate(${-50 - i * 6})`}>
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
    <svg className="crest-wreath" viewBox="0 0 140 150" aria-hidden="true">
      {/* crown */}
      <g stroke="var(--gold-deep)" strokeWidth="1.3" strokeLinejoin="round">
        <path d="M50 26 L90 26 L90 30 L50 30 Z" fill="var(--gold-soft)" />
        <path
          d="M52 26 L54 14 L62 22 L70 10 L78 22 L86 14 L88 26 Z"
          fill="var(--gold-soft)"
        />
      </g>
      <circle cx="62" cy="16" r="2.1" fill="var(--gold)" />
      <circle cx="78" cy="16" r="2.1" fill="var(--gold)" />
      <circle cx="70" cy="11" r="2.3" fill="var(--blush)" />
      {/* shield */}
      <path
        d="M70 32 L112 44 L112 80 C112 106, 92 126, 70 140 C48 126, 28 106, 28 80 L28 44 Z"
        fill="var(--paper)"
        stroke="var(--gold-deep)"
        strokeWidth="1.6"
      />
      <path
        d="M70 38 L106 48 L106 80 C106 100, 88 118, 70 130 C52 118, 34 100, 34 80 L34 48 Z"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="0.8"
        opacity="0.7"
      />
      {/* laurel branches */}
      {branch(1)}
      {branch(-1)}
      {/* top rosette */}
      <g transform="translate(70,30)">
        <circle r="2.4" fill="var(--gold)" />
        <circle cx="-5" cy="2" r="1.8" fill="var(--gold-soft)" />
        <circle cx="5" cy="2" r="1.8" fill="var(--gold-soft)" />
      </g>
    </svg>
  );
}

/* small gold divider with a diamond */
function Divider() {
  return (
    <div className="div-orn" aria-hidden="true">
      <svg width="13" height="13" viewBox="0 0 14 14">
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
      <div className="inv-stack">
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
          {/* Opened floral border (shown when open) */}
          <img className="inv-border" src={floralFrame} alt="" width={1200} height={1712} aria-hidden="true" />

          {/* Closed corner florals (shown when closed) */}
          <img className="inv-corner inv-corner--tl" src={floralFrame} alt="" aria-hidden="true" />
          <img className="inv-corner inv-corner--tr" src={floralFrame} alt="" aria-hidden="true" />
          <img className="inv-corner inv-corner--bl" src={floralFrame} alt="" aria-hidden="true" />

          {/* ---------- Closed front ---------- */}
          <div className="inv-layer inv-front">
            <div className="inv-crest">
              <ShieldCrest />
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

            <div className="inv-footer">
              <div className="inv-names">H & R</div>
              <Divider />
              <div className="inv-date">26 سبتمبر 2026</div>
              <div className="inv-venue">حفل الزفاف · La Marquise</div>
              <div className="inv-hint">اضغط لفتح الدعوة</div>
            </div>
          </div>

          {/* ---------- Opened inside ---------- */}
          <div className="inv-layer inv-inside arabic">
            <p className="verse">
              <span className="br">﴿</span>
              وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
              لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
              <span className="br">﴾</span>
            </p>

            <Divider />

            <p className="inv-intro">
              يسرّ عائلة [اسم عائلة العريس] وعائلة [اسم عائلة العروس] دعوتكم لحضور
              حفل زفاف ولديهما:
            </p>
            <p className="couple">
              [اسم العريس] <span className="amp">&</span> [اسم العروس]
            </p>
            <p className="inv-plea">
              وتكتمل فرحتنا ومسرتنا بتشريفكم ومشاركتكم لنا هذه اللحظات المباركة وفق
              البرنامج التالي:
            </p>

            {program.map((s) => (
              <div key={s.title} className="prog-block">
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

        {stage === "open" && (
          <button className="inv-close-out" onClick={close} aria-label="إغلاق والعودة">
            ✕ إغلاق
          </button>
        )}
      </div>
    </main>
  );
}

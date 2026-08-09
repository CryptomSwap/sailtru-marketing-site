"use client";

import "./hebrew-mock-preview.css";

type HebrewMockPreviewProps = {
  variant: "clinic" | "lawFirm";
};

/** CSS-rendered Hebrew business site mockups for the diagnostic frame. */
export function HebrewMockPreview({ variant }: HebrewMockPreviewProps) {
  if (variant === "lawFirm") {
    return <LawFirmMock />;
  }
  return <ClinicMock />;
}

function ClinicMock() {
  return (
    <div className="he-mock he-mock--clinic">
      <header className="he-mock__header">
        <div className="he-mock__brand">
          <span className="he-mock__mark" aria-hidden />
          <span className="he-mock__logo">מרפאת שור</span>
        </div>
        <nav className="he-mock__nav" aria-hidden>
          <span>שירותים</span>
          <span>צוות</span>
          <span>יצירת קשר</span>
        </nav>
      </header>
      <section className="he-mock__hero">
        <p className="he-mock__eyebrow">רפואה מדויקת · תל אביב</p>
        <h1 className="he-mock__headline">
          בריאות
          <br />
          שמרגישים
        </h1>
        <p className="he-mock__sub">
          מרפאה פרטית לרפואה מונעת, אבחון מוקדם וטיפול אישי — ללא פשרות על איכות.
        </p>
        <span className="he-mock__cta">קביעת תור</span>
      </section>
      <section className="he-mock__cards" aria-hidden>
        <div className="he-mock__card">
          <span className="he-mock__card-title">רפואת משפחה</span>
        </div>
        <div className="he-mock__card">
          <span className="he-mock__card-title">לב וכלי דם</span>
        </div>
        <div className="he-mock__card">
          <span className="he-mock__card-title">עור ויופי</span>
        </div>
      </section>
    </div>
  );
}

function LawFirmMock() {
  return (
    <div className="he-mock he-mock--law">
      <header className="he-mock__header">
        <div className="he-mock__brand">
          <span className="he-mock__mark he-mock__mark--law" aria-hidden />
          <span className="he-mock__logo">כהן · לוי</span>
        </div>
        <nav className="he-mock__nav" aria-hidden>
          <span>תחומי עיסוק</span>
          <span>הצוות</span>
          <span>צור קשר</span>
        </nav>
      </header>
      <section className="he-mock__hero he-mock__hero--law">
        <p className="he-mock__eyebrow">משרד עורכי דין · הרצליה</p>
        <h1 className="he-mock__headline he-mock__headline--law">
          ייצוג משפטי
          <br />
          ברמה גבוהה
        </h1>
        <p className="he-mock__sub">
          ליווי אסטרטגי לעסקים, נדל״ן ומ&A — עם ניסיון של עשרות שנים בבתי משפט בישראל.
        </p>
        <span className="he-mock__cta he-mock__cta--law">ייעוץ ראשוני</span>
      </section>
      <section className="he-mock__stats" aria-hidden>
        <div className="he-mock__stat">
          <span className="he-mock__stat-num">25+</span>
          <span className="he-mock__stat-label">שנות ניסיון</span>
        </div>
        <div className="he-mock__stat">
          <span className="he-mock__stat-num">400+</span>
          <span className="he-mock__stat-label">תיקים מובילים</span>
        </div>
      </section>
    </div>
  );
}

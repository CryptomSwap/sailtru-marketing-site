import { setRequestLocale, getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { redirect } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/sections/site-page/page-hero";
import { FREEMIUM_COOKIE, readFreemiumSession } from "@/lib/freemium-session";
import { routing, type Locale } from "@/i18n/routing";
import "@/components/sections/site-page/site-page.css";
import "@/components/sections/home-v2/dashboard.css";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type DiagnosticCard = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "freemium.dashboard" });
  return { title: t("metadataTitle"), description: t("metadataDescription") };
}

export default async function DashboardPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await readFreemiumSession();
  const t = await getTranslations("freemium.dashboard");

  async function signOut() {
    "use server";
    const jar = await cookies();
    jar.delete(FREEMIUM_COOKIE);
    redirect({ href: "/", locale: locale as Locale });
  }

  if (!session) {
    return (
      <main id="main-content" className="site-page relative z-10 w-full min-w-0">
        <PageHero kicker={t("kicker")} title={t("emptyTitle")} body={t("emptyBody")} />
        <div className="sp-below">
          <section className="sp-section">
            <div className="sp-shell sp-shell--narrow">
              <Link href="/#hero" className="sp-btn">
                {t("emptyCta")}
              </Link>
            </div>
          </section>
        </div>
      </main>
    );
  }

  const diagnostics = await getTranslations("diagnostics");
  const cards = diagnostics.raw("cards") as DiagnosticCard[];
  const [open, ...locked] = cards;

  return (
    <main id="main-content" className="site-page relative z-10 w-full min-w-0 pb-14">
      <PageHero kicker={t("kicker")} title={t("title")} body={t("lede", { host: session.host })} />
      <div className="sp-below">
        <section className="sp-section">
          <div className="sp-shell sp-shell--narrow">
            <p className="dash-host">{session.host}</p>
            <p className="dash-mail">{session.email}</p>

            {open ? (
              <article className="dash-card dash-card--open">
                <div className="dash-card__row">
                  <p className="dash-card__eyebrow">{open.eyebrow}</p>
                  <span className="dash-pill">{t("sample")}</span>
                </div>
                <h2 className="dash-card__title">{open.title}</h2>
                <p className="dash-card__body">{open.body}</p>
                <p className="dash-card__state">{t("openLabel")}</p>
              </article>
            ) : null}

            <ul className="dash-locked">
              {locked.map((card) => (
                <li key={card.id} className="dash-card dash-card--locked">
                  <div>
                    <p className="dash-card__eyebrow">{card.eyebrow}</p>
                    <h3 className="dash-card__title">{card.title}</h3>
                    <p className="dash-card__note">{t("lockedNote")}</p>
                  </div>
                  <span className="dash-pill dash-pill--locked">{t("lockedLabel")}</span>
                </li>
              ))}
            </ul>

            <div className="sp-close__actions sp-close__actions--after">
              <Link href="/contact" className="sp-btn">
                {t("upgrade")}
              </Link>
              <form action={signOut}>
                <button className="sp-link dash-signout" type="submit">
                  {t("signOut")}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

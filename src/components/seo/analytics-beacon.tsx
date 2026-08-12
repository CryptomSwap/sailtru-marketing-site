type AnalyticsProps = {
  measurementId?: string;
};

/** Loads only when NEXT_PUBLIC_GA_MEASUREMENT_ID is configured — no secrets in repo. */
export function AnalyticsBeacon({ measurementId }: AnalyticsProps) {
  const id = measurementId ?? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!id) return null;

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${id}');`
        }}
      />
    </>
  );
}

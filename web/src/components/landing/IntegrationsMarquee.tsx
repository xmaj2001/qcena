const icons = [
  { name: "Adobe", src: "https://decoims.com/image?fit=cover&width=47&height=47&src=decocms/3d4c18ec-c0bd-4d28-acc2-d3097a9048d3/adobe.png" },
  { name: "Airtable", src: "https://decoims.com/image?fit=cover&width=47&height=47&src=decocms/dc4657cc-99ed-441c-8104-2508f57b98c0/airtable.png" },
  { name: "GitHub", src: "https://decoims.com/image?fit=cover&width=47&height=47&src=decocms/9eca1635-36ce-4171-a7b2-5058ef4c4c31/github.png" },
  { name: "Hubspot", src: "https://decoims.com/image?fit=cover&width=47&height=47&src=decocms/bf953e34-3fe3-45d4-ab88-72c032503e0a/integration.png" },
  { name: "Nuvemshop", src: "https://decoims.com/image?fit=cover&width=47&height=47&src=decocms/bba21f23-94ca-4fb2-b548-71068a878dba/nuvemshop.png" },
  { name: "Salesforce", src: "https://decoims.com/image?fit=cover&width=47&height=47&src=decocms/d7360620-575f-4cad-8435-5779f276ae1f/salesforce.png" },
  { name: "Google Sheets", src: "https://decoims.com/image?fit=cover&width=47&height=47&src=decocms/4174789c-1ef8-403d-b5dc-2d99592a748e/sheets.png" },
  { name: "Shopify", src: "https://decoims.com/image?fit=cover&width=47&height=47&src=decocms/b35fea07-219c-4519-b458-e2ef96a7fff8/shopify.png" },
  { name: "Slack", src: "https://decoims.com/image?fit=cover&width=47&height=47&src=decocms/2e3e1278-bac8-44f6-a853-80e9393bf9d8/slack.png" },
  { name: "Supabase", src: "https://decoims.com/image?fit=cover&width=47&height=47&src=decocms/a21762bc-50c7-46ac-9a4d-0676bc59aec2/supabse.png" },
  { name: "VTEX", src: "https://decoims.com/image?fit=cover&width=47&height=47&src=decocms/e185bcd8-4d51-432a-b9ca-63228ce8cd35/vtex.png" },
  { name: "Wake", src: "https://decoims.com/image?fit=cover&width=47&height=47&src=decocms/7d81057f-1728-4859-8d65-2fe4b811c1c1/wake.png" },
  { name: "WhatsApp", src: "https://decoims.com/image?fit=cover&width=47&height=47&src=decocms/4b02d3be-fb82-4da4-99cb-9ddc04961d6b/whatsapp.png" },
  { name: "Zendesk", src: "https://decoims.com/image?fit=cover&width=47&height=47&src=decocms/390f225c-4ff0-4274-ae4a-002b2e9d0007/zendesk.png" },
  { name: "VNDA", src: "https://decoims.com/image?fit=cover&width=47&height=47&src=decocms/fd8d290a-d54f-4470-9c09-59dcf143bd9a/vnda.png" },
];

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const row = [...icons, ...icons];
  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max gap-6 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
      >
        {row.map((icon, i) => (
          <div
            key={`${icon.name}-${i}`}
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-border bg-card"
          >
            <img src={icon.src} alt={icon.name} className="h-9 w-9 rounded-lg object-contain" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function IntegrationsMarquee() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-8">
        <MarqueeRow />
        <div className="py-6 text-center">
          <h2 className="mx-auto max-w-xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Connect to any platform or API with one click
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">No code. No friction.</p>
        </div>
        <MarqueeRow reverse />
      </div>
    </section>
  );
}
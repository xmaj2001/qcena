interface PageTitleProps {
  title: string;
  subtitle: string;
  eyebrow?: string;
  as?: "h1" | "h2";
}

export function PageTitle({
  title,
  subtitle,
  eyebrow,
  as: Heading = "h2",
}: PageTitleProps) {
  return (
    <section className="mx-auto mt-14 max-w-2xl text-center">
      {eyebrow && (
        <p className="eyebrow text-[0.58rem] text-muted-foreground">
          {eyebrow}
        </p>
      )}
      <Heading className="text-2xl md:text-3xl font-bold tracking-tight">
        {title}
      </Heading>
      <p className="mt-4 text-sm text-muted-foreground">{subtitle}</p>
    </section>
  );
}

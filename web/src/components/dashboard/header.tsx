interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  description: string;
  icon: React.ReactNode;
}

export function DashboardHeader({
  title,
  subtitle,
  description,
  icon,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          {icon}
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            {title}
          </span>
        </div>
        <h1 className="text-3xl font-display font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">
          {subtitle}
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          {description}
        </p>
      </div>
    </div>
  );
}

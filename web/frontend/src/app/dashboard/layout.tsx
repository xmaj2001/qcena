import { DashboardProvider } from "@/modules/dashboard/contexts/DashboardContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <div className="flex min-h-screen">
        <main className="flex-1 min-w-0 overflow-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </DashboardProvider>
  );
}

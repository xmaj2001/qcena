import { Sidebar } from "@/modules/dashboard/components/Sidebar";
import { DashboardProvider } from "@/modules/dashboard/contexts/DashboardContext";
import { SidebarProvider } from "@/modules/dashboard/contexts/SidebarContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardProvider>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <div
            className={`fixed inset-y-0 left-0 z-50 transform transition-transform lg:relative lg:translate-x-0  ${
              false ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Sidebar />
          </div>
          <main className="flex-1 min-w-0 overflow-auto">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </DashboardProvider>
    </SidebarProvider>
  );
}

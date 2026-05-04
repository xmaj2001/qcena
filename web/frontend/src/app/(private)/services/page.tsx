import { Suspense } from "react";
import { ListServices } from "@/modules/services/components/list-services";
import { getServices } from "@/modules/services/features/get-services.feat";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <Suspense fallback={<div>Loading services...</div>}>
      <div className="flex flex-col gap-4">
        <h1>Services</h1>
        <ListServices services={services} />
      </div>
    </Suspense>
  );
}

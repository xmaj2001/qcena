import { PlaceView } from "@/modules/places/components/place-view";
import { getServices } from "@/modules/services/features/get-services.feat";

export default async function PlacesPage() {
  const services = await getServices();

  return <PlaceView services={services} />;
}

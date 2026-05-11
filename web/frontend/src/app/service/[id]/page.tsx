import { Gallery } from "@/modules/services/components/gallery";
import { RelatedServices } from "@/modules/services/components/RelatedServices";
import { ServiceDescription } from "@/modules/services/components/service-description";
import { ServiceNavbar } from "@/modules/services/components/service-navbar";
import { getService } from "@/modules/services/features/get-service.feat";
import { ImageService } from "@/modules/services/types/service.type";
import { Suspense } from "react";

interface ServicePageProps {
  params: Promise<{ id: string }>;
}
export default async function ServicePage({ params }: ServicePageProps) {
  const { id } = await params;
  const service = await getService(id);

  if (!service) return <div>Service not found</div>;
  return (
    <div className="min-h-screen text-white relative pt-20" id="place">
      <ServiceNavbar />
      <div className="mx-auto max-w-(--breakpoint-2xl) px-4">
        <div className="flex flex-col rounded-lg  bg-white p-8 md:p-12 lg:flex-row lg:gap-8  dark:bg-black">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
              }
            >
              <Gallery
                images={service.images
                  .slice(0, 5)
                  .map((image: ImageService) => ({
                    src: image.src,
                    altText: image.altText,
                  }))}
              />
            </Suspense>
          </div>

          <div className="basis-full lg:basis-2/6">
            <Suspense fallback={null}>
              <ServiceDescription service={service} />
            </Suspense>
          </div>
        </div>
        <RelatedServices id={service.id} />
      </div>
    </div>
  );
}

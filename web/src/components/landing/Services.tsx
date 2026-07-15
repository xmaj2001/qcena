const projects = [
  {
    name: "Farm",
    category: "Fashion",
    image: "https://decoims.com/image?fit=cover&width=398&height=300&src=decocms/da136f96-12f5-449a-b722-5934864df95b/farm.png",
    url: "https://www.farmrio.com.br/",
  },
  {
    name: "Leroy Merlin",
    category: "Home & Decor",
    image: "https://decoims.com/image?fit=cover&width=398&height=300&src=decocms/696b2bce-3661-4256-8861-2a4d28afc9e9/Screenshot-2025-09-24-at-08.35.43.png",
    url: "https://catalogo.leroymerlin.com.br/",
  },
  {
    name: "Granado",
    category: "Health & Beauty",
    image: "https://decoims.com/image?fit=cover&width=398&height=300&src=starting/a72e5bf8-b496-4725-a9a1-41b9bd1fd6ba/1742491443829-588bf673-056e-4fb6-a8a2-74fb1448a6c2",
    url: "https://www.granado.com.br/",
  },
  {
    name: "Osklen",
    category: "Fashion",
    image: "https://decoims.com/image?fit=cover&width=398&height=300&src=starting/af90e4bc-2643-4aab-9b28-c3acf79129fc/1742491365896-539348b2-dadf-4b89-9dc2-8014b27d2d5b",
    url: "https://www.osklen.com.br/",
  },
  {
    name: "Stone",
    category: "Finance",
    image: "https://decoims.com/image?fit=cover&width=398&height=300&src=decocms/e8a3e3fc-c85d-42ac-872f-39aa96f71384/Screenshot-2025-09-24-at-08.29.18.png",
    url: "https://campanha.stone.com.br/maquina-de-cartao",
  },
  {
    name: "Fila",
    category: "Sports",
    image: "https://decoims.com/image?fit=cover&width=398&height=300&src=decocms/90980e9f-7c8d-427c-95f9-f635d7e22d21/Screenshot-2025-09-24-at-08.08.00.png",
    url: "https://fila.com.br/",
  },
  {
    name: "Casa & Video",
    category: "Home & Decor",
    image: "https://decoims.com/image?fit=cover&width=398&height=300&src=starting/83d24bed-eef3-4feb-9275-da04c5d67b56/1742491500915-e08a837c-d64e-432b-a52d-ef38df7477ff",
    url: "https://www.casaevideo.com.br/",
  },
  {
    name: "Zee.Dog",
    category: "Pet",
    image: "https://decoims.com/image?fit=cover&width=398&height=300&src=starting/aecff0cc-987e-41f6-8299-d38d9d825652/1742491542115-a686b801-d7e0-4df1-87d3-c4c996118880",
    url: "https://www.zeedog.com.br/",
  },
];

export function Services() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-8">
      <h2 className="text-center text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        deco.cx live projects
      </h2>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
          >
            <div className="overflow-hidden">
              <img
                src={project.image}
                alt={project.name}
                className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="font-semibold text-foreground">{project.name}</span>
              <span className="text-xs text-muted-foreground">{project.category}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
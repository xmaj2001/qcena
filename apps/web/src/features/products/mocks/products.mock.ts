import { faker } from "@faker-js/faker";
import type {
  APIProductDetails,
  FeaturedProduct,
  FeaturedProductsResponse,
  GetProductsParams,
  NewProductsResponse,
  Product,
  ProductDetailsResponse,
  ProductSearchResponse,
  ProductsPageResponse,
} from "../types";

const MOCK_TIMESTAMP = "2026-11-05T00:00:00.000Z";

// Resoluções dos banners de destaque
const BANNER_DESKTOP_SIZE = { width: 2000, height: 940 };
const BANNER_MOBILE_SIZE = { width: 800, height: 2000 };

/**
 * Gera uma imagem placeholder (SVG em data URI) sem depender de rede.
 * O next/image não otimiza data URIs, por isso carrega sempre.
 */
function mockImage(options: {
  width: number;
  height: number;
  seed: number;
  label: string;
}): string {
  const { width, height, seed, label } = options;
  const hue = (seed * 47) % 360;
  const fontSize = Math.round(Math.min(width, height) / 12);

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="hsl(${hue},55%,38%)"/>` +
    `<stop offset="1" stop-color="hsl(${(hue + 50) % 360},60%,22%)"/>` +
    `</linearGradient></defs>` +
    `<rect width="100%" height="100%" fill="url(#g)"/>` +
    `<text x="50%" y="50%" fill="rgba(255,255,255,0.75)" font-family="sans-serif" ` +
    `font-size="${fontSize}" text-anchor="middle" dominant-baseline="middle">${label}</text>` +
    `</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function generateMockProducts(count = 24): Product[] {
  // Deterministic seed
  faker.seed(42);

  return Array.from({ length: count }, (_, index) => {
    const priceNum = Number.parseFloat(
      faker.commerce.price({ min: 10, max: 250, dec: 2 }),
    );
    const name = faker.commerce.productName();

    return {
      id: `prod-${index + 1}`,
      slug: `${faker.helpers.slugify(name).toLowerCase()}-${index + 1}`,
      name,
      description: faker.commerce.productDescription(),
      price: `${priceNum} Kz`,
      image: mockImage({
        width: 600,
        height: 400,
        seed: index + 1,
        label: `Produto ${index + 1}`,
      }),
    };
  });
}

export function getMockNewProducts(): NewProductsResponse {
  const products = generateMockProducts(16);
  return {
    success: true,
    data: products,
    ts: MOCK_TIMESTAMP,
  };
}

export function getMockPaginatedProducts(
  params: GetProductsParams,
): ProductsPageResponse {
  let allProducts = generateMockProducts(1024);

  if (params.q) {
    const q = params.q.toLowerCase();
    allProducts = allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }

  const limit = params.limit ? Math.max(1, Number(params.limit)) : 8;

  let startIndex = 0;
  if (params.cursor) {
    const cursorIndex = allProducts.findIndex((p) => p.id === params.cursor);
    if (cursorIndex !== -1) {
      startIndex = cursorIndex + 1;
    }
  }

  const items = allProducts.slice(startIndex, startIndex + limit);
  const hasMore = startIndex + limit < allProducts.length;
  const nextCursor = hasMore ? (items[items.length - 1]?.id ?? null) : null;

  return {
    success: true,
    data: {
      items,
      nextCursor,
      nextCursorPublishedAt: null,
    },
    ts: MOCK_TIMESTAMP,
  };
}

export function getMockFeaturedProducts(): FeaturedProductsResponse {
  const baseProducts = generateMockProducts(4);

  const featuredProducts: FeaturedProduct[] = baseProducts.map((p, idx) => ({
    id: `feat-${idx + 1}`,
    title: `Destaque Especial #${idx + 1}`,
    subtitle: "Oportunidade Limitada",
    description: p.description,
    banner: {
      desktop: mockImage({
        ...BANNER_DESKTOP_SIZE,
        seed: idx + 1,
        label: `Banner desktop ${idx + 1} · ${BANNER_DESKTOP_SIZE.width}x${BANNER_DESKTOP_SIZE.height}`,
      }),
      mobile: mockImage({
        ...BANNER_MOBILE_SIZE,
        seed: idx + 1,
        label: `Banner mobile ${idx + 1} · ${BANNER_MOBILE_SIZE.width}x${BANNER_MOBILE_SIZE.height}`,
      }),
    },
    textColor: "light",
    aspectRatio: BANNER_DESKTOP_SIZE.width / BANNER_DESKTOP_SIZE.height,
    specifications: [
      { key: "Preço Base", value: p.price },
      { key: "Garantia", value: "Oficial da Marca" },
    ],
    product: p,
  }));

  return {
    success: true,
    data: featuredProducts,
    ts: MOCK_TIMESTAMP,
  };
}

export function getMockSearchProducts(
  query: string,
  limit = 8,
): ProductSearchResponse {
  const allProducts = generateMockProducts(24);
  const q = query.toLowerCase();
  const filtered = allProducts
    .filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    )
    .slice(0, limit);

  return {
    success: true,
    data: filtered,
    ts: MOCK_TIMESTAMP,
  };
}

export function getMockProductBySlug(slug: string): ProductDetailsResponse {
  const allProducts = generateMockProducts(24);
  const found = allProducts.find((p) => p.slug === slug) ?? allProducts[0];
  const foundSeed = Number.parseInt(found.id.replace("prod-", ""), 10);

  const mockSpecs: { label: string; value: string }[] = [
    { label: "Garantia", value: "1 Ano pelo Fabricante" },
    { label: "Disponibilidade", value: "Em Stock" },
    { label: "Envio", value: "Para toda Luanda e Províncias" },
    { label: "Condição", value: "Novo e Original" },
  ];

  const mockImages = [
    found.image,
    mockImage({
      width: 800,
      height: 800,
      seed: foundSeed + 100,
      label: `${found.name} · 2`,
    }),
    mockImage({
      width: 800,
      height: 800,
      seed: foundSeed + 200,
      label: `${found.name} · 3`,
    }),
  ];

  const productDetails: APIProductDetails = {
    id: found.id,
    slug: found.slug,
    name: found.name,
    description: found.description,
    price: found.price,
    rating: 4.8,
    reviews: 124,
    stock: 15,
    images: mockImages,
    category: "Eletrónicos & Utilidades",
    specs: mockSpecs,
  };

  return {
    success: true,
    data: productDetails,
    ts: MOCK_TIMESTAMP,
  };
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
  stock: number;
  tags: string[];
  featured?: boolean;
  new?: boolean;
}

export const categories = [
  { id: "all", label: "Todo" },
  { id: "pomadas", label: "Pomadas" },
  { id: "ceras", label: "Ceras" },
  { id: "shampoos", label: "Shampoos" },
  { id: "aceites", label: "Aceites de barba" },
  { id: "maquinas", label: "Máquinas" },
  { id: "peines", label: "Peines & Accesorios" },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Pomada Mate Premium",
    slug: "pomada-mate-premium",
    brand: "Uppercut Deluxe",
    description: "Fijación fuerte, acabado mate. Para estilos definidos sin brillo.",
    longDescription: "La pomada más solicitada de nuestros barberos. Fórmula de fijación extrema con acabado mate natural. Ideal para quiffs, pompadours y estilos modernos. Base de agua, fácil de lavar.",
    price: 65000,
    originalPrice: 78000,
    imageUrl: "/images/products/pomada.svg",
    images: ["/images/products/pomada.svg"],
    category: "pomadas",
    rating: 4.9,
    reviews: 124,
    stock: 48,
    tags: ["fijación fuerte", "mate", "hombre"],
    featured: true,
  },
  {
    id: "2",
    name: "Pomada Brillante Clásica",
    slug: "pomada-brillante-clasica",
    brand: "Suavecito",
    description: "Fijación media, brillo espejo. El clásico de los barberos.",
    longDescription: "Pomada de base de agua con acabado brillante de alto impacto. Perfect para el look vintage y rockabilly. Fijación media que permite repeinarse durante el día.",
    price: 55000,
    imageUrl: "/images/products/pomada.svg",
    images: ["/images/products/pomada.svg"],
    category: "pomadas",
    rating: 4.8,
    reviews: 89,
    stock: 32,
    tags: ["brillante", "clásica", "vintage"],
  },
  {
    id: "3",
    name: "Cera Texturizante",
    slug: "cera-texturizante",
    brand: "American Crew",
    description: "Textura y movimiento natural. Para looks despeinados perfectos.",
    longDescription: "Cera de acabado natural con fijación media. Aporta textura y movimiento sin apelmazar el cabello. Ideal para looks casuales y estilos con textura.",
    price: 72000,
    imageUrl: "/images/products/pomada.svg",
    images: ["/images/products/pomada.svg"],
    category: "ceras",
    rating: 4.7,
    reviews: 67,
    stock: 25,
    tags: ["textura", "natural", "movimiento"],
    new: true,
  },
  {
    id: "4",
    name: "Shampoo Anticaída",
    slug: "shampoo-anticaida",
    brand: "Kerastase",
    description: "Fortalece el cabello desde la raíz. Uso diario sin sulfatos.",
    longDescription: "Shampoo sin sulfatos enriquecido con biotina y keratina. Fortalece el cabello debilitado, reduce la caída y estimula el crecimiento. Para uso diario.",
    price: 89000,
    originalPrice: 110000,
    imageUrl: "/images/products/shampoo.svg",
    images: ["/images/products/shampoo.svg"],
    category: "shampoos",
    rating: 4.9,
    reviews: 201,
    stock: 60,
    tags: ["anticaída", "sin sulfatos", "biotina"],
    featured: true,
  },
  {
    id: "5",
    name: "Shampoo para Barba",
    slug: "shampoo-barba",
    brand: "Beardhood",
    description: "Limpieza profunda para barba sin resecar. Aroma a cedro.",
    longDescription: "Shampoo especializado para barba y bigote. Limpia en profundidad sin eliminar los aceites naturales. Con extracto de cedro y aloe vera para suavizar el vello facial.",
    price: 45000,
    imageUrl: "/images/products/shampoo.svg",
    images: ["/images/products/shampoo.svg"],
    category: "shampoos",
    rating: 4.6,
    reviews: 54,
    stock: 40,
    tags: ["barba", "limpieza", "cedro"],
  },
  {
    id: "6",
    name: "Aceite de Barba Premium",
    slug: "aceite-barba-premium",
    brand: "Jack Black",
    description: "Hidrata, suaviza y perfuma tu barba. Mezcla de 7 aceites naturales.",
    longDescription: "Blend exclusivo de 7 aceites premium: argán, jojoba, vitamina E, cedro, bergamota, sándalo y vetiver. Hidrata la barba y la piel del rostro, elimina el picor y aporta brillo natural.",
    price: 98000,
    imageUrl: "/images/products/aceite-barba.svg",
    images: ["/images/products/aceite-barba.svg"],
    category: "aceites",
    rating: 5.0,
    reviews: 178,
    stock: 20,
    tags: ["aceite", "hidratante", "7 aceites"],
    featured: true,
    new: true,
  },
  {
    id: "7",
    name: "Aceite Nutritivo Capilar",
    slug: "aceite-nutritivo-capilar",
    brand: "Moroccanoil",
    description: "Tratamiento de argán para un cabello brillante y sin frizz.",
    longDescription: "El aceite de tratamiento más vendido del mundo. Enriquecido con aceite de argán marroquí, vitaminas A, C y E. Elimina el frizz, aporta brillo y facilita el peinado.",
    price: 115000,
    originalPrice: 138000,
    imageUrl: "/images/products/aceite-barba.svg",
    images: ["/images/products/aceite-barba.svg"],
    category: "aceites",
    rating: 4.9,
    reviews: 312,
    stock: 15,
    tags: ["argán", "brillo", "frizz"],
  },
  {
    id: "8",
    name: "Máquina Corte Profesional",
    slug: "maquina-corte-profesional",
    brand: "Wahl",
    description: "Motor de alta velocidad, cuchillas de acero inoxidable. Uso profesional.",
    longDescription: "La máquina favorita de los barberos profesionales. Motor electromagnético de alta velocidad para cortes precisos y uniformes. Incluye 8 peines guía, aceite y estuche.",
    price: 320000,
    imageUrl: "/images/products/peine.svg",
    images: ["/images/products/peine.svg"],
    category: "maquinas",
    rating: 4.8,
    reviews: 95,
    stock: 8,
    tags: ["profesional", "wahl", "corte"],
    featured: true,
  },
  {
    id: "9",
    name: "Afeitadora Eléctrica Premium",
    slug: "afeitadora-electrica-premium",
    brand: "Braun",
    description: "Afeitado al ras, piel sin irritación. Recargable USB-C.",
    longDescription: "Afeitadora de láminas con tecnología AutoSense. Detecta la densidad del vello y ajusta la potencia automáticamente. Cabezal flexible 360°, apta para uso en húmedo y seco.",
    price: 285000,
    imageUrl: "/images/products/peine.svg",
    images: ["/images/products/peine.svg"],
    category: "maquinas",
    rating: 4.7,
    reviews: 78,
    stock: 12,
    tags: ["afeitadora", "eléctrica", "braun"],
  },
  {
    id: "10",
    name: "Peine Kent de Concha",
    slug: "peine-kent-concha",
    brand: "Kent",
    description: "Peine artesanal inglés desde 1777. Antistático, para todo tipo de cabello.",
    longDescription: "Fabricado a mano en Inglaterra con vulcanita de alta calidad. Dientes pulidos a mano para no dañar el cuero cabelludo. Antistático, no absorbe bacterias.",
    price: 48000,
    imageUrl: "/images/products/peine.svg",
    images: ["/images/products/peine.svg"],
    category: "peines",
    rating: 4.9,
    reviews: 143,
    stock: 35,
    tags: ["peine", "kent", "artesanal"],
  },
  {
    id: "11",
    name: "Kit Completo Barbería",
    slug: "kit-completo-barberia",
    brand: "Barber Shop Pro",
    description: "Todo lo que necesitas: pomada + aceite de barba + shampoo + peine.",
    longDescription: "El kit más completo para el hombre que cuida su imagen. Incluye pomada mate premium, aceite de barba de 7 aceites, shampoo anticaída y peine Kent. Presentación en caja premium, ideal como regalo.",
    price: 220000,
    originalPrice: 308000,
    imageUrl: "/images/products/kit-completo.svg",
    images: ["/images/products/kit-completo.svg"],
    category: "peines",
    rating: 5.0,
    reviews: 58,
    stock: 18,
    tags: ["kit", "regalo", "completo"],
    featured: true,
    new: true,
  },
  {
    id: "12",
    name: "Bálsamo Acondicionador Barba",
    slug: "balsamo-acondicionador-barba",
    brand: "The Ordinary",
    description: "Acondiciona y suaviza la barba más rebelde. Fórmula vegana.",
    longDescription: "Bálsamo acondicionador de uso diario para barba y bigote. Fórmula vegana con manteca de karité, aceite de coco y pantenol. Suaviza, hidrata y facilita el peinado del vello facial.",
    price: 52000,
    imageUrl: "/images/products/aceite-barba.svg",
    images: ["/images/products/aceite-barba.svg"],
    category: "aceites",
    rating: 4.6,
    reviews: 41,
    stock: 28,
    tags: ["bálsamo", "vegano", "barba"],
  },
];

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

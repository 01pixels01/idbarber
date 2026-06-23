import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { config } from "dotenv";

config({ path: ".env.local" });

const pool = new Pool({
  connectionString: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Servicios — IDs deben coincidir con components/booking/StepService.tsx
const services = [
  { id: "1", name: "Corte Clásico", description: "Tijera + navaja para un acabado preciso.", price: 25000, duration: 30, category: "Corte" },
  { id: "2", name: "Fade Premium", description: "Degradado skin-to-skin impecable.", price: 35000, duration: 45, category: "Corte" },
  { id: "3", name: "Barba Completa", description: "Perfilado con navaja recta y vapor.", price: 20000, duration: 30, category: "Barba" },
  { id: "4", name: "Corte + Barba", description: "El combo perfecto para verte top.", price: 50000, duration: 60, category: "Combo" },
  { id: "5", name: "Diseño de Cejas", description: "Depilación y diseño de precisión.", price: 15000, duration: 20, category: "Detalle" },
  { id: "6", name: "Limpieza Facial", description: "Tratamiento profundo revitalizante.", price: 45000, duration: 45, category: "Facial" },
  { id: "7", name: "Tratamiento Capilar", description: "Hidratación y nutrición profunda.", price: 55000, duration: 60, category: "Capilar" },
  { id: "8", name: "Experiencia VIP", description: "Corte + barba + cejas + limpieza + bebida.", price: 120000, duration: 120, category: "VIP" },
];

// Barberos — IDs deben coincidir con components/booking/StepBarber.tsx
const barbers = [
  { id: "0", name: "Sin preferencia", email: "pool@idbarber.co", bio: "Asignamos el barbero disponible más pronto.", specialties: ["General"], experience: 0 },
  { id: "1", name: "Jair Cortes", email: "jair@idbarber.co", bio: "Master Barber especialista en fades y cortes clásicos.", specialties: ["Fade", "Clásico"], experience: 12 },
  { id: "2", name: "Ricardo Cortes", email: "ricardo@idbarber.co", bio: "Senior Barber experto en perfilado de barba y cejas.", specialties: ["Barba", "Cejas"], experience: 12 },
  { id: "3", name: "Alberto Cortes", email: "alberto@idbarber.co", bio: "Master Barber con 30 años de trayectoria, fades y diseños.", specialties: ["Fade", "Diseños"], experience: 30 },
  { id: "4", name: "Miguel Rodriguez", email: "miguel@idbarber.co", bio: "Barber Pro con experiencia en clásicos y experiencia VIP.", specialties: ["Clásico", "VIP"], experience: 10 },
];

// Productos — IDs deben coincidir con lib/products.ts
const products = [
  { id: "1", name: "Pomada Mate Premium", slug: "pomada-mate-premium", brand: "Uppercut Deluxe", price: 65000, category: "pomadas", stock: 48 },
  { id: "2", name: "Pomada Brillante Clásica", slug: "pomada-brillante-clasica", brand: "Suavecito", price: 55000, category: "pomadas", stock: 32 },
  { id: "3", name: "Cera Texturizante", slug: "cera-texturizante", brand: "American Crew", price: 72000, category: "ceras", stock: 25 },
  { id: "4", name: "Shampoo Anticaída", slug: "shampoo-anticaida", brand: "Kerastase", price: 89000, category: "shampoos", stock: 60 },
  { id: "5", name: "Shampoo para Barba", slug: "shampoo-barba", brand: "Beardhood", price: 45000, category: "shampoos", stock: 40 },
  { id: "6", name: "Aceite de Barba Premium", slug: "aceite-barba-premium", brand: "Jack Black", price: 98000, category: "aceites", stock: 20 },
  { id: "7", name: "Aceite Nutritivo Capilar", slug: "aceite-nutritivo-capilar", brand: "Moroccanoil", price: 115000, category: "aceites", stock: 15 },
  { id: "8", name: "Máquina Corte Profesional", slug: "maquina-corte-profesional", brand: "Wahl", price: 320000, category: "maquinas", stock: 8 },
  { id: "9", name: "Afeitadora Eléctrica Premium", slug: "afeitadora-electrica-premium", brand: "Braun", price: 285000, category: "maquinas", stock: 12 },
  { id: "10", name: "Peine Kent de Concha", slug: "peine-kent-concha", brand: "Kent", price: 48000, category: "peines", stock: 35 },
  { id: "11", name: "Kit Completo Barbería", slug: "kit-completo-barberia", brand: "IDBARBER Pro", price: 220000, category: "peines", stock: 18 },
  { id: "12", name: "Bálsamo Acondicionador Barba", slug: "balsamo-acondicionador-barba", brand: "The Ordinary", price: 52000, category: "aceites", stock: 28 },
];

async function main() {
  console.log("🌱 Sembrando base de datos IDBARBER...");

  // Servicios
  for (const s of services) {
    await prisma.service.upsert({
      where: { id: s.id },
      update: { name: s.name, description: s.description, price: s.price, duration: s.duration, category: s.category },
      create: { ...s, isActive: true },
    });
  }
  console.log(`✅ ${services.length} servicios`);

  // Barberos (Usuario + BarberProfile)
  for (const b of barbers) {
    const user = await prisma.user.upsert({
      where: { id: b.id },
      update: { name: b.name, email: b.email },
      create: {
        id: b.id,
        clerkId: `barber_${b.id}`,
        email: b.email,
        name: b.name,
        role: "BARBER",
      },
    });
    if (b.id !== "0") {
      await prisma.barberProfile.upsert({
        where: { userId: user.id },
        update: { bio: b.bio, specialties: b.specialties, experience: b.experience },
        create: {
          userId: user.id,
          bio: b.bio,
          specialties: b.specialties,
          experience: b.experience,
          isActive: true,
          workDays: [1, 2, 3, 4, 5, 6],
          workStart: "08:00",
          workEnd: "20:00",
          slotDuration: 30,
        },
      });
    }
  }
  console.log(`✅ ${barbers.length} barberos`);

  // Productos
  for (const p of products) {
    await prisma.product.upsert({
      where: { id: p.id },
      update: { name: p.name, price: p.price, stock: p.stock, brand: p.brand, category: p.category },
      create: {
        id: p.id,
        name: p.name,
        slug: p.slug,
        brand: p.brand,
        price: p.price,
        category: p.category,
        stock: p.stock,
        sku: `SKU-${p.id.padStart(3, "0")}`,
        isActive: true,
        images: [],
      },
    });
  }
  console.log(`✅ ${products.length} productos`);

  console.log("🎉 Seed completado.");
}

main()
  .then(async () => {
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await pool.end();
    process.exit(1);
  });

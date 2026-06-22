import { defineConfig } from "prisma/config";
import { config } from "dotenv";

// Prisma CLI lee .env por defecto; cargamos .env.local explícitamente
config({ path: ".env.local" });

// Migraciones/seed usan el session pooler (DIRECT_URL); runtime usa el transaction pooler
const migrationUrl = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: migrationUrl!,
  },
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
});

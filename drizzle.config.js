import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: './utils/schema.tsx',
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_vehS30UABGkP@ep-wandering-sun-a542o77i-pooler.us-east-2.aws.neon.tech/AI-Content-Generator%F0%9F%94%A5%F0%9F%94%A5?sslmode=require',
  },
});
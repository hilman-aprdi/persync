import pg from "pg";
import { env } from "../config/env.js";

const { Pool } = pg;

export const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl: env.appEnv === "production" ? { rejectUnauthorized: false } : false,
});

export const checkDatabaseConnection = async () => {
  await pool.query("SELECT 1");
};

export const ensureDatabase = async () => {
  await pool.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto;`);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      google_id TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      full_name TEXT NOT NULL,
      avatar_url TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS business_direction_sessions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id) ON DELETE SET NULL,
      guest_id TEXT,
      current_situation TEXT NOT NULL,
      main_goal TEXT NOT NULL,
      biggest_fear TEXT NOT NULL,
      skills_interests JSONB NOT NULL DEFAULT '[]'::jsonb,
      capital_range TEXT NOT NULL,
      time_availability TEXT NOT NULL,
      comfortable_business_type TEXT NOT NULL,
      energy_mental_state TEXT NOT NULL,
      additional_context TEXT NOT NULL DEFAULT '',
      result JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS business_sessions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id) ON DELETE SET NULL,
      guest_id TEXT,
      input_snapshot JSONB NOT NULL DEFAULT '{}'::jsonb,
      ai_analysis JSONB NOT NULL DEFAULT '{}'::jsonb,
      main_business_direction TEXT NOT NULL,
      business_type TEXT NOT NULL DEFAULT '',
      difficulty_level TEXT NOT NULL DEFAULT '',
      capital_level TEXT NOT NULL DEFAULT '',
      generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      market_focus TEXT NOT NULL DEFAULT '',
      business_category TEXT NOT NULL DEFAULT '',
      progress_status TEXT NOT NULL DEFAULT 'generated',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS business_swot (
      session_id UUID PRIMARY KEY REFERENCES business_sessions(id) ON DELETE CASCADE,
      strength TEXT NOT NULL DEFAULT '',
      weakness TEXT NOT NULL DEFAULT '',
      opportunity TEXT NOT NULL DEFAULT '',
      threat TEXT NOT NULL DEFAULT ''
    );
  `);
  await pool.query(`
    ALTER TABLE business_direction_sessions
    ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES users(id) ON DELETE SET NULL;
  `);
  await pool.query(`
    ALTER TABLE business_direction_sessions
    ADD COLUMN IF NOT EXISTS guest_id TEXT;
  `);
  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_business_direction_sessions_user_created
    ON business_direction_sessions (user_id, created_at DESC);
  `);
  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_business_direction_sessions_guest_created
    ON business_direction_sessions (guest_id, created_at DESC);
  `);
  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_business_sessions_user_generated
    ON business_sessions (user_id, generated_at DESC);
  `);
  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_business_sessions_guest_generated
    ON business_sessions (guest_id, generated_at DESC);
  `);
};

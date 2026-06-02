import { pool } from "./pool.js";

const mapUser = (row) => ({
  id: row.id,
  fullName: row.full_name,
  email: row.email,
  avatar: row.avatar_url,
  avatarUrl: row.avatar_url,
  googleId: row.google_id,
  createdAt: row.created_at,
});

export const findUserById = async (id) => {
  const { rows } = await pool.query(
    `
      SELECT *
      FROM users
      WHERE id = $1
      LIMIT 1
    `,
    [id],
  );

  return rows[0] ? mapUser(rows[0]) : null;
};

export const findOrCreateGoogleUser = async ({ googleId, email, fullName, avatar }) => {
  const { rows } = await pool.query(
    `
      INSERT INTO users (google_id, email, full_name, avatar_url)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (google_id)
      DO UPDATE SET
        email = EXCLUDED.email,
        full_name = EXCLUDED.full_name,
        avatar_url = EXCLUDED.avatar_url
      RETURNING *
    `,
    [googleId, email, fullName, avatar],
  );

  return mapUser(rows[0]);
};

export const countGuestSessions = async (guestId) => {
  const { rows } = await pool.query(
    `
      SELECT (
        (SELECT COUNT(*) FROM business_direction_sessions WHERE guest_id = $1) +
        (SELECT COUNT(*) FROM business_sessions WHERE guest_id = $1)
      )::int AS total
    `,
    [guestId],
  );

  return rows[0]?.total || 0;
};

export const countUserSessionsToday = async (userId) => {
  const { rows } = await pool.query(
    `
      SELECT (
        (
          SELECT COUNT(*)
          FROM business_direction_sessions
          WHERE user_id = $1
            AND created_at >= date_trunc('day', NOW())
            AND created_at < date_trunc('day', NOW()) + interval '1 day'
        ) +
        (
          SELECT COUNT(*)
          FROM business_sessions
          WHERE user_id = $1
            AND generated_at >= date_trunc('day', NOW())
            AND generated_at < date_trunc('day', NOW()) + interval '1 day'
        )
      )::int AS total
    `,
    [userId],
  );

  return rows[0]?.total || 0;
};

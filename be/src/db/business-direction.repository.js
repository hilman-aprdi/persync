import { pool } from "./pool.js";

const emptyBusinessResult = {
  mainBusinessDirection: "",
  businessSummary: "",
  whyThisFits: [],
  swotAnalysis: {
    strength: "",
    weakness: "",
    opportunity: "",
    threat: "",
  },
  firstMoneyPath: "",
  firstSteps: [],
  realisticValidation: "",
  difficultyLevel: "",
  capitalLevel: "",
  timeToFirstResult: "",
  businessType: "",
  longTermPotential: "",
  alternativeBusinessIdeas: [],
  marketInsight: "",
  warningRisk: "",
  executionFocus: "",
};

const normalizeResult = (result = {}) => {
  if (result.mainBusinessDirection) {
    return {
      ...emptyBusinessResult,
      ...result,
      swotAnalysis: {
        ...emptyBusinessResult.swotAnalysis,
        ...(result.swotAnalysis || {}),
      },
    };
  }

  const mainBusinessDirection = result.microBusinessIdea || result.businessDirection || "";
  const firstSteps = result.firstTinySteps || result.firstActionPlan || [];

  return {
    ...emptyBusinessResult,
    mainBusinessDirection,
    businessSummary: result.whyThisFitsYou || result.reasonWhyFit || "",
    whyThisFits: [result.whyThisFitsYou || result.reasonWhyFit || ""].filter(Boolean),
    firstMoneyPath: result.firstMoneyPath || result.quickWin || "",
    firstSteps: Array.isArray(firstSteps) ? firstSteps : [],
    realisticValidation: result.validationPlan || "",
    businessType: result.comfortableBusinessType || "Bisnis mikro",
    marketInsight: result.marketReality || result.marketOpportunity || "",
    warningRisk: result.psychologyReality || result.psychologyInsight || "",
    executionFocus: result.quickStart || "",
  };
};

const mapNewSession = (row) => {
  const input = row.input_snapshot || {};

  return {
    id: row.id,
    userId: row.user_id,
    guestId: row.guest_id,
    ...input,
    result: normalizeResult(row.ai_analysis),
    generatedAt: row.generated_at,
    marketFocus: row.market_focus,
    businessCategory: row.business_category,
    progressStatus: row.progress_status,
    createdAt: row.created_at,
  };
};

const mapLegacySession = (row) => ({
  id: row.id,
  userId: row.user_id,
  guestId: row.guest_id,
  currentSituation: row.current_situation,
  mainGoal: row.main_goal,
  biggestFear: row.biggest_fear,
  skillsInterests: row.skills_interests,
  capitalRange: row.capital_range,
  timeAvailability: row.time_availability,
  comfortableBusinessType: row.comfortable_business_type,
  energyMentalState: row.energy_mental_state,
  additionalContext: row.additional_context,
  result: normalizeResult(row.result),
  createdAt: row.created_at,
});

const buildActorFilter = ({ userId, guestId }, startIndex = 1) => {
  if (userId) {
    return { clause: `user_id = $${startIndex}`, value: userId };
  }

  if (guestId) {
    return { clause: `guest_id = $${startIndex}`, value: guestId };
  }

  return null;
};

export const insertBusinessDirectionSession = async (input, result, actor = {}) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const { rows } = await client.query(
      `
        INSERT INTO business_sessions (
          user_id,
          guest_id,
          input_snapshot,
          ai_analysis,
          main_business_direction,
          business_type,
          difficulty_level,
          capital_level,
          market_focus,
          business_category
        )
        VALUES ($1, $2, $3::jsonb, $4::jsonb, $5, $6, $7, $8, $9, $10)
        RETURNING *
      `,
      [
        actor.userId || null,
        actor.guestId || null,
        JSON.stringify(input),
        JSON.stringify(result),
        result.mainBusinessDirection,
        result.businessType,
        result.difficultyLevel,
        result.capitalLevel,
        result.marketInsight,
        result.businessType,
      ],
    );

    await client.query(
      `
        INSERT INTO business_swot (session_id, strength, weakness, opportunity, threat)
        VALUES ($1, $2, $3, $4, $5)
      `,
      [
        rows[0].id,
        result.swotAnalysis.strength,
        result.swotAnalysis.weakness,
        result.swotAnalysis.opportunity,
        result.swotAnalysis.threat,
      ],
    );

    await client.query("COMMIT");
    return mapNewSession(rows[0]);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const listBusinessDirectionSessions = async ({ limit = 12, userId = null, guestId = null }) => {
  const actorFilter = buildActorFilter({ userId, guestId }, 1);
  if (!actorFilter) {
    return [];
  }

  const [current, legacy] = await Promise.all([
    pool.query(
      `
        SELECT *
        FROM business_sessions
        WHERE ${actorFilter.clause}
        ORDER BY generated_at DESC
        LIMIT $2
      `,
      [actorFilter.value, limit],
    ),
    pool.query(
      `
        SELECT *
        FROM business_direction_sessions
        WHERE ${actorFilter.clause}
        ORDER BY created_at DESC
        LIMIT $2
      `,
      [actorFilter.value, limit],
    ),
  ]);

  return [...current.rows.map(mapNewSession), ...legacy.rows.map(mapLegacySession)]
    .sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt))
    .slice(0, limit);
};

export const findBusinessDirectionSessionById = async ({ id, userId = null, guestId = null }) => {
  const actorFilter = buildActorFilter({ userId, guestId }, 2);
  if (!actorFilter) {
    return null;
  }

  const current = await pool.query(
    `
      SELECT *
      FROM business_sessions
      WHERE id = $1 AND ${actorFilter.clause}
      LIMIT 1
    `,
    [id, actorFilter.value],
  );

  if (current.rows[0]) {
    return mapNewSession(current.rows[0]);
  }

  const legacy = await pool.query(
    `
      SELECT *
      FROM business_direction_sessions
      WHERE id = $1 AND ${actorFilter.clause}
      LIMIT 1
    `,
    [id, actorFilter.value],
  );

  return legacy.rows[0] ? mapLegacySession(legacy.rows[0]) : null;
};

export const deleteBusinessDirectionSessionById = async ({ id, userId }) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const current = await client.query(
      `
        DELETE FROM business_sessions
        WHERE id = $1 AND user_id = $2
        RETURNING id
      `,
      [id, userId],
    );

    if (current.rows[0]) {
      await client.query("COMMIT");
      return { id: current.rows[0].id };
    }

    const legacy = await client.query(
      `
        DELETE FROM business_direction_sessions
        WHERE id = $1 AND user_id = $2
        RETURNING id
      `,
      [id, userId],
    );

    await client.query("COMMIT");
    return legacy.rows[0] ? { id: legacy.rows[0].id } : null;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

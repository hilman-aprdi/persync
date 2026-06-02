import {
  createBusinessDirection,
  getBusinessDirectionSessionDetail,
  getRecentBusinessDirections,
} from "../services/business-direction.service.js";
import { buildViewerPayload } from "../services/auth.service.js";

export const generateDescription = async (req, res, next) => {
  try {
    const session = await createBusinessDirection(req.body, {
      userId: req.authUser?.id || null,
      guestId: req.authUser ? null : req.guestId,
    });
    const viewer = await buildViewerPayload({
      user: req.authUser,
      guestId: req.authUser ? null : req.guestId,
    });

    return res.status(201).json({
      success: true,
      result: session.result,
      session,
      viewer,
    });
  } catch (error) {
    return next(error);
  }
};

export const getGenerationHistory = async (req, res, next) => {
  try {
    const items = await getRecentBusinessDirections({
      userId: req.authUser?.id || null,
      guestId: req.authUser ? null : req.guestId,
    });
    const viewer = await buildViewerPayload({
      user: req.authUser,
      guestId: req.authUser ? null : req.guestId,
    });

    return res.json({
      success: true,
      data: items,
      viewer,
    });
  } catch (error) {
    return next(error);
  }
};

export const getGenerationSession = async (req, res, next) => {
  try {
    const session = await getBusinessDirectionSessionDetail(req.params.id, {
      userId: req.authUser?.id || null,
      guestId: req.authUser ? null : req.guestId,
    });
    const viewer = await buildViewerPayload({
      user: req.authUser,
      guestId: req.authUser ? null : req.guestId,
    });

    return res.json({
      success: true,
      data: session,
      viewer,
    });
  } catch (error) {
    return next(error);
  }
};

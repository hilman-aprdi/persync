import { buildViewerPayload, verifyGoogleCredential } from "../services/auth.service.js";

export const continueWithGoogle = async (req, res, next) => {
  try {
    const { credential } = req.body || {};
    const { user, token } = await verifyGoogleCredential(credential);
    const viewer = await buildViewerPayload({ user, guestId: null });

    return res.status(201).json({
      success: true,
      token,
      user: viewer.user,
      usage: viewer.usage,
    });
  } catch (error) {
    return next(error);
  }
};

export const getCurrentSession = async (req, res, next) => {
  try {
    const viewer = await buildViewerPayload({
      user: req.authUser,
      guestId: req.guestId,
    });

    return res.json({
      success: true,
      data: viewer,
    });
  } catch (error) {
    return next(error);
  }
};

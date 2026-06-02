import { deleteBusinessDirectionSession } from "../services/business-direction.service.js";

export const deleteSession = async (req, res, next) => {
  try {
    const result = await deleteBusinessDirectionSession(req.params.id, {
      userId: req.authUser?.id || null,
    });

    return res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};

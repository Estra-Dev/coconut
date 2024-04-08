import Asset from "../model/asset.model.js";
import { errorHandler } from "../utils/error.js";

export const generate = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "you are not allowed to generate assets"));
  }

  if (
    !req.body.name ||
    !req.body.value ||
    req.body.value === 0 ||
    !req.body.description ||
    !req.body.image
  ) {
    return next(errorHandler(403, "Please all fields are required"));
  }

  const slug =
    req.body.name
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, "-") + new Date().getTime();
  try {
    const newAsset = await Asset.create({
      ...req.body,
      slug,
      userId: req.user.id,
    });

    res.status(201).json(newAsset);
  } catch (error) {
    next(error);
  }
};

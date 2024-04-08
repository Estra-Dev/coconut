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

export const getAssets = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.sortDirection === "asc" ? 1 : -1;
    const allAssets = await Asset.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.specie && { specie: req.query.specie }),
      ...(req.query.stage && { stage: req.query.stage }),
      ...(req.query.age && { age: req.query.age }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.assetId && { _id: req.query.assetId }),
      ...(req.query.searchTerm && {
        $or: [
          { name: { $regex: req.query.searchTerm, $options: "i" } },
          { description: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalAsset = await Asset.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthAssets = await Asset.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    const totalAssetsValue = allAssets.reduce((acc, obj) => {
      return acc + obj.value;
    }, 0);

    res
      .status(200)
      .json({ allAssets, totalAsset, lastMonthAssets, totalAssetsValue });
  } catch (error) {
    next(error);
  }
};

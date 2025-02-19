import joi from "joi";
import ApiError from "../utils/ApiError.js";

const validatePost = asyncHandler(async (req, res, next) => {
  const schema = joi.object({
    title: joi.string().required(),
    imageUrl: joi.string().optional(),
    content: joi.string().min(100).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    throw new ApiError(400, "Invalid blog data");
  }

  next();
});

const validatePostForUpdate = asyncHandler(async (req, res, next) => {
  const schema = joi.object({
    title: joi.string().optional(),
    imageUrl: joi.string().optional(),
    content: joi.string().optional(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    throw new ApiError(400, "Invalid blog data");
  }

  next();
});

export { 
  validatePost,
  validatePostForUpdate
}
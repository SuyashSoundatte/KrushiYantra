import joi from "joi";
import ApiError from "../utils/ApiError.js";

const registerUserSchema = joi.object({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  phone: joi.string().required(),
  role: joi.string().required(),
});

const loginUserSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const validateRegisterUser = (req, res, next)=>{
  const { error } = registerUserSchema.validate(req.body);
  if (error) {
    throw new ApiError(400, "Invalid register request body", error.details); 
  }
  next();
}

const validateLoginUser = (req, res, next)=>{
  const { error } = loginUserSchema.validate(req.body);
  if (error) {
    throw new ApiError(400, "Invalid login request body", error.details); 
  }
  next();
}

export { validateRegisterUser, validateLoginUser };
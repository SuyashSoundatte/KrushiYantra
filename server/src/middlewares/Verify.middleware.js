import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

const verifyToken = (req, res, next)=>{ 
    let token
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }

    if (!token) {
        throw new ApiError(401, "No Token, Auth denied!");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SEC);
        req.user = decoded;

        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new ApiError(401, "Token expired, please login again");
        }
        throw new ApiError(400, "Token not valid");
    }
};

export default verifyToken;
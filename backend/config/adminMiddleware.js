import jwt from "jsonwebtoken";
export const adminMiddleware = async (req, res, next) => {
  let token = req.headers.authorization;
  try {
    if (!token) {
      return res
        .status(200)
        .json({ message: "Token required", success: false });
    }
    let user = jwt.verify(token, "secretkey");
    req.user = user.id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

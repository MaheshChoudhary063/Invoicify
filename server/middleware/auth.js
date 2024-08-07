import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    let decodedData;
    decodedData = jwt.verify(token, "test");
    req.userId = decodedData?.id;

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default auth;

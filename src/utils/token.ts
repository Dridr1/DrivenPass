import jwt from "jsonwebtoken";

const tokenGenerator = (userId: number, email: string) => {
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign({id: userId, email}, secretKey || "gambiarra :)");
    return token;
};

export default tokenGenerator;
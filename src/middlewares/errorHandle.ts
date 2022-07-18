import { Request, Response } from "express";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorHandle = async (error: any, req: Request, res: Response) => {
    if (error.response) return res.sendStatus(error.response.status);
    if (error.status) return res.status(error.status).send(error.message);
    console.log(error);
    res.sendStatus(500);
};

export default errorHandle;
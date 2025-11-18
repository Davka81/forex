import { Response } from "express";
import { HttpStatus } from "./HttpStatus";

export default function successResponse(res: Response, data: any) {
	res.status(HttpStatus.OK);
	res.send(data);
}
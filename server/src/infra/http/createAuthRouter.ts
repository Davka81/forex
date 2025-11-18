import { NextFunction, Response, Router } from "express";
import Joi from "joi";

import UserQueryService from "@application/UserQueryService";
import UserService from "@application/UserService";
import ErrorWithCode from "@lib/error_handling/ErrorWithCode";
import successResponse from "@lib/http_server_utils/successResponse";
import { AdminJWTData, UserDto } from "@shared/types";
import adminGuard from "@utils/adminGuard";

class Handler {
	constructor(
		private userService: UserService,
		private userQueryService: UserQueryService,
	) { }

	@adminGuard
	public async me(req: Request, res: Response, next: NextFunction, data: AdminJWTData) {
		const user = await this.userQueryService.me({ id: data.id });
		const dto: AdminJWTData = {
			id: user.id,
			email: user.email,
			name: user.name
		}

		successResponse(res, dto);
	}

	public async loginViaGoogle(req: Request, res: Response) {
		const { error, value } = Joi.object({
			idToken: Joi.string().required()
		}).validate(req.body);

		if (error) throw error;

		try {
			const googleProfile = await this.userService.googleLogin(value.idToken);
			const user: UserDto = await this.userQueryService.loginBySocial(googleProfile);

			const token: string = this.userService._issueJwt(user);

			return successResponse(res, { accessToken: token });
		} catch (error) {
			throw new ErrorWithCode(error.code ?? "GOOGLE_LOGIN_FAILED", error.message ?? "Failed to google login");
		}
	}
}

export const createAuthRouter = (...params: [UserService, UserQueryService]) => {
	const router = Router();
	const handler = new Handler(...params);

	router.get("/me", handler.me.bind(handler));
	router.post('/google', handler.loginViaGoogle.bind(handler));

	return router;
}
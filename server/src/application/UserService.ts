import { cryptoHelper } from "@lib/cryptoHelper";
import Google from "@lib/google";
import { AdminJWTData, UserDto } from "@shared/types";

export default class UserService {
	constructor(
		private google: Google,
	) { }

	public _issueJwt(user: UserDto) {
		return cryptoHelper.encodeJwt<AdminJWTData>({
			id: user.id,
			email: user.email,
			name: user.name
		}, {
			expiresIn: '1d'
		});
	}

	public async googleLogin(idToken: string): Promise<{ email: string, name: string }> {
		const { email, name } = await this.google.authorize(idToken);

		if (!email) {
			throw new Error("Email not found from Google profile");
		}

		return { email, name }
	}
}
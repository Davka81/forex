import { SeqUsers } from "@infra/sequelize/models/init-models";
import { UserDto } from "@shared/types";

export default class UserQueryService {
	constructor() { }

	public async loginBySocial(params: { email: string, name: string }): Promise<any> {
		const { email, name } = params;

		let user = await SeqUsers.findOne({
			where: {
				email,
				deleted_at: null
			}
		});

		if (!user) {
			user = await SeqUsers.create({
				email,
				name
			});
		};

		return user;
	}

	public async me(params: { id: number }): Promise<UserDto> {
		const { id } = params;
		const user = await SeqUsers.findByPk(id);

		if (!user) throw new Error("The user does not exist.");
		if (user.deleted_at) throw new Error("The user has been deleted.");

		return user;
	}
}
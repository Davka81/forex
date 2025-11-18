import paramStore from "@lib/paramStore";
import { Sequelize } from "sequelize";
import { initModels } from "./models/init-models";

export let seq: Sequelize;

export async function setupSequelize() {
	if (!seq) {
		const { host, port, user, database, password } = await paramStore.getParams("mysql");

		seq = new Sequelize(database, user, password, {
			host,
			port,
			define: {
				timestamps: true,
				underscored: true,
				// paranoid: true,
			},
			dialect: "mysql",
			pool: {
				max: 15,
				min: 5,
				acquire: 10000,
				idle: 100,
			},
			// logging: process.env.NODE_ENV === "prod" ? false : console.log,
			// logging: console.log,
			// logging: APP_ENV === "prod" ? false : console.log,
			logging: false,
			dialectOptions: {
				multipleStatements: true,
				decimalNumbers: true,
			},
			timezone: "+08:00",
			// query: {
			// 	raw: true
			// },
		});
	}

	// seq.sync({
	// 	alter: true,
	// });

	initModels(seq);
}
import ParamStore from './ParamStore';
import parameters from './localParameters.json';

export default class LocalParamStore implements ParamStore {
	init(option: { appName: string; env: string }): void { }
	async getParams(group: string) {
		const path = group.split('/');

		return path.reduce((result, current) => {
			return result[current];
		}, parameters);
	}
}
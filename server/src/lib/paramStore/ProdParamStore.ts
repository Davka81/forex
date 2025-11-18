import ParamStore from './ParamStore';
import parameters from './prodParameters.json';

export default class ProdParamStore implements ParamStore {
	init(option: { appName: string; env: string }): void { }
	async getParams(group: string) {
		const path = group.split('/');

		return path.reduce((result, current) => {
			return result[current];
		}, parameters);
	}
}
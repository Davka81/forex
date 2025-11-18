export default interface ParamStore {
	init(option: { appName: string; env: string }): void;
	getParams(group): Promise<any>;
}
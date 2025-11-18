export default class ErrorWithCode extends Error {
	constructor(
		public code: string,
		public message: string,
		public option?: {
			status?: number
			payload?: any
		}
	) {
		super(message);
	}
}
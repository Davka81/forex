export interface DepositDto {
	transaction_date: Date;
	type: string;
	method: string;
	account: string;
	amount: string;
	status: string;
}

export interface HistoryDto {
	symbol: string;
	position: string;
	type: "Buy" | "Sell";
	volume: number;
	open_price: number;
	close_price: number;
	profit: number;
	open_time: Date;
	close_time: Date;
}
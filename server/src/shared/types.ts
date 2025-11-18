export interface AdminJWTData {
	id: number;
	email: string;
	name: string;
}

export interface UserDto {
	id: number
	email: string
	name: string
	created_at?: Date
	updated_at?: Date
	deleted_at: Date
}
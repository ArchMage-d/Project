import {UserEntity} from '../types';
import {ValidationError} from '../utils/errors';
import {v4 as uuid} from 'uuid';
import {pool} from '../utils/db';
import {UserAuth} from '../controllers/authentication/authentication';
import {FieldPacket} from "mysql2";

type UserRecordResults = [UserEntity[], FieldPacket[]];

export class UserRecord implements UserEntity {
	public id: string;
	public name: string;
	public surname: string;
	public nickname: string;
	public email: string;
	public password: string;
	public salt: string;

	constructor(obj: UserEntity) {
		if (!obj.name || obj.name.length > 50) {
			throw new ValidationError("User's name shouldn't be empty or longer than 50 chars.");
		}
		if (!obj.surname || obj.surname.length > 60) {
			throw new ValidationError("User's surname shouldn't be empty or longer than 60 chars.");
		}
		if (!obj.nickname || obj.nickname.length > 100) {
			throw new ValidationError("User's nickname shouldn't be empty or longer than 100 chars.");
		}
		if (!obj.email || obj.email.length > 30) {
			throw new ValidationError("User's email shouldn't be empty or longer than 30 chars.");
		}
		if (!obj.password || obj.password.length > 100) {
			throw new ValidationError("User's password shouldn't be empty or longer than 100 chars.");
		}

		this.id = obj.id;
		this.name = obj.name;
		this.surname = obj.surname;
		this.nickname = obj.nickname;
		this.email = obj.email;
		this.password = obj.password;
		this.salt = obj.salt;
	}

	static async findByEmail(email: string): Promise<UserRecord | null> {
		let user;
		const [result] = await pool.execute("SELECT * FROM `users` WHERE `email` = :email", {
			email,
		}) as UserRecordResults;
		return result.length === 0 ? null : new UserRecord(result[0]);
	}

	setPasswordAndSalt(password: string, salt: string) {
		this.password = password;
		this.salt = salt;
	}

	async insert() {
		if (!this.id) {
			this.id = uuid();
		} else {
			throw new Error('Cannot insert that is already inserted');
		}

		try {
			const salt = UserAuth.generateSalt();
			const hashedPassword = UserAuth.hashPassword(this.password, salt);

			await pool.execute(
				"INSERT INTO `users`(`id`,`name`,`surname`, `nickname`, `email`, `password`, `salt`) VALUES(:id, :name, :surname, :nickname, :email, :password, :salt)",
				{...this, password: hashedPassword, salt}
			);

			this.setPasswordAndSalt(hashedPassword, salt);
		} catch (error) {
			console.error("Error inserting user:", error);
			throw error;
		}
	}
}
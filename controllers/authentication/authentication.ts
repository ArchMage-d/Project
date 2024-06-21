import * as crypto from 'crypto';

export class UserAuth {
	static generateSalt(): string {
		return crypto.randomBytes(16).toString('hex');
	}

	static hashPassword(password: string, salt: string): string {
		const hash = crypto.createHmac('sha256', salt);
		hash.update(password);
		return hash.digest('hex');
	}

	static validatePassword(password: string, salt: string, hashedPassword: string): boolean {
		const inputHash = this.hashPassword(password, salt);

		console.log('Input Hash:', inputHash);
		console.log('Stored Hash:', hashedPassword);
		console.log('');

		return inputHash === hashedPassword;
	}
}

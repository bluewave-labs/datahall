import { UserRole } from '@prisma/client';

// =========== REGISTER PAYLOAD ===========

export interface RegisterPayload {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	role: UserRole;
}

// =========== REGISTER RESULT ===========

export interface RegisterResult {
	success: boolean;
	message: string;
	userId?: string;
	verificationToken?: string;
	emailFail?: boolean; // partial success scenario
}

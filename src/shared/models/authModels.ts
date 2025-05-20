import type { UserRole } from '@prisma/client';

export interface SignUpRequest {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	role?: UserRole;
}
export interface SignUpResponse {
	success: boolean;
	message: string;
	userId?: string;
}

export interface SignInRequest {
	email: string;
	password: string;
	remember?: boolean;
}
export interface SignInResponse {
	success: boolean;
	message?: string;
	token?: string;
}

export interface ForgotPasswordRequest {
	email: string;
}
export interface ForgotPasswordResponse {
	success: boolean;
	message: string;
	resetToken?: string;
}

export interface ResetPasswordRequest {
	token: string;
	newPassword: string;
}
export interface ResetPasswordResponse {
	success: boolean;
	message: string;
}

export interface ChangePasswordRequest {
	email: string;
	currentPassword: string;
	newPassword: string;
}
export interface ChangePasswordResponse {
	success: boolean;
	message: string;
}

export interface ChangeNameRequest {
	userId: string;
	payload: {
		firstName?: string;
		lastName?: string;
	};
}
export interface ChangeNameResponse {
	success: boolean;
	message: string;
}

export interface VerifyUserRequest {
	token?: string;
}
export interface VerifyUserResponse {
	success: boolean;
	message: string;
	statusCode: number;
}

import type {
	SignUpRequest,
	SignUpResponse,
	ForgotPasswordResponse,
	ResetPasswordResponse,
	ChangePasswordResponse,
	VerifyUserResponse,
	ChangePasswordRequest,
	ForgotPasswordRequest,
	ResetPasswordRequest,
	VerifyUserRequest,
} from '@/shared/models';
import { ChangeNameRequest, ChangeNameResponse } from '@/shared/models/authModels';

/**
 * @interface IAuth
 * @description Defines the common contract for authentication adapters.
 * Methods that cannot be implemented by a given adapter are marked optional.
 * Callers should check for method existence before invoking.
 */
export interface IAuth {
	/**
	 * Register a new user account.
	 * @param {SignUpRequest} request - Request for sign‐up.
	 * @param {string} request.email - User’s email address.
	 * @param {string} request.password - Desired password.
	 * @param {string} request.firstName - User’s first name.
	 * @param {string} request.lastName - User’s last name.
	 * @returns {Promise<SignUpResponse>} Result including success flag,
	 *   message, and optional verification token.
	 */
	signUp(request: SignUpRequest): Promise<SignUpResponse>;

	/**
	 * Initiate the “forgot password” workflow.
	 * @param {ForgotPasswordRequest} request - Request for forgot‐password.
	 * @param {string} request.email - The user’s email address.
	 * @returns {Promise<ForgotPasswordResponse>} Result including success flag,
	 *   message, and optional reset token.
	 */
	forgotPassword(request: ForgotPasswordRequest): Promise<ForgotPasswordResponse>;

	/**
	 * Complete a password reset using a previously issued token.
	 * @param {ResetPasswordRequest} request - Request for reset.
	 * @param {string} request.token - The reset token.
	 * @param {string} request.newPassword - The new password to set.
	 * @returns {Promise<ResetPasswordResponse>} Result object.
	 */
	resetPassword?(request: ResetPasswordRequest): Promise<ResetPasswordResponse>;

	/**
	 * Change an authenticated user’s password.
	 * @param {ChangePasswordRequest} request - Request for change‑password.
	 * @param {string} request.email - The user’s email.
	 * @param {string} request.currentPassword - Current password.
	 * @param {string} request.newPassword - New password to set.
	 * @returns {Promise<ChangePasswordResponse>} Result object.
	 */
	changePassword(request: ChangePasswordRequest): Promise<ChangePasswordResponse>;

	/**
	 * Change a user’s first / last name.
	 * @param {ChangeNameRequest} request - Request for change‑password.
	 * @param {string} request.userId  Local primary key (user.user_id).
	 * @param {object} request.payload - The name update payload
	 * @param {string} [request.payload.firstName] - New first name (optional)
	 * @param {string} [request.payload.lastName] - New last name (optional)
	 * @returns {Promise<ChangeNameResponse>} Result object.
	 */
	changeName(request: ChangeNameRequest): Promise<ChangeNameResponse>;

	/**
	 * Verify an account via email token.
	 * Local‑only adapter method; missing in Auth0 mode.
	 * @param {VerifyUserRequest} request - Request for verification.
	 * @param {string} [request.token] - Verification token from email.
	 * @returns {Promise<VerifyUserResponse>} Result with HTTP‑style statusCode.
	 */
	verifyUser?(request: VerifyUserRequest): Promise<VerifyUserResponse>;
}

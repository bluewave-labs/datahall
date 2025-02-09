type MessageType = string | ((value: string) => string);

export interface ValidationRule {
	rule: (value: string) => boolean;
	message: MessageType;
}

/**
 * Reusable rule for "non-empty" fields.
 * By default, message = "This field is required."
 */
export function requiredFieldRule(message = 'This field is required.'): ValidationRule {
	return {
		rule: (val) => val.trim().length > 0,
		message,
	};
}

/** Basic check for email format. */
export const validEmailRule: ValidationRule = {
	rule: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
	message: 'Please enter a valid email address.',
};

/**
 * Example for min length (e.g., passwords).
 */
export function minLengthRule(
	length: number,
	message = `Must be at least ${length} characters long.`,
): ValidationRule {
	return {
		rule: (val) => val.length >= length,
		message,
	};
}

/**
 * Check for at least one special character (e.g., for password).
 */
export const hasSpecialCharRule: ValidationRule = {
	rule: (val) => /[^A-Za-z0-9]/.test(val),
	message: 'Must contain at least one special character.',
};

/** Check for min length, at least one uppercase letter and one symbol (e.g., for password).*/
export function passwordValidationRule(
	length: number,
	checkUppercase = false,
	checkSymbol = false,
	lengthMessage = `Must be at least ${length} characters long.`,
	uppercaseMessage = 'Must contain at least one uppercase letter.',
	symbolMessage = 'Must Include at least one symbol.',
): ValidationRule {
	return {
		rule: (val) => {
			const isLengthValid = val.length >= length;
			const hasUppercaseLetter = !checkUppercase || /[A-Z]/.test(val);
			const hasSymbol = !checkSymbol || /[!@#$%^&*(),.?":{}|<>]/.test(val);
			return isLengthValid && hasUppercaseLetter && hasSymbol;
		},
		message: (val) => {
			if (val.length < length) return lengthMessage;
			if (checkUppercase && !/[A-Z]/.test(val)) return uppercaseMessage;
			if (checkSymbol && !/[!@#$%^&*(),.?":{}|<>]/.test(val)) return symbolMessage;
			return '';
		},
	};
}

/** Check the equality of the password and confirm password.*/
export function confirmPasswordRule(password: string): ValidationRule {
	return {
		rule: (confirmPassword) => confirmPassword === password,
		message: 'Password and confirmation password do not match.',
	};
}

/**
 * For displaying "strength" feedback in PasswordValidation.tsx.
 * You can adapt these checks to match your actual password policy.
 */
export function getPasswordChecks(password: string) {
	return {
		isLengthValid: password.length >= 8,
		hasUppercaseLetter: /[A-Z]/.test(password),
		hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
	};
}

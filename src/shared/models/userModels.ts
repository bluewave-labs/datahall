// =========== USER TYPE ===========

export interface User {
	user_id: number;
	name: string;
	email: string;
	role: 'Administrator' | 'Member';
	createdAt: string;
	// ... etc
}

// =========== VISITOR DETAIL ===========

export interface Contact {
	id: number;
	name: string; // Combined first + last name
	email: string; // If LinkVisitors has an email field
	document_id: string; // The document_id from DB
	lastActivity: Date; //The date/time of their last activity
	lastViewedLink: string; //The last link or friendly name they viewed
	totalVisits: number; //Total visits for that email across the user's links
	downloads: number;
	duration: string;
	completion: string;
}

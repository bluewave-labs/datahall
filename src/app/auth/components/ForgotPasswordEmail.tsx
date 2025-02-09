import {
	Body,
	Container,
	Head,
	Html,
	Img,
	Link,
	Preview,
	Row,
	Section,
	Text,
} from '@react-email/components';
import * as React from 'react';

interface BluewaveResetPasswordEmailProps {
	username?: string;
	resetUrl?: string;
}

export const BluewaveResetPasswordEmail = ({
	username,
	resetUrl,
}: BluewaveResetPasswordEmailProps) => {
	return (
		<Html>
			<Head />
			<Preview>Reset your Bluewave Labs password</Preview>
			<Body style={main}>
				<Container style={container}>
					<Section style={logo}>
						<Img
							src="https://utfs.io/f/fYAncjDxKRb0SB5lSuLK58qIuaP0cF3tMzrJCA4G92LHNofp"
							width={100}
							alt="Bluewave Labs"
						/>
					</Section>
					<Section style={content}>
						<Text style={paragraph}>Hi {username},</Text>
						<Text style={paragraph}>
							Someone recently requested a password change for your Bluewave
							Labs account. If this was you, you can set a new password here:
						</Text>
						<Text style={paragraph}>
							<Link href={resetUrl}>{resetUrl}</Link>
						</Text>
						<Text style={paragraph}>
							If you didn’t request this change, just ignore this message. To
							keep your account secure, please don’t forward this email to
							anyone.
						</Text>
						<Text style={paragraph}>
							See our Help Center for{' '}
							<Link href="https://bluewavelabs.ca/" style={link}>
								more security tips.
							</Link>
						</Text>
						<Text style={paragraph}>Happy Uploading</Text>
					</Section>
				</Container>

				<Section style={footer}>
					<Row>
						<Text style={{ textAlign: 'center', color: '#706a7b' }}>
							© 2024 Bluewave Labs, All Rights Reserved <br />
							123 Bluewave Drive, Suite 500, Toronto , CA
						</Text>
					</Row>
				</Section>
			</Body>
		</Html>
	);
};

BluewaveResetPasswordEmail.PreviewProps = {
	userFirstname: 'Alan',
	resetPasswordLink: 'https://bluewavelabs.com/reset-password', // Example link
} as BluewaveResetPasswordEmailProps;

export default BluewaveResetPasswordEmail;

const fontFamily = 'HelveticaNeue,Helvetica,Arial,sans-serif';

const main = {
	backgroundColor: '#f6f9fc',
	fontFamily,
};

const paragraph = {
	lineHeight: 1.5,
	fontSize: 16,
};

const container = {
	maxWidth: '580px',
	margin: '30px auto',
	backgroundColor: '#ffffff',
	padding: '45px',
};

const footer = {
	maxWidth: '580px',
	margin: '0 auto',
};

const content = {
	padding: '20px',
};

const logo = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	padding: 30,
};

const link = {
	textDecoration: 'underline',
};

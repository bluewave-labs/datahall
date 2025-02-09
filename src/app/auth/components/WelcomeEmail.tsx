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

interface BluewaveWelcomeEmail {
	username?: string;
	verificationLink: string;
}

export const BluewaveWelcomeEmail = ({ username, verificationLink }: BluewaveWelcomeEmail) => {
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
						<Text style={paragraph}>Welcome to Bluewave Labs!! YAYAYAY!!!</Text>
						<Text style={paragraph}>Please verify your email by cliking on the below</Text>
						<Link href={verificationLink}>{verificationLink}</Link>
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
export default BluewaveWelcomeEmail;

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

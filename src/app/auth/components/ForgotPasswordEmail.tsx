import Image from 'next/image';
import React from 'react';

interface BluewaveWelcomeEmailProps {
	username?: string;
	verificationLink: string;
}

const BluewaveWelcomeEmail: React.FC<BluewaveWelcomeEmailProps> = ({
	username,
	verificationLink,
}) => {
	const fontFamily = 'HelveticaNeue,Helvetica,Arial,sans-serif';

	const main: React.CSSProperties = {
		backgroundColor: '#f6f9fc',
		fontFamily,
		margin: 0,
		padding: 0,
	};

	const container: React.CSSProperties = {
		maxWidth: '580px',
		margin: '30px auto',
		backgroundColor: '#ffffff',
		padding: '45px',
	};

	const logo: React.CSSProperties = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 30,
	};

	const content: React.CSSProperties = {
		padding: '20px',
	};

	const paragraph: React.CSSProperties = {
		lineHeight: 1.5,
		fontSize: 16,
		margin: '0 0 1em',
	};

	const linkStyle: React.CSSProperties = {
		textDecoration: 'underline',
		color: '#1155cc',
		wordWrap: 'break-word',
	};

	const footer: React.CSSProperties = {
		maxWidth: '580px',
		margin: '0 auto',
		padding: '20px 0',
	};

	return (
		<html>
			<head>
				<meta charSet='UTF-8' />
				<title>Welcome to Bluewave Labs</title>
			</head>
			<body style={main}>
				<div style={container}>
					{/* Logo Section */}
					<div style={logo}>
						<Image
							src='https://utfs.io/f/fYAncjDxKRb0SB5lSuLK58qIuaP0cF3tMzrJCA4G92LHNofp'
							width={100}
							alt='Bluewave Labs'
						/>
					</div>

					{/* Main Content */}
					<div style={content}>
						<p style={paragraph}>Hi {username},</p>
						<p style={paragraph}>Welcome to Bluewave Labs!! YAYAYAY!!!</p>
						<p style={paragraph}>Please verify your email by clicking on the link below:</p>
						<p style={paragraph}>
							<a
								href={verificationLink}
								style={linkStyle}>
								{verificationLink}
							</a>
						</p>
						<p style={paragraph}>Happy Uploading,</p>
						<p style={paragraph}>- The Bluewave Labs Team</p>
					</div>
				</div>

				{/* Footer */}
				<div style={footer}>
					<p style={{ textAlign: 'center', color: '#706a7b', margin: 0 }}>
						© 2024 Bluewave Labs, All Rights Reserved
						<br />
						123 Bluewave Drive, Suite 500, Toronto, CA
					</p>
				</div>
			</body>
		</html>
	);
};

export default BluewaveWelcomeEmail;
